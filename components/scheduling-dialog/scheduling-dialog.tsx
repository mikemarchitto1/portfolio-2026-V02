"use client";

import * as React from "react";
import { Clock, Video, Globe, XIcon, ChevronDown, ChevronUp, Check, CheckCircle2, UserPlus, ExternalLink } from "lucide-react";
import type { DayButton } from "react-day-picker";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

const COLOR_THEME_BACKGROUND = "oklch(24% 0.035 165)";

const TIME_ZONES: string[] =
  typeof Intl !== "undefined" && typeof Intl.supportedValuesOf === "function"
    ? Intl.supportedValuesOf("timeZone")
    : ["America/New_York", "America/Los_Angeles", "Europe/London", "UTC"];

type SchedulingDialogProps = {
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

let SchedulingDialog: React.FC<SchedulingDialogProps>;
try {
  function SchedulingCalendarDayButton({
    className,
    day,
    modifiers,
    children,
    ...props
  }: React.ComponentProps<typeof DayButton>) {
    const ref = React.useRef<HTMLButtonElement>(null);
    const { theme } = useTheme();
    React.useEffect(() => {
      if (modifiers.focused) ref.current?.focus();
    }, [modifiers.focused]);

    const isOutsideInColorMode = theme === "color" && modifiers.outside;
    const colorStyle = isOutsideInColorMode ? { color: "#ffffff" as const } : undefined;

    return (
      <button
        ref={ref}
        type="button"
        data-day={day.date.toLocaleDateString()}
        data-outside={modifiers.outside}
        data-selected-single={
          modifiers.selected &&
          !modifiers.range_start &&
          !modifiers.range_end &&
          !modifiers.range_middle
        }
        data-range-start={modifiers.range_start}
        data-range-end={modifiers.range_end}
        data-range-middle={modifiers.range_middle}
        style={colorStyle}
        className={cn(
          "rdp-day-button bg-[oklch(95%_0_0)] hover:bg-[oklch(90%_0_0)] inline-flex items-center justify-center rounded-[4px] transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none text-button text-foreground data-[outside=true]:bg-transparent data-[outside=true]:hover:bg-transparent color:data-[outside=true]:!text-white data-[selected-single=true]:bg-[oklch(22%_0_0)] data-[selected-single=true]:text-white data-[selected-single=true]:hover:bg-[oklch(22%_0_0)] data-[selected-single=true]:rounded-full data-[range-middle=true]:text-foreground data-[range-start=true]:text-white data-[range-end=true]:text-white group-data-[focused=true]/day:border-0 group-data-[focused=true]/day:ring-0 flex aspect-square size-auto w-full min-w-(--cell-size) leading-none group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 data-[range-end=true]:rounded-full data-[range-end=true]:rounded-r-full data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-full data-[range-start=true]:rounded-l-full px-0 py-0",
          className
        )}
        {...props}
      >
        <span
          style={colorStyle}
          className="flex min-h-0 min-w-0 flex-1 items-center justify-center text-center text-button"
        >
          {children}
        </span>
      </button>
    );
  }

  function generateTimeSlots(use24h: boolean): string[] {
    const slots: string[] = [];
    for (let h = 12; h <= 19; h++) {
      for (const m of [0, 30]) {
        if (h === 19 && m === 30) break;
        if (use24h) {
          slots.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
        } else {
          const hour12 = h === 12 ? 12 : h > 12 ? h - 12 : h;
          const ampm = h < 12 ? "am" : "pm";
          slots.push(`${hour12}:${m.toString().padStart(2, "0")}${ampm}`);
        }
      }
    }
    return slots;
  }

  SchedulingDialog = function SchedulingDialog({ trigger, open, onOpenChange }: SchedulingDialogProps) {
    const { theme } = useTheme();
    const [step, setStep] = React.useState<"select" | "details" | "confirm">("select");
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);
    const [timeFormat, setTimeFormat] = React.useState<"12h" | "24h">("12h");
    const [timeZone, setTimeZone] = React.useState<string>(() =>
      typeof Intl !== "undefined" && typeof Intl.DateTimeFormat !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : "America/New_York"
    );
    const [timezoneOpen, setTimezoneOpen] = React.useState(false);
    const selectedRef = React.useRef<HTMLDivElement>(null);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [notes, setNotes] = React.useState("");
    const [showAddGuestInput, setShowAddGuestInput] = React.useState(false);
    const [guestEmail, setGuestEmail] = React.useState("");

    const handleOpenChange = React.useCallback(
      (next: boolean) => {
        if (!next) {
          setStep("select");
          setSelectedSlot(null);
          setName("");
          setEmail("");
          setNotes("");
          setShowAddGuestInput(false);
          setGuestEmail("");
        }
        onOpenChange?.(next);
      },
      [onOpenChange]
    );

    const slots = React.useMemo(
      () => generateTimeSlots(timeFormat === "24h"),
      [timeFormat]
    );

    const selectedLabel = date
      ? `${date.toLocaleDateString("en-US", { weekday: "short" })} ${date.getDate()}`
      : "Select a date";

    return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        centerInViewport
        overlayClassName={cn(
          "scheduling-dialog-overlay",
          theme === "light" && "!bg-black/25",
          theme === "dark" && "!bg-black/60",
          theme === "color" && "!bg-black/40"
        )}
        className={cn(
          "gap-0 fixed inset-y-0 right-0 w-full",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
          "data-[state=closed]:duration-300 data-[state=open]:duration-500",
          "lg:inset-0 lg:flex lg:items-center lg:justify-center"
        )}
      >
        <DialogTitle className="sr-only">Schedule a meeting</DialogTitle>

        {/* Close button: fixed top-right of viewport, above overlay */}
        <DialogClose
          className="fixed right-4 top-4 z-[100] flex size-12 min-h-12 min-w-12 items-center justify-center rounded-full border-0 bg-transparent text-foreground dark:text-white color:text-white opacity-90 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0 scheduling-dialog-close lg:text-white"
          aria-label="Close"
        >
          <XIcon className="size-6 shrink-0 text-foreground dark:text-white color:text-white lg:text-white" />
        </DialogClose>

        {/* Main wrapper: same bg as page. Color mode uses literal value so it works in portal. */}
        <div
            data-slot="scheduling-panel"
            data-theme={theme}
            className={cn(
              "relative flex min-h-screen max-h-[90vh] lg:min-h-0 lg:h-fit lg:max-h-[85vh] w-full max-w-full lg:max-w-[1004px] flex-col overflow-y-auto lg:overflow-x-visible lg:overflow-y-auto rounded-none lg:rounded-lg px-6 pt-6 pb-[64px] text-foreground",
              theme !== "light" && "shadow-lg",
              theme === "color" && "!bg-[oklch(24%_0.035_165)]"
            )}
            style={
              theme === "color"
                ? { backgroundColor: COLOR_THEME_BACKGROUND }
                : { backgroundColor: "#ffffff" }
            }
          >
            {/* Stack on mobile/tablet; three columns on desktop */}
            <div className="flex min-h-0 flex-none lg:flex-1 lg:min-h-0 lg:flex-row flex-col items-start lg:items-stretch gap-12">
              {/* Left column */}
              {(step === "select" || step === "details") && (
              <div
                data-slot="scheduling-left-panel"
                className="flex h-auto min-h-0 min-w-0 shrink-0 flex-col text-foreground w-full lg:w-[236px] pt-1"
                style={
                  theme === "color"
                    ? { backgroundColor: COLOR_THEME_BACKGROUND }
                    : { backgroundColor: "#ffffff" }
                }
              >
              <Card className="flex flex-1 flex-col gap-0 border-0 bg-transparent pt-0 pb-0 shadow-none text-foreground">
                <CardHeader className="scheduling-left-header mb-1 gap-0 space-y-0 pb-0 px-0 pt-0.5">
                  <div className="flex flex-col gap-5">
                    <CardTitle className="scheduling-left-title mt-0 shrink-0 text-subtitle1 font-medium text-foreground">
                      Introduction Call
                    </CardTitle>
                    <span className="scheduling-left-name block text-subtitle2 text-foreground">
                      Michael Marchitto
                    </span>
                  </div>
                  <p className="scheduling-left-desc mt-4 mb-4 text-body2 text-foreground">
                    A 30-minute video call introduction to discuss potential opportunities.
                  </p>
                </CardHeader>
                <CardContent className="scheduling-left-details flex flex-col gap-4 pt-0 px-0">
                  <div className="scheduling-left-detail-row flex items-center gap-2 text-body2 text-foreground">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span>30 min</span>
                  </div>
                  <div className="scheduling-left-detail-row flex items-center gap-2 text-body2 text-foreground">
                    <Video className="h-4 w-4 shrink-0" />
                    <span>Video Call</span>
                  </div>
                  <DropdownMenu
                    onOpenChange={(open) => {
                      setTimezoneOpen(open);
                      if (open) {
                        setTimeout(() => {
                          selectedRef.current?.scrollIntoView({
                            block: "center",
                            behavior: "instant",
                          });
                        }, 0);
                      }
                    }}
                  >
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="-ml-2 -mt-1 flex items-center gap-2 rounded-md px-2 py-1 leading-none text-body2 text-foreground transition-colors hover:bg-[oklch(95%_0_0)]"
                      >
                        <Globe className="h-4 w-4 shrink-0" />
                        <span className="max-w-[180px] truncate">{timeZone}</span>
                        {timezoneOpen ? (
                          <ChevronUp className="h-4 w-4 shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 shrink-0" />
                        )}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="max-h-[280px] overflow-y-auto"
                    >
                      {TIME_ZONES.map((tz) => (
                        <DropdownMenuItem
                          key={tz}
                          ref={tz === timeZone ? selectedRef : null}
                          onSelect={() => setTimeZone(tz)}
                          className={cn(
                            "flex items-center gap-2 pl-0.5 hover:bg-[oklch(90%_0_0)] focus:bg-[oklch(90%_0_0)]",
                            timeZone === tz && "bg-[oklch(95%_0_0)]"
                          )}
                        >
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                            {timeZone === tz ? (
                              <Check className="h-4 w-4" />
                            ) : null}
                          </span>
                          <span className="min-w-0 truncate">{tz}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            </div>
              )}

            {/* Center column: calendar */}
            {step === "select" && (
            <div
              data-slot="scheduling-calendar-wrap"
              className="-mt-0.5 flex h-auto min-h-[280px] lg:min-h-0 min-w-0 w-full max-w-full flex-none lg:w-[384px] flex-col overflow-visible"
              style={{ backgroundColor: "transparent" }}
            >
              <div className="flex min-w-0 flex-1 flex-col overflow-visible pt-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                  if (!newDate) return; // prevent unselecting
                  setDate(newDate);
                }}
                  defaultMonth={date}
                  className="rounded-none border-0 p-0 [--cell-size:2.25rem] lg:[--cell-size:3rem]"
                  classNames={{
                    caption_label:
                      "select-none text-subtitle1 text-foreground leading-8 h-8 flex items-center",
                    day: "relative w-full h-full p-0 text-center group/day aspect-square select-none",
                  }}
                  components={{ DayButton: SchedulingCalendarDayButton }}
                />
              </div>
            </div>
            )}

            {/* Right column */}
            <div
              className={cn(
                "flex h-auto min-h-0 min-w-0 shrink-0 flex-col pt-0 mt-1 lg:mt-0 w-full lg:w-[236px]",
                step === "confirm" && "lg:flex-1"
              )}
              style={
                theme === "color"
                  ? { backgroundColor: COLOR_THEME_BACKGROUND }
                  : { backgroundColor: "#ffffff" }
              }
            >
              {step === "select" && (
                <>
                  <div data-slot="scheduling-right-header" className="mb-2 flex items-center justify-between gap-2 rounded-none bg-transparent p-0">
                    <span className="text-subtitle1 text-foreground dark:text-white color:text-white">{selectedLabel}</span>
                    <Tabs value={timeFormat} onValueChange={(v) => setTimeFormat(v as "12h" | "24h")}>
                      <div className="scheduling-toggle inline-flex items-center gap-0" data-slot="scheduling-toggle-wrap">
                        <TabsList
                          noBg
                          data-slot="scheduling-toggle"
                          className="inline-flex items-center gap-0 p-0 border-0 shadow-none min-w-0 h-auto bg-transparent"
                        >
                          <TabsTrigger
                            value="12h"
                            className={cn(
                              "rounded-full px-2.5 py-1 transition-colors text-[length:var(--text-button)] leading-[var(--line-height-button)] font-[var(--font-weight-button)] hover:bg-[oklch(95%_0_0)]",
                              timeFormat === "12h"
                                ? "bg-[oklch(95%_0_0)] text-[oklch(0%_0_0)]"
                                : "bg-transparent text-[oklch(55%_0_0)]"
                            )}
                          >
                            12h
                          </TabsTrigger>
                          <TabsTrigger
                            value="24h"
                            className={cn(
                              "rounded-full px-2.5 py-1 transition-colors text-[length:var(--text-button)] leading-[var(--line-height-button)] font-[var(--font-weight-button)] hover:bg-[oklch(95%_0_0)]",
                              timeFormat === "24h"
                                ? "bg-[oklch(95%_0_0)] text-[oklch(0%_0_0)]"
                                : "bg-transparent text-[oklch(55%_0_0)]"
                            )}
                          >
                            24h
                          </TabsTrigger>
                        </TabsList>
                      </div>
                    </Tabs>
                  </div>
                  <span className="text-subtitle2 font-medium text-foreground dark:text-white color:text-white mt-1.5 mb-5 shrink-0 block w-full text-center">Time Slot</span>
                  <div className="-mt-3 flex flex-col overflow-y-auto min-w-0 flex-1 min-h-0 lg:max-h-[272px]" data-slot="scheduling-time-slots">
                    <div className="flex flex-col gap-2 pt-0 pb-4 lg:pb-6">
                      {slots.map((slot) => (
                        <Button
                          key={slot}
                          variant="muted"
                          data-slot="scheduling-time-slot-btn"
                          className={cn(
                            "w-full justify-center rounded-full h-[48px] min-h-[48px] py-3 text-[length:var(--text-button)] leading-[var(--line-height-button)] font-[var(--font-weight-button)] bg-[oklch(95%_0_0)] hover:bg-[oklch(90%_0_0)]",
                            selectedSlot === slot && "bg-[oklch(22%_0_0)] text-white hover:bg-[oklch(22%_0_0)]"
                          )}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                  {date && selectedSlot && (
                    <Button
                      className="mt-2 w-full rounded-full h-[48px] bg-[oklch(22%_0_0)] text-white hover:bg-[oklch(28%_0_0)]"
                      onClick={() => setStep("details")}
                    >
                      Next
                    </Button>
                  )}
                </>
              )}
              {step === "details" && (
                <>
                  <h2 className="text-subtitle1 font-medium text-foreground dark:text-white color:text-white mb-4">Your Details</h2>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="scheduling-name" className="block text-body2 text-foreground mb-1.5">Name *</label>
                      <Input
                        id="scheduling-name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="scheduling-email" className="block text-body2 text-foreground mb-1.5">Email Address *</label>
                      <Input
                        id="scheduling-email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="scheduling-notes" className="block text-body2 text-foreground mb-1.5">Notes</label>
                      <Textarea
                        id="scheduling-notes"
                        placeholder="Anything helpful to prepare is appreciated."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full min-h-[80px]"
                      />
                    </div>
                    <button
                      type="button"
                      className="flex items-center gap-2 text-body2 text-foreground hover:text-foreground dark:hover:text-white color:hover:text-white self-start"
                      onClick={() => setShowAddGuestInput((v) => !v)}
                    >
                      <UserPlus className="h-4 w-4 shrink-0" />
                      + Add guests
                    </button>
                    {showAddGuestInput && (
                      <div>
                        <Input
                          placeholder="Enter email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 mt-6 justify-end">
                    <Button variant="outline" onClick={() => setStep("select")}>Back</Button>
                    <Button
                      className="bg-[oklch(22%_0_0)] text-white hover:bg-[oklch(28%_0_0)]"
                      onClick={() => {
                        if (!name.trim() || !email.trim()) return;
                        setStep("confirm");
                      }}
                    >
                      Confirm
                    </Button>
                  </div>
                </>
              )}
              {step === "confirm" && (
                <>
                  <div className="flex flex-col items-center text-center">
                    <CheckCircle2 className="h-10 w-10 text-green-600 mb-3" aria-hidden />
                    <h2 className="text-subtitle1 font-semibold text-foreground dark:text-white color:text-white">This meeting is scheduled</h2>
                    <p className="text-body2 text-foreground mt-1">We sent an email with a calendar invitation with the details to everyone.</p>
                  </div>
                  <div className="border-t border-border my-4" />
                  <dl className="flex flex-col gap-3 text-body2">
                    <div>
                      <dt className="text-foreground dark:text-white/60 color:text-white/60 font-medium">What</dt>
                      <dd className="text-foreground dark:text-white color:text-white mt-0.5">Introduction Call between {name || "Guest"} and Michael Marchitto</dd>
                    </div>
                    <div>
                      <dt className="text-foreground dark:text-white/60 color:text-white/60 font-medium">When</dt>
                      <dd className="text-foreground dark:text-white color:text-white mt-0.5">
                        {date?.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                        <br />
                        {selectedSlot} ({timeZone.replace("_", " ")})
                      </dd>
                    </div>
                    <div>
                      <dt className="text-foreground dark:text-white/60 color:text-white/60 font-medium">Who</dt>
                      <dd className="text-foreground dark:text-white color:text-white mt-0.5">
                        <span className="inline-flex items-center gap-1">
                          Michael Marchitto <span className="rounded bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5">Host</span>
                        </span>
                        <br />
                        {email}
                        {guestEmail && (
                          <>
                            <br />
                            {name || "Guest"} — {guestEmail}
                          </>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-foreground dark:text-white/60 color:text-white/60 font-medium">Where</dt>
                      <dd className="text-foreground dark:text-white color:text-white mt-0.5 inline-flex items-center gap-1">
                        Cal Video <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                      </dd>
                    </div>
                  </dl>
                  <div className="border-t border-border my-4" />
                  <p className="text-body2 text-foreground">Need to make a change?</p>
                  <div className="flex gap-1 mt-1">
                    <button type="button" className="text-body2 text-foreground underline hover:no-underline" onClick={() => setStep("select")}>Reschedule</button>
                    <span className="text-foreground"> or </span>
                    <button type="button" className="text-body2 text-foreground underline hover:no-underline" onClick={() => handleOpenChange(false)}>Cancel</button>
                  </div>
                  <div className="mt-4">
                    <p className="text-body2 text-foreground mb-2">Add to calendar</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="h-9 w-9 shrink-0" aria-label="Google Calendar">G</Button>
                      <Button variant="outline" size="icon" className="h-9 w-9 shrink-0" aria-label="Outlook">O</Button>
                      <Button variant="outline" size="icon" className="h-9 w-9 shrink-0" aria-label="Office 365">O</Button>
                      <Button variant="outline" size="icon" className="h-9 w-9 shrink-0" aria-label="ICS">ICS</Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    );
  };
} catch (err) {
  console.error("🔥 MODULE ERROR in scheduling-dialog:", err);
  throw err;
}

export { SchedulingDialog };
