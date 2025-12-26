import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider";

const plusJakartaSans = Geist_Mono({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Resume.Ai",
    template: "Resume.Ai | %s",
  },
  description: "AI powered resume analyzer for job seekers",
  keywords: ["resume", "AI resume", "resume analyzer", "job"],
  authors: [{ name: "Kunal Kumar Soni" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable}   antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Toaster position="top-center" duration={3000} theme="system" />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
