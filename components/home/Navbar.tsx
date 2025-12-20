"use client";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { LogOut } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [imgError, setImgError] = useState(false);
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

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
    <nav className="top-0 z-50 sticky bg-background/80 backdrop-blur-xl border-border/40 border-b w-full">
      <div className="flex justify-between items-center mx-auto p-6 max-w-7xl h-20">
        {/* Left: Logo (Footer se match kiya gaya) */}
        <div
          className="group flex items-center gap-2 cursor-pointer"
          onClick={() => router.replace("/")}
        >
          <div className="flex justify-center items-center bg-primary rounded-lg w-9 h-9 group-hover:scale-110 transition-transform">
            <span className="font-black text-white dark:text-black text-xl italic">R</span>
          </div>
          <span className="font-black text-2xl italic tracking-tighter">
            Resume<span className="text-primary not-italic">.AI</span>
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <AnimatedThemeToggler duration={600} />

            <div className="block bg-muted-foreground/30 dark:bg-muted-foreground/50 mx-1 sm:mx-2 w-px h-6" />

            {user && !isLoading ? (
              <UserProfile />
            ) : (
              <Button
                title="sign in"
                onClick={handleSignIn}
                className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 px-6 rounded-xl font-bold text-white dark:text-black active:scale-95 transition-all"
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
