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

/** Day button for scheduling calendar: same text style/size as time slot buttons (14px, 500) */
const dayButtonTextStyle = { fontSize: "14px", lineHeight: "20px", fontWeight: 500 as const };

function SchedulingCalendarDayButton({
  className,
  day,
  modifiers,
  children,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

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
      style={dayButtonTextStyle}
      className={cn(
        "rdp-day-button inline-flex items-center justify-center rounded-full transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none text-button text-foreground data-[outside=true]:bg-transparent data-[outside=true]:hover:bg-transparent data-[selected-single=true]:text-white data-[range-middle=true]:text-foreground data-[range-start=true]:text-white data-[range-end=true]:text-white group-data-[focused=true]/day:border-0 group-data-[focused=true]/day:ring-0 flex aspect-square size-auto w-full min-w-(--cell-size) leading-none group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 data-[range-end=true]:rounded-full data-[range-end=true]:rounded-r-full data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-full data-[range-start=true]:rounded-l-full px-0 py-0",
        /* omit defaultClassNames.day to avoid library default background on unselected cells */
        className
      )}
      {...props}
    >
      <span
        style={{
          ...dayButtonTextStyle,
          /* selected and outside date colors are controlled by CSS per mode */
          color: undefined,
        }}
        className="flex min-h-0 min-w-0 flex-1 items-center justify-center text-center"
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

type SchedulingDialogProps = {
  trigger: React.ReactNode;
};

const TOGGLE_TRACK_BG = {
  light: "#F2F4F6",  /* same grey as time slot & calendar grid buttons */
  dark: "#fff",   /* dark mode: track white, switch (active pill) black via CSS */
  color: "#1e3d2e",
} as const;

export function SchedulingDialog({ trigger }: SchedulingDialogProps) {
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
        overlayClassName="bg-[#0a1d14]/50"
        className="gap-0"
      >
        <DialogTitle className="sr-only">Schedule a meeting</DialogTitle>

        {/* Close button: fixed top-right of viewport, above overlay */}
        <DialogClose
          className="fixed right-4 top-4 z-[100] flex size-12 min-h-12 min-w-12 items-center justify-center rounded-full border-0 bg-transparent text-white opacity-90 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0 scheduling-dialog-close"
          aria-label="Close"
        >
          <XIcon className="size-6 shrink-0 text-white" />
        </DialogClose>

        {/* Main wrapper: overflow-hidden so center borders stay flush with edges */}
        <div
          data-slot="scheduling-panel"
          data-theme={theme}
          className="relative flex h-[514px] min-w-[1136px] flex-col overflow-hidden rounded-lg bg-white p-0 shadow-lg text-black"
        >
          {/* Three-column row: no top padding so center borders start at top; padding is inside each panel */}
          <div className="flex h-full flex-row items-stretch gap-6 px-6 py-0">
            {/* Left column: same width as right, 32px top padding inside */}
            <div data-slot="scheduling-left-panel" className="flex h-full min-h-[490px] min-w-[280px] flex-1 flex-col text-white">
              <Card className="flex flex-1 flex-col gap-0 border-0 bg-transparent pt-6 shadow-none text-white">
                <CardHeader className="scheduling-left-header mb-6 gap-0 space-y-0 pb-0 px-0 pt-0">
                  <CardTitle className="scheduling-left-title mt-0 h-8 min-h-8 shrink-0 text-subtitle1 font-semibold leading-8 text-white">
                    Introduction Call
                  </CardTitle>
                  <span className="scheduling-left-name block text-subtitle2 text-white/90" style={{ marginTop: 16 }}>
                    Michael Marchitto
                  </span>
                  <p className="scheduling-left-desc mt-4 mb-0 text-body2 text-white/80">
                    A 30-minute video introduction to discuss potential opportunities.
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

            {/* Center column: fixed width; borders flush top/bottom; 32px top padding on content only */}
            <div data-slot="scheduling-calendar-wrap" className="flex h-full min-h-0 min-w-0 max-w-[480px] w-[480px] shrink-0 flex-col border-l border-r border-[#E5E7EB] bg-transparent px-6 overflow-hidden">
              <div className="flex min-w-0 flex-1 flex-col overflow-hidden pt-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  defaultMonth={date}
                  className="rounded-none border-0 p-0"
                  classNames={{
                    caption_label:
                      "select-none text-subtitle1 text-foreground leading-8 h-8 flex items-center",
                  }}
                  components={{ DayButton: SchedulingCalendarDayButton }}
                />
              </div>
            </div>

            {/* Right column: 24px top padding; 24px bottom so time-slot scroll area ends 24px from main container bottom (buttons clip at that line) */}
            <div className="flex h-full min-h-[490px] min-w-[280px] flex-1 flex-col pt-6 pb-6">
              <div data-slot="scheduling-right-header" className="mb-5 flex items-center justify-between gap-2 rounded-none bg-transparent p-0 text-white">
                <span className="text-subtitle1 text-white">{selectedLabel}</span>
                <Tabs value={timeFormat} onValueChange={(v) => setTimeFormat(v as "12h" | "24h")}>
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `[data-slot="scheduling-toggle-wrap"]{background-color:${TOGGLE_TRACK_BG[theme]} !important;}[data-slot="scheduling-toggle-wrap"] [role="tablist"]{background-color:${TOGGLE_TRACK_BG[theme]} !important;background:${TOGGLE_TRACK_BG[theme]} !important;}`,
                    }}
                  />
                  <div
                    className="rounded-full h-8 overflow-hidden flex box-border w-fit"
                    style={{ backgroundColor: TOGGLE_TRACK_BG[theme] }}
                    data-slot="scheduling-toggle-wrap"
                  >
                    <TabsList
                      noBg
                      data-slot="scheduling-toggle"
                      className="scheduling-toggle-track h-full w-full p-0 rounded-full border-0 shadow-none min-w-0 inline-flex flex-1"
                      style={{ backgroundColor: TOGGLE_TRACK_BG[theme] }}
                    >
                      <TabsTrigger
                      value="12h"
                      className="text-button px-2.5 py-1 text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-none rounded-full"
                    >
                      12h
                    </TabsTrigger>
                    <TabsTrigger
                      value="24h"
                      className="text-button px-2.5 py-1 text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-none rounded-full"
                    >
                      24h
                    </TabsTrigger>
                    </TabsList>
                  </div>
                </Tabs>
              </div>
              <div className="flex flex-col overflow-y-auto" data-slot="scheduling-time-slots">
                <div className="flex flex-col gap-2 pt-0 px-6 pb-6">
                  {slots.map((slot) => (
                    <Button
                      key={slot}
                      variant="ghost"
                      data-slot="scheduling-time-slot-btn"
                      className={cn(
                        "w-full justify-center rounded-full h-12 text-button bg-gray-100 border text-foreground hover:bg-gray-200"
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
}
