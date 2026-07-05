import type { Metadata } from "next";
import { ReligiousContent } from "@/components/solutions/pages";

export const metadata: Metadata = {
  title: "Solar for Religious Organizations",
  description:
    "Silent, reliable solar for churches, mosques and worship centres — keep services, sound and lighting on through any outage, replace the generator's noise, and free funds from diesel for your mission.",
};

export default function ReligiousPage() {
  return <ReligiousContent />;
}
