import type { Metadata } from "next";
import AuditContent from "@/components/audit/AuditContent";

export const metadata: Metadata = {
  title: "Energy Audit",
  description:
    "Free self-service solar audit. Add your appliances and get an instant inverter, battery and panel recommendation with a cost, financing and savings estimate — sized to your real load.",
};

export default function AuditPage() {
  return <AuditContent />;
}
