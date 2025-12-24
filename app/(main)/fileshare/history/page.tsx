"use client";
import { Card } from "@/components/ui/card";
import PageLoader from "@/components/ui/custom-animated-loader";
import { NumberTicker } from "@/components/ui/number-ticker";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabaseClient";
import { AlertCircle, Zap, Sparkles, ArrowLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

type getDataType = {
  created_at: string;
  id: number;
  title: string;
  job_description: string;
  model_selection: string;
  result: string;
}[];

const Page = () => {
  const [getAllData, setGetAllData] = useState<getDataType | null>(null);
  const [getSingleData, setGetSingleData] = useState<getDataType[number] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const resultSectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!user || isLoading) {
      router.push("/");
    }
  }, [user, router, isLoading]);

  const limitedDataOnly = async () => {
    setLoading(true);
    const { data: allData } = await supabaseClient
      .from("resumeai")
      .select("*")
      .order("created_at", { ascending: false });

    if (allData && allData.length > 10) {
      const oldestId = allData[allData.length - 1].id;
      await supabaseClient.from("resumeai").delete().eq("id", oldestId);
    }

    if (allData) {
      setGetAllData(allData);

      if (allData.length > 0) {
        setGetSingleData(allData[0]);
      }
    }

    setLoading(false);
  };

  const handleSingleData = (id: number) => {
    const singleData = getAllData?.find((data) => data.id === id);
    setGetSingleData(singleData ?? null);

    resultSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    limitedDataOnly();
  }, []);

  const text = getSingleData?.result || "";
  const scoreMatch = text.match(/ATS SCORE:\s*(\d+)/i);
  const score = scoreMatch ? scoreMatch[1] : null;
  const pointsSplit = text.split(/IMPROVEMENT POINTS:/i);
  let points = pointsSplit.length > 1 ? pointsSplit[1].trim() : text;

  if (loading || isLoading) return <PageLoader />;

  return (
    <div className="mx-auto p-6 max-w-7xl overflow-x-auto text-zinc-900 dark:text-zinc-100 animate-in duration-900 fade-in">
      <div className="space-y-8">
        {/* --- HEADER --- */}
        <header className="flex md:flex-row flex-col justify-between md:items-center gap-6">
          <div className="space-y-4">
            <button
              onClick={() => router.replace("/fileshare")}
              className="group flex items-center gap-2 font-bold text-[10px] text-zinc-400 hover:text-black dark:hover:text-white uppercase tracking-[0.2em] transition-all"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back
            </button>
            <h1 className="font-black text-4xl lg:text-6xl uppercase tracking-tighter">
              HISTORY <span className="text-zinc-400 dark:text-zinc-700">SECTION</span>
            </h1>
          </div>
        </header>

        <div className="items-start gap-8 grid grid-cols-1 lg:grid-cols-12">
          {/* ---- LEFT SECTION ---- */}
          <Card className="flex flex-col col-span-1 lg:col-span-4 bg-background border border-zinc-200 dark:border-zinc-800 rounded-[2rem]">
            <div className="px-6 border-b shrink-0">
              <p className="mb-4 font-medium text-muted-foreground uppercase tracking-widest">
                Latest 10 Entries
              </p>
            </div>

            <div className="flex-1 space-y-3 px-4 overflow-y-auto scrollbar-hide">
              {getAllData?.map((data, index) => (
                <div
                  key={data.id}
                  onClick={() => handleSingleData(data.id)}
                  className="group relative"
                >
                  <div
                    className={`relative flex items-center gap-4 p-4 border-2 rounded-xl transition-all duration-200 cursor-pointer ${
                      getSingleData?.id === data.id
                        ? "border-foreground bg-accent/50 shadow-sm"
                        : "hover:border-foreground/40 border-transparent bg-muted/20"
                    }`}
                  >
                    <div className="font-black text-muted-foreground/30 text-2xl italic">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h1 className="font-bold text-sm truncate tracking-tight">{data.title}</h1>
                      <p className="font-semibold text-[10px] text-muted-foreground uppercase">
                        {data?.job_description}
                      </p>
                    </div>
                    <FaArrowRight
                      className={`w-3 h-3 transition-transform ${
                        getSingleData?.id === data.id
                          ? "translate-x-1"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          {/* --- RESULT SECTION --- */}
          <div ref={resultSectionRef} className="flex flex-col gap-8 col-span-1 lg:col-span-8">
            {/* SCORE CARD - CLEAN MAGIC UI */}
            <Card className="group relative flex flex-col justify-center items-center bg-transparent p-8 border-zinc-200 dark:border-zinc-800 rounded-[2rem] min-h-55 overflow-hidden transition-all duration-300">
              <div className="z-10 flex flex-col items-center">
                {/* Existing Header */}
                <span className="mb-2 font-plusJakartaSans font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.4em]">
                  ATS Score
                </span>

                {score ? (
                  <>
                    <div className="flex items-baseline font-black text-zinc-900 dark:text-zinc-100 text-7xl lg:text-8xl leading-none tracking-tighter">
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

                    {/* --- Naya Section: Model Info & Delete Button --- */}
                    <div className="flex flex-col items-center gap-4 mt-8">
                      {/* Model Identifier */}
                      <div className="flex items-center gap-2 bg-zinc-100/50 dark:bg-zinc-900/50 shadow-sm backdrop-blur-sm px-3 py-1.5 border border-zinc-200/50 dark:border-zinc-800/50 rounded-full transition-all duration-300">
                        <span className="font-bold text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                          Powered by
                        </span>

                        <span className="flex items-center gap-1.5 font-plusJakartaSans font-extrabold text-xs">
                          {getSingleData?.model_selection === "groq" ? (
                            <div className="flex items-center gap-1.5 text-orange-500 dark:text-orange-400">
                              <Zap className="fill-current w-3.5 h-3.5 animate-pulse" />
                              <span className="bg-clip-text bg-linear-to-r from-orange-500 to-amber-500 text-transparent">
                                GROQ LPU
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-blue-500 dark:text-blue-400">
                              <Sparkles className="fill-current w-3.5 h-3.5 animate-pulse" />
                              <span className="bg-clip-text bg-linear-to-r from-blue-500 to-indigo-500 text-transparent">
                                GEMINI
                              </span>
                            </div>
                          )}
                        </span>
                      </div>
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
                  key={getSingleData?.id}
                  className="font-medium text-[14px] text-zinc-600 dark:text-zinc-300 sm:text-base md:text-base text-left leading-8 tracking-tight whitespace-pre-line"
                  duration={10}
                >
                  {points
                    ?.replace(/\*\*/g, "")
                    ?.split("\n")
                    ?.filter(Boolean)
                    ?.map((l) =>
                      l.includes(":") ? l.replace(/(^.*?):/, (m) => `${m.toUpperCase()}⮕ `) : l
                    )
                    ?.join("\n\n")}
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

export default Page;
