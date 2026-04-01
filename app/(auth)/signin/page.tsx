import { Metadata } from "next";

import { SigninForm } from "@/components/signin-form";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SigninPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <SigninForm />
      </div>
    </div>
  );
}
