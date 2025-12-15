import { SigninForm } from "@/components/signin-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 bg-muted p-6 md:p-10 min-h-svh">
      <div className="flex flex-col gap-6 w-full max-w-sm">
        <SigninForm />
      </div>
    </div>
  );
}
