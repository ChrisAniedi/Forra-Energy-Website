"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PACKAGES, monthlyFrom } from "@/components/shop/packages";
import { AcIc, ArrowR, BatteryIc, BulbIc, ChartIc, FridgeIc, LeafIc, MonitorIc, PumpIc, ShieldIc, SunIc, TickIc, TvIc, WalletIc, type IconType } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CountUp } from "@/components/ui/CountUp";
import { fmtN } from "@/lib/format";
import { useOverlay } from "@/context/OverlayProvider";

const BENEFITS = [
  [BatteryIc, "Silent, seamless backup", "Power that switches over before you notice an outage — no noise, no fumes, no cranking a generator at 2am."],
  [WalletIc, "Cut the diesel bill", "Most homes replace the bulk of generator spend within the first year. The system pays itself down while you save."],
  [ShieldIc, "Protect your appliances", "Clean, stable power protects fridges, ACs and electronics from the surges and brownouts that kill them early."],
  [MonitorIc, "Monitor from your phone", "See generation, battery level and usage live in the Forra app — know exactly what your power is doing."],
  [ChartIc, "Add value to your home", "A properly installed solar system is a durable upgrade that makes your property more attractive and self-sufficient."],
  [LeafIc, "Cleaner by default", "Quiet, zero-emission power at home — doing the right thing that also turns out to be the cheaper thing."],
] as [IconType, string, string][];

const STEPS = [
  ["Free home audit", "We assess your appliances and daily usage — in person or via the self-audit — and size the exact system."],
  ["Custom design", "Certified engineers design the inverter, battery and panel layout for your roof and load profile."],
  ["Clean installation", "Most homes are installed in a single day: tidy cabling, safety-tested, and a proper handover."],
  ["Monitor & support", "Your system goes live in the app, backed by real warranties and a support team that answers."],
] as [string, string][];

const HOME_PICKS = ["lite-25", "core-5", "core-5p"];

const POWERS: [IconType, string][] = [
  [FridgeIc, "Fridge & freezer"], [AcIc, "AC & fans"], [BulbIc, "Lights"], [TvIc, "TV & Wi-Fi"], [PumpIc, "Water pump"],
];
const CHALLENGES: [string, string][] = [
  ["Outages ruin our evenings", "A hybrid battery bank switches over the instant the grid drops — lights, fans and the TV never even flicker."],
  ["The generator is loud, costly and constant", "Solar and storage do the generator's job silently and for a fraction of the running cost — most homes stop buying diesel within the first year."],
  ["We don't know what we spend on power", "The Forra app shows live generation, battery level and usage, so you always know exactly what your energy costs."],
];

