"use client";

import Link from "next/link";
import { ArrowR, DocIc, TickIc } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { useOverlay } from "@/context/OverlayProvider";
import type { Article, Collection } from "@/components/resources/content";

const ResourceDetail = ({ collection, item }: { collection: Collection; item: Article }) => {
  const { openStart } = useOverlay();
  const isGuide = collection.kind === "Guide";

  return (
    <main className="page article-page">
      <section className="page-hero">
        <div className="container article-head">
          <Link href={collection.base} className="article-back"><span aria-hidden="true">←</span> {collection.backLabel}</Link>
          <span className="res-cat">{item.category}</span>
          <h1>{item.title}</h1>
          <p className="article-metaline">{collection.kind} · {item.meta}</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container article-body">
          <p className="article-lead">{item.lead}</p>

          {item.stats && (
            <div className="article-stats">
              {item.stats.map(([l, v]) => (
                <div key={l}><strong>{v}</strong><span>{l}</span></div>
              ))}
            </div>
          )}

          {item.sections.map((s, i) => (
            <div className="article-section" key={s.heading ?? i}>
              {s.heading && <h2>{s.heading}</h2>}
              {s.body?.map((p, j) => <p key={j}>{p}</p>)}
              {s.list && (
                <ul className="article-list">
                  {s.list.map((x) => <li key={x}><TickIc size={16} color="#0A7A50" />{x}</li>)}
                </ul>
              )}
            </div>
          ))}

          {item.quote && (
            <blockquote className="article-quote">
              <p>“{item.quote.text}”</p>
              <footer><strong>{item.quote.name}</strong><em>{item.quote.role}</em></footer>
            </blockquote>
          )}

          {isGuide && (
            <button type="button" className="btn btn--outline article-print" onClick={() => window.print()}>
              <span>Download / print this guide</span><DocIc size={16} />
            </button>
          )}

          <div className="article-cta">
            <div>
              <h2>{collection.ctaTitle}</h2>
              <p>{collection.ctaText}</p>
            </div>
            <div className="article-cta-actions">
              <Link href={collection.base} className="btn btn--outline"><span>{collection.backLabel}</span></Link>
              <Btn onClick={openStart}>Run a free audit</Btn>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResourceDetail;
