import type { Metadata } from "next";
import { BlogContent } from "@/components/resources/lists";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical, no-jargon writing on solar, financing and cutting power costs in Nigeria — from the Forra engineers and operators who install it every day.",
};

export default function BlogPage() {
  return <BlogContent />;
}
