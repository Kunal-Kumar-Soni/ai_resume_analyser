import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/home/Navbar";
import Security from "@/components/home/Security";
import Testimonials from "@/components/home/Testimonials";
import Works from "@/components/home/Works";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Security />
      <Works />
      <Testimonials />
      <Footer />
    </div>
  );
}
