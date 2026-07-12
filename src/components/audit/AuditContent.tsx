"use client";

import { useMemo, useRef, useState } from "react";
import {
  APPLIANCES, CATEGORIES, CAT_ICON, CHEMS, FIN_TERMS, PRESETS, RESERVE, STATES, SUN_HOURS, SYSTEM_TYPES,
  calcAudit, financingMonthly, batteryBank, type ChemKey, type LoadItem, type SystemType,
} from "@/components/audit/appliances";
import { fmtN } from "@/lib/format";
import { downloadAuditReport } from "@/lib/auditReport";
import { submitLead } from "@/lib/leads";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useOverlay } from "@/context/OverlayProvider";
import { ArrowR, BatteryIc, CpuIc, DocIc, LeafIc, SunIc, TickIc, TimerIc, WalletIc } from "@/components/ui/icons";

const BACKUPS = [6, 12, 18, 24];

const AuditContent = () => {
  const { openStart, openExpert } = useOverlay();
  const [state, setState] = useState("Lagos");
  const [system, setSystem] = useState<SystemType>("Hybrid");
  const [chem, setChem] = useState<ChemKey>("Lithium");
  const [backup, setBackup] = useState(12);
  const [bill, setBill] = useState(120000);
  const [fuel, setFuel] = useState(80000);
  const [budget, setBudget] = useState(0);
  const [cat, setCat] = useState<string>(CATEGORIES[0]);
  const [load, setLoad] = useState<LoadItem[]>([]);
  const [term, setTerm] = useState(24);
  const [cName, setCName] = useState("");
  const [cWatts, setCWatts] = useState("");
  const [cHours, setCHours] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [showDl, setShowDl] = useState(false);
  const [dlName, setDlName] = useState("");
  const [dlEmail, setDlEmail] = useState("");
  const customSeq = useRef(0);

  const sunHours = SUN_HOURS[state] ?? 5;
  const onGrid = system === "On-grid";

  const add = (id: string) => {
    const a = APPLIANCES.find((x) => x.id === id);
    if (!a) return;
    setLoad((prev) => {
      const found = prev.find((p) => p.id === id);
      if (found) return prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { ...a, qty: 1 }];
    });
  };
  const setQty = (id: string, d: number) =>
    setLoad((prev) => prev.flatMap((p) => (p.id === id ? (p.qty + d <= 0 ? [] : [{ ...p, qty: p.qty + d }]) : [p])));
  const setHours = (id: string, h: number) =>
    setLoad((prev) => prev.map((p) => (p.id === id ? { ...p, hours: Math.max(0, Math.min(24, h)) } : p)));
  const setWatts = (id: string, w: number) =>
    setLoad((prev) => prev.map((p) => (p.id === id ? { ...p, watts: Math.max(0, Math.round(w) || 0) } : p)));
  const remove = (id: string) => setLoad((prev) => prev.filter((p) => p.id !== id));
  const applyPreset = (items: [string, number][]) =>
    setLoad(items.map(([id, qty]) => ({ ...APPLIANCES.find((a) => a.id === id)!, qty })));
  const addCustom = () => {
    const w = Math.round(+cWatts);
    const h = Math.max(0, Math.min(24, +cHours || 0));
    if (!cName.trim() || !w || w <= 0) return;
    customSeq.current += 1;
    setLoad((prev) => [...prev, { id: `custom-${customSeq.current}`, name: cName.trim(), watts: w, hours: h || 1, cat: "Custom", qty: 1 }]);
    setCName(""); setCWatts(""); setCHours("");
  };

  const res = useMemo(
    () => calcAudit({ load, chem, system, backupHours: backup, sunHours, currentSpend: bill + fuel, budget }),
    [load, chem, system, backup, sunHours, bill, fuel, budget]
  );
  const monthly = financingMonthly(res.total, term);
  const qtyOf = (id: string) => load.find((p) => p.id === id)?.qty ?? 0;
  const recoSummary = res.empty
    ? ""
    : `${res.inverterKva} kVA ${system}${res.batteryKwh > 0 ? ` · ${res.batteryKwh} kWh ${chem}` : ""} · est. ${fmtN(res.costLow)}–${fmtN(res.costHigh)}`;

  const dlValid = dlName.trim().length > 1 && /.+@.+\..+/.test(dlEmail.trim());
  const confirmDownload = async () => {
    if (downloading || res.empty || !dlValid) return;
    setDownloading(true);
    try {
      const dateLabel = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
      await downloadAuditReport({ state, system, chem, backup, res, monthly, term, load, bill, fuel, budget, name: dlName.trim(), email: dlEmail.trim(), dateLabel });
      submitLead({
        source: "Audit report",
        name: dlName.trim(),
        email: dlEmail.trim(),
        details: `${recoSummary}${res.constrained ? ` · budget ${fmtN(budget)}` : ""}`,
      });
      setShowDl(false);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <main className="page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Eyebrow>Self-service energy audit</Eyebrow>
          <h1>Size your solar system<span className="gold">.</span></h1>
          <p>Add the appliances you run, tell us your state and backup target, and watch the right inverter, battery and panel array size themselves — with an instant cost and savings estimate.</p>
          <ul className="pr-points">
            {["Instant sizing", "Cost & financing estimate", "Based on your real load", "No sign-up needed"].map((t) => (
              <li key={t}><TickIc size={15} color="#0A7A50" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container aud-shell">
          {/* ---------------- inputs ---------------- */}
          <div className="aud-form">
            <div className="aud-card">
              <h3 className="aud-h">1 · Location &amp; system</h3>
              <div className="aud-field">
                <label htmlFor="aud-state">Your state <em className="aud-sun">{sunHours.toFixed(1)}h peak sun</em></label>
                <select id="aud-state" value={state} onChange={(e) => setState(e.target.value)}>
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="aud-field">
                <label>System type</label>
                <div className="seg seg--fill">
                  {SYSTEM_TYPES.map((s) => (
                    <button key={s.key} className={"seg-btn" + (system === s.key ? " on" : "")} onClick={() => setSystem(s.key)}>{s.label}</button>
                  ))}
                </div>
              </div>
              <div className={"aud-field" + (onGrid ? " aud-field--off" : "")}>
                <label>Battery chemistry</label>
                <div className="seg seg--fill">
                  {(Object.keys(CHEMS) as ChemKey[]).map((k) => (
                    <button key={k} className={"seg-btn" + (chem === k ? " on" : "")} disabled={onGrid} onClick={() => setChem(k)}>{k}</button>
                  ))}
                </div>
              </div>
              <div className={"aud-field" + (onGrid ? " aud-field--off" : "")}>
                <label>Backup target</label>
                <div className="seg seg--fill">
                  {BACKUPS.map((b) => (
                    <button key={b} className={"seg-btn" + (backup === b ? " on" : "")} disabled={onGrid} onClick={() => setBackup(b)}>{b === 24 ? "24/7" : b + "h"}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="aud-card">
              <h3 className="aud-h">2 · Current monthly spend <em className="aud-opt">optional — powers your savings estimate</em></h3>
              <div className="aud-spend">
                <div className="aud-field">
                  <label htmlFor="aud-bill">Electricity bill</label>
                  <div className="aud-money"><span>₦</span><input id="aud-bill" type="number" min={0} value={bill} onChange={(e) => setBill(+e.target.value || 0)} /></div>
                </div>
                <div className="aud-field">
                  <label htmlFor="aud-fuel">Generator fuel</label>
                  <div className="aud-money"><span>₦</span><input id="aud-fuel" type="number" min={0} value={fuel} onChange={(e) => setFuel(+e.target.value || 0)} /></div>
                </div>
              </div>
            </div>

            <div className="aud-card">
              <h3 className="aud-h">3 · Your budget <em className="aud-opt">optional — we size the best system within it</em></h3>
              <div className="aud-field">
                <label htmlFor="aud-budget">Budget for the system</label>
                <div className="aud-money"><span>₦</span><input id="aud-budget" type="number" min={0} value={budget || ""} placeholder="Leave blank for our best-fit recommendation" onChange={(e) => setBudget(+e.target.value || 0)} /></div>
              </div>
            </div>

            <div className="aud-card">
              <h3 className="aud-h">4 · Your appliances</h3>
              <div className="aud-presets">
                <span>Quick start:</span>
                {PRESETS.map((p) => (
                  <button key={p.id} className="aud-preset" onClick={() => applyPreset(p.items)} title={p.note}>{p.label}</button>
                ))}
                {load.length > 0 && <button className="aud-clear" onClick={() => setLoad([])}>Clear all</button>}
              </div>
              <div className="aud-cats">
                {CATEGORIES.map((c) => {
                  const Ic = CAT_ICON[c];
                  return (
                    <button key={c} className={"aud-cat" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>
                      <Ic size={15} />{c}
                    </button>
                  );
                })}
              </div>
              <div className="aud-lib">
                {APPLIANCES.filter((a) => a.cat === cat).map((a) => {
                  const n = qtyOf(a.id);
                  return (
                    <button key={a.id} className={"aud-lib-item" + (n ? " on" : "")} onClick={() => add(a.id)}>
                      <span className="aud-lib-name">{a.name}</span>
                      <span className="aud-lib-w">{a.watts}W</span>
                      <span className="aud-lib-add">{n ? `×${n}` : "+"}</span>
                    </button>
                  );
                })}
              </div>
              <div className="aud-custom">
                <label>Not on the list? Add your own</label>
                <div className="aud-custom-row">
                  <input className="aud-custom-name" placeholder="e.g. Visitor's laptop" value={cName} onChange={(e) => setCName(e.target.value)} />
                  <input type="number" min={0} placeholder="Watts" value={cWatts} onChange={(e) => setCWatts(e.target.value)} />
                  <input type="number" min={0} max={24} step={0.5} placeholder="Hrs/day" value={cHours} onChange={(e) => setCHours(e.target.value)} />
                  <button type="button" className="aud-custom-add" onClick={addCustom}>Add</button>
                </div>
                <p className="aud-custom-hint">Sizing already adds a {Math.round(RESERVE * 100)}% reserve for unforeseen appliances — this is for loads you know about but don&apos;t see above.</p>
              </div>
            </div>

            <div className="aud-card">
              <div className="aud-load-head">
                <h3 className="aud-h">Your load <em>{load.length} item{load.length === 1 ? "" : "s"}</em></h3>
                {!res.empty && <strong className="aud-load-kwh">{res.dailyKwh} kWh/day</strong>}
              </div>
              {load.length === 0 ? (
                <p className="aud-empty">Add appliances above, or tap a quick-start profile, to build your daily load.</p>
              ) : (
                <>
                <p className="aud-load-tip">Tip: tap any <b>watt</b> or <b>hour</b> value to match your own appliance — our figures are just typical estimates.</p>
                <ul className="aud-load">
                  {load.map((p) => (
                    <li key={p.id}>
                      <div className="aud-load-info">
                        <strong>{p.name}</strong>
                        <span>
                          <input className="aud-hrs aud-w" type="number" min={0} value={p.watts} onChange={(e) => setWatts(p.id, +e.target.value)} />W ·
                          <input className="aud-hrs" type="number" min={0} max={24} step={0.5} value={p.hours} onChange={(e) => setHours(p.id, +e.target.value)} /> h/day
                        </span>
                      </div>
                      <div className="aud-stepper">
                        <button onClick={() => setQty(p.id, -1)} aria-label="Decrease">−</button>
                        <span>{p.qty}</span>
                        <button onClick={() => setQty(p.id, 1)} aria-label="Increase">+</button>
                      </div>
                      <button className="aud-remove" onClick={() => remove(p.id)} aria-label="Remove">✕</button>
                    </li>
                  ))}
                </ul>
                </>
              )}
            </div>
          </div>

          {/* ---------------- live result ---------------- */}
          <aside className="aud-result">
            <div className="aud-result-inner">
              <div className="aud-result-bar">
                <span className="aud-live"><span className="live-dot" /> Live estimate</span>
                <span className="aud-live-state">{state} · {system}</span>
              </div>

              {res.empty ? (
                <div className="aud-result-empty">
                  <span className="aud-result-ic"><CpuIc size={28} color="#0A7A50" /></span>
                  <h3>Your recommendation appears here</h3>
                  <p>Add a few appliances and we&apos;ll size the exact system, cost and savings — updating as you go.</p>
                </div>
              ) : (
                <>
                  <div className="aud-reco">
                    <label>{res.constrained ? "Recommended within budget" : "Recommended system"}</label>
                    <strong>{res.inverterKva} kVA {system}{res.batteryKwh > 0 ? ` · ${res.batteryKwh} kWh` : ""}</strong>
                    <em>{res.batteryKwh > 0 ? `${CHEMS[chem].label} · ${CHEMS[chem].life}${batteryBank(chem, res.batteryKwh) ? ` · ${batteryBank(chem, res.batteryKwh)}` : ""}` : "Grid-tied — no battery storage"}</em>
                  </div>

                  {res.constrained && (
                    <div className="aud-note">
                      <strong>Sized to your budget.</strong> This isn&apos;t the ideal system for your load — it delivers about {res.backupAchieved}h backup. The best-fit system is roughly <b>{fmtN(res.bestTotal)}</b>.
                    </div>
                  )}

                  <div className="aud-specs">
                    <div><span className="aud-spec-ic"><CpuIc size={16} color="#0A7A50" /></span><label>Inverter</label><strong>{res.inverterKva} kVA</strong></div>
                    <div><span className="aud-spec-ic"><BatteryIc size={16} color="#B47B0B" /></span><label>Battery</label><strong>{res.batteryKwh > 0 ? res.batteryKwh + " kWh" : "—"}</strong>{res.batteryKwh > 0 && batteryBank(chem, res.batteryKwh) && <em className="aud-spec-sub">{batteryBank(chem, res.batteryKwh)}</em>}</div>
                    <div><span className="aud-spec-ic"><SunIc size={16} color="#0A7A50" /></span><label>Panels</label><strong>{res.panelCount} × 550W</strong></div>
                    <div><span className="aud-spec-ic"><LeafIc size={16} color="#0A7A50" /></span><label>Daily solar</label><strong>{res.dailyGen} kWh</strong></div>
                  </div>

                  <div className="aud-mini">
                    <div><label>Daily usage</label><strong>{res.dailyKwh} kWh</strong></div>
                    <div><label>Peak load</label><strong>{res.peakKw} kW</strong></div>
                    <div><label>Backup</label><strong>{onGrid ? "—" : backup === 24 ? "24/7" : backup + "h"}</strong></div>
                  </div>

                  <div className="aud-cost">
                    <div className="aud-cost-row">
                      <span><WalletIc size={15} /> Estimated system cost</span>
                      <strong>{fmtN(res.costLow)} – {fmtN(res.costHigh)}</strong>
                    </div>
                    <div className="aud-fin">
                      <div className="aud-fin-head">
                        <span>Or finance from</span>
                        <strong>{fmtN(monthly)}<em>/mo</em></strong>
                      </div>
                      <div className="seg seg--fill aud-terms">
                        {FIN_TERMS.map((t) => (
                          <button key={t} className={"seg-btn" + (term === t ? " on" : "")} onClick={() => setTerm(t)}>{t}mo</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {res.monthlySavings > 0 && (
                    <div className="aud-save">
                      <div><label>Monthly savings</label><strong className="good">{fmtN(res.monthlySavings)}</strong></div>
                      <div><label><TimerIc size={13} /> Payback</label><strong>{res.paybackYears} yrs</strong></div>
                      <div><label><LeafIc size={13} /> CO₂ / yr</label><strong>{res.co2Tonnes} t</strong></div>
                    </div>
                  )}

                  <div className="aud-actions">
                    <button type="button" className="btn btn--gold" onClick={() => openStart({ summary: recoSummary, intent: "quote" })}><span>Get this as a quote</span><ArrowR size={16} /></button>
                    <button type="button" className="btn btn--outline" onClick={() => openExpert({ summary: recoSummary })}><span>Talk to an expert</span></button>
                    <button type="button" className="aud-download" onClick={() => setShowDl(true)}>
                      <DocIc size={15} /><span>Download report (PDF)</span>
                    </button>
                  </div>
                </>
              )}
              <p className="aud-disclaimer">Estimate only — figures use typical Nigerian pricing and are confirmed with a free site survey before installation.</p>
            </div>
          </aside>
        </div>
      </section>

      {showDl && (
        <div className="aud-dlg" role="dialog" aria-modal="true" aria-label="Download report" onClick={() => !downloading && setShowDl(false)}>
          <div className="aud-dlg-card" onClick={(e) => e.stopPropagation()}>
            <button className="xp-close" onClick={() => !downloading && setShowDl(false)} aria-label="Close">✕</button>
            <span className="aud-dlg-ic"><DocIc size={24} color="#0A7A50" /></span>
            <h3>Download your audit report</h3>
            <p>We&apos;ll personalise the PDF with your name. Pop in your details and it downloads right away.</p>
            <label className="f-field"><span>Full name</span>
              <input value={dlName} onChange={(e) => setDlName(e.target.value)} placeholder="Adaeze Okonkwo" /></label>
            <label className="f-field"><span>Email</span>
              <input type="email" value={dlEmail} onChange={(e) => setDlEmail(e.target.value)} placeholder="you@email.com" /></label>
            <button type="button" className={"btn btn--primary aud-dlg-go" + (dlValid ? "" : " btn--disabled")} onClick={confirmDownload} disabled={!dlValid || downloading}>
              <span>{downloading ? "Preparing PDF…" : "Download report"}</span><DocIc size={16} />
            </button>
            <p className="aud-dlg-note">We&apos;ll only use this to send your report and follow up if you ask. No spam.</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default AuditContent;
