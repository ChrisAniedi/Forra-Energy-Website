import type { Metadata } from "next";
import CareersContent from "@/components/company/CareersContent";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Forra Energy — engineers, operators and builders putting clean, reliable power within reach of every Nigerian home and business. Browse open roles across engineering, software, operations and more.",
};

export default function CareersPage() {
  return <CareersContent />;
}
