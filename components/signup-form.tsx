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

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      if (formData?.password !== formData?.confirmPassword) {
        toast.error("Passwords do not match", {
          action: {
            label: "Cancel",
            onClick: () => console.log("Cancel"),
          },
        });
        return;
      }
      const { data, error } = await supabaseClient.auth.signUp({
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
      //successfully toast
      toast.success("Account created successfully", {
        action: {
          label: "Cancel",
          onClick: () => console.log("Cancel"),
        },
      });
    } catch (error: any) {
      toast.error(error?.message || "An error occurred", {
        action: {
          label: "Cancel",
          onClick: () => console.log("Cancel"),
        },
      });
    }
  };

  const onError = (errors: any) => {
    toast.error(
      errors?.name?.message ||
        errors?.email?.message ||
        errors?.password?.message ||
        errors?.confirmPassword?.message ||
        "Validation error",
      {
        action: {
          label: "Cancel",
          onClick: () => console.log("Cancel"),
        },
      }
    );
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
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                />
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
