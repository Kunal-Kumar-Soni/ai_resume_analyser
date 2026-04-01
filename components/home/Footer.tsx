import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="bg-background relative w-full overflow-hidden py-12">
      {/* Subtle Background Glow - Hero match */}
      <div className="absolute bottom-0 left-1/2 -z-10 h-24 w-1/2 -translate-x-1/2" />

      <div className="mx-auto max-w-7xl p-6">
        <Separator className="border-zinc-200 dark:border-zinc-800" />

        <div className="mt-12 flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand & Badge */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div
              onClick={() => router.replace("/")}
              className="group flex cursor-pointer items-center gap-2"
            >
              <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-lg transition-transform group-hover:scale-110">
                <span className="text-xl font-black text-white dark:text-black">
                  R
                </span>
              </div>
              <span className="text-2xl font-black tracking-tighter italic">
                Resume<span className="text-primary not-italic">.AI</span>
              </span>
            </div>
            <p className="text-muted-foreground max-w-xs text-center text-sm md:text-left">
              Transforming resumes into powerful career opportunities with AI.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-muted-foreground flex items-center gap-10 text-sm font-semibold">
            <Link
              href="/termsandcondition"
              className="hover:text-primary transition-colors duration-200"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Social Icons - Circle Style */}
          <div className="flex items-center gap-4">
            {[
              {
                icon: <FaLinkedin size={18} />,
                href: "https://www.linkedin.com/in/kunal-kumar-soni/",
              },
              {
                icon: <FaGithub size={18} />,
                href: "https://github.com/Kunal-Kumar-Soni",
              },
              {
                icon: <FaXTwitter size={18} />,
                href: "https://x.com/KunalKumar_Soni",
              },
            ].map((social, idx) => (
              <a
                key={idx}
                target="_blank"
                href={social.href}
                className="bg-card/50 hover:bg-primary/5 border-border/50 hover:border-primary/30 text-muted-foreground hover:text-primary flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-border/20 mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-muted-foreground/60 text-xs font-medium">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-muted-foreground/60 text-[10px] font-bold tracking-widest uppercase">
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
