import { TbChartPie } from "react-icons/tb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuSettings, LuUpload } from "react-icons/lu";

const Works = () => {
  const steps = [
    {
      id: 1,
      title: "Upload Resume",
      icon: <LuUpload size={24} />,
      description:
        "Enhance your career by uploading your resume for an instant AI-powered quality check.",
    },
    {
      id: 2,
      title: "AI Analysis",
      icon: <LuSettings size={24} />,
      description:
        "Our advanced algorithms minimize the effort to analyze and optimize your professional data.",
    },
    {
      id: 3,
      title: "Receive Insights",
      icon: <TbChartPie size={24} />,
      description:
        "Get real-time protections and tailored insights to improve your resume for modern standards.",
    },
  ];

  return (
    <section className="relative py-24 w-full overflow-hidden">
      {/* Background decoration - matching Hero/Security */}
      <div className="top-0 right-1/4 -z-10 absolute rounded-full w-96 h-96" />

      <div className="mx-auto px-6 max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-black text-3xl md:text-5xl tracking-tighter">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="mx-auto max-w-2xl font-medium text-muted-foreground text-lg">
            Three simple steps to make your resume stand out from the crowd.
          </p>
        </div>

        <div className="relative gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Subtle connecting line for Desktop */}
          <div className="hidden lg:block top-1/2 left-0 absolute bg-linear-to-r from-primary/20 via-primary/40 to-primary/20 w-full h-px -translate-y-1/2" />

          {steps.map((step) => (
            <Card
              key={step.id}
              className="group relative bg-card/50 hover:bg-card hover:shadow-2xl hover:shadow-primary/10 backdrop-blur-xl border-border/50 rounded-[2.5rem] overflow-hidden transition-all hover:-translate-y-2 duration-500"
            >
              <CardHeader className="z-10 relative pt-10">
                {/* Step Number Badge */}
                <div className="top-6 right-8 absolute font-black text-primary/5 group-hover:text-primary/10 text-6xl transition-colors pointer-events-none">
                  0{step.id}
                </div>

                {/* Icon Container with Glow */}
                <div className="flex justify-center items-center bg-primary/10 group-hover:bg-primary shadow-lg shadow-primary/5 mb-6 rounded-2xl w-14 h-14 text-primary group-hover:text-primary-foreground transition-all duration-300">
                  {step.icon}
                </div>

                <CardTitle className="font-bold text-foreground text-xl tracking-tight">
                  {step.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="z-10 relative pb-10 text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </CardContent>

              {/* Decorative accent for active step feel */}
              <div className="bottom-0 left-0 absolute bg-primary opacity-0 group-hover:opacity-100 w-full h-1 transition-opacity duration-300" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
