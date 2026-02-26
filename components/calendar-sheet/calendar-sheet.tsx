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
        <div className="flex-1 overflow-auto py-4">
          <CalendarPanel
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
            captionLayout="dropdown"
            className="border-0 p-0 shadow-none"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
