import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider";
import AnalysisProvider from "@/context/AnalysisProvider";

const plusJakartaSans = Geist_Mono({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume.AI",
  description: "Made by Kunal Kumar Soni",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable}  antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <AnalysisProvider>
              <Toaster position="top-center" duration={3000} theme="system" />
              {children}
            </AnalysisProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
