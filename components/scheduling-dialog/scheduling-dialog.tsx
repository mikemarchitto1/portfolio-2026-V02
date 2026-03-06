"use client";

import * as React from "react";
import { Clock, Video, Globe, XIcon } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

const COLOR_THEME_BACKGROUND = "oklch(24% 0.035 165)";

type SchedulingDialogProps = { trigger: React.ReactNode };

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
          "rdp-day-button inline-flex items-center justify-center rounded-full transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none text-button text-foreground data-[outside=true]:bg-transparent data-[outside=true]:hover:bg-transparent color:data-[outside=true]:!text-white data-[selected-single=true]:text-white data-[range-middle=true]:text-foreground data-[range-start=true]:text-white data-[range-end=true]:text-white group-data-[focused=true]/day:border-0 group-data-[focused=true]/day:ring-0 flex aspect-square size-auto w-full min-w-(--cell-size) leading-none group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 data-[range-end=true]:rounded-full data-[range-end=true]:rounded-r-full data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-full data-[range-start=true]:rounded-l-full px-0 py-0",
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

  SchedulingDialog = function SchedulingDialog({ trigger }: SchedulingDialogProps) {
    const { theme } = useTheme();
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [timeFormat, setTimeFormat] = React.useState<"12h" | "24h">("12h");
    const slots = React.useMemo(
      () => generateTimeSlots(timeFormat === "24h"),
      [timeFormat]
    );

    const selectedLabel = date
      ? `${date.toLocaleDateString("en-US", { weekday: "short" })} ${date.getDate()}`
      : "Select a date";

    return (
    <Dialog>
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
          className="fixed right-4 top-4 z-[100] flex size-12 min-h-12 min-w-12 items-center justify-center rounded-full border-0 bg-transparent text-black dark:text-white color:text-white opacity-90 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0 scheduling-dialog-close lg:text-white"
          aria-label="Close"
        >
          <XIcon className="size-6 shrink-0 text-black dark:text-white color:text-white lg:text-white" />
        </DialogClose>

        {/* Main wrapper: same bg as page. Color mode uses literal value so it works in portal. */}
        <div
            data-slot="scheduling-panel"
            data-theme={theme}
            className={cn(
              "relative flex min-h-screen max-h-[90vh] lg:min-h-0 lg:h-fit lg:max-h-[85vh] w-full max-w-full lg:max-w-[868px] flex-col overflow-y-auto lg:overflow-x-visible lg:overflow-y-auto rounded-none lg:rounded-lg px-6 pt-6 pb-[64px] text-black",
              theme !== "light" && "shadow-lg",
              theme === "color" && "!bg-[oklch(24%_0.035_165)]"
            )}
            style={
              theme === "color"
                ? { backgroundColor: COLOR_THEME_BACKGROUND }
                : { backgroundColor: "var(--background)" }
            }
          >
            {/* Stack on mobile/tablet; three columns on desktop */}
            <div className="flex min-h-0 flex-none lg:flex-1 lg:min-h-0 lg:flex-row flex-col items-start lg:items-stretch gap-12">
              {/* Left column */}
              <div data-slot="scheduling-left-panel" className="flex h-auto min-h-0 min-w-0 shrink-0 flex-col text-white w-full lg:w-[168px] pt-1">
              <Card className="flex flex-1 flex-col gap-0 border-0 bg-transparent pt-0 pb-0 shadow-none text-white">
                <CardHeader className="scheduling-left-header mb-2 gap-0 space-y-0 pb-0 px-0 pt-0">
                  <div className="flex flex-col gap-5">
                    <CardTitle className="scheduling-left-title mt-0 shrink-0 text-subtitle1 font-medium text-white">
                      Introduction Call
                    </CardTitle>
                    <span className="scheduling-left-name block text-subtitle2 text-white/90">
                      Michael Marchitto
                    </span>
                  </div>
                  <p className="scheduling-left-desc mt-4 mb-4 text-body2 text-white/80">
                    30-minute introduction to discuss potential opportunities.
                  </p>
                </CardHeader>
                <CardContent className="scheduling-left-details flex flex-col gap-4 pt-0 px-0">
                  <div className="scheduling-left-detail-row flex items-center gap-2 text-body2 text-white/80">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span>30 min</span>
                  </div>
                  <div className="scheduling-left-detail-row flex items-center gap-2 text-body2 text-white/80">
                    <Video className="h-4 w-4 shrink-0" />
                    <span>Video Call</span>
                  </div>
                  <div className="scheduling-left-detail-row flex items-center gap-2 text-body2 text-white/80">
                    <Globe className="h-4 w-4 shrink-0" />
                    <span>America/New York</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Center column: calendar */}
            <div data-slot="scheduling-calendar-wrap" className="flex h-auto min-h-[280px] lg:min-h-0 min-w-0 w-full max-w-full lg:min-w-[384px] lg:max-w-[480px] flex-none lg:flex-1 flex-col bg-transparent overflow-visible">
              <div className="flex min-w-0 flex-1 flex-col overflow-visible pt-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  defaultMonth={date}
                  className="rounded-none border-0 p-0 [--cell-size:2.25rem] lg:[--cell-size:3rem]"
                  classNames={{
                    caption_label:
                      "select-none text-subtitle1 text-foreground leading-8 h-8 flex items-center",
                  }}
                  components={{ DayButton: SchedulingCalendarDayButton }}
                />
              </div>
            </div>

            {/* Right column */}
            <div className="flex h-auto min-h-0 min-w-0 shrink-0 flex-col pt-0 mt-1 lg:mt-0 w-full lg:w-[168px]">
              <div data-slot="scheduling-right-header" className="mb-4 flex items-center justify-between gap-2 rounded-none bg-transparent p-0">
                <span className="text-subtitle1 text-black dark:text-white color:text-white">{selectedLabel}</span>
                <Tabs value={timeFormat} onValueChange={(v) => setTimeFormat(v as "12h" | "24h")}>
                  <div
                    className="rounded-full h-8 overflow-hidden flex box-border w-fit bg-transparent"
                    data-slot="scheduling-toggle-wrap"
                  >
                    <TabsList
                      noBg
                      data-slot="scheduling-toggle"
                      className="scheduling-toggle-track h-8 w-full p-0 rounded-full border-0 shadow-none min-w-0 inline-flex flex-1 bg-transparent"
                    >
                      <TabsTrigger
                        value="12h"
                        className="text-button px-2.5 py-1 rounded-full transition-colors rounded-l-full"
                      >
                        12h
                      </TabsTrigger>
                      <TabsTrigger
                        value="24h"
                        className="text-button px-2.5 py-1 rounded-full transition-colors rounded-r-full"
                      >
                        24h
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </Tabs>
              </div>
              <span className="text-subtitle2 font-medium text-black dark:text-white color:text-white mb-5 shrink-0 block w-full text-center">Time Slot</span>
              <div className="flex flex-col overflow-y-auto min-w-0 flex-1 min-h-0 lg:max-h-[272px]" data-slot="scheduling-time-slots">
                <div className="flex flex-col gap-2 pt-0 pb-4 lg:pb-6">
                  {slots.map((slot) => (
                    <Button
                      key={slot}
                      variant="ghost"
                      data-slot="scheduling-time-slot-btn"
                      className={cn(
                        "w-full justify-center rounded-full !h-[48px] !min-h-[48px] py-3 text-button"
                      )}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
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
