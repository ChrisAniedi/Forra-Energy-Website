"use client";

import { useEffect, useState } from "react";
import { BankIc, ChartIc, GlobeIc, SettingIc, ShieldIc, TickIc, WalletIc, type IconType } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useOverlay } from "@/context/OverlayProvider";

const PARTNER_GROUPS: { label: string; items: string[] }[] = [
  { label: "Financing", items: ["Sterling Bank", "Bank of Industry", "REA Nigeria", "Nexus"] },
  { label: "Equipment", items: ["Huawei FusionSolar", "Deye", "Jinko Solar", "Felicity Solar", "Sumry", "Luxwat"] },
  { label: "Certification", items: ["NEMSA Certified", "SON Approved", "COREN Engineers"] },
];

const TYPES: { label: string; blurb: string }[] = [
  { label: "Installers & EPCs", blurb: "Join our certified installer network. Access engineered designs, premium equipment at scale and financing for your customers — while we back you with training, monitoring and aftercare support." },
  { label: "Financial institutions", blurb: "Partner on consumer and SME energy financing. We bring vetted demand, engineered systems and monitoring data that de-risks lending, so more Nigerians can own clean power." },
  { label: "Equipment distributors", blurb: "Supply tier-1 inverters, batteries and panels into a growing pipeline of engineered projects, with predictable volume and a partner that installs to spec every time." },
  { label: "Property developers", blurb: "Build solar into your estates and developments from day one. We design estate-wide systems, structure the financing and manage the rollout across every phase." },
];

const WHY: [IconType, string, string][] = [
  [GlobeIc, "Access a growing market", "Plug into demand across 12+ states and a pipeline of homes, businesses and facilities moving to solar."],
  [ShieldIc, "Engineering you can trust", "Every project is designed and installed to standard by certified engineers — your brand is safe alongside ours."],
  [WalletIc, "Financing built in", "Our financing turns interest into installations, expanding what your customers can actually afford."],
  [ChartIc, "Data-backed decisions", "Monitoring across our fleet gives partners real performance and risk data, not guesswork."],
  [SettingIc, "Support that scales", "Training, tools, monitoring and aftercare so partnerships grow without growing pains."],
  [BankIc, "Aligned incentives", "We win when systems perform for years — so quality and reliability are built into every deal."],
];

const PartnersContent = () => {
  const { openExpert } = useOverlay();
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((c) => (c + 1) % TYPES.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Eyebrow>Partnerships</Eyebrow>
          <h1>Built with trusted partners<span className="gold">.</span></h1>
          <p>Forra combines engineering, financing and technology — and we do it alongside the banks, manufacturers and installers who make reliable clean energy possible at scale.</p>
          <ul className="pr-points">
            {["Tier-1 equipment partners", "Bank & DFI financing", "Certified & compliant", "Nationwide installer network"].map((x) => (
              <li key={x}><TickIc size={15} color="#0A7A50" />{x}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <p className="partners-label">Financing, equipment &amp; certification partners</p>
          <div className="partner-cats">
            {PARTNER_GROUPS.map((g) => (
              <div className="partner-cat" key={g.label}>
                <span className="partner-cat-label">{g.label}</span>
                <div className="partners-row">
                  {g.items.map((p) => <span key={p} className="partner-chip">{p}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* interactive partner-type switcher */}
      <section className="section section--mist">
        <div className="container split split--top">
          <div>
            <Eyebrow>Ways to partner</Eyebrow>
            <h2>Let's build the grid together.</h2>
            <ol className="sol-ch-list">
              {TYPES.map((x, i) => (
                <li key={x.label} className={i === t ? "on" : ""} onClick={() => setT(i)}>
                  <span className="sol-ch-num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{x.label}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="sol-ch-panel">
            <span className="sol-ch-tag"><TickIc size={14} color="#5FD6A0" />How it works</span>
            <p key={t}>{TYPES[t].blurb}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Eyebrow>Why partner with Forra</Eyebrow>
            <h2>A partnership that performs.</h2>
          </div>
          <div className="why-grid">
            {WHY.map(([Ic, title, d]) => (
              <article className="why-card" key={title}>
                <span className="why-ic"><Ic size={21} /></span>
                <h3>{title}</h3><p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark section--tight">
        <div className="container ab-cta">
          <div>
            <h2>Become a Forra partner.</h2>
            <p>Whether you install, finance, supply or develop — let's talk about building reliable clean energy together.</p>
          </div>
          <div className="ab-cta-actions">
            <a href="mailto:partners@forra.energy?subject=Partnership enquiry" className="btn btn--outline"><span>Email the team</span></a>
            <Btn onClick={openExpert}>Talk to us</Btn>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PartnersContent;
