"use client";
// ... (Saare imports wahi hain)
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
import { AlertCircle, Zap, Sparkles, ArrowLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { AiFillSound } from "react-icons/ai";

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
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  // FIX 1: Added user.id filter and auto-select
  const fetchData = useCallback(async () => {
    if (!user?.id) return;
    try {
      const { data: allData, error } = await supabaseClient
        .from("resumeai")
        .select("*")
        .eq("user_id", user.id) // Filter by user
        .order("created_at", { ascending: false });

      if (error) throw error;

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
      console.error("Fetch Error:", error);
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
        { event: "*", schema: "public", table: "resumeai", filter: `user_id=eq.${user.id}` },
        () => fetchData()
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
      ?.map((l) => (l.includes(":") ? l.replace(/(^.*?):/, (m) => `${m.toUpperCase()}⮕ `) : l))
      ?.join("\n\n");

    return { score: scoreVal, points: formatted };
  }, [getSingleData]);

  // Rest of the logic (handleDelete, Auth Guard, handleSelection) same as yours...
  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabaseClient.from("resumeai").delete().eq("id", id);
      if (error) throw error;
      const updated = getAllData?.filter((item) => item.id !== id) || null;
      setGetAllData(updated);
      if (activeId === id) setActiveId(updated && updated.length > 0 ? updated[0].id : null);
    } catch (error) {
      alert("Failed to delete");
    }
  };

  useEffect(() => {
    if (!authLoading && !user) router.push("/");
  }, [user, authLoading, router]);

  const handleSelection = (id: number) => {
    setActiveId(id);
    resultSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading || authLoading) return <PageLoader />;

  return (
    <div className="mx-auto p-6 max-w-7xl overflow-x-auto text-zinc-900 dark:text-zinc-100 animate-in duration-900 fade-in">
      <div className="space-y-8">
        <header className="flex md:flex-row flex-col justify-between md:items-center gap-6">
          <div className="space-y-4">
            <button
              onClick={() => router.replace("/fileshare")}
              className="group flex items-center gap-2 font-bold text-[10px] text-zinc-400 hover:text-black dark:hover:text-white uppercase tracking-[0.2em] transition-all"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back
            </button>
            <h1 className="font-black text-4xl lg:text-6xl uppercase tracking-tighter">
              HISTORY <span className="text-zinc-400 dark:text-zinc-700">SECTION</span>
            </h1>
          </div>
        </header>

        <div className="items-start gap-8 grid grid-cols-1 lg:grid-cols-12">
          {/* HISTORY LIST (Design Untouched) */}
          <Card className="flex flex-col col-span-1 lg:col-span-4 bg-background shadow-sm border border-zinc-200 dark:border-zinc-800 rounded-[2rem] h-fit">
            <div className="p-6 border-zinc-100 dark:border-zinc-800/50 border-b shrink-0">
              <div className="flex justify-between items-center">
                <p className="font-bold text-[11px] text-zinc-500 uppercase tracking-[0.2em]">
                  Analysis History
                </p>
                <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full font-bold text-[10px] text-zinc-400">
                  {getAllData?.length || 0}/10
                </span>
              </div>
            </div>
            <div className="flex-1 space-y-4 p-5 h-fit">
              {getAllData?.map((data, index) => (
                <div
                  key={data.id}
                  onClick={() => handleSelection(data.id)}
                  className="group relative"
                >
                  <div
                    className={`relative flex items-center gap-4 p-4 border-2 rounded-2xl transition-all duration-300 cursor-pointer ${
                      activeId === data.id
                        ? "border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900 translate-x-1"
                        : "border-zinc-100 dark:border-zinc-800/60 hover:border-zinc-300 bg-transparent"
                    }`}
                  >
                    <div
                      className={`font-black text-2xl italic ${
                        activeId === data.id
                          ? "text-zinc-900 dark:text-zinc-100"
                          : "text-zinc-200 dark:text-zinc-800"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h1
                        className={`font-bold text-sm truncate ${
                          activeId === data.id
                            ? "text-zinc-900 dark:text-zinc-100"
                            : "text-zinc-500 dark:text-zinc-400"
                        }`}
                      >
                        {data.title}
                      </h1>
                      <p className="mt-0.5 font-bold text-[9px] text-zinc-400 truncate uppercase">
                        {data?.job_description || "Standard Analysis"}
                      </p>
                    </div>
                    <div
                      className={`p-2 rounded-lg ${
                        activeId === data.id
                          ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <FaArrowRight className="w-2.5 h-2.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* RESULT SECTION (Design Untouched) */}
          <div ref={resultSectionRef} className="flex flex-col gap-8 col-span-1 lg:col-span-8">
            <Card className="group relative flex flex-col justify-center items-center bg-transparent p-8 border-zinc-200 dark:border-zinc-800 rounded-[2rem] min-h-55 overflow-hidden transition-all duration-300">
              <div className="z-10 flex flex-col items-center">
                <span className="mb-2 font-plusJakartaSans font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.4em]">
                  ATS Score
                </span>
                {parsedData.score ? (
                  <>
                    <div className="flex items-baseline font-black text-zinc-900 dark:text-zinc-100 text-7xl lg:text-8xl leading-none tracking-tighter">
                      <NumberTicker
                        value={parseInt(parsedData.score)}
                        className="text-zinc-900 dark:text-zinc-100"
                      />
                      <span className="ml-2 font-medium text-zinc-500 text-3xl md:text-4xl select-none">
                        %
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-zinc-100/50 dark:bg-zinc-900/50 shadow-sm mt-8 px-3 py-1.5 border rounded-full transition-all duration-300">
                      <span className="font-bold text-[10px] text-zinc-400 uppercase tracking-wider">
                        Powered by
                      </span>
                      <span className="flex items-center gap-1.5 font-extrabold text-xs">
                        {getSingleData?.model_selection === "groq" ? (
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
                  </>
                ) : (
                  <div className="flex flex-col items-center opacity-30">
                    <AlertCircle className="mb-2 w-6 h-6" />
                    <p className="font-bold text-[10px] uppercase tracking-widest">
                      No Data Selected
                    </p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="flex flex-row justify-between items-center bg-transparent p-6 border-zinc-200 dark:border-zinc-800 rounded-[2rem]">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl w-10 h-10 transition-all"
                >
                  <AiFillSound className="w-5 h-5 text-zinc-600" />
                </Button>
                <div className="flex flex-col">
                  <span className="font-bold text-[10px] text-zinc-400 uppercase">Voice</span>
                  <span className="font-black text-[11px] uppercase">Narration</span>
                </div>
              </div>
              {getSingleData && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="group flex flex-col items-end gap-1 px-2 transition-all">
                      <div className="flex items-center gap-2 text-zinc-400 group-hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                        <span className="font-bold text-[10px] uppercase">Remove Entry</span>
                      </div>
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-[2.5rem]">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete forever?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(getSingleData.id)}
                        className="bg-red-500"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </Card>

            <Card className="relative bg-transparent p-8 lg:p-12 border-zinc-200 dark:border-zinc-800 rounded-[2rem]">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-2xl">
                  <Zap className="w-6 h-6" />
                </div>
                <h2 className="font-bold text-2xl tracking-tight">Required Optimizations</h2>
              </div>
              <div className="relative ml-2 pl-8">
                <div className="top-0 bottom-0 left-0 absolute bg-zinc-200 dark:bg-zinc-800 w-0.5" />
                <TypingAnimation
                  key={activeId}
                  className="font-medium text-[14px] text-zinc-600 dark:text-zinc-300 leading-8 whitespace-pre-line"
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
