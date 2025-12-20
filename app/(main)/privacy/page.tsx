"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const PrivacyPolicy = () => {
  const router = useRouter();
  return (
    <div className="m-4 text-foreground">
      <div className="shadow-sm mx-auto p-6 border border-border rounded-xl max-w-6xl">
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
          <h1 className="font-bold text-3xl tracking-tight">Privacy Policy</h1>
          <p className="opacity-60 mt-2 text-sm">Last Updated: December 20, 2025</p>
        </header>

        {/* Content */}
        <main className="space-y-8 leading-relaxed">
          <section>
            <h2 className="mb-3 font-semibold text-primary text-xl">1. Information We Collect</h2>
            <p className="mb-4">
              At Resume.ai, we collect information to provide a better experience for our users.
              This includes:
            </p>
            <ul className="space-y-2 opacity-90 pl-5 list-disc">
              <li>
                <strong>Personal Information:</strong> Name, email address, and professional data
                you provide for resume building.
              </li>
              <li>
                <strong>Usage Data:</strong> IP addresses, browser types, and interaction logs
                through cookies.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-semibold text-primary text-xl">2. How We Use Your Data</h2>
            <p className="mb-4">
              Your data allows us to power our AI features and maintain your account:
            </p>
            <ul className="space-y-2 opacity-90 pl-5 list-disc">
              <li>AI Resume optimization and generation.</li>
              <li>Subscription and account management.</li>
              <li>Critical security updates and service alerts.</li>
            </ul>
          </section>

          <section className="bg-muted/50 p-4 border-primary border-l-4 rounded-r-md">
            <p className="text-sm italic">
              <strong>Note:</strong> We never sell your personal data to third parties. Your privacy
              is our priority.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-semibold text-primary text-xl">3. Your Rights & Control</h2>
            <p className="opacity-90">
              You have full control over your data. You can request to access, modify, or
              permanently delete your account and all associated data at any time by contacting our
              privacy team.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-semibold text-primary text-xl">4. Data Security</h2>
            <p className="opacity-90">
              We implement industry-standard security measures to protect your information. However,
              no method of transmission over the internet is 100% secure, and we cannot guarantee
              absolute security.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
