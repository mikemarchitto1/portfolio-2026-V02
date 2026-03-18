"use client";

import * as React from "react";

/** Exit (0.17s) + enter (0.22s) + small buffer */
const LOCK_DURATION_MS = 420;

export type StepHeightWrapperProps = {
  step: "select" | "details" | "confirm";
  children: React.ReactNode;
};

/**
 * Locks the wrapper height during step exit/enter so the container does not
 * collapse or expand until the new step has fully entered. Does not animate
 * height—only locks it.
 */
export function StepHeightWrapper({ step, children }: StepHeightWrapperProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const prevStepRef = React.useRef(step);
  const [lockedHeight, setLockedHeight] = React.useState<number | null>(null);
  const [isLocked, setIsLocked] = React.useState(false);

  React.useEffect(() => {
    if (prevStepRef.current === step) return;
    const prevStep = prevStepRef.current;
    prevStepRef.current = step;

    const el = wrapperRef.current;
    if (!el) return;

    const height = el.getBoundingClientRect().height;
    setLockedHeight(height);
    setIsLocked(true);

    const t = setTimeout(() => {
      setIsLocked(false);
      setLockedHeight(null);
    }, LOCK_DURATION_MS);
    return () => clearTimeout(t);
  }, [step]);

  const style: React.CSSProperties | undefined =
    isLocked && lockedHeight != null && lockedHeight > 0
      ? { height: lockedHeight, overflow: "hidden" }
      : undefined;

  return (
    <div ref={wrapperRef} style={style}>
      {children}
    </div>
  );
}
