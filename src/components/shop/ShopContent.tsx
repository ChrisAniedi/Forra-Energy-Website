"use client";

import { useState } from "react";
import { PACKAGES, SIZE_BANDS, type Package } from "@/components/shop/packages";
import { SystemArt } from "@/components/shop/SystemArt";
import QuotePanel from "@/components/overlays/QuotePanel";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useOverlay } from "@/context/OverlayProvider";
import { ArrowR, GaugeIc, MonitorIc, PeopleIc, SettingIc, ShieldIc, TickIc, WalletIc, type IconType } from "@/components/ui/icons";

const ShopContent = () => {
  const { openStart, openExpert } = useOverlay();
  const [chem, setChem] = useState("all");
  const [size, setSize] = useState("all");
  const [fit, setFit] = useState("all");
  const [quotePkg, setQuotePkg] = useState<Package | null>(null);
  const band = SIZE_BANDS.find((b) => b.id === size);
  const list = PACKAGES.filter((p) =>
    (chem === "all" || p.chem === chem) &&
    (size === "all" || (band && band.test && band.test(p.kva))) &&
    (fit === "all" || p.bestFor === fit || p.bestFor === "both")
  ).sort((a, b) => a.order - b.order);
  const clear = () => { setChem("all"); setSize("all"); setFit("all"); };
  return (
    <main className="page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Eyebrow>Solar store</Eyebrow>
          <h1>Find the right system<span className="gold">.</span></h1>
          <p>Engineered lithium and tubular packages for homes and businesses — sized, installed and monitored by Forra. Pick what fits and get a detailed quote within 24 hours.</p>
          <ul className="pr-points">
            {["Systems in stock", "Free site survey", "Flexible financing", "Installation included"].map((t) => (
              <li key={t}><TickIc size={15} color="#0A7A50" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="pr-toolbar">
            <div className="seg" role="group" aria-label="Battery type">
              {[["all", "All systems"], ["Lithium", "Lithium (LiFePO₄)"], ["Tubular", "Tubular"]].map(([v, l]) => (
                <button key={v} className={"seg-btn" + (chem === v ? " on" : "")} onClick={() => setChem(v)}>{l}</button>
              ))}
            </div>
            <div className="seg" role="group" aria-label="Best for">
              {[["all", "All"], ["home", "Home"], ["business", "Business"]].map(([v, l]) => (
                <button key={v} className={"seg-btn" + (fit === v ? " on" : "")} onClick={() => setFit(v)}>{l}</button>
              ))}
            </div>
            <div className="pr-size">
              <label htmlFor="pr-size-sel">Size</label>
              <select id="pr-size-sel" value={size} onChange={(e) => setSize(e.target.value)}>
                {SIZE_BANDS.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
              </select>
            </div>
          </div>
          <div className="pr-meta">
            <p className="pr-count">Showing {list.length} of {PACKAGES.length} systems</p>
            <button className="eco-link" onClick={openStart}>Not sure? Run a free audit<ArrowR size={14} /></button>
          </div>

          {list.length === 0 ? (
            <div className="pr-empty">
              <span className="ct-sent-ic"><GaugeIc size={26} color="#0A7A50" /></span>
              <h3>No systems match those filters.</h3>
              <p>Widen a filter, or let a free audit size the right system for you.</p>
              <div className="pr-empty-actions">
                <Btn kind="outline" onClick={clear} icon={false}>Clear filters</Btn>
                <Btn onClick={openStart}>Run a free audit</Btn>
              </div>
            </div>
          ) : (
            <div className="pr-grid">
              {list.map((p) => (
                <article key={p.id} className={"pr-card" + (p.badge === "Most popular" ? " pr-card--pop" : "")}>
                  {p.badge && <span className="pr-badge">{p.badge}</span>}
                  <SystemArt p={p} />
                  <div className="pr-body">
                    <div className="pr-head">
                      <h3>{p.name}</h3>
                      <span className="pr-cap">{p.kva} kVA · {p.kwh} kWh</span>
                    </div>
                    <p className="pr-fit">{p.fit}</p>
                    <div className="pr-powers">
                      <label>Comfortably powers</label>
                      <div className="pr-powers-row">
                        {p.powers.map((Ic, i) => <span key={i} className="pw"><Ic size={15} /></span>)}
                      </div>
                      <em>{p.powersText}</em>
                    </div>
                    <div className="pr-specs2">
                      <div><label>Battery</label><strong>{p.battery}</strong></div>
                      <div><label>Backup</label><strong>{p.backup}</strong></div>
                      <div><label>Panels</label><strong>{p.panels}</strong></div>
                      <div><label>Warranty</label><strong>{p.warranty}</strong></div>
                    </div>
                    <div className="pr-fin"><WalletIc size={15} />Flexible financing available</div>
                    <button className="btn btn--primary pr-cta" onClick={() => setQuotePkg(p)}><span>Get a Quote</span><ArrowR size={16} /></button>
                  </div>
                </article>
              ))}
            </div>
          )}
          <p className="pr-note">Every system is sized and confirmed with a free site survey before installation. Detailed pricing, financing plans and timelines come with your quote.</p>
        </div>
      </section>

      <section className="section section--mist section--tight">
        <div className="container">
          <div className="pr-included">
            <div className="pr-included-head">
              <Eyebrow>In every system</Eyebrow>
              <h2>Your quote is the whole story.</h2>
            </div>
            <div className="pr-included-grid">
              {([
                [SettingIc, "Professional installation", "Certified engineers, tidy cabling, safety-tested handover."],
                [MonitorIc, "Monitoring included", "Track generation, battery and usage from the Forra app."],
                [ShieldIc, "Real warranties", "Registered manufacturer warranties — we handle claims."],
                [PeopleIc, "Aftercare that answers", "Support team and maintenance plans for the long run."],
              ] as [IconType, string, string][]).map(([Ic, t, d]) => (
                <div className="pr-inc" key={t}>
                  <span className="why-ic"><Ic size={20} /></span>
                  <strong>{t}</strong><p>{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="ab-cta pr-help">
            <div>
              <h2>Not sure which size fits?</h2>
              <p>A free energy audit sizes the exact inverter, battery and panels for your load — no guesswork, no overselling.</p>
            </div>
            <div className="ab-cta-actions">
              <Btn kind="outline" onClick={openExpert}>Talk to an expert</Btn>
              <Btn onClick={openStart}>Run a free audit</Btn>
            </div>
          </div>
        </div>
      </section>

      {quotePkg && <QuotePanel pkg={quotePkg} onClose={() => setQuotePkg(null)} />}
    </main>
  );
};

export default ShopContent;
