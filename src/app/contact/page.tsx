import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call, WhatsApp, email or visit us in Ikeja or Lekki. A real engineer replies within one business day.",
};

export default function ContactPage() {
  return <ContactContent />;
}
