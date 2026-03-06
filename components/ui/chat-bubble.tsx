"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ChatBubbleProps = React.ComponentProps<"div"> & {
  variant?: "default" | "sent" | "received";
};

function ChatBubble({
  className,
  variant = "received",
  children,
  ...rest
}: ChatBubbleProps) {
  return (
    <Card
      data-slot="chat-bubble"
      data-variant={variant}
      className={cn(
        "relative max-w-[85%] min-w-0 rounded-2xl border px-0 py-0 gap-0 border-[oklch(32%_0_0)] dark:border-[oklch(36%_0_0)] color:border-[oklch(32%_0.05_155)] shadow-none",
        variant === "received" &&
          "rounded-bl-md bg-muted text-muted-foreground",
        variant === "sent" &&
          "ml-auto rounded-br-md bg-primary text-primary-foreground",
        variant === "default" && "bg-muted text-muted-foreground",
        className
      )}
      {...rest}
    >
      <CardContent className="px-4 py-3 text-body2">
        {children}
      </CardContent>
    </Card>
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
