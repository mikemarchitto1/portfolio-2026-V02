import { cn } from "@/lib/utils"

type ContainerProps = React.ComponentProps<"div"> & {
  variant?: "default" | "wide" | "narrow"
}

export function Container({ className, variant = "default", ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        variant === "wide" && "w-full max-w-[1328px] mx-auto",
        variant === "narrow" && "w-full max-w-[640px] mx-auto",
        variant === "default" && "w-full mx-auto",
        className
      )}
      {...props}
    />
  )
}
