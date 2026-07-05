import type { Metadata } from "next";
import { HealthcareContent } from "@/components/solutions/pages";

export const metadata: Metadata = {
  title: "Solar for Healthcare",
  description:
    "Seamless, silent, always-on solar power for clinics and hospitals — protecting the cold chain, diagnostics and theatres with zero-gap backup, monitoring and financing built for healthcare facilities.",
};

export default function HealthcarePage() {
  return <HealthcareContent />;
}
