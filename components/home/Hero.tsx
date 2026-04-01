"use client";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Lightbulb,
  MessageSquareQuote,
  Search,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const Hero = () => {
  const router = useRouter();
  const { user } = useAuth();
  const getStarted = () => {
    if (!user) {
      const toastId = toast.warning("Please login to continue", {
        action: {
          label: "Cancel",
          onClick: () => {
            toast.dismiss(toastId);
          },
        },
      });
    } else {
      router.replace("/fileshare");
    }
  };

  return (
    <section className="bg-background :pb-32 relative overflow-hidden pt-2 md:pt-8">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/2 -z-10 h-full w-full -translate-x-1/2">
        <div className="absolute top-[-10%] left-[-10%] h-125 w-125 animate-pulse rounded-full" />
        <div className="] absolute right-[-5%] bottom-[10%] h-100 w-100 rounded-full" />
      </div>

      <div className="container mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* Left Side: Content */}
          <div className="flex flex-col items-center space-y-8 text-center lg:col-span-7 lg:items-start lg:text-left">
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="bg-primary/5 border-primary/20 text-primary w-fit rounded-full px-4 py-1.5 backdrop-blur-md"
              >
                <Sparkles className="mr-2 inline-block h-3.5 w-3.5" />
                <span className="text-xs font-bold tracking-wider uppercase">
                  Advanced AI Resume Insight
                </span>
              </Badge>

              <h1 className="text-foreground text-5xl leading-14 font-black tracking-tighter sm:leading-[0.95] md:text-7xl lg:text-8xl">
                Smart Suggestions. <br />
                <span className="from-primary bg-linear-to-r via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Better Interviews.
                </span>
              </h1>

              <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed font-medium italic md:text-xl">
                "Stop sending generic resumes. Get AI-powered feedback to fix
                gaps and align with any job description instantly."
              </p>
            </div>

            {/* Main Get Started Button */}
            <div className="w-full sm:w-auto">
              <Button
                onClick={getStarted}
                size="lg"
                className="group shadow-primary/20 hover:shadow-primary/40 relative h-16 w-full overflow-hidden rounded-2xl px-10 text-lg font-bold shadow-2xl transition-all hover:-translate-y-1 active:scale-95 sm:w-auto"
              >
                <span className="relative z-10 flex items-center">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </Button>
            </div>

            {/* Quick Stats/Props */}
            <div className="flex flex-wrap justify-center gap-8 pt-4 lg:justify-start">
              <div className="text-foreground/70 flex items-center gap-2 text-sm font-bold">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                </div>
                Detailed Skill Gaps
              </div>
              <div className="text-foreground/70 flex items-center gap-2 text-sm font-bold">
                <div className="bg-primary/10 flex h-5 w-5 items-center justify-center rounded-full">
                  <TrendingUp className="text-primary h-3.5 w-3.5" />
                </div>
                Impact Analysis
              </div>
            </div>
          </div>

          {/*Right Side Box*/}
          <div className="relative mx-auto w-full max-w-2xl px-2 sm:px-0 lg:col-span-5">
            <div className="group relative">
              {/* Animated Outer Glow - Mobile optimized blur */}
              <div className="absolute -inset-1 rounded-[2rem] bg-linear-to-r from-indigo-500/30 to-emerald-500/30 opacity-40 blur-lg transition duration-1000 group-hover:opacity-100 sm:rounded-[3rem] sm:blur-xl" />

              <Card className="hover:shadow-primary/5 relative rounded-[2rem] border-white/20 bg-white/90 p-5 shadow-2xl backdrop-blur-xl transition-all duration-500 sm:rounded-[2.5rem] sm:p-8 dark:border-zinc-800/50 dark:bg-zinc-950/90">
                <div className="space-y-5 sm:space-y-6">
                  {/* --- Card Header --- */}
                  <div className="flex items-center justify-between border-b border-zinc-200/50 pb-4 dark:border-zinc-800/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 ring-1 ring-zinc-200 transition-colors duration-300 dark:bg-zinc-800/50 dark:text-zinc-100 dark:ring-zinc-700">
                        <BrainCircuit size={20} />
                      </div>
                      <div>
                        <h4 className="text-base font-black tracking-tight sm:text-lg">
                          AI Resume Advisor
                        </h4>
                        <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                          Multi-Model Analysis
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden text-[10px] font-bold text-emerald-500 uppercase sm:block">
                        Live Analysis
                      </span>
                      <div className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  {/* --- Insight 1: Actionable Advice --- */}
                  <div className="group/msg relative flex items-start gap-3 rounded-2xl border border-zinc-200/50 bg-zinc-50 p-4 transition-all hover:bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:bg-zinc-900">
                    <Zap
                      className="mt-1 h-5 w-5 shrink-0 text-zinc-900 dark:text-zinc-100"
                      fill="currentColor"
                    />
                    <div className="space-y-1">
                      <p className="text-[10px] font-black tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
                        Quick Win
                      </p>
                      <p className="text-sm leading-snug font-bold text-zinc-800 dark:text-zinc-200">
                        Optimize{" "}
                        <span className="text-zinc-900 underline decoration-zinc-400 decoration-2 underline-offset-4 dark:text-zinc-100 dark:decoration-zinc-500">
                          Keyword Density
                        </span>
                        . Align your skills with the Job Description to pass
                        automated screening bots.
                      </p>
                    </div>
                  </div>

                  {/* --- Insight 2: Keyword Gap --- */}
                  <div className="flex items-start gap-3 rounded-2xl border border-zinc-200/50 bg-zinc-100/50 p-4 dark:border-zinc-800/50 dark:bg-zinc-900/50">
                    <Search className="mt-1 h-5 w-5 shrink-0 text-zinc-900 dark:text-zinc-100" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                        Keyword Missing
                      </p>
                      <p className="text-xs font-medium text-zinc-600 italic sm:text-sm dark:text-zinc-400">
                        "The JD mentions 'Cloud Architecture'. Ensure this is
                        listed in your Core Skills."
                      </p>
                    </div>
                  </div>

                  {/* --- Metrics Grid --- */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="rounded-xl border border-zinc-200 bg-white p-3 text-center shadow-sm transition-transform hover:scale-105 dark:border-zinc-800 dark:bg-zinc-900">
                      <p className="text-[9px] font-bold tracking-tighter text-zinc-500 uppercase">
                        ATS Compatibility
                      </p>
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp size={12} className="text-emerald-500" />
                        <p className="text-lg font-black text-zinc-900 sm:text-xl dark:text-white">
                          84%
                        </p>
                      </div>
                    </div>
                    <div className="rounded-xl border border-zinc-200 bg-white p-3 text-center shadow-sm transition-transform hover:scale-105 dark:border-zinc-800 dark:bg-zinc-900">
                      <p className="text-[9px] font-bold tracking-tighter text-zinc-500 uppercase">
                        Formatting
                      </p>
                      <p className="text-lg font-black uppercase sm:text-xl">
                        Clean
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* --- Floating Notification --- */}
              <div className="absolute -top-4 -right-2 rotate-6 cursor-default rounded-xl border-2 border-white bg-emerald-400 p-2 shadow-xl transition-all select-none group-hover:scale-110 group-hover:rotate-0 sm:-top-6 sm:-right-6 sm:rotate-12 sm:rounded-2xl sm:p-3 dark:border-zinc-900 dark:bg-emerald-500">
                <span className="flex items-center gap-1.5 text-[10px] font-black text-black sm:text-xs">
                  ATS Optimized!{" "}
                  <CheckCircle2
                    size={14}
                    fill="black"
                    className="text-emerald-400 dark:text-emerald-500"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
