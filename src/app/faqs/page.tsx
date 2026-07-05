import type { Metadata } from "next";
import FaqsContent from "@/components/resources/FaqsContent";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Straight answers to the questions people ask most about Forra solar — systems, financing, installation and support, in plain language.",
};

export default function FaqsPage() {
  return <FaqsContent />;
}
