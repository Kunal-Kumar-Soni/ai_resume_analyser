"use client";

import { useAnalysis } from "@/hooks/useAnalysis";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

const AnalysisResult = () => {
  const { analysisData } = useAnalysis();
  const router = useRouter();

  useEffect(() => {
    if (!analysisData) {
      router.replace("/fileshare");
    }
  }, [analysisData, router]);

  // if (!shouldRender || !analysisData) {
  //   return (
  //     <div className="flex justify-center items-center bg-white dark:bg-[#0a0a0a] w-full h-screen">
  //       <Sparkles className="w-10 h-10 text-zinc-300 animate-pulse" />
  //     </div>
  //   );
  // }

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
              Back to Home
            </button>
            <h1 className="font-black text-4xl lg:text-5xl tracking-tighter">
              Analysis <span className="text-zinc-400 dark:text-zinc-700">Report.</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button className="bg-black dark:bg-white px-6 rounded-full font-bold text-white dark:text-black">
              <Download className="mr-2 w-4 h-4" /> Export PDF
            </Button>
          </div>
        </header>

        {/* --- MAIN CONTENT --- */}
        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <Card className="bg-transparent p-6 border-zinc-200 dark:border-zinc-800 rounded-[2rem]">
              <h3 className="mb-4 font-black text-zinc-400 text-xs uppercase tracking-widest">
                Metadata
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-zinc-100 dark:border-zinc-900 border-b">
                  <span className="font-medium text-zinc-500 text-xs">Processed</span>
                  <span className="font-bold text-xs">Just Now</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-zinc-500 text-xs">Engine</span>
                  <span className="font-bold text-xs italic">Gemini-Flash-2.5</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="relative bg-white dark:bg-[#0a0a0a] shadow-2xl p-8 lg:p-12 border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden">
              <div className="top-0 right-0 absolute opacity-10 p-8 pointer-events-none">
                <Sparkles className="w-24 h-24" />
              </div>

              <div className="dark:prose-invert max-w-none prose-headings:font-black prose-p:leading-relaxed prose prose-zinc">
                <ReactMarkdown>{analysisData!}</ReactMarkdown>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
