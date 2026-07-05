import type { Metadata } from "next";
import { EducationContent } from "@/components/solutions/pages";

export const metadata: Metadata = {
  title: "Solar for Education",
  description:
    "Reliable, silent solar power for schools and universities — keep classrooms, labs, dormitories and exam halls running while cutting diesel costs, with financing structured around the school calendar.",
};

export default function EducationPage() {
  return <EducationContent />;
}
