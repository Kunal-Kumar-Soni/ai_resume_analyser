"use client";
import { HiDocumentText } from "react-icons/hi";
import { HiChevronDown } from "react-icons/hi";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Navbar = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/signin");
  };

  const handleSignout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (!error) {
      toast.success("Signed out successfully", {
        action: {
          label: "Cancel",
          onClick: () => console.log("Cancel"),
        },
      });
    }

    if (error) {
      toast.error(error?.message || "An error occurred", {
        action: {
          label: "Cancel",
          onClick: () => console.log("Cancel"),
        },
      });
      return;
    }
  };

  useEffect(() => {
    console.log("User:", user);
  }, [user, isLoading]);
  return (
    <nav className="bg-amber-50 rounded-t-md w-full">
      <div className="flex justify-between items-center mx-auto px-10 py-6 max-w-7xl">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-2">
          <HiDocumentText className="text-customBlue" size={32} />
          <span className="font-bold text-customBlue text-xl tracking-tight">ResumeAI</span>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          <button className="flex items-center gap-1 font-semibold text-sm transition-colors">
            Features
            <HiChevronDown className="mt-0.5 text-gray-500" size={16} />
          </button>
        </div>

        {/* Right: Auth Actions */}
        <div className="flex items-center gap-6">
          <div className="flex gap-1">
            {user && !isLoading ? (
              <span className="flex justify-center items-center bg-gray-200 rounded-full w-10 h-10">
                {user?.email?.[0]?.toUpperCase()}
              </span>
            ) : null}
            <button
              onClick={user ? handleSignout : handleSignIn}
              className="hover:opacity-95 font-semibold text-sm transition-opacity cursor-pointer"
            >
              {user ? "Sign Out" : "Sign In"}
            </button>
          </div>

          <Button className="bg-customBlue hover:bg-customBlueHover px-6 py-5 rounded-md font-semibold text-white text-sm transition-all">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
