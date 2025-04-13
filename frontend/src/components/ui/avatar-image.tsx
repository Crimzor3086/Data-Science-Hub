import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <img
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  )
)
AvatarImage.displayName = "AvatarImage"

export { AvatarImage } 