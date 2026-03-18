"use client";

import * as React from "react";

export type StepContainerProps = {
  step: "select" | "details" | "confirm";
  children: React.ReactNode;
};

export function StepContainer({ step, children }: StepContainerProps) {
  const isSelectOrDetails = step === "select" || step === "details";
  /** Fill row height (set by dialog) so no grow/shrink pop; overflow hidden for slide animation. */
  const style: React.CSSProperties | undefined =
    isSelectOrDetails
      ? { height: "100%", minHeight: 0, overflow: "hidden" }
      : undefined;

  return (
    <div style={style}>
      {children}
    </div>
  );
}
