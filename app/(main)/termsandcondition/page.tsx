"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const TermsAndConditions = () => {
  const router = useRouter();

  return (
    <div className="m-4 text-foreground">
      <div className="shadow-sm mx-auto p-6 border border-border rounded-xl max-w-6xl">
        {/* Navigation */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 font-bold text-[10px] text-zinc-400 hover:text-black dark:hover:text-white uppercase tracking-[0.2em] transition-all"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
        </div>

        {/* Header */}
        <header className="mb-10 pb-6 border-border border-b">
          <h1 className="font-bold text-3xl tracking-tight">Terms & Conditions</h1>
          <p className="opacity-60 mt-2 text-sm">Effective Date: December 20, 2025</p>
        </header>

        {/* Content */}
        <main className="space-y-8 leading-relaxed">
          <section>
            <h2 className="mb-3 font-semibold text-primary text-xl">1. Acceptance of Terms</h2>
            <p className="opacity-90">
              By using Resume.ai, you agree to follow our rules. If you do not agree, please do not
              use our service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-semibold text-primary text-xl">2. User Responsibility</h2>
            <p className="opacity-90">
              You are responsible for the information you enter. Please make sure your professional
              data is accurate and you have the right to use it.
            </p>
          </section>

          <section className="bg-muted/50 p-4 border-primary border-l-4 rounded-r-md">
            <p className="font-medium text-sm italic">
              <strong>Note:</strong> Always review your AI-generated content before final use.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-semibold text-primary text-xl">3. AI Content Disclaimer</h2>
            <p className="opacity-90">
              Our AI generates suggestions to help you. However, we do not guarantee that the
              content will be perfect or lead to a job. Always review your resume before sending it.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-semibold text-primary text-xl">4. Service Changes</h2>
            <p className="opacity-90">
              We may update or change our features at any time to improve the user experience.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TermsAndConditions;
