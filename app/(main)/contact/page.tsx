"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { toast } from "sonner";

import { Contact } from "@/actions/contact";
import { Spinner } from "@/components/ui/spinner";

const ContactUs = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Error Toast Function
  const showFetchError = (text: string) =>
    toast.error(text, {
      action: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formRef = e.currentTarget;
    try {
      const formData = new FormData(e.currentTarget);

      const { name, email, message } = Object.fromEntries(
        formData.entries(),
      ) as Record<string, string>;

      const res = await Contact(name, email, message);

      if (res?.success) {
        setIsSuccess(true);
        formRef.reset();
        toast.success("Message sent successfully!");
      } else {
        showFetchError(res?.error || "Submission failed!");
      }
    } catch (error) {
      showFetchError("Something went wrong!");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSuccess(false), 4000);
    }
  };

  return (
    <div className="text-foreground m-4 mx-auto max-w-7xl">
      <div className="border-border m-6 rounded-xl border p-6 shadow-sm">
        {/* Navigation */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase transition-all hover:text-black dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back
          </button>
        </div>

        {/* Header */}
        <header className="border-border mb-10 border-b pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
          <p className="mt-2 text-sm opacity-60">We're here to help you.</p>
        </header>

        <main className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Form Side */}
          <div className="relative">
            {isSuccess && (
              <div className="bg-background/90 animate-in fade-in absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg p-6 text-center backdrop-blur-sm duration-300">
                <CheckCircle2 className="mb-4 h-12 w-12 text-green-500" />
                <h3 className="text-xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  We'll get back to you shortly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest uppercase opacity-60">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="bg-muted/30 border-border focus:ring-primary w-full rounded-lg border p-3 transition-all outline-none [-webkit-text-fill-color:inherit] [selection:background-color:transparent] autofill:transition-[background-color] autofill:duration-[5000s] autofill:[-webkit-text-fill-color:#000] focus:ring-1 dark:autofill:[-webkit-text-fill-color:#fff]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest uppercase opacity-60">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    className="bg-muted/30 border-border focus:ring-primary w-full rounded-lg border p-3 transition-all outline-none [-webkit-text-fill-color:inherit] [selection:background-color:transparent] autofill:transition-[background-color] autofill:duration-[5000s] autofill:[-webkit-text-fill-color:#000] focus:ring-1 dark:autofill:[-webkit-text-fill-color:#fff]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest uppercase opacity-60">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="How can we help?"
                    className="bg-muted/30 border-border focus:ring-primary w-full resize-none rounded-lg border p-3 transition-all outline-none [-webkit-text-fill-color:inherit] [selection:background-color:transparent] autofill:transition-[background-color] autofill:duration-[5000s] autofill:[-webkit-text-fill-color:#000] focus:ring-1 dark:autofill:[-webkit-text-fill-color:#fff]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-foreground text-background flex w-full items-center justify-center gap-2 rounded-lg py-3 text-xs font-bold tracking-widest uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner className="h-4 w-4" /> Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Info Side */}
          <section className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-primary text-xl font-semibold">
                Quick Support
              </h2>
              <div className="space-y-4">
                {/* Clickable Email Card */}
                <a
                  href="mailto:kunal.codes24@gmail.com"
                  className="group bg-muted/10 hover:bg-muted/20 border-border hover:border-primary/50 flex items-start gap-4 rounded-lg border p-4 transition-all"
                >
                  <Mail className="text-primary mt-1 h-5 w-5 transition-transform group-hover:scale-110" />
                  <div>
                    <h3 className="text-foreground text-sm font-bold">
                      Email Us
                    </h3>
                    <p className="text-sm italic opacity-60">
                      kunal.codes24@gmail.com
                    </p>
                    <p className="text-primary mt-1 text-[10px] font-medium tracking-wider uppercase">
                      Click to send an email
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-muted/50 border-primary rounded-r-md border-l-4 p-4">
              <p className="text-sm italic opacity-80">
                <strong>Response Time:</strong> We usually respond within 24-48
                hours.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ContactUs;
