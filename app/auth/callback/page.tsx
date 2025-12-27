"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/ui/custom-animated-loader";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return <PageLoader />;
}
