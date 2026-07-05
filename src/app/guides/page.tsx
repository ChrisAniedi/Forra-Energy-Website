import type { Metadata } from "next";
import { GuidesContent } from "@/components/resources/lists";

export const metadata: Metadata = {
  title: "Energy Guides",
  description:
    "In-depth, downloadable solar and energy guides for Nigerian homeowners, businesses and buyers — checklists, references and the details you'll want when planning.",
};

export default function GuidesPage() {
  return <GuidesContent />;
}
