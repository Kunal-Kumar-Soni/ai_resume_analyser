import { SignupForm } from "@/components/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-svh">
      <div className="flex flex-col gap-6 w-full max-w-lg">
        <SignupForm />
      </div>
    </div>
  );
}
