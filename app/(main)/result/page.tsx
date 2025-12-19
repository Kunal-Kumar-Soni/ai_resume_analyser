import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  ShieldCheck,
  Sparkles,
  X,
  Plus,
  ArrowRight,
  FileCheck2,
} from "lucide-react";

const PDFUploadSleek = () => {
  return (
    <div className="space-y-10 bg-white dark:bg-black mx-auto p-6 w-full max-w-7xl transition-colors duration-300">
      {/* --- HEADER --- */}
      <div className="flex md:flex-row flex-col justify-between md:items-end gap-6 pb-10 border-zinc-100 dark:border-zinc-800 border-b">
        <div className="space-y-3">
          <Badge
            variant="outline"
            className="px-4 py-1 border-zinc-200 dark:border-zinc-700 rounded-full font-medium text-zinc-500"
          >
            Document AI v2.0
          </Badge>
          <h1 className="font-bold text-zinc-900 dark:text-zinc-50 text-4xl tracking-tight">
            Upload & Analyze
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">
            Turn your static PDFs into interactive data.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="dark:border-zinc-800 rounded-xl">
            History
          </Button>
          <Button className="bg-zinc-900 dark:bg-zinc-50 hover:opacity-90 rounded-xl text-white dark:text-black">
            <Plus className="mr-2 w-4 h-4" /> New Project
          </Button>
        </div>
      </div>

      <div className="items-start gap-8 grid grid-cols-1 lg:grid-cols-12">
        {/* --- UPLOAD SECTION (8 COLUMNS) --- */}
        <div className="space-y-6 lg:col-span-8">
          <div className="group relative">
            <div className="absolute -inset-1 bg-linear-to-r from-zinc-200 dark:from-zinc-800 to-zinc-100 dark:to-zinc-900 opacity-25 group-hover:opacity-50 rounded-[2rem] transition duration-1000 blur"></div>

            <Card className="relative bg-white dark:bg-zinc-900/50 shadow-sm border-zinc-200 dark:border-zinc-800 rounded-[1.5rem] overflow-hidden">
              <CardContent className="p-0">
                <label className="flex flex-col justify-center items-center w-full min-h-95 cursor-pointer">
                  <div className="flex flex-col items-center p-10">
                    <div className="flex justify-center items-center bg-zinc-50 dark:bg-zinc-800 mb-6 border border-zinc-100 dark:border-zinc-700 rounded-2xl w-20 h-20 group-hover:scale-110 transition-transform duration-300">
                      <Upload className="w-8 h-8 text-zinc-400 dark:text-zinc-500" />
                    </div>

                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-xl">
                      Drag and drop your PDF
                    </h3>
                    <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                      Or{" "}
                      <span className="font-medium text-zinc-900 dark:text-zinc-200 underline">
                        browse files
                      </span>{" "}
                      from your computer
                    </p>

                    <div className="flex items-center gap-6 mt-10">
                      <div className="flex items-center gap-2 font-bold text-[11px] text-zinc-400 uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4" /> Secure
                      </div>
                      <div className="flex items-center gap-2 font-bold text-[11px] text-zinc-400 uppercase tracking-widest">
                        <FileCheck2 className="w-4 h-4" /> PDF Only
                      </div>
                    </div>
                  </div>
                  <input type="file" className="hidden" accept=".pdf" />
                </label>
              </CardContent>
            </Card>
          </div>

          {/* DUMMY RESULT PREVIEW */}
          <div className="group slide-in-from-bottom-2 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/30 p-5 border border-zinc-200 dark:border-zinc-800 rounded-2xl animate-in fade-in">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700 rounded-xl w-12 h-12">
                <FileText className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
              </div>
              <div>
                <p className="font-semibold dark:text-zinc-100 text-sm">
                  quarterly_report_2024.pdf
                </p>
                <p className="text-zinc-500 text-xs">3.2 MB • Ready for analysis</p>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full"
            >
              <X className="w-4 h-4 text-zinc-400" />
            </Button>
          </div>
        </div>

        {/* --- ACTION PANEL (4 COLUMNS) --- */}
        <div className="space-y-4 lg:col-span-4">
          <Card className="bg-white dark:bg-zinc-900/50 shadow-sm border-zinc-200 dark:border-zinc-800 rounded-[1.5rem]">
            <CardContent className="space-y-6 p-6">
              <div className="flex justify-between items-center">
                <h4 className="font-bold dark:text-zinc-100">Analysis Options</h4>
                <Sparkles className="w-4 h-4 text-zinc-400" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center bg-white dark:bg-black/20 p-4 border border-zinc-100 dark:border-zinc-800 rounded-xl">
                  <span className="font-medium text-sm">Auto-Summary</span>
                  <div className="relative bg-zinc-900 dark:bg-zinc-100 rounded-full w-8 h-4">
                    <div className="top-0.5 right-0.5 absolute bg-white dark:bg-black rounded-full w-3 h-3" />
                  </div>
                </div>
                <div className="flex justify-between items-center bg-white dark:bg-black/20 opacity-50 p-4 border border-zinc-100 dark:border-zinc-800 rounded-xl">
                  <span className="font-medium text-sm">Extract Tables</span>
                  <div className="relative bg-zinc-200 dark:bg-zinc-700 rounded-full w-8 h-4">
                    <div className="top-0.5 left-0.5 absolute bg-white rounded-full w-3 h-3" />
                  </div>
                </div>
              </div>

              <Button className="group bg-zinc-900 dark:bg-zinc-50 rounded-xl w-full h-14 font-bold text-white dark:text-black">
                Analyze Document
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>

          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 border border-zinc-100 dark:border-zinc-800 rounded-[1.5rem]">
            <p className="font-medium text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
              Note: This tool uses secure OCR. Your documents are processed and automatically
              removed after 24 hours to ensure your privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFUploadSleek;
