import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HiOutlineUpload } from "react-icons/hi";

const Hero = () => {
  return (
    <section className="bg-amber-50 p-1 rounded-b-md w-full transition-colors duration-300">
      <div className="items-center gap-12 grid grid-cols-1 lg:grid-cols-2 mx-auto px-10 py-16 md:py-24 max-w-7xl">
        {/* Left Side: Content */}
        <div className="space-y-4">
          <h1 className="font-extrabold text-4xl md:text-5xl leading-[1.1]">
            Unlock Your Resume's <br />
            <span className="text-primary">Potential with AI</span>
          </h1>
          <p className="max-w-lg text-text-light dark:text-dark-muted text-lg">
            Upload your resume for instant, actionable insights.
          </p>

          {/* Upload Box (Mimicking the dashed area in image) */}
          <div className="group relative cursor-pointer">
            <div className="flex flex-col justify-center items-center bg-white/50 dark:bg-dark-card/50 p-10 border-2 border-gray-300 dark:border-gray-700 group-hover:border-primary border-dashed rounded-2xl transition-all">
              <div className="bg-white dark:bg-dark-card shadow-sm mb-4 p-4 rounded-full">
                <HiOutlineUpload className="text-primary" size={30} />
              </div>
              <h3 className="font-bold text-text-dark dark:text-dark-text">
                Drag and drop upload zone
              </h3>
              <p className="mb-6 text-text-light dark:text-dark-muted text-sm">
                Drag your resume to check here
              </p>

              <Button className="bg-customBlue hover:bg-customBlueHover px-8 py-6 rounded-full font-bold text-white">
                Analyse My Resume
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side: Score Card Visualization */}
        <div className="flex justify-center lg:justify-end">
          <Card className="relative bg-white dark:bg-dark-card shadow-2xl p-8 border-none rounded-[32px] w-full max-w-100 overflow-hidden">
            <div className="space-y-6 text-center">
              <p className="font-bold text-md text-text-light dark:text-dark-muted uppercase">
                Resume Score
              </p>

              {/* Circular Progress Mockup */}
              <div className="relative flex justify-center items-center">
                <svg className="w-48 h-48 -rotate-90 transform">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-gray-100 dark:text-gray-800"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={502}
                    strokeDashoffset={502 * (1 - 0.78)}
                    className="text-customBlue transition-all duration-500 ease-in-out"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute font-black text-customBlue text-5xl">78%</span>
              </div>

              {/* Skeleton lines representing resume data */}
              <div className="space-y-3 pt-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-full h-2"></div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-4/5 h-2"></div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-full h-2"></div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-3/4 h-2"></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;
