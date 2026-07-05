import type { Metadata } from "next";
import ProjectsContent from "@/components/company/ProjectsContent";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Forra Energy's installed projects across Nigeria — from residential estates to healthcare, agriculture and industrial plants. Real systems, measured outcomes, filterable by sector.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
