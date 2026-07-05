import type { Metadata } from "next";
import { LearningContent } from "@/components/resources/lists";

export const metadata: Metadata = {
  title: "Solar Learning Hub",
  description:
    "Short, structured lessons that take you from the basics of solar to confidently sizing and owning a system — Nigeria-specific and free to learn.",
};

export default function LearningPage() {
  return <LearningContent />;
}
