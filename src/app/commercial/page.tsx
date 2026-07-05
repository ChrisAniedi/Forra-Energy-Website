import type { Metadata } from "next";
import { CommercialContent } from "@/components/solutions/pages";

export const metadata: Metadata = {
  title: "Commercial Solar",
  description:
    "Enterprise-grade solar and storage for commercial buildings and facilities — three-phase engineering, peak-demand management, PPA and financing options, with facility-wide monitoring and analytics.",
};

export default function CommercialPage() {
  return <CommercialContent />;
}
