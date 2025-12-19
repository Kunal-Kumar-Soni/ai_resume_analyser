"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { SpinnerCustom } from "./ui/spinner";
import { toast } from "sonner";
import { supabaseClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import PageLoader from "./ui/custom-animated-loader";

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

  const { user, isLoading } = useAuth();
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

  useEffect(() => {
    if (user && !isLoading) {
      router.replace("/");
    }
  }, [user]);

  //for loading purpose
  if (isLoading) {
    return <PageLoader />;
  }
  if (user) {
    return <PageLoader />;
  }

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center my-6 md:my-0 px-4 sm:px-6 lg:px-8 w-full min-h-full",
        className
      )}
      {...props}
    >
      {/* Branding Section */}
      <div className="flex flex-col items-center gap-4 mb-4 w-full max-w-2xl text-center">
        <div className="group relative">
          <div className="absolute -inset-1 bg-primary opacity-20 group-hover:opacity-40 rounded-2xl transition duration-1000 blur"></div>
        </div>
        <div className="space-y-1">
          <h1 className="font-black text-foreground text-3xl sm:text-4xl italic">
            RESUME<span className="text-primary not-italic">.AI</span>
          </h1>
          <p className="font-medium text-muted-foreground text-xs sm:text-sm uppercase tracking-wide">
            Smart Login for Smart Careers
          </p>
        </div>
      </div>

      {/* Main Card */}
      <Card className="bg-background shadow-[0_1px_4px_rgba(0,0,0,0.08)] shadow-slate-200 dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)] py-8 rounded-[2rem] w-full max-w-2xl overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="font-black text-2xl sm:text-3xl tracking-tight">
            Create your account
          </CardTitle>
          <CardDescription className="font-medium">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent className="">
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
            <div className="space-y-4">
              {/* Google Button */}
              <Button
                onClick={handleGoogleSignup}
                variant="outline"
                type="button"
                className="group gap-4 bg-secondary/20 hover:bg-secondary/40 border-2 border-secondary hover:border-primary/30 rounded-2xl w-full h-14 transition-all duration-300"
              >
                <FcGoogle className="w-6 h-6 group-hover:rotate-360 transition-transform duration-500" />
                <span className="font-bold text-foreground text-sm sm:text-base">
                  Login with Google
                </span>
              </Button>

              {/* Compact Security Note */}
              <div className="flex justify-center items-center gap-2 bg-emerald-50/50 dark:bg-emerald-500/5 mx-auto px-3 py-2 border border-emerald-500/10 rounded-xl w-full">
                <MdOutlineVerifiedUser className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <p className="font-medium text-[11px] text-emerald-700 dark:text-emerald-400 sm:text-sm leading-none">
                  Logging in with Google is more secure
                </p>
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="border-muted-foreground/40 dark:border-muted-foreground/70 border-t w-full" />
                </div>
                <div className="relative flex justify-center font-bold text-[10px] uppercase tracking-[0.3em]">
                  <span className="bg-white dark:bg-background px-4 text-muted-foreground dark:text-muted-foreground/70">
                    or continue with
                  </span>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <FieldLabel
                    htmlFor="email"
                    className="ml-1 font-bold text-[11px] text-muted-foreground uppercase"
                  >
                    Email
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="bg-secondary/30 [-webkit-text-fill-color:inherit] autofill:[-webkit-text-fill-color:#000] dark:autofill:[-webkit-text-fill-color:#fff] px-5 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/20 h-14 font-medium autofill:transition-[background-color] autofill:duration-[5000s] [selection:background-color:transparent]"
                    {...register("email", { required: "Email is required" })}
                  />
                </div>

                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <FieldLabel
                      htmlFor="password"
                      className="ml-1 font-bold text-[11px] text-muted-foreground uppercase"
                    >
                      Password
                    </FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-secondary/30 px-5 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/20 h-14 font-medium"
                      {...register("password", {
                        required: true,
                        minLength: { value: 8, message: "Password must be at least 8 characters" },
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel
                      htmlFor="confirm-password"
                      title="Confirm Password"
                      className="block ml-1 font-bold text-[11px] text-muted-foreground truncate uppercase"
                    >
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-secondary/30 px-5 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/20 h-14 font-medium"
                      {...register("confirmPassword", {
                        required: true,
                        minLength: {
                          value: 8,
                          message: "Confirm Password must be at least 8 characters",
                        },
                      })}
                    />
                  </div>
                </div>
                <p className="ml-1 font-medium text-[10px] text-muted-foreground sm:text-xs">
                  Must be at least 8 characters long.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-4 pt-2">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="shadow-primary/20 shadow-xl rounded-2xl w-full h-14 font-bold text-sm sm:text-base uppercase tracking-widest active:scale-[0.98] transition-all hover:-translate-y-1"
              >
                {isSubmitting ? <SpinnerCustom /> : "Create Account"}
              </Button>

              <p className="font-medium text-muted-foreground text-sm text-center">
                Already have an account?{" "}
                <Link
                  href="signin"
                  className="font-black text-foreground hover:text-primary decoration-primary/20 hover:decoration-primary underline underline-offset-8 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
