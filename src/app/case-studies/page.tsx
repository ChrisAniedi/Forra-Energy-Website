import type { Metadata } from "next";
import { CaseStudiesContent } from "@/components/resources/lists";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real Forra installs across Nigeria and the measured outcomes they delivered — from homes and schools to hospitals and industrial plants. Filter by sector.",
};

export default function CaseStudiesPage() {
  return <CaseStudiesContent />;
}
