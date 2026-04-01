"use client";

import { useState } from "react";

import Image from "next/image";

import { LogOut } from "lucide-react";
import { toast } from "sonner";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabaseClient";

export default function UserProfile() {
  const { user } = useAuth();
  const [imgError, setImgError] = useState(false);

  const avatarUrl =
    user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  const isSocialLogin = user?.app_metadata?.provider !== "email";
  const isVerified = user?.email_confirmed_at && isSocialLogin;

  const handleSignout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (!error) {
      const toastId = toast.success("Signed out successfully", {
        action: {
          label: "Cancel",
          onClick: () => toast.dismiss(toastId),
        },
      });
    } else {
      const toastId = toast.error("Logout failed. Please try again.", {
        action: {
          label: "Cancel",
          onClick: () => toast.dismiss(toastId),
        },
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          key={user?.id}
          className="focus:ring-primary/20 relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white/90 shadow-sm transition-all hover:bg-gray-50 focus:ring-2 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
        >
          {avatarUrl && !imgError ? (
            <Image
              src={avatarUrl}
              alt="Profile"
              fill
              sizes="40px"
              className="object-cover"
              priority
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-primary text-sm font-bold">
              {user?.email?.[0]?.toUpperCase() || "U"}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-2" align="end" sideOffset={8}>
        {/* User Info Section */}
        <div className="px-3 py-2.5">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-xs font-medium">Account</p>

            {/* Email Verification Badge */}
            {isVerified ? (
              <span className="flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
                Verified
              </span>
            ) : (
              <span className="rounded-full border border-amber-100 bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
                Unverified
              </span>
            )}
          </div>
          <p className="mt-1 truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {user?.email}
          </p>
        </div>
        <div className="my-1 h-px bg-zinc-100 dark:bg-zinc-800" />

        {/* Logout Button */}
        <button
          onClick={handleSignout}
          className="group flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-50"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 transition-all group-hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:group-hover:border-zinc-700">
            <LogOut className="h-3.5 w-3.5 opacity-70 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
          </div>
          <span>Sign out</span>
        </button>
      </PopoverContent>
    </Popover>
  );
}
