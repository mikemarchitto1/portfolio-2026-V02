"use client";

import * as React from "react";
import { motion } from "framer-motion";

const ENTER_TRANSITION = {
  duration: 0.22,
  ease: [0.16, 1, 0.3, 1] as const,
};

const EXIT_TRANSITION = {
  duration: 0.17,
  ease: [0.33, 0, 0.2, 1] as const,
};

const variantsVertical = {
  enter: {
    opacity: 0,
    y: 6,
    transition: ENTER_TRANSITION,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: ENTER_TRANSITION,
  },
  exit: {
    opacity: 0,
    y: -3,
    transition: EXIT_TRANSITION,
  },
};

const variantsHorizontal = {
  enter: {
    opacity: 0,
    x: 40,
    y: 0,
    transition: ENTER_TRANSITION,
  },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: ENTER_TRANSITION,
  },
  exit: {
    opacity: 0,
    x: -40,
    y: 0,
    transition: EXIT_TRANSITION,
  },
};

export function TransitionWrapper({
  children,
  mode = "vertical",
}: {
  children: React.ReactNode;
  mode?: "horizontal" | "vertical";
}) {
  const variants = mode === "horizontal" ? variantsHorizontal : variantsVertical;
  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="animate"
      exit="exit"
      style={{
        willChange: "transform, opacity",
        transform: "translateZ(0)",
      }}
    >
      {children}
    </motion.div>
  );
}
