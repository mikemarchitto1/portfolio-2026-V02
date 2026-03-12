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
import { Button } from "@/components/ui/button";
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

type SchedulingDialogProps = {
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

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

const SchedulingDialog: React.FC<SchedulingDialogProps> = ({
  trigger,
  open,
  onOpenChange,
}) => {
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
        overlayClassName="scheduling-dialog-overlay !bg-foreground/50"
        className={cn(
          // mobile: full-height drawer from right
          "fixed inset-y-0 right-0 w-full gap-0",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "max-lg:data-[state=closed]:slide-out-to-right max-lg:data-[state=open]:slide-in-from-right",
          "data-[state=closed]:duration-300 data-[state=open]:duration-500",

          // desktop: fixed overlay, center inner panel
          "lg:inset-0 lg:flex lg:items-center lg:justify-center lg:p-0 lg:m-0",
          "lg:data-[state=closed]:duration-150 lg:data-[state=open]:duration-200"
        )}
      >
        <DialogTitle className="sr-only">Schedule a meeting</DialogTitle>

        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-button fixed right-4 top-4 z-[100] size-12 min-h-12 min-w-12 rounded-full scheduling-dialog-close"
            aria-label="Close"
          >
            <XIcon className="size-6 shrink-0" />
          </Button>
        </DialogClose>

        {step === "confirm" ? (
          // CONFIRMATION SCREEN — narrow, centered, hugged, 24px padding
          <div
            data-slot="scheduling-panel"
            data-step={step}
            data-theme={theme}
            className={cn(
              "mx-auto w-full lg:w-fit lg:max-w-[640px] p-6 bg-background",
              "dialog-frame-container relative rounded-none lg:rounded-lg text-foreground",
              theme !== "light" && "shadow-lg"
            )}
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
          // SCHEDULING SCREEN — wide, centered, hugged, 24px padding
          <div
            data-slot="scheduling-panel"
            data-step={step}
            data-theme={theme}
            className={cn(
              "mx-auto w-full lg:w-fit lg:max-w-[1228px] p-6 bg-background",
              "dialog-frame-container relative rounded-none lg:rounded-lg text-foreground",
              theme !== "light" && "shadow-lg"
            )}
          >
            <div
              className={cn(
                "flex min-h-0 flex-col gap-10 w-full items-start",
                step === "time" &&
                  "scheduling-three-panel-layout lg:flex-row lg:w-fit lg:min-w-[908px] lg:max-w-full lg:items-start lg:gap-[40px]",
                step === "details" &&
                  "scheduling-two-panel-layout lg:flex-row lg:w-fit lg:max-w-full lg:items-start lg:gap-[40px]"
              )}
              data-layout={step === "time" ? "three-panel" : "two-panel"}
            >
              <div
                data-slot="scheduling-left-panel"
                className="flex h-auto min-h-0 min-w-0 shrink-0 flex-col w-full lg:w-[248px] pt-1"
              >
                <Card className="scheduling-left-card flex flex-col gap-0 border-0 bg-transparent pt-0 pb-0 shadow-none scheduling-left-card-gap">
                  <CardHeader className="scheduling-left-header gap-0 pb-0 px-0 pt-0">
                    <div className="flex flex-col">
                      <CardTitle className="scheduling-left-title shrink-0 text-subtitle1 font-medium m-0">
                        Introduction Call
                      </CardTitle>
                      <span className="scheduling-left-name block text-subtitle2 m-0">
                        Michael Marchitto
                      </span>
                    </div>
                    <div className="scheduling-left-desc-and-datetime flex flex-col gap-0">
                      <p className="scheduling-left-desc text-body2 font-normal m-0">
                        A 30-minute video call introduction to discuss potential opportunities.
                      </p>
                      {step !== "time" && date && selectedTime && (
                        <div className="scheduling-left-datetime flex flex-col gap-0 text-body2 font-normal">
                          <span className="scheduling-left-datetime-date w-fit m-0">
                            {formatDateLong(date)}
                          </span>
                          <span className="scheduling-left-datetime-time w-fit m-0">
                            {formatTimeRange(selectedTime)} ({timezoneDisplayName})
                          </span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="scheduling-left-details flex flex-col gap-4 pt-0 px-0">
                    <div className="scheduling-left-detail-row flex items-center gap-2 text-body2 transition-colors hover:text-accent">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span className="m-0">30 min</span>
                    </div>
                    <div className="scheduling-left-detail-row flex items-center gap-2 text-body2 transition-colors hover:text-accent">
                      <Video className="h-4 w-4 shrink-0" />
                      <span className="m-0">Video Call</span>
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
                          <span className="min-w-0 text-left whitespace-nowrap font-normal m-0">
                            {timezoneDisplayName}
                          </span>
                        </SelectTrigger>
                        <SelectContent
                          side="bottom"
                          align="start"
                          data-slot="scheduling-timezone-content"
                          className="max-h-[min(16rem,50vh)] overflow-y-auto py-0"
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

export { SchedulingDialog };
