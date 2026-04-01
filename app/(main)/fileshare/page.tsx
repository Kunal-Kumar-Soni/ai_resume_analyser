"use client";

import React, { useEffect, useState } from "react";
import { GrTechnology } from "react-icons/gr";
import { TbFileTextAi, TbFileTextSpark } from "react-icons/tb";

import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  FileCheck2,
  FileText,
  History,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { generateAiResumeFromGemini } from "@/actions/gemini";
import { generateAiResumeFromGroq } from "@/actions/groq";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLoader from "@/components/ui/custom-animated-loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { getPDFText } from "@/lib/getPDFText";
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

  const cleanName = file?.name.replace(/\.[^/.]+$/, "") || "Untitled";
  const finalTitle = cleanName.endsWith(".pdf")
    ? cleanName
    : `${cleanName}.pdf`;

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
    <div className="mx-auto min-h-screen max-w-7xl text-zinc-900 transition-colors duration-500 selection:bg-zinc-200 dark:text-zinc-100 dark:selection:bg-zinc-800">
      <div className="relative z-10 mx-auto max-w-350 space-y-12 p-6">
        <div className="mb-6">
          <button
            onClick={() => router.replace("/")}
            className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase transition-all hover:text-black dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
        </div>

        <nav className="mb-12 flex items-center justify-between border-b border-zinc-200 pb-8 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-black shadow-2xl dark:bg-white">
              <TbFileTextSpark className="relative z-10 h-6 w-6 text-white dark:text-black" />
              <div className="absolute inset-0 bg-linear-to-tr from-blue-500/20 via-purple-500/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <div>
              <h2 className="flex items-center gap-2 text-sm font-bold tracking-tight">
                AI Powered
              </h2>
              <p className="flex items-center gap-1 text-[9px] font-black tracking-[0.3em] text-zinc-400 uppercase">
                Neural Engine
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => router.push("/fileshare/history")}
              variant="outline"
              className="rounded-full border-zinc-200 px-6 py-5 text-[10px] font-black tracking-widest uppercase transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <History className="mr-2 h-3.5 w-3.5" />
              History
            </Button>
          </div>
        </nav>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <header className="space-y-2">
              <h1 className="text-5xl font-black tracking-tighter lg:text-6xl">
                Extract{" "}
                <span className="text-zinc-400 dark:text-zinc-700">
                  Reality.
                </span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed font-medium text-zinc-500 dark:text-zinc-400">
                Our high-fidelity parser deconstructs complex PDFs into
                structured data in milliseconds.
              </p>
            </header>

            {!file ? (
              <div className="group relative mt-8">
                <div
                  className={`absolute inset-0 rounded-[2.5rem] bg-zinc-100 transition-transform duration-500 dark:bg-zinc-900 ${
                    isDragging
                      ? "scale-100"
                      : "scale-[0.98] group-hover:scale-100"
                  }`}
                ></div>
                <Card
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative overflow-hidden rounded-[2.5rem] border bg-white shadow-sm transition-all duration-500 dark:bg-[#0a0a0a] ${
                    isDragging
                      ? "scale-[1.01] border-black dark:border-white"
                      : "border-zinc-200 group-hover:border-zinc-400 dark:border-zinc-800 dark:group-hover:border-zinc-600"
                  }`}
                >
                  <CardContent className="p-0">
                    <label className="flex min-h-112.5 w-full cursor-pointer flex-col items-center justify-center">
                      <div className="space-y-6 text-center">
                        <div
                          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border shadow-inner transition-all duration-500 ${
                            isDragging
                              ? "scale-110 bg-black text-white dark:bg-white dark:text-black"
                              : "border-zinc-100 bg-zinc-50 group-hover:rotate-6 dark:border-zinc-800 dark:bg-zinc-900"
                          }`}
                        >
                          <Upload
                            className={`h-8 w-8 ${isDragging ? "text-current" : "text-zinc-400"}`}
                          />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold">
                            {isDragging
                              ? "Drop to Upload"
                              : "Select PDF Document"}
                          </h3>
                          <p className="text-sm font-medium text-zinc-500">
                            {isDragging
                              ? "Release your file now"
                              : "Drag & drop or"}{" "}
                            {!isDragging && (
                              <span className="text-black underline dark:text-white">
                                browse system
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-6 pt-4">
                          <div className="flex items-center gap-2 border-r border-zinc-200 pr-6 text-[10px] font-bold tracking-widest text-zinc-400 uppercase dark:border-zinc-800">
                            <ShieldCheck className="h-3.5 w-3.5 text-zinc-900 dark:text-white" />{" "}
                            ISO SECURE
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                            <FileCheck2 className="h-3.5 w-3.5 text-zinc-900 dark:text-white" />{" "}
                            RAW TEXT
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
              <div className="slide-in-from-bottom-4 animate-in fade-in duration-500">
                <Card className="flex items-center justify-between rounded-[2.5rem] border-2 border-black bg-white p-8 shadow-2xl dark:border-white dark:bg-[#0a0a0a]">
                  <div className="flex items-center gap-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900">
                      <FileText className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-black tracking-[0.2em] text-zinc-400 uppercase">
                        Source File
                      </p>
                      <h4 className="text-xl font-bold">
                        {isParsing ? (
                          <div className="flex items-center justify-center gap-2 text-zinc-400">
                            <Spinner className="mt-2 h-8 w-8" />
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
                    className="h-12 w-12 rounded-full border-zinc-200 p-0 transition-colors hover:bg-red-50 hover:text-red-500 dark:border-zinc-800 dark:hover:bg-red-900/10"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </Card>
              </div>
            )}
          </div>

          <div className="space-y-6 lg:col-span-5">
            <Card className="space-y-3 rounded-[2.5rem] border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-[#0a0a0a]">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-black tracking-widest uppercase">
                  Configuration
                </h4>
                <Sparkles className="h-4 w-4 text-zinc-400" />
              </div>

              {/* ENGINE SELECTOR - MINIMALIST PREMIUM */}
              <div className="space-y-2">
                <label className="text-[12px] font-black tracking-widest text-zinc-400 uppercase">
                  AI Engine
                </label>

                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="mt-2 h-14 w-full rounded-2xl border-none bg-zinc-50 px-6 py-8 focus:ring-0 dark:bg-zinc-900/50">
                    <div className="flex items-center gap-3 text-left">
                      <SelectValue />
                    </div>
                  </SelectTrigger>

                  <SelectContent className="rounded-2xl border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
                    <SelectItem
                      value="gemini"
                      className="cursor-pointer rounded-xl py-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center">
                          <Sparkles size={14} />
                        </div>

                        <div className="flex flex-col">
                          <span className="mb-1 leading-tight font-bold uppercase">
                            Gemini
                          </span>
                          <span className="text-xs leading-tight opacity-50">
                            Deep Analysis
                          </span>
                        </div>
                      </div>
                    </SelectItem>

                    <SelectItem
                      value="groq"
                      className="cursor-pointer rounded-xl py-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center">
                          <Zap size={14} />
                        </div>

                        <div className="flex flex-col">
                          <span className="mb-1 leading-tight font-bold uppercase">
                            Groq LPU
                          </span>
                          <span className="text-xs leading-tight opacity-50">
                            Instant Speed
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* job content section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[12px] font-black tracking-widest text-zinc-400 uppercase">
                    Job Context
                  </label>
                </div>
                <textarea
                  placeholder="Paste Job Description here..."
                  value={jobDescription}
                  className="h-72 w-full resize-none rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6 text-sm font-medium transition-all outline-none focus:ring-1 focus:ring-black dark:border-zinc-800 dark:bg-[#050505] dark:focus:ring-white"
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <Button
                onClick={handleExecuteAnalysis}
                disabled={!file || isParsing}
                className="h-16 w-full rounded-[1.8rem] bg-black text-xs font-black tracking-[0.3em] text-white uppercase shadow-xl transition-all hover:opacity-90 active:scale-[0.97] disabled:opacity-20 dark:bg-white dark:text-black"
              >
                Execute Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>

            <div className="flex items-center gap-2.5 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/30">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
              <p className="text-[13px] font-normal tracking-tight text-zinc-500 dark:text-zinc-400">
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
