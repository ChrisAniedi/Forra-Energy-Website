import type { Metadata } from "next";
import ResourceList from "@/components/resources/ResourceList";
import { LEARNING } from "@/components/resources/content";

export const metadata: Metadata = {
  title: "Solar Learning Hub",
  description:
    "Short, structured lessons that take you from the basics of solar to confidently sizing and owning a system — Nigeria-specific and free to learn.",
};

export default function LearningPage() {
  return <ResourceList data={LEARNING} />;
}
