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
      router.push("/result");
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

              <h1 className="font-black text-foreground text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tighter">
                Smart Suggestions. <br />
                <span className="bg-clip-text bg-linear-to-r from-primary via-blue-500 to-cyan-400 text-transparent">
                  Better Interviews.
                </span>
              </h1>

              <p className="max-w-2xl font-medium text-muted-foreground text-lg md:text-xl italic leading-relaxed">
                "Stop sending generic resumes. Get personalized AI feedback to fix gaps, quantify
                achievements, and align perfectly with any job description."
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

          {/* Right Side: Visual Feedback Card */}
          <div className="relative lg:col-span-5">
            <div className="group relative">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-linear-to-r from-primary/30 to-blue-600/30 opacity-50 group-hover:opacity-100 blur-xl rounded-[3rem] transition duration-1000" />

              <Card className="relative bg-white/80 dark:bg-zinc-950/90 shadow-2xl backdrop-blur-2xl p-8 border-white/20 dark:border-zinc-800/50 rounded-[2.5rem] group-hover:rotate-1 transition-all duration-500">
                <div className="space-y-6">
                  {/* Card Header */}
                  <div className="flex justify-between items-center pb-5 border-border/50 border-b">
                    <div className="flex items-center gap-3">
                      <div className="flex justify-center items-center bg-primary/10 rounded-xl ring-1 ring-primary/20 w-10 h-10 text-primary">
                        <BrainCircuit size={20} />
                      </div>
                      <h4 className="font-black text-lg tracking-tight">AI Advisor</h4>
                    </div>
                    <div className="flex bg-green-500 rounded-full w-2 h-2 animate-pulse" />
                  </div>

                  {/* Suggestion 1: High Impact */}
                  <div className="group/msg relative flex items-start gap-3 bg-primary/5 hover:bg-primary/10 p-4 border border-primary/10 rounded-2xl transition-colors">
                    <Lightbulb className="mt-1 w-5 h-5 text-yellow-500 shrink-0" />
                    <div className="space-y-1">
                      <p className="font-black text-[10px] text-primary uppercase tracking-widest">
                        Critical Insight
                      </p>
                      <p className="font-bold text-sm leading-snug">
                        Your summary lacks{" "}
                        <span className="text-primary underline">quantifiable data</span>.
                        Mentioning '30% revenue growth' would make it 2x stronger.
                      </p>
                    </div>
                  </div>

                  {/* Suggestion 2: Skill Gap */}
                  <div className="flex items-start gap-3 bg-muted/30 opacity-80 p-4 border border-border/50 rounded-2xl scale-95 translate-x-4">
                    <MessageSquareQuote className="mt-1 w-5 h-5 text-muted-foreground shrink-0" />
                    <div className="space-y-1">
                      <p className="font-bold text-[10px] text-muted-foreground uppercase">
                        JD Alignment
                      </p>
                      <p className="font-medium text-xs italic">
                        "Consider adding 'Agile Methodology'. It's a key requirement for this role."
                      </p>
                    </div>
                  </div>

                  {/* Footer Stats inside Card */}
                  <div className="gap-3 grid grid-cols-2 pt-2">
                    <div className="bg-background/50 p-3 border border-border/50 rounded-xl text-center">
                      <p className="font-bold text-[9px] text-muted-foreground uppercase">
                        Match Score
                      </p>
                      <p className="font-black text-primary text-xl">84%</p>
                    </div>
                    <div className="bg-background/50 p-3 border border-border/50 rounded-xl text-center">
                      <p className="font-bold text-[9px] text-muted-foreground uppercase">
                        Readability
                      </p>
                      <p className="font-black text-green-500 text-xl">High</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Hired Notification Overlay */}
              <div className="-top-6 -right-6 absolute bg-yellow-400 shadow-xl p-3 border-2 border-white dark:border-zinc-900 rounded-2xl rotate-12 group-hover:scale-110 transition-transform">
                <span className="flex items-center gap-1 font-black text-black text-xs">
                  Ready to Apply!{" "}
                  <CheckCircle2 size={14} fill="black" className="text-yellow-400" />
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
