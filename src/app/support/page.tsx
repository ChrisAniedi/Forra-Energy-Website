import type { Metadata } from "next";
import SupportContent from "@/components/resources/SupportContent";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with your Forra system — via the Client Portal, phone, WhatsApp or email — from real engineers, with fast response, remote diagnostics and warranties handled.",
};

export default function SupportPage() {
  return <SupportContent />;
}
