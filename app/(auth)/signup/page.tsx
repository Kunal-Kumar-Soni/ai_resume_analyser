import { Metadata } from "next";

import { SignupForm } from "@/components/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <SignupForm />
      </div>
    </div>
  );
}