const ResidentialContent = () => {
  const { openExpert } = useOverlay();
  const picks = HOME_PICKS.map((id) => PACKAGES.find((p) => p.id === id)!).filter(Boolean);
  const [ch, setCh] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCh((c) => (c + 1) % CHALLENGES.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="page">
      <section className="page-hero">
        <div className="container sol-hero">
          <div className="sol-hero-copy">
            <Eyebrow>Residential solar</Eyebrow>
            <h1>Reliable power for every room<span className="gold">.</span></h1>
            <p>Keep the lights, fans, fridge and AC running through every outage — quietly, cleanly and for less than you spend on diesel today. Designed, installed and monitored by Forra.</p>
            <ul className="pr-points">
              {["Single-day installation", "Financing available", "10-year battery warranty", "Live app monitoring"].map((t) => (
                <li key={t}><TickIc size={15} color="#0A7A50" />{t}</li>
              ))}
            </ul>
            <div className="hero-actions res-hero-actions">
              <Link href="/audit" className="btn btn--primary"><span>Size my home system</span><ArrowR size={17} /></Link>
              <Link href="/shop" className="btn btn--outline"><span>Browse home systems</span></Link>
            </div>
          </div>
          <aside className="sol-panel">
            <div className="sol-panel-bar">
              <span className="sol-live"><span className="live-dot" />What stays on</span>
              <span className="sol-panel-tag">On solar</span>
            </div>
            <ul className="sol-loads">
              {POWERS.map(([Ic, l], i) => (
                <li key={l} style={{ ["--d" as string]: `${i * 0.25}s` }}>
                  <span className="sol-load-ic"><Ic size={17} color="#0A7A50" /></span>
                  <span className="sol-load-name">{l}</span>
                  <span className="sol-load-dot" />
                </li>
              ))}
            </ul>
            <div className="sol-cov">
              <div className="sol-cov-top"><label>Load on clean power</label><strong>95%</strong></div>
              <div className="sol-cov-bar"><span style={{ ["--w" as string]: "95%" }} /></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="metrics metrics--about">
            {[
              { k: <CountUp to={1500} suffix="+" />, l: "Homes powered" },
              { k: <CountUp to={85} prefix="₦" suffix="k" />, l: "Avg. monthly saving" },
              { k: <CountUp to={12} suffix="+ hrs" />, l: "Typical backup" },
              { k: <CountUp to={1} suffix="-day" />, l: "Install time" },
            ].map((m, i) => (
              <div className="metric" key={i}><strong>{m.k}</strong><span>{m.l}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Eyebrow>Why go solar at home</Eyebrow>
            <h2>The generator was never<br />the real solution.</h2>
          </div>
          <div className="why-grid">
            {BENEFITS.map(([Ic, t, d]) => (
              <article className="why-card" key={t}>
                <span className="why-ic"><Ic size={21} /></span>
                <h3>{t}</h3><p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* interactive challenge switcher */}
      <section className="section">
        <div className="container split split--top">
          <div>
            <Eyebrow>Sound familiar?</Eyebrow>
            <h2>Home power, sorted.</h2>
            <ol className="sol-ch-list">
              {CHALLENGES.map(([q], i) => (
                <li key={q} className={i === ch ? "on" : ""} onClick={() => setCh(i)}>
                  <span className="sol-ch-num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="sol-ch-panel">
            <span className="sol-ch-tag"><TickIc size={14} color="#5FD6A0" />The Forra approach</span>
            <p key={ch}>{CHALLENGES[ch][1]}</p>
          </div>
        </div>
      </section>

      {/* recommended home systems */}
      <section className="section section--mist">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <Eyebrow>Popular at home</Eyebrow>
              <h2>Start with a system<br />built for homes.</h2>
            </div>
            <Link href="/shop" className="eco-link">See all systems<ArrowR size={14} /></Link>
          </div>
          <div className="res-sys">
            {picks.map((p) => (
              <article className="res-sys-card" key={p.id}>
                <div className="res-sys-top">
                  <span className="res-sys-ic"><SunIc size={18} color="#0A7A50" /></span>
                  <div>
                    <h3>{p.name}</h3>
                    <span>{p.kva} kVA · {p.kwh} kWh · {p.backup}</span>
                  </div>
                </div>
                <p className="res-sys-fit">{p.fit}</p>
                <p className="res-sys-powers">{p.powersText}</p>
                <div className="res-sys-foot">
                  <div><label>Financing from</label><strong>{fmtN(monthlyFrom(p.priceFrom))}<em>/mo</em></strong></div>
                  <Link href="/shop" className="btn btn--outline btn--sm"><span>View</span></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Eyebrow>How it works</Eyebrow>
            <h2>From audit to always-on,<br />in four steps.</h2>
          </div>
          <div className="tl">
            {STEPS.map(([t, d], i) => (
              <div className="tl-item" key={t}>
                <span className="tl-year">{String(i + 1).padStart(2, "0")}</span>
                <div className="tl-body"><strong>{t}</strong><p>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--mist section--tight">
        <div className="container">
          <blockquote className="res-quote">
            <p>“We ran a generator for years. Forra sized our system from an audit, financed most of it, and the house has been quiet ever since. The app tells me exactly what we're saving.”</p>
            <footer><span className="res-quote-av">AO</span><span><strong>Adaeze Okonkwo</strong><em>Homeowner · Enugu</em></span></footer>
          </blockquote>
        </div>
      </section>

      {/* financing callout */}
      <section className="section section--tight">
        <div className="container ab-cta">
          <div>
            <h2>Don't pay it all upfront.</h2>
            <p>Own your home system with a small deposit and comfortable monthly repayments — model your plan on the financing page.</p>
          </div>
          <div className="ab-cta-actions">
            <Btn kind="outline" onClick={openExpert}>Talk to an expert</Btn>
            <Link href="/financing" className="btn btn--primary"><span>Explore financing</span><ArrowR size={17} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResidentialContent;
