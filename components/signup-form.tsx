"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";
import { supabaseClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const router = useRouter();

  //get error message from supabase auth error
  const getSignupErrorMessage = (error: any) => {
    const msg = error?.message?.toLowerCase() || "";

    if (msg.includes("already registered")) return "Email already registered";

    if (msg.includes("password")) return "Password is too weak";

    return "Unable to create account. Try again";
  };

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    if (formData?.password !== formData?.confirmPassword) {
      const toastId = toast.error("Passwords do not match", {
        action: {
          label: "Cancel",
          onClick: () => toast.dismiss(toastId),
        },
      });
      return;
    }

    const { error } = await supabaseClient.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      const toastId = toast.error(getSignupErrorMessage(error), {
        action: {
          label: "Cancel",
          onClick: () => toast.dismiss(toastId),
        },
      });
      return;
    }

    const toastId = toast.success("Account created successfully", {
      action: {
        label: "Cancel",
        onClick: () => toast.dismiss(toastId),
      },
    });

    router.push("/");
  };

  const onError = (errors: any) => {
    const toastId = toast.error(
      errors?.email?.message ||
        errors?.password?.message ||
        errors?.confirmPassword?.message ||
        "Validation errorconst toastId = ",
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
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
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
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", { required: "Email is required" })}
                />
              </Field>
              <Field>
                <Field className="gap-4 grid grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      {...register("password", {
                        required: true,
                        minLength: { value: 8, message: "Password must be at least 8 characters" },
                      })}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      {...register("confirmPassword", {
                        required: true,
                        minLength: {
                          value: 8,
                          message: "Confirm Password must be at least 8 characters",
                        },
                      })}
                      required
                    />
                  </Field>
                </Field>
                <FieldDescription>Must be at least 8 characters long.</FieldDescription>
              </Field>
              <Field>
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? <Spinner /> : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="signin">Sign in</Link>
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
