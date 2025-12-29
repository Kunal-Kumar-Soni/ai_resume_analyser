"use client";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoLoaderProps = {
  text?: string;
  className?: string;
};

const LogoLoader = ({ text = "Loading...", className }: LogoLoaderProps) => {
  return (
    <div className={cn("flex flex-col justify-center items-center gap-6", className)}>
      <div className="relative flex justify-center items-center">
        <Loader2
          className="opacity-20 w-30 md:w-40 h-30 md:h-40 text-primary animate-spin"
          strokeWidth={1}
        />

        <Loader2
          className="absolute w-24 h-24 text-primary animate-[spin_1.5s_linear_infinite]"
          strokeWidth={2}
          style={{ clipPath: "inset(0 0 50% 0)" }}
        />

        <div className="absolute inset-0 flex justify-center items-center">
          <div className="flex justify-center items-center bg-background shadow-sm p-1 border rounded-full w-12 h-12 overflow-hidden animate-pulse">
            <div className="flex justify-center items-center bg-primary rounded-lg w-9 h-9 group-hover:scale-110 transition-transform">
              <span className="font-black text-white dark:text-black text-xl">R</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-center">
        <h3 className="font-semibold text-foreground/80 text-lg tracking-tight animate-pulse">
          {text}
        </h3>
        <p className="text-muted-foreground text-sm animate-bounce delay-100">
          Please wait a moment
        </p>
      </div>
    </div>
  );
};

// Full Page Wrapper
export const PageLoader = () => {
  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-background/95 backdrop-blur-sm min-h-screen">
      <LogoLoader />
    </div>
  );
};

export default PageLoader;
