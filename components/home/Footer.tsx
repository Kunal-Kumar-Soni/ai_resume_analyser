import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="relative bg-background py-12 w-full overflow-hidden">
      {/* Subtle Background Glow - Hero match */}
      <div className="bottom-0 left-1/2 -z-10 absolute w-1/2 h-24 -translate-x-1/2" />

      <div className="mx-auto p-6 max-w-7xl">
        <Separator className="border-zinc-200 dark:border-zinc-800" />

        <div className="flex md:flex-row flex-col justify-between items-center gap-8 mt-12">
          {/* Brand & Badge */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div
              onClick={() => router.replace("/")}
              className="group flex items-center gap-2 cursor-pointer"
            >
              <div className="flex justify-center items-center bg-primary rounded-lg w-9 h-9 group-hover:scale-110 transition-transform">
                <span className="font-black text-white dark:text-black text-xl italic">R</span>
              </div>
              <span className="font-black text-2xl italic tracking-tighter">
                Resume<span className="text-primary not-italic">.AI</span>
              </span>
            </div>
            <p className="max-w-xs text-muted-foreground text-sm md:text-left text-center">
              Elevating careers with AI-powered resume intelligence.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-10 font-semibold text-muted-foreground text-sm">
            <Link
              href="/termsandcondition"
              className="hover:text-primary transition-colors duration-200"
            >
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-primary transition-colors duration-200">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors duration-200">
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
              { icon: <FaGithub size={18} />, href: "https://github.com/Kunal-Kumar-Soni" },
              { icon: <FaXTwitter size={18} />, href: "https://x.com/KunalKumar_Soni" },
            ].map((social, idx) => (
              <a
                key={idx}
                target="_blank"
                href={social.href}
                className="flex justify-center items-center bg-card/50 hover:bg-primary/5 border border-border/50 hover:border-primary/30 rounded-full w-10 h-10 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-4 mt-12 pt-8 border-border/20 border-t">
          <p className="font-medium text-muted-foreground/60 text-xs">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="bg-green-500 rounded-full w-2 h-2 animate-pulse" />
            <span className="font-bold text-[10px] text-muted-foreground/60 uppercase tracking-widest">
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
