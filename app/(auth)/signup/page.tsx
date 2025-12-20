import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-svh">
      <div className="flex flex-col gap-6 w-full max-w-lg">
        <SignupForm />
      </div>
    </div>
  );
}
