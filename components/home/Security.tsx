import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuShieldCheck, LuLock, LuFingerprint } from "react-icons/lu";

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
      title: "End-to-End Encryption",
      icon: <LuFingerprint size={24} />,
      description:
        "Your documents are processed using AES-256 encryption. Once analyzed, your professional data is visible only to you and is never shared with third-party vendors.",
    },
  ];

  return (
    <section className="relative py-10 md:py-15 w-full overflow-hidden">
      {/* Background decoration to match Hero */}
      <div className="top-1/2 left-1/2 -z-10 absolute w-full h-full -translate-x-1/2 -translate-y-1/2">
        <div className="top-0 right-0 absolute rounded-full w-[30%] h-[30%]" />
      </div>

      <div className="mx-auto p-6 max-w-7xl">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-plusJakartaSans font-black text-3xl md:text-5xl tracking-tighter">
            Bank-Level <span className="text-primary">Security</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Your privacy is our priority. We use the latest technology to keep your data safe.
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <Card
              key={step.id}
              className="group relative bg-card/50 hover:bg-card hover:shadow-2xl hover:shadow-primary/10 backdrop-blur-sm border-border/50 rounded-[2rem] overflow-hidden transition-all hover:-translate-y-2 duration-300"
            >
              <CardHeader className="z-10 relative">
                {/* Icon Container with Hero-like Glow */}
                <div className="flex justify-center items-center bg-primary/10 group-hover:bg-primary mb-4 rounded-2xl w-14 h-14 text-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {step.icon}
                </div>
                <CardTitle className="font-plusJakartaSans font-bold text-foreground text-xl tracking-tight">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="z-10 relative font-inter text-muted-foreground leading-relaxed">
                {step.description}
              </CardContent>

              {/* Subtle bottom gradient line */}
              <div className="bottom-0 absolute bg-linear-to-r from-transparent via-primary/20 to-transparent w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Security;
