import { cn } from "@/lib/utils";

interface BackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export function Background({
  image,
  overlay = true,
  overlayOpacity = 0.7,
  className,
  children,
  ...props
}: BackgroundProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full bg-cover bg-center bg-no-repeat",
        className
      )}
      style={{
        backgroundImage: `url("${image}")`,
      }}
      {...props}
    >
      {overlay && (
        <div
          className="absolute inset-0 bg-black/50"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
} 