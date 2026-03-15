"use client";

import * as React from "react";
import { Clock, Video, Globe, XIcon, ChevronDown, ChevronUp, Check, Calendar as CalendarIcon } from "lucide-react";
import type { DayButton } from "react-day-picker";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { SelectStep } from "./select-step";
import { DetailsStep } from "./details-step";
import { ConfirmStep } from "./confirm-step";

const COLOR_THEME_BACKGROUND = "oklch(24% 0.035 165)";

/** IANA timezone → short abbreviation for display. Stored value remains IANA. */
const TIMEZONE_ABBR: Record<string, string> = {
  "America/New_York": "ET",
  "America/Chicago": "CT",
  "America/Denver": "MT",
  "America/Los_Angeles": "PT",
  "America/Phoenix": "MST",
  "America/Anchorage": "AKT",
  "America/Toronto": "ET",
  "America/Vancouver": "PT",
  "America/Edmonton": "MT",
  "America/Winnipeg": "CT",
  "America/Halifax": "AT",
  "America/St_Johns": "NT",
  "Europe/London": "GMT",
  "Europe/Paris": "CET",
  "Europe/Berlin": "CET",
  "Europe/Amsterdam": "CET",
  "Europe/Brussels": "CET",
  "Europe/Madrid": "CET",
  "Europe/Rome": "CET",
  "Europe/Stockholm": "CET",
  "Europe/Vienna": "CET",
  "Europe/Zurich": "CET",
  "Europe/Moscow": "MSK",
  "Asia/Tokyo": "JST",
  "Asia/Seoul": "KST",
  "Asia/Shanghai": "CST",
  "Asia/Hong_Kong": "HKT",
  "Asia/Singapore": "SGT",
  "Asia/Kolkata": "IST",
  "Asia/Dubai": "GST",
  "Australia/Sydney": "AEST",
  "Australia/Melbourne": "AEST",
  "Australia/Perth": "AWST",
  "Pacific/Auckland": "NZST",
  UTC: "UTC",
};

/**
 * Format IANA timezone for display only. Value stored and passed remains IANA.
 * Returns "City (ABBR)" when abbr is in map, else "City".
 */
