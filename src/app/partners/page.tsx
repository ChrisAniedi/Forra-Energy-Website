import type { Metadata } from "next";
import PartnersContent from "@/components/company/PartnersContent";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Forra Energy partners with banks, DFIs, tier-1 equipment manufacturers and certified installers to deliver reliable clean energy at scale. Explore ways to partner with us.",
};

export default function PartnersPage() {
  return <PartnersContent />;
}
