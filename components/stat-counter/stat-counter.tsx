"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

const DURATION_MS = 1000;
const EASE_OUT_CUBIC = (t: number) => 1 - Math.pow(1 - t, 3);

type StatCounterProps = {
  value: number;
  label: string;
  /** When true, run the slot-machine animation once. Typically from a scroll trigger. */
  startAnimation: boolean;
};

export function StatCounter({ value, label, startAnimation }: StatCounterProps) {
  const [displayValue, setDisplayValue] = React.useState(0);
  const hasAnimatedRef = React.useRef(false);
  const rafRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (!startAnimation || hasAnimatedRef.current || value === 0) {
      if (value === 0) setDisplayValue(0);
      return () => {};
    }
    hasAnimatedRef.current = true;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / DURATION_MS);
      const eased = EASE_OUT_CUBIC(progress);
      const next = Math.round(eased * value);
      setDisplayValue(next);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayValue(value);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startAnimation, value]);

  const isTen = value === 10;

  return (
    <Card className="w-full h-full min-h-0 flex flex-col items-center justify-center text-center pt-10 px-12 pb-12 rounded-2xl shadow-elevation bg-white text-foreground dark:text-black color:text-black border-0 gap-0">
      <CardContent className="p-0 flex flex-col items-center justify-center text-center flex-1">
        <div className="text-h5 md:text-h1 font-light -mb-1 !py-0 text-foreground dark:text-black color:text-black">
          {isTen ? (
            <span className="tracking-[-0.04em]">{displayValue}</span>
          ) : (
            displayValue
          )}
        </div>
        <div className="text-body1 md:text-h5 font-normal text-foreground dark:text-black color:text-black">
          {label}
        </div>
      </CardContent>
    </Card>
  );
}
