import type { Metadata } from "next";
import { SmeContent } from "@/components/solutions/pages";

export const metadata: Metadata = {
  title: "Solar for SMEs",
  description:
    "Keep your shop, office or clinic open through every outage with clean, reliable solar power — cheaper than diesel, installed fast, with financing that fits your cash flow.",
};

export default function SmesPage() {
  return <SmeContent />;
}
