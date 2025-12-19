"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { SpinnerCustom } from "./ui/spinner";
import { toast } from "sonner";
import { supabaseClient } from "@/lib/supabaseClient";
import { redirect, useRouter } from "next/navigation";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import PageLoader from "./ui/custom-animated-loader";

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

  const { user, isLoading } = useAuth();
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
      {/* Branding Section - Responsive Text Sizes */}
      <div className="flex flex-col items-center gap-4 mb-4 w-full max-w-2xl">
        <div className="group relative">
          <div className="absolute -inset-1 bg-primary opacity-25 group-hover:opacity-50 rounded-2xl transition duration-1000 blur"></div>
        </div>
        <div className="space-y-1 text-center">
          <h1 className="font-black text-foreground text-3xl sm:text-4xl italic">
            RESUME<span className="text-primary not-italic">.AI</span>
          </h1>
          <p className="font-medium text-muted-foreground text-xs sm:text-sm uppercase tracking-wide">
            Smart Login for Smart Careers
          </p>
        </div>
      </div>

      <Card className="bg-background shadow-[0_1px_4px_rgba(0,0,0,0.08)] shadow-slate-200 dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)] py-8 rounded-[2rem] w-full overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="font-black text-2xl sm:text-3xl tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="font-medium text-muted-foreground">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          {/* Primary Action: Google */}
          <div className="space-y-4">
            <Button
              onClick={handleGoogleSignup}
              variant="outline"
              type="button"
              className="group gap-4 bg-secondary/20 hover:bg-secondary/40 border-2 border-secondary hover:border-primary/30 rounded-2xl w-full h-14 transition-all duration-300"
            >
              <FcGoogle className="w-6 h-6 group-hover:rotate-360 transition-transform duration-500" />
              <span className="font-bold text-sm sm:text-base">Login with Google</span>
            </Button>

            {/* Responsive Security Note - Compact for Mobile */}
            <div className="flex justify-center items-center gap-2 bg-emerald-50/50 dark:bg-emerald-500/5 mx-auto px-3 py-2 border border-emerald-500/10 rounded-xl w-full max-w-2xl">
              {/* Smaller Icon */}
              <MdOutlineVerifiedUser className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />

              {/* Small & Clean Text */}
              <p className="font-medium text-[11px] text-emerald-700 dark:text-emerald-400 sm:text-sm leading-none">
                Logging in with Google is more secure
              </p>
            </div>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="border-muted-foreground/40 dark:border-muted-foreground/70 border-t w-full" />
            </div>
            <div className="relative flex justify-center font-bold text-[10px] uppercase tracking-[0.3em]">
              <span className="bg-white dark:bg-background px-4 text-muted-foreground dark:text-muted-foreground/70">
                or email access
              </span>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <FieldLabel
                  htmlFor="email"
                  className="ml-1 font-bold text-[11px] text-muted-foreground uppercase"
                >
                  Email Address
                </FieldLabel>
                <Input
                  {...register("email", { required: "Email is required" })}
                  id="email"
                  type="email"
                  placeholder="name@email.com"
                  className="bg-secondary/30 [-webkit-text-fill-color:inherit] autofill:[-webkit-text-fill-color:#000] dark:autofill:[-webkit-text-fill-color:#fff] px-5 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/20 h-14 font-medium autofill:transition-[background-color] autofill:duration-[5000s] [selection:background-color:transparent]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <FieldLabel
                    htmlFor="password"
                    className="font-bold text-[11px] text-muted-foreground uppercase"
                  >
                    Password
                  </FieldLabel>
                </div>
                <Input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                  })}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-secondary/30 px-5 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/20 h-14 font-medium"
                />
              </div>
            </div>

            <Button
              disabled={isSubmitting}
              type="submit"
              className="shadow-primary/20 shadow-xl rounded-2xl w-full h-14 font-bold text-sm sm:text-base uppercase tracking-widest active:scale-[0.98] transition-all hover:-translate-y-1"
            >
              {isSubmitting ? <SpinnerCustom /> : "Sign In Now"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="font-medium text-muted-foreground text-sm">
              Don't have an account?{" "}
              <Link
                href="signup"
                className="font-black text-foreground hover:text-primary decoration-primary/20 hover:decoration-primary underline underline-offset-8 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
