import { SigninForm } from "@/components/signin-form";

export default function SigninPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 md:p-10 min-h-svh">
      <div className="flex flex-col gap-6 w-full max-w-lg">
        <SigninForm />
      </div>
    </div>
  );
}
