import type { Metadata } from "next";
import FinancingContent from "@/components/financing/FinancingContent";

export const metadata: Metadata = {
  title: "Solar Financing",
  description:
    "Own a solar system with a small upfront and comfortable monthly repayments. Model your plan with Forra's financing calculator — flexible tenors, transparent rates, no collateral on most home plans.",
};

export default function FinancingPage() {
  return <FinancingContent />;
}
