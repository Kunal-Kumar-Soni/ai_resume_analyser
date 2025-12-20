"use client";

import { useState } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";
import { supabaseClient } from "@/lib/supabaseClient";
import { toast } from "sonner";

export default function UserProfile() {
  const { user } = useAuth();
  const [imgError, setImgError] = useState(false);

  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

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
  console.log(user);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          key={user?.id}
          className="relative flex justify-center items-center bg-white/90 hover:bg-gray-50 dark:bg-white/10 dark:hover:bg-white/20 shadow-sm border border-gray-200 dark:border-white/10 rounded-full focus:ring-2 focus:ring-primary/20 w-10 h-10 overflow-hidden transition-all cursor-pointer shrink-0"
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
            <span className="font-bold text-primary text-sm">
              {user?.email?.[0]?.toUpperCase() || "U"}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="p-2 w-64" align="end" sideOffset={8}>
        {/* User Info Section */}
        <div className="px-3 py-2.5">
          <div className="flex justify-between items-center">
            <p className="font-medium text-muted-foreground text-xs">Account</p>

            {/* Email Verification Badge */}
            {isVerified ? (
              <span className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 border border-emerald-100 dark:border-emerald-500/20 rounded-full font-medium text-[10px] text-emerald-600 dark:text-emerald-400">
                <span className="bg-emerald-500 rounded-full w-1 h-1 animate-pulse" />
                Verified
              </span>
            ) : (
              <span className="bg-amber-50 dark:bg-amber-500/10 px-1.5 py-0.5 border border-amber-100 dark:border-amber-500/20 rounded-full font-medium text-[10px] text-amber-600 dark:text-amber-400">
                Unverified
              </span>
            )}
          </div>
          <p className="mt-1 font-medium text-zinc-900 dark:text-zinc-100 text-sm truncate">
            {user?.email}
          </p>
        </div>
        <div className="bg-zinc-100 dark:bg-zinc-800 my-1 h-px" />

        {/* Logout Button */}
        <button
          onClick={handleSignout}
          className="group flex items-center gap-2.5 hover:bg-zinc-100 dark:hover:bg-white/10 px-3 py-2 rounded-md w-full font-medium text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-50 dark:text-zinc-400 text-sm transition-all cursor-pointer"
        >
          <div className="flex justify-center items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 dark:group-hover:border-zinc-700 group-hover:border-zinc-300 rounded-md w-7 h-7 transition-all">
            <LogOut className="opacity-70 group-hover:opacity-100 w-3.5 h-3.5 transition-all group-hover:translate-x-0.5" />
          </div>
          <span>Sign out</span>
        </button>
      </PopoverContent>
    </Popover>
  );
}
