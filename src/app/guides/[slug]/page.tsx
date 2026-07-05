import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceDetail from "@/components/resources/ResourceDetail";
import { GUIDES } from "@/components/resources/content";

export function generateStaticParams() {
  return GUIDES.items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = GUIDES.items.find((i) => i.slug === slug);
  if (!item) return { title: "Guide" };
  return { title: item.title, description: item.blurb };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = GUIDES.items.find((i) => i.slug === slug);
  if (!item) notFound();
  return <ResourceDetail collection={GUIDES} item={item} />;
}
