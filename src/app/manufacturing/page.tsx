import type { Metadata } from "next";
import { ManufacturingContent } from "@/components/solutions/pages";

export const metadata: Metadata = {
  title: "Solar for Manufacturing",
  description:
    "Three-phase solar and storage for factories and industrial plants — protect uptime and output, lower your energy cost per unit, and scale as you grow, with financing and PPA options.",
};

export default function ManufacturingPage() {
  return <ManufacturingContent />;
}
