"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  BrainCircuit,
  Lightbulb,
  MessageSquareQuote,
  CheckCircle2,
  TrendingUp,
  Zap,
  Search,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
    <section className="relative bg-background pt-2 md:pt-8 :pb-32 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="top-0 left-1/2 -z-10 absolute w-full h-full -translate-x-1/2">
        <div className="top-[-10%] left-[-10%] absolute rounded-full w-125 h-125 animate-pulse" />
        <div className="right-[-5%] bottom-[10%] absolute rounded-full w-100 h-100 ]" />
      </div>

      <div className="mx-auto p-6 max-w-7xl container">
        <div className="items-center gap-16 grid grid-cols-1 lg:grid-cols-12">
          {/* Left Side: Content */}
          <div className="flex flex-col items-center lg:items-start space-y-8 lg:col-span-7 lg:text-left text-center">
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="bg-primary/5 backdrop-blur-md px-4 py-1.5 border-primary/20 rounded-full w-fit text-primary"
              >
                <Sparkles className="inline-block mr-2 w-3.5 h-3.5" />
                <span className="font-bold text-xs uppercase tracking-wider">
                  Advanced AI Resume Insight
                </span>
              </Badge>

              <h1 className="font-black text-foreground text-5xl md:text-7xl lg:text-8xl leading-14 sm:leading-[0.95] tracking-tighter">
                Smart Suggestions. <br />
                <span className="bg-clip-text bg-linear-to-r from-primary via-blue-500 to-cyan-400 text-transparent">
                  Better Interviews.
                </span>
              </h1>

              <p className="max-w-2xl font-medium text-muted-foreground text-lg md:text-xl italic leading-relaxed">
                "Stop sending generic resumes. Get AI-powered feedback to fix gaps and align with
                any job description instantly."
              </p>
            </div>

            {/* Main Get Started Button */}
            <div className="w-full sm:w-auto">
              <Button
                onClick={getStarted}
                size="lg"
                className="group relative shadow-2xl shadow-primary/20 hover:shadow-primary/40 px-10 rounded-2xl w-full sm:w-auto h-16 overflow-hidden font-bold text-lg active:scale-95 transition-all hover:-translate-y-1"
              >
                <span className="z-10 relative flex items-center">
                  Get Started for Free
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform -translate-x-full group-hover:translate-x-full duration-1000" />
              </Button>
            </div>

            {/* Quick Stats/Props */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4">
              <div className="flex items-center gap-2 font-bold text-foreground/70 text-sm">
                <div className="flex justify-center items-center bg-green-500/10 rounded-full w-5 h-5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                </div>
                Detailed Skill Gaps
              </div>
              <div className="flex items-center gap-2 font-bold text-foreground/70 text-sm">
                <div className="flex justify-center items-center bg-primary/10 rounded-full w-5 h-5">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                </div>
                Impact Analysis
              </div>
            </div>
          </div>

          {/*Right Side Box*/}
          <div className="relative lg:col-span-5 mx-auto px-2 sm:px-0 w-full max-w-2xl">
            <div className="group relative">
              {/* Animated Outer Glow - Mobile optimized blur */}
              <div className="absolute -inset-1 bg-linear-to-r from-indigo-500/30 to-emerald-500/30 opacity-40 group-hover:opacity-100 blur-lg sm:blur-xl rounded-[2rem] sm:rounded-[3rem] transition duration-1000" />

              <Card className="relative bg-white/90 dark:bg-zinc-950/90 shadow-2xl hover:shadow-primary/5 backdrop-blur-xl p-5 sm:p-8 border-white/20 dark:border-zinc-800/50 rounded-[2rem] sm:rounded-[2.5rem] transition-all duration-500">
                <div className="space-y-5 sm:space-y-6">
                  {/* --- Card Header --- */}
                  <div className="flex justify-between items-center pb-4 border-zinc-200/50 dark:border-zinc-800/50 border-b">
                    <div className="flex items-center gap-3">
                      <div className="flex justify-center items-center bg-zinc-100 dark:bg-zinc-800/50 rounded-xl ring-1 ring-zinc-200 dark:ring-zinc-700 w-10 h-10 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
                        <BrainCircuit size={20} />
                      </div>
                      <div>
                        <h4 className="font-black text-base sm:text-lg tracking-tight">
                          AI Resume Advisor
                        </h4>
                        <p className="font-bold text-[10px] text-zinc-500 uppercase tracking-widest">
                          Multi-Model Analysis
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:block font-bold text-[10px] text-emerald-500 uppercase">
                        Live Analysis
                      </span>
                      <div className="flex bg-emerald-500 rounded-full w-2 h-2 animate-pulse" />
                    </div>
                  </div>

                  {/* --- Insight 1: Actionable Advice --- */}
                  <div className="group/msg relative flex items-start gap-3 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 p-4 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl transition-all">
                    <Zap
                      className="mt-1 w-5 h-5 text-zinc-900 dark:text-zinc-100 shrink-0"
                      fill="currentColor"
                    />
                    <div className="space-y-1">
                      <p className="font-black text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                        Quick Win
                      </p>
                      <p className="font-bold text-zinc-800 dark:text-zinc-200 text-sm leading-snug">
                        Optimize{" "}
                        <span className="text-zinc-900 dark:text-zinc-100 decoration-2 decoration-zinc-400 dark:decoration-zinc-500 underline underline-offset-4">
                          Keyword Density
                        </span>
                        . Align your skills with the Job Description to pass automated screening
                        bots.
                      </p>
                    </div>
                  </div>

                  {/* --- Insight 2: Keyword Gap --- */}
                  <div className="flex items-start gap-3 bg-zinc-100/50 dark:bg-zinc-900/50 p-4 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl">
                    <Search className="mt-1 w-5 h-5 text-zinc-900 dark:text-zinc-100 shrink-0" />
                    <div className="space-y-1">
                      <p className="font-bold text-[10px] text-zinc-500 uppercase tracking-widest">
                        Keyword Missing
                      </p>
                      <p className="font-medium text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm italic">
                        "The JD mentions 'Cloud Architecture'. Ensure this is listed in your Core
                        Skills."
                      </p>
                    </div>
                  </div>

                  {/* --- Metrics Grid --- */}
                  <div className="gap-3 grid grid-cols-2 pt-2">
                    <div className="bg-white dark:bg-zinc-900 shadow-sm p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl text-center hover:scale-105 transition-transform">
                      <p className="font-bold text-[9px] text-zinc-500 uppercase tracking-tighter">
                        ATS Compatibility
                      </p>
                      <div className="flex justify-center items-center gap-1">
                        <TrendingUp size={12} className="text-emerald-500" />
                        <p className="font-black text-zinc-900 dark:text-white text-lg sm:text-xl">
                          84%
                        </p>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 shadow-sm p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl text-center hover:scale-105 transition-transform">
                      <p className="font-bold text-[9px] text-zinc-500 uppercase tracking-tighter">
                        Formatting
                      </p>
                      <p className="font-black text-lg sm:text-xl uppercase">Clean</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* --- Floating Notification --- */}
              <div className="-top-4 sm:-top-6 -right-2 sm:-right-6 absolute bg-emerald-400 dark:bg-emerald-500 shadow-xl p-2 sm:p-3 border-2 border-white dark:border-zinc-900 rounded-xl sm:rounded-2xl rotate-6 sm:rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all cursor-default select-none">
                <span className="flex items-center gap-1.5 font-black text-[10px] text-black sm:text-xs">
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
