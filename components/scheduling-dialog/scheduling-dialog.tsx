"use client";

import * as React from "react";
import {
  Clock,
  Video,
  Globe,
  ChevronDown,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarPanel } from "@/components/calendar-panel/calendar-panel";
import { cn } from "@/lib/utils";

function generateTimeSlots(use24h: boolean): string[] {
  const slots: string[] = [];
  // 12:00pm through 4:30pm in 30-min steps
  for (let h = 12; h <= 16; h++) {
    for (const m of [0, 30]) {
      if (h === 16 && m === 30) break;
      if (use24h) {
        const hour24 = h === 12 ? 12 : h > 12 ? h : h;
        slots.push(`${hour24.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
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
    ? date.toLocaleDateString("en-US", { weekday: "short" }) +
      " " +
      date.getDate()
    : "Select a date";

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        showCloseButton={true}
        className="max-w-[900px] w-[95vw] p-0 gap-0 overflow-hidden rounded-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 min-h-[420px]">
          {/* Left: Scheduling content panel */}
          <Card className="rounded-none border-0 border-r border-border shadow-none bg-card px-5 py-5 gap-4">
            <CardHeader className="space-y-3 pb-2 px-0">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 rounded-full bg-pink-200">
                  <AvatarFallback className="bg-pink-200 text-pink-800 text-lg font-medium">
                    M
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">Michael Marchitto</span>
              </div>
              <CardTitle className="text-lg font-semibold leading-tight">
                Introduction Call
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                A 30-minute video introduction to discuss potential opportunities.
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pt-0 px-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" />
                <span>30m</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Video className="h-4 w-4 shrink-0" />
                <span>Cal Video</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4 shrink-0" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto py-1 px-2 -ml-2 gap-1 font-normal text-muted-foreground hover:text-foreground"
                >
                  America/New York
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Middle: Calendar */}
          <div className="flex flex-col min-w-0 bg-background p-4 border-r border-border">
            <CalendarPanel
              selected={date}
              onSelect={setDate}
              defaultMonth={date}
              captionLayout="dropdown"
              className="border-0 shadow-none bg-transparent p-0 rounded-lg"
              calendarProps={{
                className: "w-full rounded-lg bg-transparent",
                classNames: { nav: "top-4" },
              }}
            />
          </div>

          {/* Right: Time slots */}
          <div className="flex flex-col min-w-0 bg-background p-4">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="font-medium text-foreground">{selectedLabel}</span>
              <Tabs
                value={timeFormat}
                onValueChange={(v) => setTimeFormat(v as "12h" | "24h")}
              >
                <TabsList className="h-8 p-0.5">
                  <TabsTrigger value="12h" className="text-xs px-2.5 py-1">
                    12h
                  </TabsTrigger>
                  <TabsTrigger value="24h" className="text-xs px-2.5 py-1">
                    24h
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[320px] min-h-[200px]">
              {slots.map((slot) => (
                <Button
                  key={slot}
                  variant="outline"
                  className={cn(
                    "w-full justify-center rounded-lg font-normal h-9 text-sm"
                  )}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
