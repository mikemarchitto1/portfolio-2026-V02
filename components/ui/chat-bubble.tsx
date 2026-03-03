"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ChatBubbleProps = React.ComponentProps<"div"> & {
  variant?: "default" | "sent" | "received";
};

function ChatBubble({
  className,
  variant = "received",
  ...props
}: ChatBubbleProps) {
  return (
    <div
      data-slot="chat-bubble"
      data-variant={variant}
      className={cn(
        "relative max-w-[85%] rounded-2xl border px-4 py-3 text-body2 border-[#525252] dark:border-[#404040] color:border-[#244836]",
        variant === "received" &&
          "rounded-bl-md bg-muted text-muted-foreground",
        variant === "sent" &&
          "ml-auto rounded-br-md bg-primary text-primary-foreground",
        variant === "default" && "bg-muted text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function ChatBubbleMessage({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="chat-bubble-message"
      className={cn("text-body2", className)}
      {...props}
    />
  );
}

export { ChatBubble, ChatBubbleMessage };
