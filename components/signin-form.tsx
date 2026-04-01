"use client";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineVerifiedUser } from "react-icons/md";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";

import PageLoader from "./ui/custom-animated-loader";
import { Spinner } from "./ui/spinner";

type Inputs = {
  email: string;
  password: string;
};

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Error Toast Function
  const showFetchError = (text: string) =>
    toast.error(text, {
      action: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  // Success Toast Function
  const showFetchSuccess = (text: string) =>
    toast.success(text, {
      action: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });

  //get error message from supabase auth error
  const getAuthErrorMessage = (error: any) => {
    if (!error) return "Something went wrong. Please try again.";

    const message = error.message?.toLowerCase() || "";

    if (message.includes("invalid login credentials"))
      return "Invalid email or password";

    if (message.includes("email not confirmed"))
      return "Please verify your email first";

    if (message.includes("too many requests"))
      return "Too many attempts. Try again later";

    if (error.status === 429) return "Too many attempts. Try again later";

    return "Login failed. Please try again.";
  };

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      showFetchError(getAuthErrorMessage(error));
      return;
    }

    showFetchSuccess("Logged in successfully.");

    router.replace("/");
  };

  const onError = (errors: any) => {
    showFetchError(
      errors?.email?.message || errors?.password?.message || "Validation error",
    );
  };

  const handleGoogleSignup = async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}`,
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (error) {
      showFetchError("Google login failed");
      return;
    }
  };

  useEffect(() => {
    if (user && !isLoading) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

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
        "my-6 flex min-h-full w-full flex-col items-center justify-center px-4 sm:px-6 md:my-0 lg:px-8",
        className,
      )}
      {...props}
    >
      {/* Clean Responsive Back Button */}
      <div className="top-4 left-4 mb-6 w-full md:absolute md:top-10 md:left-10 md:mb-0 md:w-auto">
        <Link href="/">
          <div className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase transition-all hover:text-black dark:hover:text-white">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </div>
        </Link>
      </div>

      {/* Branding Section - Responsive Text Sizes */}
      <div className="mb-4 flex w-full max-w-2xl flex-col items-center gap-4">
        <div className="group relative">
          <div className="bg-primary absolute -inset-1 rounded-2xl opacity-25 blur transition duration-1000 group-hover:opacity-50"></div>
        </div>
        <div className="space-y-1 text-center">
          <h1 className="text-foreground text-3xl font-black italic sm:text-4xl">
            RESUME<span className="text-primary not-italic">.AI</span>
          </h1>
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase sm:text-sm">
            Smart Login for Smart Careers
          </p>
        </div>
      </div>

      <Card className="bg-background w-full overflow-hidden rounded-[2rem] py-8 shadow-[0_1px_4px_rgba(0,0,0,0.08)] shadow-slate-200 dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-black tracking-tight sm:text-3xl">
            Welcome back
          </CardTitle>
          <CardDescription className="text-muted-foreground font-medium">
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
              className="group bg-secondary/20 hover:bg-secondary/40 border-secondary hover:border-primary/30 h-14 w-full gap-4 rounded-2xl border-2 transition-all duration-300"
            >
              <FcGoogle className="h-6 w-6 transition-transform duration-500 group-hover:rotate-360" />
              <span className="text-sm font-bold sm:text-base">
                Login with Google
              </span>
            </Button>

            {/* Responsive Security Note - Compact for Mobile */}
            <div className="mx-auto flex w-full max-w-2xl items-center justify-center gap-2 rounded-xl border border-emerald-500/10 bg-emerald-50/50 px-3 py-2 dark:bg-emerald-500/5">
              {/* Smaller Icon */}
              <MdOutlineVerifiedUser className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />

              {/* Small & Clean Text */}
              <p className="text-[11px] leading-none font-medium text-emerald-700 sm:text-sm dark:text-emerald-400">
                Logging in with Google is more secure
              </p>
            </div>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="border-muted-foreground/40 dark:border-muted-foreground/70 w-full border-t" />
            </div>
            <div className="relative flex justify-center text-[10px] font-bold tracking-[0.3em] uppercase">
              <span className="dark:bg-background text-muted-foreground dark:text-muted-foreground/70 bg-white px-4">
                or email access
              </span>
            </div>
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <FieldLabel
                  htmlFor="email"
                  className="text-muted-foreground ml-1 text-[11px] font-bold uppercase"
                >
                  Email Address
                </FieldLabel>
                <Input
                  {...register("email", { required: "Email is required" })}
                  id="email"
                  type="email"
                  placeholder="name@email.com"
                  className="bg-secondary/30 focus-visible:ring-primary/20 h-14 rounded-2xl border-none px-5 font-medium [-webkit-text-fill-color:inherit] [selection:background-color:transparent] autofill:transition-[background-color] autofill:duration-[5000s] autofill:[-webkit-text-fill-color:#000] focus-visible:ring-2 dark:autofill:[-webkit-text-fill-color:#fff]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <FieldLabel
                    htmlFor="password"
                    className="text-muted-foreground text-[11px] font-bold uppercase"
                  >
                    Password
                  </FieldLabel>
                </div>
                <Input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-secondary/30 focus-visible:ring-primary/20 h-14 rounded-2xl border-none px-5 font-medium focus-visible:ring-2"
                />
              </div>
            </div>

            <Button
              disabled={isSubmitting}
              type="submit"
              className="shadow-primary/20 h-14 w-full rounded-2xl text-sm font-bold tracking-widest uppercase shadow-xl transition-all hover:-translate-y-1 active:scale-[0.98] sm:text-base"
            >
              {isSubmitting ? <Spinner className="h-6 w-6" /> : "Sign In Now"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm font-medium">
              Don't have an account?{" "}
              <Link
                href="signup"
                className="text-foreground hover:text-primary decoration-primary/20 hover:decoration-primary font-black underline underline-offset-8 transition-colors"
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
