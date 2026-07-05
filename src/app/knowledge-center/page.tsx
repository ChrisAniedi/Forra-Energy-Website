import type { Metadata } from "next";
import KnowledgeContent from "@/components/resources/KnowledgeContent";

export const metadata: Metadata = {
  title: "Knowledge Center",
  description:
    "Guides, lessons, case studies and tools to help you understand solar, size it right and make a confident decision — all in one place.",
};

export default function KnowledgeCenterPage() {
  return <KnowledgeContent />;
}
