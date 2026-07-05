import type { Metadata } from "next";
import { GovernmentContent } from "@/components/solutions/pages";

export const metadata: Metadata = {
  title: "Solar for Government",
  description:
    "Reliable, monitored solar for the public sector — keep offices, health centres, water schemes and street lighting running while cutting recurrent diesel spend, with financing and PPA models built for procurement.",
};

export default function GovernmentPage() {
  return <GovernmentContent />;
}
