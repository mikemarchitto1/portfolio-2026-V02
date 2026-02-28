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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

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
        className="fixed left-[50%] top-[50%] z-50 w-max translate-x-[-50%] translate-y-[-50%] gap-0 border-0 bg-transparent p-0 shadow-none"
      >
        <DialogTitle className="sr-only">Schedule a meeting</DialogTitle>

        {/* Centered white panel with close button */}
        <div className="relative rounded-lg bg-white p-0 shadow-lg">
          <DialogClose
            className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            aria-label="Close"
          >
            <XIcon className="size-4" />
          </DialogClose>

          {/* Three-column flex row */}
          <div className="flex flex-row gap-6 p-6">
            {/* Left column: 280px × 490px */}
            <div className="flex h-[490px] w-[280px] flex-col">
              <Card className="flex flex-1 flex-col border-0 shadow-none">
                <CardHeader className="space-y-3 pb-2 px-0">
                  <Avatar className="h-8 w-8 rounded-full bg-pink-200">
                    <AvatarFallback className="bg-pink-200 text-pink-800 text-caption font-medium">
                      M
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-body2 text-muted-foreground">Michael Marchitto</span>
                  <CardTitle className="text-h6 font-semibold leading-tight text-foreground">
                    Introduction Call
                  </CardTitle>
                  <p className="text-body2 text-muted-foreground">
                    A 30-minute video introduction to discuss potential opportunities.
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 pt-0 px-0">
                  <div className="flex items-center gap-2 text-body2 text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span>30m</span>
                  </div>
                  <div className="flex items-center gap-2 text-body2 text-muted-foreground">
                    <Video className="h-4 w-4 shrink-0" />
                    <span>Cal Video</span>
                  </div>
                  <div className="flex items-center gap-2 text-body2 text-muted-foreground">
                    <Globe className="h-4 w-4 shrink-0" />
                    <span>America/New York</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Center column: 480px × 490px — Calendar */}
            <div className="flex h-[490px] w-[480px] items-center justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                defaultMonth={date}
                className="rounded-md border"
              />
            </div>

            {/* Right column: 280px × 490px — Time slots */}
            <div className="flex h-[490px] w-[280px] flex-col">
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-body1 font-semibold text-foreground">{selectedLabel}</span>
                <Tabs value={timeFormat} onValueChange={(v) => setTimeFormat(v as "12h" | "24h")}>
                  <TabsList className="h-8 p-0.5 bg-gray-100 rounded-lg">
                    <TabsTrigger
                      value="12h"
                      className="text-caption px-2.5 py-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
                    >
                      12h
                    </TabsTrigger>
                    <TabsTrigger
                      value="24h"
                      className="text-caption px-2.5 py-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
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
                      "w-full justify-center rounded-lg h-9 text-body2 font-normal bg-gray-100 border-0 hover:bg-gray-200 text-foreground"
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
