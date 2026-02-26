"use client";

import * as React from "react";

/**
 * Returns a ref and a boolean that becomes true once when the element enters the viewport.
 * The observer disconnects after the first trigger so the animation never re-runs.
 */
export function useScrollTriggerOnce(
  options?: { rootMargin?: string; threshold?: number }
) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = React.useState(false);

  React.useEffect(() => {
    if (triggered) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: options?.rootMargin ?? "0px",
        threshold: options?.threshold ?? 0.1,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered, options?.rootMargin, options?.threshold]);

  return { ref, triggered };
}
