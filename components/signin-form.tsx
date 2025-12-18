"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";
import { supabaseClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
};

export function SigninForm({ className, ...props }: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const router = useRouter();

  //get error message from supabase auth error
  const getAuthErrorMessage = (error: any) => {
    if (!error) return "Something went wrong. Please try again.";

    const message = error.message?.toLowerCase() || "";

    if (message.includes("invalid login credentials")) return "Invalid email or password";

    if (message.includes("email not confirmed")) return "Please verify your email first";

    if (message.includes("too many requests")) return "Too many attempts. Try again later";

    if (error.status === 429) return "Too many attempts. Try again later";

    return "Login failed. Please try again.";
  };

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      const toastId = toast.error(getAuthErrorMessage(error), {
        action: {
          label: "Cancel",
          onClick: () => toast.dismiss(toastId),
        },
      });
      return;
    }

    const toastId = toast.success("Login successfully", {
      action: {
        label: "Cancel",
        onClick: () => toast.dismiss(toastId),
      },
    });

    router.push("/");
  };

  const onError = (errors: any) => {
    const toastId = toast.error(
      errors?.email?.message || errors?.password?.message || "Validation error",
      {
        action: {
          label: "Cancel",
          onClick: () => toast.dismiss(toastId),
        },
      }
    );
  };

  const handleGoogleSignup = async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({ provider: "google" });
    if (error) {
      const toastId = toast.error("Google login failed", {
        action: {
          label: "Cancel",
          onClick: () => toast.dismiss(toastId),
        },
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <FieldGroup>
              <Field>
                <Button onClick={handleGoogleSignup} variant="outline" type="button">
                  <FcGoogle />
                  Login with Google
                </Button>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="flex-1 bg-border h-px" />
                  or continue with
                  <span className="flex-1 bg-border h-px" />
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register("email", { required: "Email is required" })}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                  })}
                  id="password"
                  type="password"
                />
              </Field>
              <Field>
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? <Spinner /> : "Sign In"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
