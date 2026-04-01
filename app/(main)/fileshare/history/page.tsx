"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AiFillSound } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";

import { useRouter } from "next/navigation";

import { AlertCircle, ArrowLeft, Sparkles, Trash2, Zap } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PageLoader from "@/components/ui/custom-animated-loader";
import { NumberTicker } from "@/components/ui/number-ticker";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabaseClient";

type getDataType = {
  created_at: string;
  id: number;
  title: string;
  job_description: string;
  model_selection: string;
  result: string;
  user_id: string;
}[];

const Page = () => {
  const [getAllData, setGetAllData] = useState<getDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeId, setActiveId] = useState<number | null>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  //Voice
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  // Error Toast Function
  const showFetchError = (text: string) =>
    toast.error(text, {
      action: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });

  // FIX 1: Added user.id filter and auto-select
  const fetchData = useCallback(async () => {
    if (!user?.id) return;
    try {
      const { data: allData, error } = await supabaseClient
        .from("resumeai")
        .select("*")
        .eq("user_id", user.id)
        .not("result", "is", null)
        .neq("result", "")
        .order("created_at", { ascending: false });

      if (error) {
        showFetchError("Unable to load your resume history.");
        return;
      }

      //Delete data if data.length should be larger than 10
      if (allData && allData.length > 10) {
        const oldestItem = allData[allData.length - 1];

        const { error: deleteError } = await supabaseClient
          .from("resumeai")
          .delete()
          .eq("id", oldestItem.id);

        if (deleteError) {
          showFetchError("Cleanup failed. Please refresh.");
        }
      }

      if (allData && allData.length > 0) {
        setGetAllData(allData);
        // Auto-select first item if none selected
        if (activeId === null) {
          setActiveId(allData[0].id);
        }
      } else {
        setGetAllData([]);
      }
    } catch (error) {
      showFetchError("Unable to load your resume history.");
    } finally {
      setLoading(false);
    }
  }, [user?.id, activeId]);

  useEffect(() => {
    if (!user?.id) return;
    fetchData();
    const channel = supabaseClient
      .channel(`user-sync-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "resumeai",
          filter: `user_id=eq.${user.id}`,
        },
        () => fetchData(),
      )
      .subscribe();
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [user?.id, fetchData]);

  const getSingleData = useMemo(() => {
    return getAllData?.find((data) => data.id === activeId) || null;
  }, [getAllData, activeId]);

  // FIX 2: Robust parsing to ensure data always loads
  const parsedData = useMemo(() => {
    const text = getSingleData?.result || "";
    const scoreMatch = text.match(/ATS SCORE[:\s]*(\d+)/i);
    const scoreVal = scoreMatch ? scoreMatch[1] : null;

    const pointsSplit = text.split(/IMPROVEMENT POINTS:/i);
    const rawPoints = pointsSplit.length > 1 ? pointsSplit[1].trim() : text;

    const formatted = rawPoints
      ?.replace(/\*\*/g, "")
      ?.split("\n")
      ?.filter(Boolean)
      ?.map((l) =>
        l.includes(":")
          ? l.replace(/(^.*?):/, (m) => `${m.toUpperCase()}⮕ `)
          : l,
      )
      ?.join("\n\n");

    return { score: scoreVal, points: formatted };
  }, [getSingleData]);

  // FIX 2: Rest of the logic (handleDelete, Auth Guard, handleSelection) same as yours...
  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabaseClient
        .from("resumeai")
        .delete()
        .eq("id", id);
      if (error) {
        showFetchError("Failed to delete resume.");
        return;
      }
      const updated = getAllData?.filter((item) => item.id !== id) || null;
      setGetAllData(updated);
      if (activeId === id)
        setActiveId(updated && updated.length > 0 ? updated[0].id : null);
    } catch (error) {
      showFetchError("Failed to delete resume.");
    }
  };

  useEffect(() => {
    if (!authLoading && !user) router.push("/");
  }, [user, authLoading, router]);

  const handleSelection = (id: number) => {
    setActiveId(id);
    resultSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /// Voice Functions
  const getVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    return voices.find((v) => v.lang === "hi-IN") || null;
  };

  const speakText = () => {
    const text = parsedData?.points;
    if (!text) {
      showFetchError("No content available for narration");
      return;
    }

    // toggle: stop if already speaking
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

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

  // stop when history data change
  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [activeId]);

  //stop when page reload
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  if (loading || authLoading) return <PageLoader />;

  return (
    <div className="animate-in fade-in mx-auto max-w-7xl overflow-x-auto p-6 text-zinc-900 duration-900 dark:text-zinc-100">
      <div className="space-y-8">
        <header className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-4">
            <button
              onClick={() => router.replace("/fileshare")}
              className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase transition-all hover:text-black dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />{" "}
              Back
            </button>
            <h1 className="text-4xl font-black tracking-tighter uppercase lg:text-6xl">
              HISTORY{" "}
              <span className="text-zinc-400 dark:text-zinc-700">SECTION</span>
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* HISTORY LIST (Design Untouched) */}
          <Card className="bg-background col-span-1 flex h-fit flex-col rounded-[2rem] border border-zinc-200 shadow-sm lg:col-span-4 dark:border-zinc-800">
            <div className="shrink-0 border-b border-zinc-100 p-6 dark:border-zinc-800/50">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                  History Stack
                </p>
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-400 dark:bg-zinc-800">
                  {getAllData?.length || 0}/10
                </span>
              </div>
            </div>
            <div className="h-fit flex-1 space-y-4 p-5">
              {getAllData?.map((data, index) => (
                <div
                  key={data.id}
                  onClick={() => handleSelection(data.id)}
                  className="group relative"
                >
                  <div
                    className={`relative flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-all duration-300 ${
                      activeId === data.id
                        ? "translate-x-1 border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900"
                        : "border-zinc-100 bg-transparent hover:border-zinc-300 dark:border-zinc-800/60 dark:hover:border-zinc-300"
                    }`}
                  >
                    <div
                      className={`text-2xl font-black italic ${
                        activeId === data.id
                          ? "text-zinc-900 dark:text-zinc-100"
                          : "text-zinc-200 dark:text-zinc-800"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h1
                        className={`truncate text-sm font-bold ${
                          activeId === data.id
                            ? "text-zinc-900 dark:text-zinc-100"
                            : "text-zinc-500 dark:text-zinc-400"
                        }`}
                      >
                        {data.title}
                      </h1>
                      <p className="mt-0.5 truncate text-[9px] font-bold text-zinc-400 uppercase">
                        {data?.job_description || "Standard Analysis"}
                      </p>
                    </div>
                    <div
                      className={`rounded-lg p-2 ${
                        activeId === data.id
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <FaArrowRight className="h-2.5 w-2.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* RESULT SECTION (Design Untouched) */}
          <div
            ref={resultSectionRef}
            className="col-span-1 flex flex-col gap-8 lg:col-span-8"
          >
            {/* ATS Score Section */}
            {getSingleData && (
              <div className="flex flex-col items-center gap-2 rounded-r-xl border-l-4 border-red-500 bg-zinc-100/50 px-6 py-2 text-center dark:bg-zinc-900/80">
                <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase dark:text-zinc-400">
                  Resume Title
                </span>
                <h1 className="text-2xl leading-tight font-extrabold tracking-tight text-slate-900 md:text-3xl dark:text-white">
                  {getSingleData?.title}
                </h1>
              </div>
            )}

            {getSingleData && (
              <Card className="group relative flex min-h-55 flex-col items-center justify-center overflow-hidden rounded-[2rem] border-zinc-200 bg-transparent p-8 transition-all duration-300 dark:border-zinc-800">
                <div className="z-10 flex flex-col items-center">
                  <span className="font-plusJakartaSans mb-2 font-black tracking-[0.4em] text-zinc-400 uppercase dark:text-zinc-600">
                    ATS Score
                  </span>
                  {parsedData.score ? (
                    <>
                      <div className="flex items-baseline text-7xl leading-none font-black tracking-tighter text-zinc-900 lg:text-8xl dark:text-zinc-100">
                        <NumberTicker
                          value={parseInt(parsedData.score)}
                          className="text-zinc-900 dark:text-zinc-100"
                        />
                        <span className="ml-2 text-3xl font-medium text-zinc-500 select-none md:text-4xl">
                          %
                        </span>
                      </div>
                      <div className="mt-8 flex items-center gap-2 rounded-full border bg-zinc-100/50 px-3 py-1.5 shadow-sm transition-all duration-300 dark:bg-zinc-900/50">
                        <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                          Powered by
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-extrabold">
                          {getSingleData?.model_selection === "groq" ? (
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
                              parseInt(parsedData?.score) > 70
                                ? "bg-emerald-400"
                                : "bg-amber-400"
                            }`}
                          />
                          <span
                            className={`relative inline-flex h-2 w-2 rounded-full ${
                              parseInt(parsedData?.score) > 70
                                ? "bg-emerald-500"
                                : "bg-amber-500"
                            }`}
                          />
                        </div>
                        <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
                          {parseInt(parsedData?.score) > 70
                            ? "Optimal Match"
                            : "Below Threshold"}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center opacity-30">
                      <AlertCircle className="mb-2 h-6 w-6" />
                      <p className="text-[10px] font-bold tracking-widest uppercase">
                        No Data Selected
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}
            {/* Voice And Delete Section */}
            {getSingleData && (
              <Card className="flex flex-row items-center justify-between rounded-[2rem] border-zinc-200 bg-transparent p-6 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <Button
                    title="Voice"
                    variant="outline"
                    size="icon"
                    onClick={speakText}
                    className={`h-10 w-10 cursor-pointer rounded-xl transition-all duration-200 hover:scale-110 hover:bg-zinc-100 hover:shadow-lg active:scale-95 dark:hover:bg-zinc-800 ${
                      isSpeaking
                        ? "shadow-md shadow-zinc-900/10 dark:shadow-black/40"
                        : "border-zinc-200 dark:border-zinc-800"
                    } `}
                  >
                    <AiFillSound
                      className={`h-5 w-5 transition-colors ${
                        isSpeaking
                          ? "animate-pulse text-emerald-600 dark:text-emerald-500"
                          : "text-zinc-600"
                      }`}
                    />
                  </Button>
                  <div className="flex flex-col">
                    <span className="hidden text-[11px] font-bold text-zinc-400 uppercase sm:block">
                      Voice
                    </span>
                  </div>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="group flex cursor-pointer items-center gap-2.5 rounded-xl border border-zinc-200 bg-zinc-50/60 px-4 py-2 backdrop-blur-md transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10 dark:border-zinc-700 dark:bg-zinc-900/40 dark:hover:border-red-500/40 dark:hover:bg-red-500/10">
                      <Trash2 className="h-4 w-4 text-zinc-500 transition-all group-hover:rotate-12 group-hover:text-red-500 dark:text-zinc-400 dark:group-hover:text-red-500" />

                      <span className="text-[11px] font-bold tracking-[0.08em] text-zinc-600 transition-colors group-hover:text-red-500 dark:text-zinc-300 dark:group-hover:text-red-500">
                        DELETE
                      </span>
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="rounded-[2rem] border border-zinc-800 shadow-2xl">
                    <AlertDialogHeader>
                      {/* Title: Light mode mein dark text, Dark mode mein white text */}
                      <AlertDialogTitle className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                        Delete forever?
                      </AlertDialogTitle>

                      {/* Description: Light mode mein soft gray, Dark mode mein muted zinc */}
                      <AlertDialogDescription className="leading-relaxed text-slate-600 dark:text-zinc-400">
                        This will permanently remove{" "}
                        {/* Highlighted text: Light mode mein black, Dark mode mein white */}
                        <span className="font-semibold text-slate-900 dark:text-zinc-100">
                          &quot;{getSingleData?.title || "this resume"}&quot;
                        </span>{" "}
                        You won&apos;t be able to recover this resume data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="mt-4 gap-2">
                      {/* Cancel button ko subtle rakha taaki Delete focus mein rahe */}
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <AlertDialogAction
                        onClick={() => handleDelete(getSingleData.id)}
                        className="bg-red-600 font-medium text-white shadow-lg shadow-red-900/20 transition-colors hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </Card>
            )}

            {/* Result Section */}
            <Card className="relative rounded-[2rem] border-zinc-200 bg-transparent p-8 lg:p-12 dark:border-zinc-800">
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-900">
                  <Zap className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Required Optimizations
                </h2>
              </div>
              <div className="relative ml-2 pl-8">
                <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-linear-to-b from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />
                <TypingAnimation
                  key={`${activeId}-${parsedData.points?.length ?? 0}`}
                  className="text-[14px] leading-8 font-medium whitespace-pre-line text-zinc-600 dark:text-zinc-300"
                  duration={5}
                >
                  {parsedData.points || "No Data available."}
                </TypingAnimation>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
