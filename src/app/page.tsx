import Hero from "@/components/home/Hero";
import Ecosystem from "@/components/home/Ecosystem";
import AuditSection from "@/components/home/AuditSection";
import Financing from "@/components/home/Financing";
import Intelligence from "@/components/home/Intelligence";
import Why from "@/components/home/Why";
import Savings from "@/components/home/Savings";
import Industries from "@/components/home/Industries";
import Projects from "@/components/home/Projects";
import Process from "@/components/home/Process";
import Partners from "@/components/home/Partners";
import Resources from "@/components/home/Resources";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Ecosystem />
      <AuditSection />
      <Financing />
      <Intelligence />
      <Why />
      <Savings />
      <Industries />
      <Projects />
      <Process />
      <Partners />
      <Resources />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
