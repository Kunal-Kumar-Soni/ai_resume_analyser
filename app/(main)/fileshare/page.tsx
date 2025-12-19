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
} from "lucide-react";
import { getPDFText } from "@/lib/getPDFText";
import PageLoader from "@/components/ui/custom-animated-loader";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const PDFUploadSleek = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const { user, isLoading } = useAuth();
  const router = useRouter();

  // --- Common Logic for File Processing ---
  const processFile = async (selectedFile: File) => {
    if (!selectedFile || selectedFile.type !== "application/pdf") return;

    setFile(selectedFile);
    setIsParsing(true);

    try {
      const text = await getPDFText(selectedFile);
      setExtractedText(text);
    } catch (err) {
      setFile(null);
    } finally {
      setIsParsing(false);
    }
  };

  // --- Event Handlers ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) processFile(selectedFile);
  };

  // --- Drag and Drop Handlers ---
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

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return <PageLoader />;

  return (
    <div className="selection:bg-zinc-200 dark:selection:bg-zinc-800 mx-auto max-w-7xl min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
      {/* Background Subtle Grid - Sirf CSS se */}
      <div
        className="z-0 fixed inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      ></div>

      <div className="z-10 relative space-y-12 mx-auto p-6 max-w-350">
        {/* --- TOP NAVIGATION BAR --- */}
        <nav className="flex justify-between items-center pb-8 border-zinc-200 dark:border-zinc-800 border-b">
          <div className="flex items-center gap-4">
            {/* Gemini Inspired Icon Box */}
            <div className="group relative flex justify-center items-center bg-black dark:bg-white shadow-2xl rounded-xl w-10 h-10 overflow-hidden">
              <Sparkles className="z-10 relative w-6 h-6 text-white dark:text-black" />
              <div className="absolute inset-0 bg-linear-to-tr from-blue-500/20 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div>
              <h2 className="flex items-center gap-2 font-plusJakartaSans font-bold text-sm uppercase tracking-tight">
                Gemini
              </h2>
              <p className="flex items-center gap-1 font-black text-[9px] text-zinc-400 uppercase tracking-[0.3em]">
                <span className="bg-green-500 rounded-full w-1 h-1 animate-pulse" />
                Neural Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="hover:bg-zinc-50 dark:hover:bg-zinc-900 px-6 py-5 border-zinc-200 dark:border-zinc-800 rounded-full font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all"
            >
              <History className="mr-2 w-3.5 h-3.5" />
              History
            </Button>
          </div>
        </nav>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="items-start gap-12 grid grid-cols-1 lg:grid-cols-12">
          {/* --- LEFT: THE UPLOAD CORE (8 COLS) --- */}
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
                {/* Clean Border Card */}
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
              /* --- FILE LOADED STATE --- */
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
                      <h4 className="font-bold text-xl">{file.name}</h4>
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

          {/* --- RIGHT: THE CONTROL PANEL (4 COLS) --- */}
          <div className="space-y-6 lg:col-span-5">
            <Card className="space-y-8 bg-white dark:bg-[#0a0a0a] shadow-xl p-8 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem]">
              <div className="flex justify-between items-center">
                <h4 className="font-black text-md uppercase tracking-widest">Configuration</h4>
                <Sparkles className="w-4 h-4 text-zinc-400" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <label className="font-black text-[12px] text-zinc-400 uppercase tracking-widest">
                    Job Context
                  </label>
                </div>
                <textarea
                  placeholder="Paste Job Description here..."
                  value={jobDescription}
                  className="bg-zinc-50 dark:bg-[#050505] p-6 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] outline-none focus:ring-1 focus:ring-black dark:focus:ring-white w-full h-72 font-medium dark:placeholder:text-zinc-800 placeholder:text-zinc-300 text-sm transition-all resize-none"
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <Button
                disabled={!file}
                className="bg-black dark:bg-white hover:opacity-90 disabled:opacity-20 shadow-xl rounded-[1.8rem] w-full h-16 font-black text-white dark:text-black text-xs uppercase tracking-[0.3em] active:scale-[0.97] transition-all"
              >
                Execute Analysis <ArrowRight className="ml-2 w-4 h-4" />
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
