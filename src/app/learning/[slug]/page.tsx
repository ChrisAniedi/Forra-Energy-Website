import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceDetail from "@/components/resources/ResourceDetail";
import { LEARNING } from "@/components/resources/content";

export function generateStaticParams() {
  return LEARNING.items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = LEARNING.items.find((i) => i.slug === slug);
  if (!item) return { title: "Lesson" };
  return { title: item.title, description: item.blurb };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = LEARNING.items.find((i) => i.slug === slug);
  if (!item) notFound();
  return <ResourceDetail collection={LEARNING} item={item} />;
}
