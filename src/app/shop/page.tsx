import type { Metadata } from "next";
import ShopContent from "@/components/shop/ShopContent";

export const metadata: Metadata = {
  title: "Solar Store",
  description:
    "Engineered lithium and tubular solar packages for Nigerian homes and businesses — sized, installed and monitored by Forra. Get a detailed quote within 24 hours.",
};

export default function ShopPage() {
  return <ShopContent />;
}
