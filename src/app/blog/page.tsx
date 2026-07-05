import type { Metadata } from "next";
import ResourceList from "@/components/resources/ResourceList";
import { BLOG } from "@/components/resources/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical, no-jargon writing on solar, financing and cutting power costs in Nigeria — from the Forra engineers and operators who install it every day.",
};

export default function BlogPage() {
  return <ResourceList data={BLOG} />;
}
