"use client";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import PageLoader from "@/components/ui/custom-animated-loader";
import { useAuth } from "@/hooks/useAuth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading } = useAuth();

  if (isLoading) return <PageLoader />;

  return (
    <div className="animate-in duration-700 fade-in">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
