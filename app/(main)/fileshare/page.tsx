"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Upload,
  FileText,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  FileCheck2,
  X,
  History,
  ArrowLeft,
  Zap,
} from "lucide-react";
import { GrTechnology } from "react-icons/gr";
import { getPDFText } from "@/lib/getPDFText";
import PageLoader from "@/components/ui/custom-animated-loader";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { generateAiResumeFromGemini } from "@/actions/gemini";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { generateAiResumeFromGroq } from "@/actions/groq";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabaseClient } from "@/lib/supabaseClient";

const PDFUploadSleek = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [extractedText, setExtractedText] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>("groq");
  const [loading, setLoading] = useState<boolean>(false);

  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Error Function
  const showFetchError = (text: string) =>
    toast.error(text, {
      action: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });

  const processFile = async (selectedFile: File) => {
    if (!selectedFile || selectedFile.type !== "application/pdf") return;
    setFile(selectedFile);
    setIsParsing(true);
    try {
      const text = await getPDFText(selectedFile);
      if (text.trim() === "") {
        const toastId = toast.error("No text found in PDF.", {
          action: { label: "Cancel", onClick: () => toast.dismiss(toastId) },
        });
        setFile(null);
        return;
      }
      setExtractedText(text);
    } catch (err) {
      showFetchError("Unable to parse data!");
      setFile(null);
    } finally {
      setIsParsing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) processFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) processFile(droppedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setExtractedText("");
  };

  let cleanName = file?.name.replace(/\.[^/.]+$/, "") || "Untitled";
  let finalTitle = cleanName.endsWith(".pdf") ? cleanName : `${cleanName}.pdf`;

  // Execute Analysis with Model Switching
  const handleExecuteAnalysis = async () => {
    if (!extractedText) return;
    setLoading(true);

    try {
      // Model selection logic
      let res;
      if (selectedModel === "gemini") {
        res = await generateAiResumeFromGemini(extractedText, jobDescription);
      } else {
        res = await generateAiResumeFromGroq(extractedText, jobDescription);
      }

      if (res.success) {
        const fetchid = crypto.randomUUID();
        const { error } = await supabaseClient
          .from("resumeai")
          .insert({
            job_description: jobDescription,
            model_selection: selectedModel,
            title: finalTitle,
            result: res.output,
            fetchid: fetchid,
          })
          .select()
          .single();

        if (error) {
          showFetchError("Failed to save resume!");
          setLoading(false);
          return;
        }

        router.replace(`fileshare/${fetchid}`);
      } else {
        showFetchError(res?.error ?? "Analysis failed. Please try again!");
        setLoading(false);
      }
    } catch (error) {
      showFetchError("Execution failed. Please try again!");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user && !isLoading) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || loading) {
    return <PageLoader />;
  }

  return (
    <div className="selection:bg-zinc-200 dark:selection:bg-zinc-800 mx-auto max-w-7xl min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
      <div className="z-10 relative space-y-12 mx-auto p-6 max-w-350">
        <div className="mb-6">
          <button
            onClick={() => router.replace("/")}
            className="group flex items-center gap-2 font-bold text-[10px] text-zinc-400 hover:text-black dark:hover:text-white uppercase tracking-[0.2em] transition-all"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
        </div>

        <nav className="flex justify-between items-center mb-12 pb-8 border-zinc-200 dark:border-zinc-800 border-b">
          <div className="flex items-center gap-4">
            <div className="group relative flex justify-center items-center bg-black dark:bg-white shadow-2xl rounded-xl w-10 h-10 overflow-hidden">
              <GrTechnology className="z-10 relative w-6 h-6 text-white dark:text-black" />
              <div className="absolute inset-0 bg-linear-to-tr from-blue-500/20 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div>
              <h2 className="flex items-center gap-2 font-bold text-sm uppercase tracking-tight">
                Aura
              </h2>
              <p className="flex items-center gap-1 font-black text-[9px] text-zinc-400 uppercase tracking-[0.3em]">
                <span className="bg-green-500 rounded-full w-1 h-1 animate-pulse" />
                Synthetic Mind
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => router.push("/fileshare/history")}
              variant="outline"
              className="hover:bg-zinc-50 dark:hover:bg-zinc-900 px-6 py-5 border-zinc-200 dark:border-zinc-800 rounded-full font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all"
            >
              <History className="mr-2 w-3.5 h-3.5" />
              History
            </Button>
          </div>
        </nav>

        <div className="items-start gap-12 grid grid-cols-1 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <header className="space-y-2">
              <h1 className="font-black text-5xl lg:text-6xl tracking-tighter">
                Extract <span className="text-zinc-400 dark:text-zinc-700">Reality.</span>
              </h1>
              <p className="max-w-xl font-medium text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">
                Our high-fidelity parser deconstructs complex PDFs into structured data in
                milliseconds.
              </p>
            </header>

            {!file ? (
              <div className="group relative mt-8">
                <div
                  className={`absolute inset-0 bg-zinc-100 dark:bg-zinc-900 rounded-[2.5rem] transition-transform duration-500 ${
                    isDragging ? "scale-100" : "scale-[0.98] group-hover:scale-100"
                  }`}
                ></div>
                <Card
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative bg-white dark:bg-[#0a0a0a] shadow-sm border rounded-[2.5rem] overflow-hidden transition-all duration-500 ${
                    isDragging
                      ? "border-black dark:border-white scale-[1.01]"
                      : "border-zinc-200 dark:border-zinc-800 dark:group-hover:border-zinc-600 group-hover:border-zinc-400"
                  }`}
                >
                  <CardContent className="p-0">
                    <label className="flex flex-col justify-center items-center w-full min-h-112.5 cursor-pointer">
                      <div className="space-y-6 text-center">
                        <div
                          className={`flex justify-center items-center shadow-inner mx-auto border rounded-3xl w-20 h-20 transition-all duration-500 ${
                            isDragging
                              ? "bg-black dark:bg-white text-white dark:text-black scale-110"
                              : "bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 group-hover:rotate-6"
                          }`}
                        >
                          <Upload
                            className={`w-8 h-8 ${isDragging ? "text-current" : "text-zinc-400"}`}
                          />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-bold text-xl">
                            {isDragging ? "Drop to Upload" : "Select PDF Document"}
                          </h3>
                          <p className="font-medium text-zinc-500 text-sm">
                            {isDragging ? "Release your file now" : "Drag & drop or"}{" "}
                            {!isDragging && (
                              <span className="text-black dark:text-white underline">
                                browse system
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="flex justify-center items-center gap-6 pt-4">
                          <div className="flex items-center gap-2 pr-6 border-zinc-200 dark:border-zinc-800 border-r font-bold text-[10px] text-zinc-400 uppercase tracking-widest">
                            <ShieldCheck className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />{" "}
                            ISO SECURE
                          </div>
                          <div className="flex items-center gap-2 font-bold text-[10px] text-zinc-400 uppercase tracking-widest">
                            <FileCheck2 className="w-3.5 h-3.5 text-zinc-900 dark:text-white" /> RAW
                            TEXT
                          </div>
                        </div>
                      </div>
                      <input
                        onChange={handleFileChange}
                        type="file"
                        className="hidden"
                        accept=".pdf"
                      />
                    </label>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="slide-in-from-bottom-4 animate-in duration-500 fade-in">
                <Card className="flex justify-between items-center bg-white dark:bg-[#0a0a0a] shadow-2xl p-8 border-2 border-black dark:border-white rounded-[2.5rem]">
                  <div className="flex items-center gap-6">
                    <div className="flex justify-center items-center bg-zinc-100 dark:bg-zinc-900 rounded-2xl w-16 h-16">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="mb-1 font-black text-zinc-400 text-xs uppercase tracking-[0.2em]">
                        Source File
                      </p>
                      <h4 className="font-bold text-xl">
                        {isParsing ? (
                          <div className="flex justify-center items-center gap-2 text-zinc-400">
                            <Spinner className="mt-2 w-8 h-8" />
                          </div>
                        ) : (
                          <>{finalTitle}</>
                        )}
                      </h4>
                    </div>
                  </div>
                  <Button
                    onClick={handleRemoveFile}
                    variant="outline"
                    className="hover:bg-red-50 dark:hover:bg-red-900/10 p-0 border-zinc-200 dark:border-zinc-800 rounded-full w-12 h-12 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </Card>
              </div>
            )}
          </div>

          <div className="space-y-6 lg:col-span-5">
            <Card className="space-y-3 bg-white dark:bg-[#0a0a0a] shadow-xl p-8 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem]">
              <div className="flex justify-between items-center">
                <h4 className="font-black text-md uppercase tracking-widest">Configuration</h4>
                <Sparkles className="w-4 h-4 text-zinc-400" />
              </div>

              {/* ENGINE SELECTOR - MINIMALIST PREMIUM */}
              <div className="space-y-2">
                <label className="font-black text-[12px] text-zinc-400 uppercase tracking-widest">
                  AI Engine
                </label>

                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="bg-zinc-50 dark:bg-zinc-900/50 mt-2 px-6 py-8 border-none rounded-2xl focus:ring-0 w-full h-14">
                    <div className="flex items-center gap-3 text-left">
                      <SelectValue />
                    </div>
                  </SelectTrigger>

                  <SelectContent className="bg-white dark:bg-zinc-950 shadow-2xl border-zinc-200 dark:border-zinc-800 rounded-2xl">
                    <SelectItem value="gemini" className="py-4 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center w-6 h-6">
                          <Sparkles size={14} />
                        </div>

                        <div className="flex flex-col">
                          <span className="mb-1 font-bold uppercase leading-tight">Gemini</span>
                          <span className="opacity-50 text-xs leading-tight">Deep Analysis</span>
                        </div>
                      </div>
                    </SelectItem>

                    <SelectItem value="groq" className="py-4 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center w-6 h-6">
                          <Zap size={14} />
                        </div>

                        <div className="flex flex-col">
                          <span className="mb-1 font-bold uppercase leading-tight">Groq LPU</span>
                          <span className="opacity-50 text-xs leading-tight">Instant Speed</span>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* job content section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <label className="font-black text-[12px] text-zinc-400 uppercase tracking-widest">
                    Job Context
                  </label>
                </div>
                <textarea
                  placeholder="Paste Job Description here..."
                  value={jobDescription}
                  className="bg-zinc-50 dark:bg-[#050505] p-6 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] outline-none focus:ring-1 focus:ring-black dark:focus:ring-white w-full h-72 font-medium text-sm transition-all resize-none"
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <Button
                onClick={handleExecuteAnalysis}
                disabled={!file || isParsing}
                className="bg-black dark:bg-white hover:opacity-90 disabled:opacity-20 shadow-xl rounded-[1.8rem] w-full h-16 font-black text-white dark:text-black text-xs uppercase tracking-[0.3em] active:scale-[0.97] transition-all"
              >
                Execute Analysis
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>

            <div className="flex items-center gap-2.5 bg-zinc-50/50 dark:bg-zinc-900/30 px-4 py-3 border border-zinc-100 dark:border-zinc-800 rounded-xl">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <p className="font-normal text-[13px] text-zinc-500 dark:text-zinc-400 tracking-tight">
                AI-powered matching. Secure processing. No data retention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFUploadSleek;
