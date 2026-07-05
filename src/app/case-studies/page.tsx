import type { Metadata } from "next";
import ResourceList from "@/components/resources/ResourceList";
import { CASE_STUDIES } from "@/components/resources/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real Forra installs across Nigeria and the measured outcomes they delivered — from homes and schools to hospitals and industrial plants. Filter by sector.",
};

export default function CaseStudiesPage() {
  return <ResourceList data={CASE_STUDIES} />;
}
