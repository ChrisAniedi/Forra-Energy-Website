import type { Metadata } from "next";
import { RealEstateContent } from "@/components/solutions/pages";

export const metadata: Metadata = {
  title: "Solar for Real Estate",
  description:
    "Estate-wide solar for developments and gated communities — lower service charges, power common areas and amenities seamlessly, and make every unit more attractive to buyers and tenants.",
};

export default function RealEstatePage() {
  return <RealEstateContent />;
}
