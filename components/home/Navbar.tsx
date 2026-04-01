"use client";
import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabaseClient";

import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { Button } from "../ui/button";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [imgError, setImgError] = useState(false);
  const avatarUrl =
    user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  const handleSignIn = () => {
    router.replace("/signin");
  };

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
    <nav className="bg-background/80 border-border/40 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between p-6">
        {/* Left: Logo (Footer se match kiya gaya) */}
        <div
          className="group flex cursor-pointer items-center gap-2"
          onClick={() => router.replace("/")}
        >
          <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-lg transition-transform group-hover:scale-110">
            <span className="text-xl font-black text-white dark:text-black">
              R
            </span>
          </div>
          <span className="text-2xl font-black tracking-tighter italic">
            Resume<span className="text-primary not-italic">.AI</span>
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <AnimatedThemeToggler duration={600} />

            <div className="bg-muted-foreground/30 dark:bg-muted-foreground/50 mx-1 block h-6 w-px sm:mx-2" />

            {user && !isLoading ? (
              <UserProfile />
            ) : (
              <Button
                title="sign in"
                onClick={handleSignIn}
                className="bg-primary hover:bg-primary/90 shadow-primary/20 rounded-xl px-6 font-bold text-white shadow-lg transition-all active:scale-95 dark:text-black"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
