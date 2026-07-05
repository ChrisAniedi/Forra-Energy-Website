import type { Metadata } from "next";
import { HospitalityContent } from "@/components/solutions/pages";

export const metadata: Metadata = {
  title: "Solar for Hospitality",
  description:
    "Silent, always-on solar power for hotels, resorts and venues — keep rooms, kitchens and amenities seamless through any outage, protect the guest experience and cut one of your biggest costs.",
};

export default function HospitalityPage() {
  return <HospitalityContent />;
}
