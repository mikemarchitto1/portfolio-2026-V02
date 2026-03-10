"use client";

import * as React from "react";
import { Clock, Video, Globe, XIcon } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { getTimezoneOptions, DEFAULT_TIMEZONE } from "@/lib/timezones";
import { useTheme } from "@/hooks/use-theme";
import { RightPanel } from "@/components/scheduling-dialog/right-panel";

const COLOR_THEME_BACKGROUND = "oklch(24% 0.035 165)";

type SchedulingDialogProps = {
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

let SchedulingDialog: React.FC<SchedulingDialogProps>;
try {
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
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [timeFormat, setTimeFormat] = React.useState<"12h" | "24h">("12h");
    const [timezone, setTimezone] = React.useState(DEFAULT_TIMEZONE);
    const [timezoneSelectOpen, setTimezoneSelectOpen] = React.useState(false);
    const timezoneSelectedItemRef = React.useRef<HTMLDivElement>(null);
    const timezoneOptions = React.useMemo(() => getTimezoneOptions(), []);
    React.useEffect(() => {
      if (!timezoneSelectOpen) return;
      const id = requestAnimationFrame(() => {
        timezoneSelectedItemRef.current?.scrollIntoView({ block: "center" });
      });
      return () => cancelAnimationFrame(id);
    }, [timezoneSelectOpen]);

    const slots = React.useMemo(
      () => generateTimeSlots(timeFormat === "24h"),
      [timeFormat]
    );

    const [step, setStep] = React.useState<"time" | "details" | "confirm">("time");
    const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [notes, setNotes] = React.useState("");
    const [guests, setGuests] = React.useState<string[]>([]);

    const formatDateLong = (d: Date) =>
      d.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

    const formatTimeRange = (start: string) => {
      const idx = slots.indexOf(start);
      const end =
        idx >= 0 && idx < slots.length - 1 ? slots[idx + 1] : "3:00 PM";
      return `${start} - ${end}`;
    };

    const timezoneDisplayName =
      timezoneOptions.find((o) => o.value === timezone)?.displayName ??
      timezone.replace(/_/g, " ");

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          id="schedule-dialog"
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
            "max-lg:data-[state=closed]:slide-out-to-right max-lg:data-[state=open]:slide-in-from-right",
            "lg:data-[state=closed]:fade-out-0 lg:data-[state=open]:fade-in-0",
            "data-[state=closed]:duration-300 data-[state=open]:duration-500",
            "lg:data-[state=closed]:duration-150 lg:data-[state=open]:duration-200",
            "lg:inset-0 lg:flex lg:items-center lg:justify-center"
          )}
        >
          <DialogTitle className="sr-only">Schedule a meeting</DialogTitle>

          <DialogClose
            className="fixed right-4 top-4 z-[100] flex size-12 min-h-12 min-w-12 items-center justify-center rounded-full border-0 bg-transparent text-black dark:text-white color:text-white opacity-90 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0 scheduling-dialog-close lg:text-white"
            aria-label="Close"
          >
            <XIcon className="size-6 shrink-0 text-black dark:text-white color:text-white lg:text-white" />
          </DialogClose>

          {step === "confirm" ? (
            <div
              data-slot="scheduling-panel"
              data-step={step}
              data-theme={theme}
              className={cn(
                "dialog-frame-container relative flex flex-col w-full max-w-full lg:max-w-[560px] rounded-none lg:rounded-lg text-black",
                "max-h-[90vh] lg:max-h-[85vh]",
                "px-6 pt-6 pb-6 flex justify-center items-center",
                theme !== "light" && "shadow-lg",
                theme === "color" && "!bg-[oklch(24%_0.035_165)]"
              )}
              style={{
                backgroundColor: theme === "color" ? COLOR_THEME_BACKGROUND : "var(--background)",
              }}
            >
              <RightPanel
                date={date}
                setDate={setDate}
                timeFormat={timeFormat}
                setTimeFormat={setTimeFormat}
                slots={slots}
                timezone={timezone}
                theme={theme}
                step={step}
                setStep={setStep}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                notes={notes}
                setNotes={setNotes}
                guests={guests}
                setGuests={setGuests}
              />
            </div>
          ) : (
            <div
              data-slot="scheduling-panel"
              data-step={step}
              data-theme={theme}
              className={cn(
                "dialog-frame-container relative flex w-full max-w-full lg:max-w-[704px] flex-col rounded-none lg:rounded-lg text-black",
                "max-h-[90vh] lg:max-h-[85vh] min-h-screen lg:min-h-0 lg:h-fit",
                "pl-6 pr-[24px] pt-6 pb-6",
                theme !== "light" && "shadow-lg",
                theme === "color" && "!bg-[oklch(24%_0.035_165)]"
              )}
              style={
                theme === "color"
                  ? { backgroundColor: COLOR_THEME_BACKGROUND }
                  : { backgroundColor: "var(--background)" }
              }
            >
              <div className="flex min-h-0 flex-col gap-10 w-full lg:flex-row items-start lg:items-stretch lg:gap-[40px]">
                <div
                  data-slot="scheduling-left-panel"
                  className="flex h-auto min-h-0 min-w-0 shrink-0 flex-col w-full lg:w-[248px] pt-1"
                >
                  <Card className="scheduling-left-card flex flex-1 flex-col border-0 bg-transparent pt-0 pb-0 shadow-none scheduling-left-card-gap" style={{ backgroundColor: "oklch(92% 0.04 280)", gap: 0 }}>
                    <CardHeader className="scheduling-left-header gap-0 pb-0 px-0 pt-0" style={{ backgroundColor: "oklch(90% 0.05 300)" }}>
                      <div className="flex flex-col">
                        <CardTitle className="scheduling-left-title mt-0 shrink-0 text-subtitle1 font-medium">
                          Introduction Call
                        </CardTitle>
                        <span className="scheduling-left-name block text-subtitle2">
                          Michael Marchitto
                        </span>
                      </div>
                      <div className="scheduling-left-desc-and-datetime flex flex-col">
                        <p className="scheduling-left-desc text-body2 font-normal">
                          A 30-minute video call introduction to discuss potential opportunities.
                        </p>
                        {step !== "time" && date && selectedTime && (
                          <div className="scheduling-left-datetime flex flex-col gap-0 text-body2 font-normal">
                            <span className="scheduling-left-datetime-date w-fit" style={{ backgroundColor: "oklch(92% 0.08 140)" }}>{formatDateLong(date)}</span>
                            <span className="scheduling-left-datetime-time w-fit" style={{ backgroundColor: "oklch(92% 0.1 280)" }}>
                              {formatTimeRange(selectedTime)} ({timezoneDisplayName})
                            </span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="scheduling-left-details flex flex-col pt-0 px-0" style={{ backgroundColor: "oklch(91% 0.05 200)" }}>
                      <div className="scheduling-left-detail-row flex items-center gap-2 text-body2 transition-colors hover:text-accent">
                        <Clock className="h-4 w-4 shrink-0" />
                        <span>30 min</span>
                      </div>
                      <div className="scheduling-left-detail-row flex items-center gap-2 text-body2 transition-colors hover:text-accent">
                        <Video className="h-4 w-4 shrink-0" />
                        <span>Video Call</span>
                      </div>
                      <div className="scheduling-left-detail-row flex items-center gap-2 text-body2 transition-colors hover:text-accent">
                        <Select
                          value={timezone}
                          onValueChange={setTimezone}
                          open={timezoneSelectOpen}
                          onOpenChange={setTimezoneSelectOpen}
                        >
                          <SelectTrigger
                            data-slot="scheduling-timezone-trigger"
                            leftIcon={<Globe className="h-4 w-4 shrink-0" />}
                            className="h-auto min-h-0 w-full border-0 bg-transparent p-0 text-left text-body2 font-normal shadow-none focus:ring-0 focus:ring-offset-0 transition-colors hover:bg-transparent hover:text-accent [&>svg]:hover:text-accent"
                          >
                            <span className="min-w-0 text-left whitespace-nowrap font-normal">
                              {timezoneOptions.find((o) => o.value === timezone)?.displayName ??
                                timezone.replace(/_/g, " ")}
                            </span>
                          </SelectTrigger>
                          <SelectContent
                            side="bottom"
                            align="start"
                            data-slot="scheduling-timezone-content"
                            className="mt-2 max-h-[min(16rem,50vh)] overflow-y-auto py-0"
                          >
                            {timezoneOptions.map((opt) => (
                              <SelectItem
                                key={opt.value}
                                value={opt.value}
                                ref={opt.value === timezone ? timezoneSelectedItemRef : undefined}
                              >
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <RightPanel
                  date={date}
                  setDate={setDate}
                  timeFormat={timeFormat}
                  setTimeFormat={setTimeFormat}
                  slots={slots}
                  timezone={timezone}
                  theme={theme}
                  step={step}
                  setStep={setStep}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  notes={notes}
                  setNotes={setNotes}
                  guests={guests}
                  setGuests={setGuests}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  };
} catch (err) {
  console.error("🔥 MODULE ERROR in scheduling-dialog:", err);
  throw err;
}

export { SchedulingDialog };
