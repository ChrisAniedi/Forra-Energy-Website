"use client";

import { useState } from "react";
import { ArrowR, ChartIc, CpuIc, GlobeIc, HeartIc, LeafIc, PinIc, ShieldIc, TickIc, WalletIc, type IconType } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useOverlay } from "@/context/OverlayProvider";

interface Role { title: string; dept: string; loc: string; type: string; }
const ROLES: Role[] = [
  { title: "Senior Solar Engineer", dept: "Engineering", loc: "Lagos", type: "Full-time" },
  { title: "Energy Analyst", dept: "Engineering", loc: "Lagos", type: "Full-time" },
  { title: "Installation Technician", dept: "Operations", loc: "Multiple states", type: "Full-time" },
  { title: "Project Manager", dept: "Operations", loc: "Abuja", type: "Full-time" },
  { title: "Customer Support Specialist", dept: "Operations", loc: "Lagos", type: "Full-time" },
  { title: "Frontend Engineer", dept: "Software", loc: "Remote (NG)", type: "Full-time" },
  { title: "Backend Engineer", dept: "Software", loc: "Remote (NG)", type: "Full-time" },
  { title: "Sales Lead, SME", dept: "Sales", loc: "Lagos", type: "Full-time" },
  { title: "Financing Operations Officer", dept: "Finance", loc: "Lagos", type: "Full-time" },
];
const DEPTS = ["All", "Engineering", "Software", "Operations", "Sales", "Finance"];

const VALUES: [IconType, string, string][] = [
  [GlobeIc, "Real impact", "Your work puts reliable, clean power into homes, clinics and businesses that need it — impact you can see and measure."],
  [CpuIc, "Engineering-led", "We solve hard problems properly, from load design to the software layer. Craft and rigour are the culture."],
  [ChartIc, "Ownership & growth", "Small teams, real responsibility, and the room to grow fast as we scale across the country."],
  [ShieldIc, "Do it right", "We build for the long term — honest work, honest numbers, and systems we're proud to put our name on."],
];
const PERKS: [IconType, string][] = [
  [WalletIc, "Competitive pay & equity"], [HeartIc, "Health cover"], [LeafIc, "Learning budget"],
  [GlobeIc, "Remote-friendly roles"], [ChartIc, "Clear growth paths"], [ShieldIc, "Real ownership"],
];
const HIRING = [
  ["Apply", "Send your CV and a short note. We read every application — no black hole."],
  ["Intro call", "A 30-minute conversation about you, the role and what you're looking for."],
  ["Skills deep-dive", "A practical session on real problems — no trick questions, just the work."],
  ["Meet the team", "Meet the people you'll work with, ask anything, and get a clear decision fast."],
] as [string, string][];

const CareersContent = () => {
  const { openExpert } = useOverlay();
  const [dept, setDept] = useState("All");
  const list = dept === "All" ? ROLES : ROLES.filter((r) => r.dept === dept);

  return (
    <main className="page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Eyebrow>Careers</Eyebrow>
          <h1>Build the grid that should exist<span className="gold">.</span></h1>
          <p>We're a team of engineers, operators and builders putting clean, reliable energy within reach of every Nigerian home and business. If that's a mission you want to work on, we'd love to meet you.</p>
          <ul className="pr-points">
            {["Real responsibility, fast", "Engineering-led culture", "Remote-friendly roles", "Impact you can measure"].map((t) => (
              <li key={t}><TickIc size={15} color="#0A7A50" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Eyebrow>Why Forra</Eyebrow>
            <h2>Work that matters,<br />done properly.</h2>
          </div>
          <div className="why-grid why-grid--4">
            {VALUES.map(([Ic, t, d]) => (
              <article className="why-card" key={t}>
                <span className="why-ic"><Ic size={21} /></span>
                <h3>{t}</h3><p>{d}</p>
              </article>
            ))}
          </div>
          <div className="perks">
            {PERKS.map(([Ic, t]) => (
              <span className="perk" key={t}><Ic size={16} color="#0A7A50" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* open roles — filterable */}
      <section className="section section--mist">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <Eyebrow>Open roles</Eyebrow>
              <h2>Find your seat.</h2>
            </div>
            <p className="pr-count">{list.length} open role{list.length === 1 ? "" : "s"}</p>
          </div>
          <div className="chip-row co-filters">
            {DEPTS.map((d) => (
              <button key={d} className={"chip" + (dept === d ? " on" : "")} onClick={() => setDept(d)}>{d}</button>
            ))}
          </div>
          <ul className="roles">
            {list.map((r) => (
              <li className="role" key={r.title}>
                <div className="role-main">
                  <strong>{r.title}</strong>
                  <div className="role-meta">
                    <span className="role-dept">{r.dept}</span>
                    <span><PinIc size={13} color="#5C6B62" />{r.loc}</span>
                    <span>{r.type}</span>
                  </div>
                </div>
                <a className="btn btn--outline btn--sm role-apply" href={`mailto:careers@forra.energy?subject=Application: ${encodeURIComponent(r.title)}`}>
                  <span>Apply</span><ArrowR size={15} />
                </a>
              </li>
            ))}
          </ul>
          <p className="pr-note">Don't see your role? We're always glad to meet great people — email <a className="eco-inline" href="mailto:careers@forra.energy">careers@forra.energy</a>.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Eyebrow>Hiring process</Eyebrow>
            <h2>Fair, fast and human.</h2>
          </div>
          <div className="tl">
            {HIRING.map(([t, d], i) => (
              <div className="tl-item" key={t}>
                <span className="tl-year">{String(i + 1).padStart(2, "0")}</span>
                <div className="tl-body"><strong>{t}</strong><p>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark section--tight">
        <div className="container ab-cta">
          <div>
            <h2>Come build with us.</h2>
            <p>Browse the open roles above, or reach out — we're always happy to talk to people who care about this mission.</p>
          </div>
          <div className="ab-cta-actions">
            <Btn kind="outline" onClick={openExpert}>Ask a question</Btn>
            <a href="mailto:careers@forra.energy" className="btn btn--primary"><span>Email careers</span><ArrowR size={17} /></a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CareersContent;
