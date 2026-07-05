"use client";

import { useRouter } from "next/navigation";
import { ChartIc, CpuIc, GlobeIc, LeafIc, ShieldIc, TickIc, type IconType } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CountUp } from "@/components/ui/CountUp";
import { useOverlay } from "@/context/OverlayProvider";

const VALUES = [
  [CpuIc, "Engineering first", "Every system is designed by certified engineers from your real load data — never from a sales template."],
  [GlobeIc, "Access by design", "Financing isn't an add-on. We build payment plans into everything so clean energy isn't only for the few."],
  [ChartIc, "Data over guesswork", "We monitor what we install. Recommendations come from your numbers, not our opinions."],
  [ShieldIc, "Built for the long term", "Tier-1 components, honest warranties and a support team that still answers in year seven."],
  [TickIc, "Radical transparency", "Clear pricing, clear trade-offs, clear reports. If a smaller system serves you better, we'll say so."],
  [LeafIc, "Sustainability that pays", "Carbon impact matters — but we design so that doing the right thing is also the cheaper thing."],
] as [IconType, string, string][];
const TEAM = [
  { n: "Christopher Aniedi", r: "Co-founder & CEO", b: "Founder and operator. Started Forra to make reliable, clean power the default for African homes and businesses — not a luxury.", init: "CA" },
  { n: "Olumide Adeyemi", r: "Co-founder & CTO", b: "Ex-power infrastructure. Spent a decade on national grid projects before betting on distributed energy.", init: "OA" },
  { n: "Chiamaka Eze", r: "Head of Financing", b: "A decade building fintech platforms. Now designs the financing that puts clean energy within reach.", init: "CE" },
  { n: "Ibrahim Suleiman", r: "Head of Engineering", b: "COREN-certified. Has personally commissioned over 250 hybrid systems across 12 states.", init: "IS" },
  { n: "Ronke Oladipo", r: "Head of Sales", b: "Turns complex energy decisions into clear, honest choices for homes and businesses — no overselling, ever.", init: "RO" },
];
const MILESTONES = [
  ["2022", "Founded in Lagos", "Three engineers, one van, and a conviction that energy should be intelligent."],
  ["2023", "First 100 installations", "Homes and small businesses across Lagos and Ogun — every one still monitored today."],
  ["2024", "Financing launched", "Partnered with lenders to make ownership possible without lump sums."],
  ["2025", "Energy Intelligence ships", "Our monitoring and analytics platform goes live for every customer, free."],
  ["2026", "Growing the footprint", "Now installing across 12+ states — and counting."],
];
const AboutContent = () => {
  const { openStart } = useOverlay();
  const router = useRouter();
  return (
    <main className="page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Eyebrow>About Forra</Eyebrow>
          <h1>Energy independence, engineered for Africa<span className="gold">.</span></h1>
          <p>We started Forra because the most productive people and businesses on the continent were spending their best money on diesel — and flying blind on where it went.</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="metrics metrics--about">
            {[
              { k: <CountUp to={2.6} dp={1} suffix=" MW" />, l: "Installed capacity" },
              { k: <CountUp to={380} suffix="+" />, l: "Projects completed" },
              { k: <CountUp to={12} suffix="+" />, l: "States covered" },
              { k: <CountUp to={97} suffix="%" />, l: "Systems online right now" },
            ].map((m, i) => (
              <div className="metric" key={i}><strong>{m.k}</strong><span>{m.l}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="container split split--top">
          <div>
            <Eyebrow>Why we exist</Eyebrow>
            <h2>Power shouldn't be the hardest part of building something.</h2>
          </div>
          <div className="ab-story">
            <p>Across Nigeria, families and businesses run on a patchwork of unreliable grid supply and expensive generators. The costs are enormous — and mostly invisible. Nobody can tell you what a kilowatt-hour actually costs them, so nobody can make it cheaper.</p>
            <p>Forra combines three things that usually live in separate companies: <strong>engineering</strong> (systems designed and installed properly), <strong>financing</strong> (payment plans that make ownership possible), and <strong>software</strong> (monitoring and intelligence that shows you exactly what your energy is doing).</p>
            <p>The result is simple: our customers know their numbers, control their costs, and stop thinking about power — which is the whole point.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Eyebrow>Values</Eyebrow>
            <h2>How we decide things.</h2>
          </div>
          <div className="why-grid">
            {VALUES.map(([Ic, t, d]) => (
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
            <Eyebrow>Leadership</Eyebrow>
            <h2>Engineers and operators.<br />Not middlemen.</h2>
          </div>
          <div className="team-grid">
            {TEAM.map((m) => (
              <article className="team-card" key={m.n}>
                <span className="team-avatar">{m.init}</span>
                <h3>{m.n}</h3>
                <em>{m.r}</em>
                <p>{m.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Eyebrow>Milestones</Eyebrow>
            <h2>Four years of receipts.</h2>
          </div>
          <div className="tl">
            {MILESTONES.map(([y, t, d]) => (
              <div className="tl-item" key={y}>
                <span className="tl-year">{y}</span>
                <div className="tl-body"><strong>{t}</strong><p>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--mist section--tight">
        <div className="container ab-cta">
          <div>
            <h2>Build the grid that should exist.</h2>
            <p>We're hiring engineers, energy analysts and financing operations people across Nigeria.</p>
          </div>
          <div className="ab-cta-actions">
            <Btn kind="outline" onClick={() => router.push("/contact")}>Contact the team</Btn>
            <Btn onClick={openStart}>Start your energy audit</Btn>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutContent;
