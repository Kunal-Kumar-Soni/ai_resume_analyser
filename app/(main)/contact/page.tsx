"use client";

import { useState } from "react";
import { ArrowLeft, Mail, MessageSquare, Globe, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const ContactUs = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        const errorData = await response.json();
        const toastId = toast.error(errorData.error || "Submission failed.", {
          action: {
            label: "Cancel",
            onClick: () => toast.dismiss(toastId),
          },
        });
      }
    } catch (error) {
      const toastId = toast.error("Network error. Please try again.", {
        action: {
          label: "Cancel",
          onClick: () => toast.dismiss(toastId),
        },
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSuccess(false), 4000);
    }
  };

  return (
    <div className="m-4 text-foreground">
      <div className="shadow-sm mx-auto p-6 border border-border rounded-xl max-w-6xl">
        {/* Navigation */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 font-bold text-[10px] text-zinc-400 hover:text-black dark:hover:text-white uppercase tracking-[0.2em] transition-all"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
        </div>

        {/* Header */}
        <header className="mb-10 pb-6 border-border border-b">
          <h1 className="font-bold text-3xl tracking-tight">Contact Us</h1>
          <p className="opacity-60 mt-2 text-sm">We're here to help you.</p>
        </header>

        <main className="gap-12 grid grid-cols-1 md:grid-cols-2">
          {/* Form Side */}
          <div className="relative">
            {isSuccess && (
              <div className="z-10 absolute inset-0 flex flex-col justify-center items-center bg-background/90 backdrop-blur-sm p-6 rounded-lg text-center animate-in duration-300 fade-in">
                <CheckCircle2 className="mb-4 w-12 h-12 text-green-500" />
                <h3 className="font-bold text-xl">Message Sent!</h3>
                <p className="mt-2 text-muted-foreground text-sm">We'll get back to you shortly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="opacity-60 font-bold text-xs uppercase tracking-widest">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="bg-muted/30 [-webkit-text-fill-color:inherit] autofill:[-webkit-text-fill-color:#000] dark:autofill:[-webkit-text-fill-color:#fff] p-3 border border-border rounded-lg outline-none focus:ring-1 focus:ring-primary w-full transition-all autofill:transition-[background-color] autofill:duration-[5000s] [selection:background-color:transparent]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="opacity-60 font-bold text-xs uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    className="bg-muted/30 [-webkit-text-fill-color:inherit] autofill:[-webkit-text-fill-color:#000] dark:autofill:[-webkit-text-fill-color:#fff] p-3 border border-border rounded-lg outline-none focus:ring-1 focus:ring-primary w-full transition-all autofill:transition-[background-color] autofill:duration-[5000s] [selection:background-color:transparent]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="opacity-60 font-bold text-xs uppercase tracking-widest">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="How can we help?"
                    className="bg-muted/30 [-webkit-text-fill-color:inherit] autofill:[-webkit-text-fill-color:#000] dark:autofill:[-webkit-text-fill-color:#fff] p-3 border border-border rounded-lg outline-none focus:ring-1 focus:ring-primary w-full transition-all autofill:transition-[background-color] autofill:duration-[5000s] resize-none [selection:background-color:transparent]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex justify-center items-center gap-2 bg-foreground hover:opacity-90 disabled:opacity-50 py-3 rounded-lg w-full font-bold text-background text-xs uppercase tracking-widest transition-opacity"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner className="w-4 h-4" /> Sending...
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
              <h2 className="font-semibold text-primary text-xl">Quick Support</h2>
              <div className="space-y-4">
                {/* Clickable Email Card */}
                <a
                  href="mailto:kunal.codes24@gmail.com"
                  className="group flex items-start gap-4 bg-muted/10 hover:bg-muted/20 p-4 border border-border hover:border-primary/50 rounded-lg transition-all"
                >
                  <Mail className="mt-1 w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-bold text-foreground text-sm">Email Us</h3>
                    <p className="opacity-60 text-sm italic">kunal.codes24@gmail.com</p>
                    <p className="mt-1 font-medium text-[10px] text-primary uppercase tracking-wider">
                      Click to send an email
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-muted/50 p-4 border-primary border-l-4 rounded-r-md">
              <p className="opacity-80 text-sm italic">
                <strong>Response Time:</strong> We usually respond within 24-48 hours.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ContactUs;
