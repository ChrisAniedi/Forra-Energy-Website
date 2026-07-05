"use client";

import { useMemo, useState } from "react";
import { PACKAGES, SIZE_BANDS, monthlyFrom, type Package } from "@/components/shop/packages";
import { SystemArt } from "@/components/shop/SystemArt";
import QuotePanel from "@/components/overlays/QuotePanel";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fmtN } from "@/lib/format";
import { useOverlay } from "@/context/OverlayProvider";
import { ArrowR, GaugeIc, HeartIc, MonitorIc, PeopleIc, SettingIc, ShieldIc, StarIc, TickIc, WalletIc, type IconType } from "@/components/ui/icons";

const SORTS: [string, string][] = [
  ["popular", "Most popular"], ["price-asc", "Price: low to high"], ["price-desc", "Price: high to low"], ["cap", "Capacity"],
];

/** Star row — supports a half star for ratings like 4.8. */
const Stars = ({ rating }: { rating: number }) => (
  <span className="pr-stars" aria-label={`${rating} out of 5`}>
    {[0, 1, 2, 3, 4].map((i) => (
      <span key={i} className={"pr-star" + (rating >= i + 1 ? " full" : rating >= i + 0.5 ? " half" : "")}><StarIc size={13} /></span>
    ))}
  </span>
);

