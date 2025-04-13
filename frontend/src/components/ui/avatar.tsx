import * as React from "react"
import { cn } from "@/lib/utils"
import { AvatarImage } from "./avatar-image"
import { AvatarFallback } from "./avatar-fallback"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: React.ReactNode
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      {src ? (
        <AvatarImage src={src} alt={alt || ""} />
      ) : fallback ? (
        <AvatarFallback>{fallback}</AvatarFallback>
      ) : null}
    </div>
  )
)
Avatar.displayName = "Avatar"

export { Avatar }
