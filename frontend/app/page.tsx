import { Hero } from "@/components/landing/Hero";
import { NavBar } from "@/components/landing/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <NavBar />
      <Hero />
    </div>
  );
}
