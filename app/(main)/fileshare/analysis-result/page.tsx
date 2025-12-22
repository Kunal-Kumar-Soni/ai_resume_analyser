"use client";

import { useAnalysis } from "@/hooks/useAnalysis";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, CheckCircle2, Download, Sparkles, Zap } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import PageLoader from "@/components/ui/custom-animated-loader";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { NumberTicker } from "@/components/ui/number-ticker";

const AnalysisResult = () => {
  const { analysisData } = useAnalysis();
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!analysisData || !user) {
      router.replace("/fileshare");
    }
  }, [analysisData, router, user]);

  if (!analysisData || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[44vh]">
        <PageLoader />
      </div>
    );
  }

  // Required Optimizations
  const sMatch = analysisData?.match(/ATS SCORE:\s*(\d+)/i);
  const pPart = analysisData?.split(/IMPROVEMENT POINTS:/i)[1];
  const score = sMatch ? sMatch[1] : null;
  const points = pPart ? pPart.trim() : analysisData;

  return (
    <div className="mx-auto p-6 max-w-7xl min-h-[80vh] text-zinc-900 dark:text-zinc-100 animate-in duration-700 fade-in">
      <div className="space-y-8">
        {/* --- HEADER --- */}
        <header className="flex md:flex-row flex-col justify-between md:items-center gap-6">
          <div className="space-y-4">
            <button
              onClick={() => router.replace("/fileshare")}
              className="group flex items-center gap-2 font-bold text-[10px] text-zinc-400 hover:text-black dark:hover:text-white uppercase tracking-[0.2em] transition-all"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to fileshare
            </button>
            <h1 className="font-black text-4xl lg:text-5xl tracking-tighter">
              Analysis <span className="text-zinc-400 dark:text-zinc-700">Report.</span>
            </h1>
          </div>
        </header>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          {/* --- METADATA SIDEBAR --- */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="bg-transparent p-6 border-zinc-200 dark:border-zinc-800 rounded-[2rem]">
              <h3 className="mb-4 font-black text-zinc-400 text-xs uppercase tracking-widest">
                Metadata
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-zinc-100 dark:border-zinc-900 border-b text-[11px]">
                  <span className="font-medium text-zinc-500">Status</span>
                  <span className="font-bold text-green-500 uppercase">Success</span>
                </div>
                <div className="flex justify-between items-center py-2 text-[11px]">
                  <span className="font-medium text-zinc-500">Engine</span>
                  <span className="font-bold italic">Gemini-Flash-1.5</span>
                </div>
              </div>
            </Card>
          </div>

          {/* --- RESULT SECTION --- */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            {/* SCORE CARD - CLEAN MAGIC UI */}
            <Card className="group relative flex flex-col justify-center items-center bg-transparent p-8 border-zinc-200 dark:border-zinc-800 rounded-[2rem] min-h-55 overflow-hidden transition-all duration-300">
              <div className="z-10 flex flex-col items-center">
                <span className="mb-2 font-black text-[9px] text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.4em]">
                  System Match
                </span>

                {score ? (
                  <>
                    <div className="flex items-baseline font-black text-zinc-900 dark:text-zinc-100 text-7xl lg:text-8xl leading-none tracking-tighter">
                      {/* Magic UI Number Ticker */}
                      <NumberTicker
                        value={parseInt(score)}
                        className="text-zinc-900 dark:text-zinc-100"
                      />
                      <span className="ml-2 font-medium text-zinc-500 dark:text-zinc-400 text-3xl md:text-4xl select-none">
                        %
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <div className="relative flex w-2 h-2">
                        <span
                          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                            parseInt(score) > 70 ? "bg-emerald-400" : "bg-amber-400"
                          }`}
                        />
                        <span
                          className={`relative inline-flex rounded-full h-2 w-2 ${
                            parseInt(score) > 70 ? "bg-emerald-500" : "bg-amber-500"
                          }`}
                        />
                      </div>
                      <p className="font-bold text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                        {parseInt(score) > 70 ? "Optimal Match" : "Below Threshold"}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center opacity-30">
                    <AlertCircle className="mb-2 w-6 h-6" />
                    <p className="font-bold text-[10px] uppercase tracking-widest">No Data</p>
                  </div>
                )}
              </div>

              {/* Subtle Border Interaction */}
              <div className="absolute inset-0 border border-transparent group-hover:border-zinc-500/10 rounded-[2.5rem] transition-all duration-500" />
            </Card>

            {/* IMPROVEMENTS CARD */}
            <Card className="relative bg-transparent p-8 lg:p-12 border-zinc-200 dark:border-zinc-800 rounded-[2rem]">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-zinc-100 dark:bg-zinc-900 p-3 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl">
                  <Zap className="w-6 h-6 text-zinc-900 dark:text-zinc-100" fill="currentColor" />
                </div>
                <h2 className="font-bold dark:text-white text-2xl tracking-tight">
                  Required Optimizations
                </h2>
              </div>

              <div className="relative ml-2 pl-8">
                <div className="top-0 bottom-0 left-0 absolute bg-linear-to-b from-transparent via-zinc-200 dark:via-zinc-800 to-transparent w-0.5" />
                <TypingAnimation
                  // leading-8 aur tracking-tight se text ekdum saaf aur professional dikhega
                  className="font-medium text-zinc-600 dark:text-zinc-300 text-sm md:text-base text-left leading-8 tracking-tight whitespace-pre-line"
                  duration={10}
                >
                  {/* AI ke baje huye faltu gaps ko filter karke clean format mein join karna */}
                  {
                    points
                      ?.split("\n")
                      ?.map((line) => line.trim())
                      ?.filter((line) => line)
                      ?.join("\n\n")
                      ?.replace(/\*\*/g, "") // Ye stars ko udane ka sabse clean jugad hai bina markdown ke
                  }
                </TypingAnimation>
              </div>

              <Sparkles className="right-8 bottom-8 absolute w-8 h-8 text-indigo-500/10 animate-pulse" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
