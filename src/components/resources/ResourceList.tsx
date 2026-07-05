"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowR, TickIc } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/Eyebrow";

export interface ResourceItem { title: string; category: string; blurb: string; meta: string }
export interface ResourceListData {
  eyebrow: string;
  h1: string;
  intro: string;
  points: string[];
  categories: string[];
  items: ResourceItem[];
  ctaTitle: string;
  ctaText: string;
}

const ResourceList = ({ data }: { data: ResourceListData }) => {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? data.items : data.items.filter((i) => i.category === cat);

  return (
    <main className="page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h1>{data.h1}<span className="gold">.</span></h1>
          <p>{data.intro}</p>
          <ul className="pr-points">
            {data.points.map((t) => (
              <li key={t}><TickIc size={15} color="#0A7A50" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="res-bar">
            <div className="chip-row co-filters">
              {data.categories.map((c) => (
                <button key={c} className={"chip" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
            <p className="pr-count">{list.length} item{list.length === 1 ? "" : "s"}</p>
          </div>
          <div className="res-grid">
            {list.map((it) => (
              <article className="res-card" key={it.title}>
                <span className="res-cat">{it.category}</span>
                <h3>{it.title}</h3>
                <p>{it.blurb}</p>
                <span className="res-meta">{it.meta}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark section--tight">
        <div className="container ab-cta">
          <div>
            <h2>{data.ctaTitle}</h2>
            <p>{data.ctaText}</p>
          </div>
          <div className="ab-cta-actions">
            <Link href="/knowledge-center" className="btn btn--outline"><span>Knowledge Center</span></Link>
            <Link href="/audit" className="btn btn--primary"><span>Run a free audit</span><ArrowR size={17} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResourceList;
