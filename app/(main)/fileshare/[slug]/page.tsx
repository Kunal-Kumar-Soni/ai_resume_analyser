"use client";

import { use, useCallback, useEffect, useState } from "react";
import { AiFillSound } from "react-icons/ai";

import { useRouter } from "next/navigation";

import { AlertCircle, ArrowLeft, History, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PageLoader from "@/components/ui/custom-animated-loader";
import { NumberTicker } from "@/components/ui/number-ticker";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabaseClient";

type UserType = {
  created_at: string;
  fetchid: string;
  id: number;
  job_description: string;
  model_selection: string;
  result: string;
  title: string;
  user_id: string;
};

export function AnalysisResult({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Error Toast Function
  const showFetchError = (text: string) =>
    toast.error(text, {
      action: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const { data, error } = await supabaseClient
        .from("resumeai")
        .select("*")
        .eq("fetchid", slug)
        .maybeSingle();

      if (error) {
        showFetchError("Unable to load resume data.");
        return;
      }
      if (!data) {
        showFetchError("Resume not found.");
        return;
      }
      setUserData(data);
    } catch {
      showFetchError("Load failed. Please retry.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    fetchData();
  }, [slug, fetchData]);

  useEffect(() => {
    if (!user) {
      router.replace("/fileshare");
    }
  }, [router, user]);

  const result = userData?.result;

  // Required Optimizations
  const sMatch = result?.match(/ATS SCORE:\s*(\d+)/i);
  const pPart = result?.split(/IMPROVEMENT POINTS:/i)[1];
  const score = sMatch ? sMatch[1] : null;
  const points = pPart ? pPart.trim() : result;

  if (!user || isLoading || loading) return <PageLoader />;

  return (
    <div className="animate-in fade-in mx-auto max-w-7xl overflow-x-auto p-6 text-zinc-900 duration-900 dark:text-zinc-100">
      <div className="space-y-8">
        {/* --- HEADER --- */}
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <button
              onClick={() => router.replace("/fileshare")}
              className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase transition-all hover:text-black dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to fileshare
            </button>

            <h1 className="text-4xl font-black tracking-tighter lg:text-5xl">
              Analysis{" "}
              <span className="text-zinc-400 dark:text-zinc-700">Report.</span>
            </h1>
          </div>

          {/* ACTION */}
          <div className="flex md:justify-end">
            <Button
              onClick={() => router.push("/fileshare/history")}
              variant="outline"
              className="rounded-full border-zinc-200 px-6 py-5 text-[10px] font-black tracking-widest uppercase transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <History className="mr-2 h-3.5 w-3.5" />
              History
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {/* --- RESULT SECTION --- */}

          <div className="flex flex-col gap-8 lg:col-span-2">
            {userData && (
              <div className="flex w-full flex-col items-center gap-2 rounded-r-xl border-l-4 border-red-500 bg-zinc-100/50 px-6 py-2 text-center dark:bg-zinc-900/80">
                <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase dark:text-zinc-400">
                  Resume Title
                </span>
                <h1 className="text-2xl leading-tight font-extrabold tracking-tight text-slate-900 md:text-3xl dark:text-white">
                  {userData?.title}
                </h1>
              </div>
            )}
            {/* SCORE CARD - CLEAN MAGIC UI */}
            <Card className="group relative flex min-h-55 flex-col items-center justify-center overflow-hidden rounded-[2rem] border-zinc-200 bg-transparent p-8 transition-all duration-300 dark:border-zinc-800">
              <div className="z-10 flex flex-col items-center">
                <span className="font-plusJakartaSans mb-2 font-black tracking-[0.4em] text-zinc-400 uppercase dark:text-zinc-600">
                  ATS Score
                </span>

                {score ? (
                  <>
                    <div className="flex items-baseline text-7xl leading-none font-black tracking-tighter text-zinc-900 lg:text-8xl dark:text-zinc-100">
                      {/* Magic UI Number Ticker */}
                      <NumberTicker
                        value={parseInt(score)}
                        className="text-zinc-900 dark:text-zinc-100"
                      />
                      <span className="ml-2 text-3xl font-medium text-zinc-500 select-none md:text-4xl dark:text-zinc-400">
                        %
                      </span>
                    </div>
                    <div className="mt-8 flex items-center gap-2 rounded-full border bg-zinc-100/50 px-3 py-1.5 shadow-sm transition-all duration-300 dark:bg-zinc-900/50">
                      <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                        Powered by
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-extrabold">
                        {userData?.model_selection === "groq" ? (
                          <div className="flex items-center gap-1.5 text-orange-500">
                            <Zap className="h-3.5 w-3.5 animate-pulse" /> GROQ
                            LPU
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-blue-500">
                            <Sparkles className="h-3.5 w-3.5 animate-pulse" />{" "}
                            GEMINI
                          </div>
                        )}
                      </span>
                    </div>

                    <div className="mt-6 flex items-center gap-2">
                      <div className="relative flex h-2 w-2">
                        <span
                          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                            parseInt(score) > 70
                              ? "bg-emerald-400"
                              : "bg-amber-400"
                          }`}
                        />
                        <span
                          className={`relative inline-flex h-2 w-2 rounded-full ${
                            parseInt(score) > 70
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        />
                      </div>
                      <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
                        {parseInt(score) > 70
                          ? "Optimal Match"
                          : "Below Threshold"}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center opacity-30">
                    <AlertCircle className="mb-2 h-6 w-6" />
                    <p className="text-[10px] font-bold tracking-widest uppercase">
                      No Data
                    </p>
                  </div>
                )}
              </div>

              {/* Subtle Border Interaction */}
              <div className="absolute inset-0 rounded-[2.5rem] border border-transparent transition-all duration-500 group-hover:border-zinc-500/10" />
            </Card>

            {/* IMPROVEMENTS CARD */}
            <Card className="relative rounded-[2rem] border-zinc-200 bg-transparent p-8 lg:p-12 dark:border-zinc-800">
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-2xl border border-zinc-200/50 bg-zinc-100 p-3 dark:border-zinc-800/50 dark:bg-zinc-900">
                  <Zap
                    className="h-6 w-6 text-zinc-900 dark:text-zinc-100"
                    fill="currentColor"
                  />
                </div>
                <h2 className="text-2xl font-bold tracking-tight dark:text-white">
                  Required Optimizations
                </h2>
              </div>

              <div className="relative ml-2 pl-8">
                <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-linear-to-b from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />
                <TypingAnimation
                  className="text-left text-[14px] leading-8 font-medium tracking-tight whitespace-pre-line text-zinc-600 sm:text-base md:text-base dark:text-zinc-300"
                  duration={10}
                >
                  {points
                    ?.replace(/\*\*/g, "")
                    ?.split("\n")
                    ?.filter(Boolean)
                    ?.map((l: string) =>
                      l.includes(":")
                        ? l.replace(/(^.*?):/, (m) => `${m.toUpperCase()}⮕ `)
                        : l,
                    )
                    ?.join("\n\n")}
                </TypingAnimation>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisResult;
