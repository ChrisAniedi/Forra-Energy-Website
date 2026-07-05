import type { Metadata } from "next";
import SavingsCalculatorContent from "@/components/resources/SavingsCalculatorContent";

export const metadata: Metadata = {
  title: "Savings Calculator",
  description:
    "Estimate what going solar could save you. Enter your monthly electricity and generator spend and see your projected monthly, annual and 10-year savings with Forra.",
};

export default function SavingsCalculatorPage() {
  return <SavingsCalculatorContent />;
}
