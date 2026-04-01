"use client";

import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

const TermsAndConditions = () => {
  const router = useRouter();

  return (
    <div className="text-foreground m-4 mx-auto max-w-7xl">
      <div className="border-border m-6 rounded-xl border p-6 shadow-sm">
        {/* Navigation */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase transition-all hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back
          </button>
        </div>

        {/* Header */}
        <header className="mb-10 border-b border-zinc-100 pb-6 dark:border-zinc-900">
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Terms & Conditions
          </h1>
        </header>

        {/* Content */}
        <main className="space-y-10 leading-relaxed">
          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 uppercase dark:text-zinc-100">
              1. AI Analysis & Accuracy
            </h2>
            <p className="text-base opacity-80">
              Our platform uses Multi-Model AI (Gemini/Llama) to analyze
              resumes. While our suggestions are data-driven, we do not
              guarantee 100% accuracy or job placement. The final decision to
              apply with the generated content rests solely with the user.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 uppercase dark:text-zinc-100">
              2. Data Processing & Privacy
            </h2>
            <p className="text-base opacity-80">
              By uploading your resume, you grant us permission to process the
              data for analysis. We ensure that your professional information is
              never used to train public AI models and is handled with
              enterprise-grade security.
            </p>
          </section>

          <section className="rounded-r-xl border-l-4 border-zinc-900 bg-zinc-50 p-6 transition-all dark:border-zinc-100 dark:bg-zinc-900/50">
            <p className="text-base font-bold text-zinc-800 italic sm:text-lg dark:text-zinc-200">
              Note: Our AI advisor provides "recommendations" based on common
              ATS patterns. Use them as a guide to supplement your own
              professional judgment.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 uppercase dark:text-zinc-100">
              3. User Responsibility
            </h2>
            <p className="text-base opacity-80">
              Users must provide authentic and accurate professional
              information. Any misuse of the service, including uploading
              malicious files or scraping AI-generated insights, will result in
              immediate access termination.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 uppercase dark:text-zinc-100">
              4. Service Evolution
            </h2>
            <p className="text-base opacity-80">
              We continuously update our AI models to stay aligned with modern
              recruitment standards. These updates happen automatically to
              ensure you always get the most relevant career insights.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TermsAndConditions;
