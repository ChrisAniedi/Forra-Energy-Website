import type { Metadata } from "next";
import { AgricultureContent } from "@/components/solutions/pages";

export const metadata: Metadata = {
  title: "Solar for Agriculture",
  description:
    "Off-grid-ready solar for farms and agribusiness — run irrigation pumps, protect cold storage and power processing without diesel, even where the grid doesn't reach.",
};

export default function AgriculturePage() {
  return <AgricultureContent />;
}
