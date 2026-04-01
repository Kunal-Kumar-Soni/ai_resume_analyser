"use client";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

type LogoLoaderProps = {
  text?: string;
  className?: string;
};

const LogoLoader = ({ text = "Loading...", className }: LogoLoaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6",
        className,
      )}
    >
      <div className="relative flex items-center justify-center">
        <Loader2
          className="text-primary h-30 w-30 animate-spin opacity-20 md:h-40 md:w-40"
          strokeWidth={1}
        />

        <Loader2
          className="text-primary absolute h-24 w-24 animate-[spin_1.5s_linear_infinite]"
          strokeWidth={2}
          style={{ clipPath: "inset(0 0 50% 0)" }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-background flex h-12 w-12 animate-pulse items-center justify-center overflow-hidden rounded-full border p-1 shadow-sm">
            <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-lg transition-transform group-hover:scale-110">
              <span className="text-xl font-black text-white dark:text-black">
                R
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-center">
        <h3 className="text-foreground/80 animate-pulse text-lg font-semibold tracking-tight">
          {text}
        </h3>
        <p className="text-muted-foreground animate-bounce text-sm delay-100">
          Please wait a moment
        </p>
      </div>
    </div>
  );
};

// Full Page Wrapper
export const PageLoader = () => {
  return (
    <div className="bg-background/95 fixed inset-0 z-50 flex min-h-screen items-center justify-center backdrop-blur-sm">
      <LogoLoader />
    </div>
  );
};

export default PageLoader;
