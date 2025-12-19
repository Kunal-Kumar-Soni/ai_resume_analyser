"use client";

import { Loader2Icon } from "lucide-react";
import { useTheme } from "next-themes";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { PiWarningCircleFill } from "react-icons/pi";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="group toaster"
      icons={{
        success: <FaCheckCircle className="size-5 text-green-500 dark:text-green-400" />,
        info: <FaInfoCircle className="size-5 text-sky-600 dark:text-sky-500" />,
        warning: <PiWarningCircleFill className="size-5 text-amber-500 dark:text-amber-400" />,
        error: <IoIosCloseCircle className="size-5 text-red-500" />,
        loading: <Loader2Icon className="size-5 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
