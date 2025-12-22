"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const TermsAndConditions = () => {
  const router = useRouter();

  return (
    <div className="m-4 mx-auto max-w-7xl text-foreground">
      <div className="shadow-sm m-6 p-6 border border-border rounded-xl">
        {/* Navigation */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 font-bold text-[10px] text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 uppercase tracking-[0.2em] transition-all"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back
          </button>
        </div>

        {/* Header */}
        <header className="mb-10 pb-6 border-zinc-100 dark:border-zinc-900 border-b">
          <h1 className="font-black text-zinc-900 dark:text-zinc-100 text-4xl tracking-tight">
            Terms & Conditions
          </h1>
        </header>

        {/* Content */}
        <main className="space-y-10 leading-relaxed">
          <section>
            <h2 className="mb-4 font-bold text-zinc-900 dark:text-zinc-100 text-xl uppercase tracking-tight">
              1. AI Analysis & Accuracy
            </h2>
            <p className="opacity-80 text-base">
              Our platform uses Multi-Model AI (Gemini/Llama) to analyze resumes. While our
              suggestions are data-driven, we do not guarantee 100% accuracy or job placement. The
              final decision to apply with the generated content rests solely with the user.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-zinc-900 dark:text-zinc-100 text-xl uppercase tracking-tight">
              2. Data Processing & Privacy
            </h2>
            <p className="opacity-80 text-base">
              By uploading your resume, you grant us permission to process the data for analysis. We
              ensure that your professional information is never used to train public AI models and
              is handled with enterprise-grade security.
            </p>
          </section>

          <section className="bg-zinc-50 dark:bg-zinc-900/50 p-6 border-zinc-900 dark:border-zinc-100 border-l-4 rounded-r-xl transition-all">
            <p className="font-bold text-zinc-800 dark:text-zinc-200 text-base sm:text-lg italic">
              Note: Our AI advisor provides "recommendations" based on common ATS patterns. Use them
              as a guide to supplement your own professional judgment.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-zinc-900 dark:text-zinc-100 text-xl uppercase tracking-tight">
              3. User Responsibility
            </h2>
            <p className="opacity-80 text-base">
              Users must provide authentic and accurate professional information. Any misuse of the
              service, including uploading malicious files or scraping AI-generated insights, will
              result in immediate access termination.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-zinc-900 dark:text-zinc-100 text-xl uppercase tracking-tight">
              4. Service Evolution
            </h2>
            <p className="opacity-80 text-base">
              We continuously update our AI models to stay aligned with modern recruitment
              standards. These updates happen automatically to ensure you always get the most
              relevant career insights.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TermsAndConditions;
