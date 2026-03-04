"use client";

// Global runtime error trap
if (typeof window !== "undefined") {
  window.onerror = function (msg, src, line, col, err) {
    console.error("🔥 GLOBAL onerror:", { msg, src, line, col, err });
  };
  window.onunhandledrejection = function (event) {
    console.error("🔥 GLOBAL unhandledrejection:", event.reason);
  };
  console.log("🔥 Runtime debug active: global traps installed");
}

// Hydration watchdog
if (typeof requestAnimationFrame !== "undefined") {
  requestAnimationFrame(() => {
    console.log("🔥 Hydration watchdog: first animation frame reached");
  });
}

// First paint marker
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("🔥 DOMContentLoaded fired");
  });
}
