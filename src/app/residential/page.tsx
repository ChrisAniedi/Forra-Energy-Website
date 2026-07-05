import type { Metadata } from "next";
import ResidentialContent from "@/components/residential/ResidentialContent";

export const metadata: Metadata = {
  title: "Residential Solar",
  description:
    "Reliable, silent solar power for Nigerian homes — keep your lights, fridge and AC running through every outage for less than diesel. Sized, installed in a day and monitored by Forra, with financing available.",
};

export default function ResidentialPage() {
  return <ResidentialContent />;
}
