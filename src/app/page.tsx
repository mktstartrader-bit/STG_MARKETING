import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Experience } from "@/components/Experience";
import { Clients } from "@/components/Clients";
import { Subscribe } from "@/components/Subscribe";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Background />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Experience />
        <Clients />
        <Subscribe />
      </main>
      <Footer />
    </>
  );
}
