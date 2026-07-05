import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceDetail from "@/components/resources/ResourceDetail";
import { CASE_STUDIES } from "@/components/resources/content";

export function generateStaticParams() {
  return CASE_STUDIES.items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = CASE_STUDIES.items.find((i) => i.slug === slug);
  if (!item) return { title: "Case study" };
  return { title: item.title, description: item.blurb };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = CASE_STUDIES.items.find((i) => i.slug === slug);
  if (!item) notFound();
  return <ResourceDetail collection={CASE_STUDIES} item={item} />;
}
