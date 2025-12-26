import { SigninForm } from "@/components/signin-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SigninPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-svh">
      <div className="flex flex-col gap-6 w-full max-w-lg">
        <SigninForm />
      </div>
    </div>
  );
}
