import { LuSettings, LuUpload } from "react-icons/lu";
import { TbChartPie } from "react-icons/tb";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Works = () => {
  const steps = [
    {
      id: 1,
      title: "Upload Resume",
      icon: <LuUpload size={24} />,
      description:
        "Simply upload your PDF or DOCX. Our AI begins a deep scan of your skills and experience instantly.",
    },
    {
      id: 2,
      title: "Smart ATS Audit",
      icon: <LuSettings size={24} />,
      description:
        "Gemini & Llama analyze your content against modern hiring standards to identify critical gaps.",
    },
    {
      id: 3,
      title: "Get Actionable Insights",
      icon: <TbChartPie size={24} />,
      description:
        "Receive a detailed ATS score and specific tips to optimize your resume for your target job.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden py-10 md:py-15">
      {/* Background decoration - matching Hero/Security */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="font-plusJakartaSans mb-4 text-3xl font-black tracking-tighter md:text-5xl">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg font-medium">
            Three simple steps to make your resume stand out from the crowd.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Subtle connecting line for Desktop */}
          <div className="from-primary/20 via-primary/40 to-primary/20 absolute top-1/2 left-0 hidden h-px w-full -translate-y-1/2 bg-linear-to-r lg:block" />

          {steps.map((step) => (
            <Card
              key={step.id}
              className="group bg-card/50 hover:bg-card hover:shadow-primary/10 border-border/50 relative overflow-hidden rounded-[2.5rem] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <CardHeader className="relative z-10">
                {/* Step Number Badge */}
                <div className="text-primary/5 group-hover:text-primary/10 pointer-events-none absolute right-8 text-6xl font-black transition-colors">
                  0{step.id}
                </div>

                {/* Icon Container with Glow */}
                <div className="bg-primary/10 group-hover:bg-primary shadow-primary/5 text-primary group-hover:text-primary-foreground mb-6 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-all duration-300">
                  {step.icon}
                </div>

                <CardTitle className="font-plusJakartaSans text-foreground text-xl font-bold tracking-tight">
                  {step.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="text-md text-muted-foreground relative z-10 pb-10 leading-relaxed">
                {step.description}
              </CardContent>

              {/* Decorative accent for active step feel */}
              <div className="bg-primary absolute bottom-0 left-0 h-1 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
