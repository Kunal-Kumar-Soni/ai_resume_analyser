"use client";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/home/Navbar";
import Security from "@/components/home/Security";
import Testimonials from "@/components/home/Testimonials";
import Works from "@/components/home/Works";
import PageLoader from "@/components/ui/custom-animated-loader";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { isLoading } = useAuth();

  if (isLoading) return <PageLoader />;

  return (
    <div className="animate-in duration-700 fade-in">
      <Navbar />
      <Hero />
      <Security />
      <Works />
      <Testimonials />
      <Footer />
    </div>
  );
}
