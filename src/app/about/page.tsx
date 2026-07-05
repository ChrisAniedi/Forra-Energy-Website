import type { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "Energy independence, engineered for Africa. The team, values and milestones behind Forra Energy.",
};

export default function AboutPage() {
  return <AboutContent />;
}
