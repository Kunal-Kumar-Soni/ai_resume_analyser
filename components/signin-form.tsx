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

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (data) {
        router.push("/");
      }

      if (error) {
        toast.error(error?.message || "An error occurred", {
          action: {
            label: "Cancel",
            onClick: () => console.log("Cancel"),
          },
        });
        return;
      }

      toast.success("Login successfully", {
        action: {
          label: "Cancel",
          onClick: () => console.log("Cancel"),
        },
      });
    } catch (error: any) {
      console.log(error);
      toast.error("An error occurred", {
        action: {
          label: "Cancel",
          onClick: () => console.log("Cancel"),
        },
      });
    }
  };

  const onError = (errors: any) => {
    toast.error(errors?.email?.message || errors?.password?.message || "Validation error", {
      action: {
        label: "Cancel",
        onClick: () => console.log("Cancel"),
      },
    });
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
                <Button variant="outline" type="button">
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
                  <a href="#" className="ml-auto text-sm hover:underline underline-offset-4">
                    Forgot your password?
                  </a>
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
