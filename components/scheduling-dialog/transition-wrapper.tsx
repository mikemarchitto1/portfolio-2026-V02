"use client";

import * as React from "react";

export function TransitionWrapper({ children }: { children: React.ReactNode }) {
  return <div className="contents">{children}</div>;
}