function formatTimezoneLabel(iana: string): string {
  const parts = iana.split("/");
  const city = parts[parts.length - 1]?.replace(/_/g, " ") ?? iana;
  const abbr = TIMEZONE_ABBR[iana];
  return abbr ? `${city} (${abbr})` : city;
}

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
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
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
          setSelectedDate(null);
          setSelectedTime(null);
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

    const selectedLabel = React.useMemo(
      () =>
        date
          ? `${date.toLocaleDateString("en-US", { weekday: "short" })} ${date.getDate()}`
          : "Select a date",
      [date]
    );

    const formattedDateAtTime =
      selectedDate && selectedTime
        ? `${selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })} at ${selectedTime.replace(/(\d)(am|pm)/i, "$1 $2")}`
        : null;

    const formattedDateConfirm = React.useMemo(
      () =>
        date
          ? date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "",
      [date]
    );

    const formattedTimeZone = React.useMemo(
      () => formatTimezoneLabel(timeZone),
      [timeZone]
    );

    const onTimeFormatChange = React.useCallback((v: "12h" | "24h") => {
      setTimeFormat(v);
    }, []);

    const onSlotSelect = React.useCallback(
      (slot: string) => {
        setSelectedSlot(slot);
        setSelectedTime(slot);
        if (date) {
          setSelectedDate(date);
          setStep("details");
        }
      },
      [date]
    );

    const onNameChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
      []
    );
    const onEmailChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
      []
    );
    const onNotesChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value),
      []
    );
    const onToggleAddGuest = React.useCallback(() => {
      setShowAddGuestInput((v) => !v);
    }, []);
    const onGuestEmailChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => setGuestEmail(e.target.value),
      []
    );
    const onBack = React.useCallback(() => {
      setStep("select");
    }, []);
    const onConfirm = React.useCallback(() => {
      if (!name.trim() || !email.trim()) return;
      setStep("confirm");
    }, [name, email]);
    const onReschedule = React.useCallback(() => setStep("select"), []);
    const onCancel = React.useCallback(() => {
      handleOpenChange(false);
    }, [handleOpenChange]);

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
          "scheduling-dialog-shell gap-0 fixed inset-y-0 right-0 w-full",
          "max-lg:data-[state=open]:animate-in max-lg:data-[state=closed]:animate-out",
          "max-lg:data-[state=closed]:slide-out-to-right max-lg:data-[state=open]:slide-in-from-right",
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
            "relative flex min-h-screen max-h-[90vh] lg:min-h-0 lg:h-fit lg:max-h-[85vh] w-full max-w-full lg:max-w-[952px] flex-col overflow-y-auto lg:overflow-x-visible lg:overflow-y-auto rounded-none lg:rounded-lg p-6 text-foreground",
            step === "select" && "pb-[48px]",
            theme !== "light" && "shadow-lg",
            theme === "color" && "!bg-[oklch(24%_0.035_165)]",
            step === "details" && "lg:w-fit",
            step === "confirm" && "lg:max-w-[500px]"
          )}
          style={
            theme === "color"
              ? { backgroundColor: COLOR_THEME_BACKGROUND }
              : { backgroundColor: "#ffffff" }
          }
        >
          {step === "confirm" ? (
            <div className="flex min-h-0 w-full flex-none lg:flex-1 lg:min-h-0 flex-col items-start">
              <ConfirmStep
                name={name}
                email={email}
                guestEmail={guestEmail}
                formattedDate={formattedDateConfirm}
                selectedSlot={selectedSlot}
                formattedTimeZone={formattedTimeZone}
                onReschedule={onReschedule}
                onCancel={onCancel}
              />
            </div>
          ) : step === "select" ? (
            /* Stage 1: left panel | calendar | time slots */
            <div className="flex min-h-0 flex-none lg:flex-1 lg:min-h-0 flex-col gap-12 lg:flex-row lg:gap-6 max-w-full">
              <div
                data-slot="scheduling-left-panel"
                className="flex h-auto min-h-0 w-full flex-col text-foreground pt-1 lg:w-[236px] shrink-0"
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
                    <p className="scheduling-left-desc mt-2 mb-4 text-body2 text-foreground">
                      A 30‑minute video call designed to introduce ourselves and explore where our work might align.
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
                          style={{ paddingTop: 8, paddingBottom: 8 }}
                          className="-ml-2 -mt-[6px] flex items-center gap-2 rounded-[4px] px-2 leading-normal text-body2 text-foreground transition-colors hover:bg-[oklch(95%_0_0)]"
                        >
                          <Globe className="h-4 w-4 shrink-0" />
                          <span className="max-w-[180px] truncate">{formatTimezoneLabel(timeZone)}</span>
                          {timezoneOpen ? (
                            <ChevronUp className="h-4 w-4 shrink-0" />
                          ) : (
                            <ChevronDown className="h-4 w-4 shrink-0" />
                          )}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="w-[var(--radix-dropdown-menu-trigger-width)] max-w-[var(--radix-dropdown-menu-trigger-width)] max-h-[280px] overflow-y-auto shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_0_2px_rgba(0,0,0,0.03)]"
                      >
                        {TIME_ZONES.map((tz) => (
                          <DropdownMenuItem
                            key={tz}
                            ref={tz === timeZone ? selectedRef : null}
                            onSelect={() => setTimeZone(tz)}
                            className={cn(
                              "flex items-center gap-2 rounded-[4px] py-2 pl-0.5 leading-normal hover:bg-[oklch(90%_0_0)] focus:bg-[oklch(90%_0_0)]",
                              timeZone === tz && "bg-[oklch(95%_0_0)]"
                            )}
                          >
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                              {timeZone === tz ? (
                                <Check className="h-4 w-4" />
                              ) : null}
                            </span>
                            <span className="min-w-0 truncate">{formatTimezoneLabel(tz)}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardContent>
                </Card>
              </div>
              <div
                data-slot="scheduling-calendar-wrap"
                className="-mt-0.5 flex h-auto min-h-[280px] lg:min-h-0 min-w-0 flex-1 flex-none flex-col overflow-visible lg:w-[384px]"
                style={{ backgroundColor: "transparent" }}
              >
                <div className="flex min-w-0 flex-1 flex-col overflow-visible pt-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      if (!newDate) return;
                      setDate(newDate);
                      setSelectedDate(newDate);
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
              <div className="flex h-auto min-h-0 min-w-0 shrink-0 flex-col pt-0 w-full lg:w-[236px]">
                <SelectStep
                  selectedLabel={selectedLabel}
                  timeFormat={timeFormat}
                  onTimeFormatChange={onTimeFormatChange}
                  slots={slots}
                  onSlotSelect={onSlotSelect}
                />
              </div>
            </div>
          ) : (
            /* Stage 2: left panel | details form */
            <div className="flex min-h-0 flex-none lg:flex-1 lg:min-h-0 flex-col gap-12 lg:flex-row lg:gap-6 max-w-full">
              <div
                data-slot="scheduling-left-panel"
                className="flex h-auto min-h-0 w-full flex-col text-foreground pt-1 lg:w-[236px] shrink-0"
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
                    <p className="scheduling-left-desc mt-2 mb-4 text-body2 text-foreground">
                      A 30‑minute video call designed to introduce ourselves and explore where our work might align.
                    </p>
                  </CardHeader>
                  <CardContent className="scheduling-left-details flex flex-col gap-4 pt-0 px-0">
                    {formattedDateAtTime && (
                      <div className="scheduling-left-detail-row flex items-start gap-2 text-body2 text-foreground">
                        <CalendarIcon className="h-4 w-4 shrink-0 mt-[2px]" />
                        <span>{formattedDateAtTime}</span>
                      </div>
                    )}
                    <div className="scheduling-left-detail-row flex items-center gap-2 text-body2 text-foreground">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span>30 min</span>
                    </div>
                    <div className="scheduling-left-detail-row flex items-center gap-2 text-body2 text-foreground">
                      <Video className="h-4 w-4 shrink-0" />
                      <span>Video Call</span>
                    </div>
                    <div className="scheduling-left-detail-row flex items-center gap-2 text-body2 text-foreground pointer-events-none">
                      <Globe className="h-4 w-4 shrink-0" />
                      <span className="max-w-[180px] truncate">{formatTimezoneLabel(timeZone)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex min-h-0 w-full flex-col pt-[2px] lg:w-[384px] shrink-0">
                <DetailsStep
                  name={name}
                  onNameChange={onNameChange}
                  email={email}
                  onEmailChange={onEmailChange}
                  notes={notes}
                  onNotesChange={onNotesChange}
                  showAddGuestInput={showAddGuestInput}
                  onToggleAddGuest={onToggleAddGuest}
                  guestEmail={guestEmail}
                  onGuestEmailChange={onGuestEmailChange}
                  onBack={onBack}
                  onConfirm={onConfirm}
                />
              </div>
            </div>
          )}
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
