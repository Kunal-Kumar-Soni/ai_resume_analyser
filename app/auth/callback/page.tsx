"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabaseClient";
import PageLoader from "@/components/ui/custom-animated-loader";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabaseClient.auth.getSession();
        if (error) {
          console.error("Error getting session:", error);
          router.push("/signin");
          return;
        }
        if (data.session) {
          router.push("/");
        } else {
          router.push("/signin");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        router.push("/signin");
      }
    };

    handleAuthCallback();
  }, [router]);

  return <PageLoader />;
}
