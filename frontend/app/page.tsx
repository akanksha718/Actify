import { Hero } from "@/components/landing/Hero";
import { NavBar } from "@/components/landing/NavBar";
import Features from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen ">
      <NavBar />
      <Hero />
      <Features />
      <Footer />
      
    </div>
  );
}