const ShopContent = () => {
  const { openStart, openExpert } = useOverlay();
  const [chem, setChem] = useState("all");
  const [size, setSize] = useState("all");
  const [fit, setFit] = useState("all");
  const [sort, setSort] = useState("popular");
  const [wish, setWish] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [quotePkg, setQuotePkg] = useState<Package | null>(null);

  const band = SIZE_BANDS.find((b) => b.id === size);
  const list = useMemo(() => {
    const filtered = PACKAGES.filter((p) =>
      (chem === "all" || p.chem === chem) &&
      (size === "all" || (band && band.test && band.test(p.kva))) &&
      (fit === "all" || p.bestFor === fit || p.bestFor === "both")
    );
    const by: Record<string, (a: Package, b: Package) => number> = {
      popular: (a, b) => a.order - b.order,
      "price-asc": (a, b) => a.priceFrom - b.priceFrom,
      "price-desc": (a, b) => b.priceFrom - a.priceFrom,
      cap: (a, b) => b.kva - a.kva,
    };
    return [...filtered].sort(by[sort]);
  }, [chem, size, fit, sort, band]);

  const clear = () => { setChem("all"); setSize("all"); setFit("all"); };
  const toggleWish = (id: string) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  const toggleCompare = (id: string) =>
    setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length >= 3 ? c : [...c, id]));
  const comparePkgs = compare.map((id) => PACKAGES.find((p) => p.id === id)!).filter(Boolean);

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
            <div className="pr-size pr-sort">
              <label htmlFor="pr-sort-sel">Sort</label>
              <select id="pr-sort-sel" value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          </div>
          <div className="pr-meta">
            <p className="pr-count">Showing {list.length} of {PACKAGES.length} systems{wish.length > 0 ? ` · ${wish.length} saved` : ""}</p>
            <button className="eco-link" onClick={() => openStart()}>Not sure? Run a free audit<ArrowR size={14} /></button>
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
              {list.map((p) => {
                const saved = wish.includes(p.id);
                const inCompare = compare.includes(p.id);
                const inStock = p.stock.toLowerCase().includes("stock");
                return (
                  <article key={p.id} className={"pr-card" + (p.badge === "Most popular" ? " pr-card--pop" : "")}>
                    <button className={"pr-wish" + (saved ? " on" : "")} onClick={() => toggleWish(p.id)} aria-label={saved ? "Remove from saved" : "Save"} aria-pressed={saved}>
                      <HeartIc size={17} />
                    </button>
                    {p.badge && <span className="pr-badge">{p.badge}</span>}
                    <SystemArt p={p} />
                    <div className="pr-body">
                      <div className="pr-head">
                        <h3>{p.name}</h3>
                        <span className="pr-cap">{p.kva} kVA · {p.kwh} kWh</span>
                      </div>
                      <div className="pr-rate">
                        <Stars rating={p.rating} />
                        <span className="pr-rate-n">{p.rating.toFixed(1)}</span>
                        <span className="pr-rate-c">({p.reviews})</span>
                        <span className={"pr-avail" + (inStock ? " in" : " lead")}>{inStock ? "In stock" : p.stock}</span>
                      </div>
                      <p className="pr-fit">{p.fit}</p>
                      <div className="pr-powers">
                        <label>Comfortably powers</label>
                        <div className="pr-powers-row">
                          {p.powers.map((Ic, i) => <span key={i} className="pw"><Ic size={15} /></span>)}
                        </div>
                        <em>{p.powersText}</em>
                      </div>
                      <div className="pr-price">
                        <div>
                          <span className="pr-price-lead">Financing from</span>
                          <strong>{fmtN(monthlyFrom(p.priceFrom))}<em>/mo</em></strong>
                        </div>
                        <span className="pr-price-full">est. {fmtN(p.priceFrom)} turnkey</span>
                      </div>
                      <div className="pr-fin"><WalletIc size={15} />Installation, panels &amp; monitoring included</div>
                      <div className="pr-card-actions">
                        <button className="btn btn--primary pr-cta" onClick={() => setQuotePkg(p)}><span>Get a Quote</span><ArrowR size={16} /></button>
                        <button className={"pr-compare" + (inCompare ? " on" : "")} onClick={() => toggleCompare(p.id)} aria-pressed={inCompare}>
                          {inCompare ? "✓ Comparing" : "Compare"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
          <p className="pr-note">Prices are turnkey estimates — every system is sized and confirmed with a free site survey before installation. Detailed pricing, financing plans and timelines come with your quote.</p>
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

      {/* compare tray */}
      {comparePkgs.length > 0 && (
        <div className="pr-tray">
          <div className="container pr-tray-inner">
            <div className="pr-tray-items">
              <span className="pr-tray-label">Compare</span>
              {comparePkgs.map((p) => (
                <span key={p.id} className="pr-tray-chip">{p.name}<button onClick={() => toggleCompare(p.id)} aria-label={`Remove ${p.name}`}>✕</button></span>
              ))}
              {comparePkgs.length < 3 && <span className="pr-tray-hint">add up to {3 - comparePkgs.length} more</span>}
            </div>
            <div className="pr-tray-actions">
              <button className="pr-tray-clear" onClick={() => setCompare([])}>Clear</button>
              <button className="btn btn--primary btn--sm" disabled={comparePkgs.length < 2} onClick={() => setShowCompare(true)}>
                <span>Compare {comparePkgs.length}</span><ArrowR size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {showCompare && comparePkgs.length >= 2 && (
        <div className="pr-cmp-overlay" role="dialog" aria-modal="true" aria-label="Compare systems" onClick={() => setShowCompare(false)}>
          <div className="pr-cmp" onClick={(e) => e.stopPropagation()}>
            <div className="pr-cmp-top">
              <h3>Compare systems</h3>
              <button className="xp-close" onClick={() => setShowCompare(false)} aria-label="Close">✕</button>
            </div>
            <div className="pr-cmp-scroll">
              <table className="pr-cmp-table">
                <thead>
                  <tr>
                    <th />
                    {comparePkgs.map((p) => <th key={p.id}>{p.name}{p.badge && <span className="pr-cmp-badge">{p.badge}</span>}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {([
                    ["Financing from", (p: Package) => `${fmtN(monthlyFrom(p.priceFrom))}/mo`],
                    ["Est. turnkey", (p: Package) => fmtN(p.priceFrom)],
                    ["Rating", (p: Package) => `★ ${p.rating.toFixed(1)} (${p.reviews})`],
                    ["Battery type", (p: Package) => p.chem],
                    ["Inverter", (p: Package) => `${p.kva} kVA`],
                    ["Storage", (p: Package) => `${p.kwh} kWh`],
                    ["Battery", (p: Package) => p.battery],
                    ["Backup", (p: Package) => p.backup],
                    ["Panels", (p: Package) => p.panels],
                    ["Warranty", (p: Package) => p.warranty],
                    ["Best for", (p: Package) => p.fit],
                    ["Availability", (p: Package) => p.stock],
                  ] as [string, (p: Package) => string][]).map(([label, fn]) => (
                    <tr key={label}>
                      <td className="pr-cmp-lbl">{label}</td>
                      {comparePkgs.map((p) => <td key={p.id}>{fn(p)}</td>)}
                    </tr>
                  ))}
                  <tr>
                    <td className="pr-cmp-lbl" />
                    {comparePkgs.map((p) => (
                      <td key={p.id}><button className="btn btn--primary btn--sm" onClick={() => { setShowCompare(false); setQuotePkg(p); }}><span>Get a Quote</span></button></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {quotePkg && <QuotePanel pkg={quotePkg} onClose={() => setQuotePkg(null)} />}
    </main>
  );
};

export default ShopContent;
