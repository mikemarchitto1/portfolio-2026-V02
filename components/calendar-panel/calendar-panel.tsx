"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

type CalendarPanelProps = {
  className?: string;
  /** Selected date (single mode) */
  selected?: Date | undefined;
  /** Called when a date is selected */
  onSelect?: (date: Date | undefined) => void;
  /** Initial month to show */
  defaultMonth?: Date;
  /** Use month/year dropdowns instead of arrows */
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
  /** Pass through to Calendar */
  mode?: "single" | "multiple" | "range";
  /** Disable specific dates */
  disabled?: React.ComponentProps<typeof Calendar>["disabled"];
  /** Min/max date */
  fromDate?: Date;
  toDate?: Date;
  /** Extra Calendar props */
  calendarProps?: Omit<
    React.ComponentProps<typeof Calendar>,
    "mode" | "selected" | "onSelect" | "defaultMonth" | "captionLayout" | "disabled" | "fromDate" | "toDate"
  >;
};

export function CalendarPanel({
  className,
  selected,
  onSelect,
  defaultMonth,
  captionLayout = "label",
  mode = "single",
  disabled,
  fromDate,
  toDate,
  calendarProps,
}: CalendarPanelProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-4 shadow-elevation",
        className
      )}
    >
      <Calendar
        mode={mode}
        selected={selected}
        onSelect={onSelect as (date: Date | Date[] | undefined) => void}
        defaultMonth={defaultMonth}
        captionLayout={captionLayout}
        disabled={disabled}
        fromDate={fromDate}
        toDate={toDate}
        {...calendarProps}
        className={cn(
          "rounded-lg border-0 bg-transparent p-0 [--cell-size:--spacing(8)]",
          calendarProps?.className
        )}
      />
    </div>
  );
}
