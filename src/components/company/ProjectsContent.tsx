"use client";

import { useState } from "react";
import Link from "next/link";
import { PinIc, TickIc } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CountUp } from "@/components/ui/CountUp";
import { useOverlay } from "@/context/OverlayProvider";

interface Project {
  loc: string; sector: string; ind: string; cap: string; size: string; gen: string; out: string;
}
const PROJECTS: Project[] = [
  { loc: "Lekki Phase 1, Lagos", sector: "Residential", ind: "Residential estate", cap: "120 kW", size: "38 homes", gen: "168 MWh/yr", out: "Diesel eliminated across the estate; service charge down 31%." },
  { loc: "Ikeja, Lagos", sector: "Healthcare", ind: "Medical centre", cap: "65 kW + 120 kWh", size: "Medical centre", gen: "94 MWh/yr", out: "Zero outage minutes in theatres since commissioning." },
  { loc: "Abeokuta, Ogun", sector: "Agriculture", ind: "Rice mill", cap: "250 kW", size: "Agro-processing", gen: "372 MWh/yr", out: "Processing costs down 44%; night-shift capacity added." },
  { loc: "Enugu", sector: "Education", ind: "Secondary school", cap: "90 kW + 80 kWh", size: "Boarding school", gen: "132 MWh/yr", out: "Prep and boarding lit every night; diesel budget redirected to staff." },
  { loc: "Victoria Island, Lagos", sector: "Commercial", ind: "Office complex", cap: "300 kW", size: "Office complex", gen: "440 MWh/yr", out: "Peak grid demand cut by half; fully monitored across meters." },
  { loc: "Ibadan, Oyo", sector: "Hospitality", ind: "Hotel", cap: "140 kW + 200 kWh", size: "120-room hotel", gen: "205 MWh/yr", out: "Seamless guest experience; the generator has been retired." },
  { loc: "Kano", sector: "Manufacturing", ind: "Bottling plant", cap: "500 kW", size: "Industrial plant", gen: "740 MWh/yr", out: "Line uptime protected; energy cost per unit down 38%." },
  { loc: "Port Harcourt, Rivers", sector: "SME", ind: "Retail chain", cap: "15 kVA ×4", size: "Retail outlets", gen: "88 MWh/yr", out: "Every branch trades full hours on solar; diesel spend gone." },
  { loc: "Kaduna", sector: "Agriculture", ind: "Poultry farm", cap: "60 kW", size: "Off-grid farm", gen: "88 MWh/yr", out: "Cold storage secured and ventilation reliable — fully off-grid." },
];
const SECTORS = ["All", "Residential", "SME", "Commercial", "Healthcare", "Education", "Hospitality", "Manufacturing", "Agriculture"];
const GRADES = ["a", "b", "c"];

const ProjectsContent = () => {
  const { openStart } = useOverlay();
  const [sector, setSector] = useState("All");
  const list = sector === "All" ? PROJECTS : PROJECTS.filter((p) => p.sector === sector);

  return (
    <main className="page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Eyebrow>Our work</Eyebrow>
          <h1>Proof, installed<span className="gold">.</span></h1>
          <p>From single homes to industrial plants, every Forra system is engineered, installed and monitored — and still running. A look at what clean, reliable power has done across Nigeria.</p>
          <ul className="pr-points">
            {["380+ projects delivered", "12+ states covered", "Every system monitored", "Real, measured outcomes"].map((t) => (
              <li key={t}><TickIc size={15} color="#0A7A50" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="metrics metrics--about">
            {[
              { k: <CountUp to={2.6} dp={1} suffix=" MW" />, l: "Installed capacity" },
              { k: <CountUp to={380} suffix="+" />, l: "Projects completed" },
              { k: <CountUp to={2.3} dp={1} suffix=" GWh" />, l: "Generated / year" },
              { k: <CountUp to={1900} suffix=" t" />, l: "CO₂ offset / year" },
            ].map((m, i) => (
              <div className="metric" key={i}><strong>{m.k}</strong><span>{m.l}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <Eyebrow>Case studies</Eyebrow>
              <h2>Filter by sector.</h2>
            </div>
            <p className="pr-count">{list.length} project{list.length === 1 ? "" : "s"}</p>
          </div>
          <div className="chip-row co-filters">
            {SECTORS.map((s) => (
              <button key={s} className={"chip" + (sector === s ? " on" : "")} onClick={() => setSector(s)}>{s}</button>
            ))}
          </div>
          <div className="proj-grid">
            {list.map((p, i) => (
              <article className="proj-card" key={p.loc + p.ind}>
                <div className={`proj-media proj-media--${GRADES[i % 3]}`}>
                  <div className="proj-panels">{Array.from({ length: 6 }).map((_, j) => <span key={j} />)}</div>
                  <span className="proj-cap">{p.cap}</span>
                </div>
                <div className="proj-body">
                  <div className="proj-meta"><PinIc size={14} color="#5C6B62" />{p.loc}<i>·</i>{p.ind}</div>
                  <h3>{p.out}</h3>
                  <div className="proj-facts">
                    <div><label>System</label><strong>{p.cap}</strong></div>
                    <div><label>Scale</label><strong>{p.size}</strong></div>
                    <div><label>Generation</label><strong>{p.gen}</strong></div>
                  </div>
                  <span className="proj-sector">{p.sector}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark section--tight">
        <div className="container ab-cta">
          <div>
            <h2>Your project could be next.</h2>
            <p>Start with a free audit — we'll size the right system for your home, business or facility and show you the numbers.</p>
          </div>
          <div className="ab-cta-actions">
            <Link href="/audit" className="btn btn--outline"><span>Run a free audit</span></Link>
            <Btn onClick={openStart}>Start your project</Btn>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectsContent;
