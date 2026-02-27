"use client";

import * as React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { CalendarPanel } from "@/components/calendar-panel/calendar-panel";

type CalendarSheetProps = {
  trigger: React.ReactNode;
};

export function CalendarSheet({ trigger }: CalendarSheetProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Calendar</SheetTitle>
          <SheetDescription>
            Pick a date. This panel slides in from the right.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto pt-6 pb-4 px-4">
          <div className="min-w-0 overflow-hidden">
            <CalendarPanel
              selected={date}
              onSelect={setDate}
              defaultMonth={date}
              captionLayout="dropdown"
              className="w-full max-w-full min-w-0 rounded-lg border-0 bg-transparent p-0 shadow-none"
              calendarProps={{
                className: "w-full max-w-full min-w-0 rounded-lg bg-white pt-4",
                classNames: { nav: "top-4" },
              }}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
