"use client";

import Link from "next/link";
import { ArrowR, TickIc, type IconType } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CountUp } from "@/components/ui/CountUp";
import { useOverlay } from "@/context/OverlayProvider";

export interface SolutionStat { to: number; prefix?: string; suffix?: string; dp?: number; l: string }

export interface SolutionData {
  eyebrow: string;
  h1: string;
  intro: string;
  points: string[];
  stats: SolutionStat[];
  benefitsEyebrow: string;
  benefitsTitle: string;
  benefits: [IconType, string, string][];
  stepsEyebrow: string;
  stepsTitle: string;
  steps: [string, string][];
  quote: { text: string; name: string; role: string; init: string };
  ctaTitle: string;
  ctaText: string;
}

const SolutionPage = ({ data }: { data: SolutionData }) => {
  const { openExpert } = useOverlay();
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
          <div className="hero-actions res-hero-actions">
            <Link href="/audit" className="btn btn--primary"><span>Get a free audit</span><ArrowR size={17} /></Link>
            <button type="button" className="btn btn--outline" onClick={() => openExpert()}><span>Talk to an expert</span></button>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="metrics metrics--about">
            {data.stats.map((s, i) => (
              <div className="metric" key={i}>
                <strong><CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} dp={s.dp} /></strong>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Eyebrow>{data.benefitsEyebrow}</Eyebrow>
            <h2>{data.benefitsTitle}</h2>
          </div>
          <div className="why-grid">
            {data.benefits.map(([Ic, t, d]) => (
              <article className="why-card" key={t}>
                <span className="why-ic"><Ic size={21} /></span>
                <h3>{t}</h3><p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="container">
          <div className="section-head">
            <Eyebrow>{data.stepsEyebrow}</Eyebrow>
            <h2>{data.stepsTitle}</h2>
          </div>
          <div className="tl">
            {data.steps.map(([t, d], i) => (
              <div className="tl-item" key={t}>
                <span className="tl-year">{String(i + 1).padStart(2, "0")}</span>
                <div className="tl-body"><strong>{t}</strong><p>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <blockquote className="res-quote">
            <p>“{data.quote.text}”</p>
            <footer><span className="res-quote-av">{data.quote.init}</span><span><strong>{data.quote.name}</strong><em>{data.quote.role}</em></span></footer>
          </blockquote>
        </div>
      </section>

      <section className="section section--dark section--tight">
        <div className="container ab-cta">
          <div>
            <h2>{data.ctaTitle}</h2>
            <p>{data.ctaText}</p>
          </div>
          <div className="ab-cta-actions">
            <Btn kind="outline" onClick={() => openExpert()}>Talk to an expert</Btn>
            <Link href="/audit" className="btn btn--primary"><span>Run a free audit</span><ArrowR size={17} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SolutionPage;
