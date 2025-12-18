"use client";
import { HiDocumentText } from "react-icons/hi";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/signin");
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
      toast.error(error?.message || "An error occurred");
    }
  };

  return (
    <nav className="top-0 z-50 sticky bg-background/80 backdrop-blur-xl border-border/40 border-b w-full">
      <div className="flex justify-between items-center mx-auto p-6 max-w-7xl h-20">
        {/* Left: Logo (Footer se match kiya gaya) */}
        <div
          className="group flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="flex justify-center items-center bg-primary rounded-lg w-9 h-9 group-hover:scale-110 transition-transform">
            <span className="font-black text-white dark:text-black text-xl italic">R</span>
          </div>
          <span className="font-black text-2xl tracking-tighter">
            Resume<span className="text-primary">AI</span>
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <AnimatedThemeToggler duration={600} />

            <div className="hidden sm:block mx-2 bg-border w-px h-6" />

            {user && !isLoading ? (
              <div className="flex items-center gap-4">
                {/* User Avatar Circle */}
                <div className="flex justify-center items-center bg-primary/10 shadow-sm border border-primary/20 rounded-full w-10 h-10 font-bold text-primary">
                  {user?.email?.[0]?.toUpperCase()}
                </div>

                <Button
                  variant="ghost"
                  onClick={handleSignout}
                  className="group flex items-center gap-2 hover:bg-destructive/5 px-4 rounded-xl h-10 font-bold text-muted-foreground hover:text-destructive text-sm transition-all duration-300"
                >
                  <span>Sign Out</span>
                  <LogOut className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            ) : (
              <Button
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
