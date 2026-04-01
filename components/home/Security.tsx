import { LuFingerprint, LuLock, LuShieldCheck } from "react-icons/lu";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Security = () => {
  const steps = [
    {
      id: 1,
      title: "Authorized Access Only",
      icon: <LuShieldCheck size={24} />,
      description:
        "To ensure your personal data remains private, our platform requires mandatory authentication. No resume can be uploaded or analyzed without a secure login.",
    },
    {
      id: 2,
      title: "Google OAuth Protection",
      icon: <LuLock size={24} />,
      description:
        "We utilize Google Login to provide industry-leading security. This password-less method protects your account from phishing and unauthorized access attempts.",
    },
    {
      id: 3,
      title: "Data Privacy & Security",
      icon: <LuFingerprint size={24} />,
      description:
        "Your resumes are never used for AI training. We ensure 100% data privacy with encrypted processing, meaning your professional details stay yours alone.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden py-10 md:py-15">
      {/* Background decoration to match Hero */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2">
        <div className="absolute top-0 right-0 h-[30%] w-[30%] rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl p-6">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <h2 className="font-plusJakartaSans mb-4 text-3xl font-black tracking-tighter md:text-5xl">
            Bank-Level <span className="text-primary">Security</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Your privacy is our priority. We use the latest technology to keep
            your data safe.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <Card
              key={step.id}
              className="group bg-card/50 hover:bg-card hover:shadow-primary/10 border-border/50 relative overflow-hidden rounded-[2rem] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <CardHeader className="relative z-10">
                {/* Icon Container with Hero-like Glow */}
                <div className="bg-primary/10 group-hover:bg-primary text-primary group-hover:text-primary-foreground mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300">
                  {step.icon}
                </div>
                <CardTitle className="font-plusJakartaSans text-foreground text-xl font-bold tracking-tight">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="font- text-muted-foreground relative z-10 leading-relaxed">
                {step.description}
              </CardContent>

              {/* Subtle bottom gradient line */}
              <div className="via-primary/20 absolute bottom-0 h-0.5 w-full scale-x-0 bg-linear-to-r from-transparent to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Security;
