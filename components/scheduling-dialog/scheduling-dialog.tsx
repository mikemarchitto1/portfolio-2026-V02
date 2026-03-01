"use client";

import * as React from "react";
import { Clock, Video, Globe, XIcon } from "lucide-react";
import { getDefaultClassNames } from "react-day-picker";
import type { DayButton } from "react-day-picker";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

/** Day button for scheduling calendar: same text style/size as time slot buttons (14px, 500) */
const dayButtonTextStyle = { fontSize: "14px", lineHeight: "20px", fontWeight: 500 as const };

function SchedulingCalendarDayButton({
  className,
  day,
  modifiers,
  children,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();
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
        "rdp-day-button inline-flex items-center justify-center gap-2 rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none text-button bg-gray-100 text-foreground hover:bg-gray-200 data-[outside=true]:bg-transparent data-[outside=true]:text-muted-foreground data-[outside=true]:hover:bg-transparent data-[selected-single=true]:bg-[#1e3d2e] data-[selected-single=true]:text-white data-[selected-single=true]:hover:bg-[#2d5a45] data-[range-middle=true]:bg-gray-100 data-[range-middle=true]:text-foreground data-[range-start=true]:bg-[#1e3d2e] data-[range-start=true]:text-white data-[range-end=true]:bg-[#1e3d2e] data-[range-end=true]:text-white group-data-[focused=true]/day:border-0 group-data-[focused=true]/day:ring-0 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md px-0 py-0",
        defaultClassNames.day,
        className
      )}
      {...props}
    >
      <span
        style={{
          ...dayButtonTextStyle,
          color: modifiers.selected ? "#fff" : undefined,
        }}
        className={cn("block text-center", modifiers.selected && "!text-white")}
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

export function SchedulingDialog({ trigger }: SchedulingDialogProps) {
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
          className="fixed right-4 top-4 z-[100] rounded-full border border-white/20 bg-white/90 p-2 text-neutral-800 shadow-lg backdrop-blur-sm opacity-90 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          aria-label="Close"
        >
          <XIcon className="size-4" />
        </DialogClose>

        {/* Main wrapper: overflow-hidden so center borders stay flush with edges */}
        <div
          data-slot="scheduling-panel"
          className="relative flex h-[514px] min-w-[1136px] flex-col overflow-hidden rounded-lg bg-white p-0 shadow-lg text-black"
        >
          {/* Three-column row: no top padding so center borders start at top; padding is inside each panel */}
          <div className="flex h-full flex-row items-stretch gap-6 px-6 py-0">
            {/* Left column: same width as right, 32px top padding inside */}
            <div data-slot="scheduling-left-panel" className="flex h-full min-h-[490px] min-w-[280px] flex-1 flex-col">
              <Card className="flex flex-1 flex-col border-0 bg-transparent pt-6 shadow-none text-white">
                <CardHeader className="gap-0 space-y-0 pb-2 px-0 pt-0">
                  <Avatar className="mb-0 h-8 w-8 rounded-full bg-[#1e3d2e]">
                    <AvatarFallback className="bg-[#1e3d2e] text-white text-caption font-medium">
                      M
                    </AvatarFallback>
                  </Avatar>
                  <span className="mt-4 block text-body2 text-white/90">Michael Marchitto</span>
                  <CardTitle className="mt-3 text-h6 font-semibold leading-tight text-white">
                    Introduction Call
                  </CardTitle>
                  <p className="mt-3 text-body2 text-white/80">
                    A 30-minute video introduction to discuss potential opportunities.
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 pt-0 px-0">
                  <div className="flex items-center gap-2 text-body2 text-white/80">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span>30m</span>
                  </div>
                  <div className="flex items-center gap-2 text-body2 text-white/80">
                    <Video className="h-4 w-4 shrink-0" />
                    <span>Cal Video</span>
                  </div>
                  <div className="flex items-center gap-2 text-body2 text-white/80">
                    <Globe className="h-4 w-4 shrink-0" />
                    <span>America/New York</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Center column: fixed width; borders flush top/bottom; 32px top padding on content only */}
            <div data-slot="scheduling-calendar-wrap" className="flex h-full min-h-[490px] w-[480px] shrink-0 flex-col border-l border-r border-[#1a3d2e] bg-transparent px-6">
              <div className="flex flex-1 flex-col pt-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  defaultMonth={date}
                  className="rounded-none border-0 p-0"
                  components={{ DayButton: SchedulingCalendarDayButton }}
                />
              </div>
            </div>

            {/* Right column: same width as left, 32px top padding inside */}
            <div className="flex h-full min-h-[490px] min-w-[280px] flex-1 flex-col pt-6">
              <div data-slot="scheduling-right-header" className="mb-5 flex items-center justify-between gap-2 rounded-none bg-transparent p-0 text-white">
                <span className="text-body1 font-semibold text-white">{selectedLabel}</span>
                <Tabs value={timeFormat} onValueChange={(v) => setTimeFormat(v as "12h" | "24h")}>
                  <TabsList className="h-8 p-0.5 bg-[#1e3d2e] rounded-lg">
                    <TabsTrigger
                      value="12h"
                      className="text-button px-2.5 py-1 text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm rounded-md"
                    >
                      12h
                    </TabsTrigger>
                    <TabsTrigger
                      value="24h"
                      className="text-button px-2.5 py-1 text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm rounded-md"
                    >
                      24h
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex flex-col gap-1.5 overflow-y-auto">
                {slots.map((slot) => (
                  <Button
                    key={slot}
                    variant="outline"
                    className={cn(
                      "w-full justify-center rounded-md h-12 text-button bg-gray-100 border-0 hover:bg-gray-200 text-foreground"
                    )}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
