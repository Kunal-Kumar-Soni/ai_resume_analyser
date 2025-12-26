"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, History, Sparkles, Zap } from "lucide-react";
import { use, useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import PageLoader from "@/components/ui/custom-animated-loader";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { AiFillSound } from "react-icons/ai";

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

export function AnalysisResult({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  //Voice
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

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

  /// Voice Functions
  const getVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    return voices.find((v) => v.lang === "hi-IN") || null;
  };

  const speakText = () => {
    if (!points) {
      showFetchError("No content available for narration");
      return;
    }

    // toggle: stop if already speaking
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(points);

    utterance.lang = "hi-IN";
    const hindiVoice = getVoice();
    if (hindiVoice) utterance.voice = hindiVoice;

    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // load voices
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }, []);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const result = userData?.result;

  // Required Optimizations
  const sMatch = result?.match(/ATS SCORE:\s*(\d+)/i);
  const pPart = result?.split(/IMPROVEMENT POINTS:/i)[1];
  const score = sMatch ? sMatch[1] : null;
  const points = pPart ? pPart.trim() : result;

  if (!user || isLoading || loading) return <PageLoader />;

  return (
    <div className="mx-auto p-6 max-w-7xl overflow-x-auto text-zinc-900 dark:text-zinc-100 animate-in duration-900 fade-in">
      <div className="space-y-8">
        {/* --- HEADER --- */}
        <header className="flex md:flex-row flex-col md:justify-between md:items-center gap-6">
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

          {/* ACTION */}
          <div className="flex md:justify-end">
            <Button
              onClick={() => router.push("/fileshare/history")}
              variant="outline"
              className="hover:bg-zinc-50 dark:hover:bg-zinc-900 px-6 py-5 border-zinc-200 dark:border-zinc-800 rounded-full font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all"
            >
              <History className="mr-2 w-3.5 h-3.5" />
              History
            </Button>
          </div>
        </header>

        <div className="gap-8 grid grid-cols-1">
          {/* --- RESULT SECTION --- */}

          <div className="flex flex-col gap-8 lg:col-span-2">
            {userData && (
              <div className="flex flex-col items-center gap-2 bg-zinc-100/50 dark:bg-zinc-900/80 px-6 py-2 border-red-500 border-l-4 rounded-r-xl w-full text-center">
                <span className="font-bold text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.3em]">
                  Resume Title
                </span>
                <h1 className="font-extrabold text-slate-900 dark:text-white text-2xl md:text-3xl leading-tight tracking-tight">
                  {userData?.title}
                </h1>
              </div>
            )}
            {/* SCORE CARD - CLEAN MAGIC UI */}
            <Card className="group relative flex flex-col justify-center items-center bg-transparent p-8 border-zinc-200 dark:border-zinc-800 rounded-[2rem] min-h-55 overflow-hidden transition-all duration-300">
              <div className="z-10 flex flex-col items-center">
                <span className="mb-2 font-plusJakartaSans font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.4em]">
                  ATS Score
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
                    <div className="flex items-center gap-2 bg-zinc-100/50 dark:bg-zinc-900/50 shadow-sm mt-8 px-3 py-1.5 border rounded-full transition-all duration-300">
                      <span className="font-bold text-[10px] text-zinc-400 uppercase tracking-wider">
                        Powered by
                      </span>
                      <span className="flex items-center gap-1.5 font-extrabold text-xs">
                        {userData?.model_selection === "groq" ? (
                          <div className="flex items-center gap-1.5 text-orange-500">
                            <Zap className="w-3.5 h-3.5 animate-pulse" /> GROQ LPU
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-blue-500">
                            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> GEMINI
                          </div>
                        )}
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
                <div className="top-8 right-8 absolute">
                  <Button
                    title="Voice"
                    variant="outline"
                    size="icon"
                    onClick={speakText}
                    className={`rounded-xl w-10 cursor-pointer h-10 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95
                    ${
                      isSpeaking
                        ? "shadow-md shadow-zinc-900/10 dark:shadow-black/40"
                        : "border-zinc-200 dark:border-zinc-800"
                    }
                      `}
                  >
                    <AiFillSound
                      className={`w-5 h-5 transition-colors ${
                        isSpeaking
                          ? "text-emerald-600 dark:text-emerald-500 animate-pulse"
                          : "text-zinc-600"
                      }`}
                    />
                  </Button>
                </div>

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
                  className="font-medium text-[14px] text-zinc-600 dark:text-zinc-300 sm:text-base md:text-base text-left leading-8 tracking-tight whitespace-pre-line"
                  duration={10}
                >
                  {points
                    ?.replace(/\*\*/g, "")
                    ?.split("\n")
                    ?.filter(Boolean)
                    ?.map((l: string) =>
                      l.includes(":") ? l.replace(/(^.*?):/, (m) => `${m.toUpperCase()}⮕ `) : l
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
