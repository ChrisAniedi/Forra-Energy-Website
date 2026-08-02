"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowR, BankIc, BuildingIc, ChartIc, DocIc, HomeIc, PeopleIc, TickIc, WalletIc, type IconType } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fmtN } from "@/lib/format";
import { useOverlay } from "@/context/OverlayProvider";
import { downloadFinanceReport } from "@/lib/financeReport";
import { emailFinancingPlan, submitLead } from "@/lib/leads";

const PRESETS = [
  { name: "Starter · 2.5kVA", cost: 1450000 },
  { name: "Home · 3.5kVA hybrid", cost: 2200000 },
  { name: "Home · 5kVA hybrid", cost: 3200000 },
  { name: "Home · 10kVA duplex", cost: 5900000 },
  { name: "SME · 15kVA 3-phase", cost: 9800000 },
  { name: "Commercial · 30kVA", cost: 18500000 },
];
const STEPS = [
  ["Free energy audit", "We size the right system from your real load — so you finance exactly what you need, not more."],
  ["Get your plan", "A clear breakdown: system cost, upfront, monthly repayment and total — no hidden fees."],
  ["Pick your terms", "Choose an upfront amount and a repayment tenor that fits your cash flow."],
  ["Quick approval", "Light-touch credit review, typically within 48 hours. No property collateral for most home plans."],
  ["Install & repay", "We install; your system starts saving from day one while you pay it down comfortably."],
] as [string, string][];
const PLANS = [
  [HomeIc, "Forra FlexiPay", "For homes. Pay 20–40% upfront and spread the rest over 6–36 months.", "Most popular"],
  [BuildingIc, "SME PowerPlan", "For shops, offices and clinics. Working-capital-friendly terms up to 48 months.", ""],
  [BankIc, "Lease-to-own", "Little-to-no upfront. Pay a fixed monthly fee and own the system at the end.", ""],
  [ChartIc, "Corporate PPA", "For large facilities. Pay only for the energy produced — we own and maintain the plant.", ""],
] as [IconType, string, string, string][];
const QUALIFY_COMMON = [
  "A completed Forra energy audit",
  "Valid government ID — NIN, driver's licence or passport",
  "Proof of address or a recent utility bill",
  "3–6 months of bank statements",
];
const QUALIFY_EMPLOYEE = [
  "Your last 3 months' payslips",
  "An employment offer or confirmation letter",
  "Employer name and HR contact (for verification)",
];
const QUALIFY_BUSINESS = [
  "CAC registration (business name or company)",
  "6 months of business bank statements",
  "Recent management accounts, if available",
];
const FAQS = [
  ["Do I need collateral?", "Most residential FlexiPay plans are unsecured — the system itself is the security. Larger commercial facilities may have different terms, confirmed during review."],
  ["What interest rate do you charge?", "Plans are quoted at an indicative 36% per year on a reducing-balance basis — interest is charged only on the balance you still owe, so it falls as you repay. The calculator shows this so you can plan; your final offer is confirmed in writing after your credit review."],
  ["How fast is approval?", "Home plans are typically approved within 48 hours of receiving your documents. SME and commercial facilities take a little longer due to additional checks."],
  ["What happens if I want to pay off early?", "You can settle early at any time. We only charge for the months you've used — there's no early-exit penalty on standard home plans."],
  ["Can I finance only part of the system?", "Yes. Choose any upfront amount from 20% upwards; the balance is what you finance. A larger upfront lowers your monthly repayment."],
];

const ANNUAL_RATE = 0.36; // 36% a year, charged on the reducing balance

/** Repayment frequencies. Only monthly is live today; the rest are wired up (rate + ranges)
 *  so switching them on later is a one-line change (enabled: true). */
const FREQ = {
  monthly:    { key: "monthly",    label: "Monthly",     unit: "month",     periodsPerYear: 12,  min: 2, max: 48,  def: 24,  enabled: true },
  weekly:     { key: "weekly",     label: "Weekly",      unit: "week",      periodsPerYear: 52,  min: 2, max: 104, def: 52,  enabled: false },
  daily:      { key: "daily",      label: "Daily",       unit: "day",       periodsPerYear: 365, min: 2, max: 365, def: 180, enabled: false },
  quarterly:  { key: "quarterly",  label: "Quarterly",   unit: "quarter",   periodsPerYear: 4,   min: 2, max: 20,  def: 8,   enabled: false },
  biannually: { key: "biannually", label: "Bi-annually", unit: "half-year", periodsPerYear: 2,   min: 2, max: 10,  def: 4,   enabled: false },
  annually:   { key: "annually",   label: "Annually",    unit: "year",      periodsPerYear: 1,   min: 2, max: 6,   def: 3,   enabled: false },
} as const;
type FreqKey = keyof typeof FREQ;
const plural = (u: string, n: number) => `${u}${n === 1 ? "" : "s"}`;
const QUICK = [3, 6, 9, 12, 24, 36, 48]; // quick-pick payment counts

type SchedRow = { m: number; opening: number; principal: number; interest: number; payment: number; closing: number };

/** Reducing-balance schedule: equal principal each month + interest on the balance still owed.
 *  Interest (and the total payment) falls as the balance drops — matching how the bank charges. */
function buildSchedule(principal: number, monthlyRate: number, months: number) {
  const chunk = months > 0 ? principal / months : 0;
  let balance = principal;
  const rows: SchedRow[] = [];
  let totalInterest = 0;
  let totalPaid = 0;
  for (let m = 1; m <= months; m++) {
    const opening = balance;
    const interest = opening * monthlyRate;
    let principalPart = chunk;
    let closing = opening - principalPart;
    if (m === months || closing < 0.5) {
      principalPart = opening; // clear any rounding dust on the last payment
      closing = 0;
    }
    const payment = principalPart + interest;
    rows.push({ m, opening, principal: principalPart, interest, payment, closing });
    totalInterest += interest;
    totalPaid += payment;
    balance = closing;
    if (balance <= 0) break;
  }
  return {
    rows,
    totalInterest,
    totalPaid,
    first: rows[0]?.payment ?? 0,
    last: rows[rows.length - 1]?.payment ?? 0,
  };
}

const FinancingContent = () => {
  const { openStart, openExpert } = useOverlay();
  const [priceInput, setPriceInput] = useState(String(PRESETS[0].cost));
  const [dpMode, setDpMode] = useState<"pct" | "fixed">("pct");
  const [upfront, setUpfront] = useState(30);
  const [downFixed, setDownFixed] = useState(String(Math.round(PRESETS[0].cost * 0.3)));
  const [freqKey, setFreqKey] = useState<FreqKey>("monthly");
  const [count, setCount] = useState(24);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showDl, setShowDl] = useState(false);
  const [dlName, setDlName] = useState("");
  const [dlEmail, setDlEmail] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [dlSent, setDlSent] = useState(false);

  const cost = Math.max(0, parseInt(priceInput.replace(/[^0-9]/g, "")) || 0);
  const upfrontAmt = dpMode === "pct"
    ? Math.round((cost * upfront) / 100)
    : Math.min(cost, Math.max(0, parseInt(downFixed.replace(/[^0-9]/g, "")) || 0));
  const upfrontPct = cost > 0 ? (upfrontAmt / cost) * 100 : 0;
  const financed = Math.max(0, cost - upfrontAmt);
  const freq = FREQ[freqKey];
  const periodRate = ANNUAL_RATE / freq.periodsPerYear;
  const rateLabel = `${+(periodRate * 100).toFixed(2)}% / ${freq.unit}`;
  const periodTitle = freq.unit.charAt(0).toUpperCase() + freq.unit.slice(1);
  const installments = Math.max(1, count - 1); // payment 1 is the down payment; the rest clear the balance
  const sched = buildSchedule(financed, periodRate, installments);
  const grandTotal = upfrontAmt + sched.totalPaid;
  const extraPct = cost > 0 ? ((grandTotal - cost) / cost) * 100 : 0;
  const belowMin = dpMode === "fixed" && cost > 0 && upfrontPct < 20;

  const changeFreq = (k: FreqKey) => {
    const f = FREQ[k];
    if (!f.enabled) return;
    setFreqKey(k);
    setCount((c) => Math.min(f.max, Math.max(f.min, c)));
  };

  const dlValid = dlName.trim().length > 1 && /.+@.+\..+/.test(dlEmail.trim());
  const openDl = () => { setDlSent(false); setShowDl(true); };
  const confirmDownload = async () => {
    if (downloading || cost <= 0 || !dlValid) return;
    setDownloading(true);
    try {
      const dateLabel = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
      const plan = `${fmtN(cost)} system · ${upfrontPct.toFixed(0)}% upfront · ${count} ${plural(freq.unit, count)} · from ${fmtN(sched.first)}/${freq.unit}`;
      const details = `Upfront ${fmtN(upfrontAmt)} · financed ${fmtN(financed)} · ${count} ${plural(freq.unit, count)} at ${rateLabel} reducing balance · ${freq.label.toLowerCase()} from ${fmtN(sched.first)} down to ${fmtN(sched.last)} · total repayments ${fmtN(sched.totalPaid)} · total cost ${fmtN(grandTotal)}`;
      await downloadFinanceReport({
        cost, upfrontAmt, upfrontPct, financed, count, periodUnit: freq.unit, periodTitle, rateLabel,
        firstPayment: sched.first, lastPayment: sched.last, totalRepay: sched.totalPaid, grandTotal, extraPct,
        rows: sched.rows.map((r) => ({ m: r.m, principal: r.principal, payment: r.payment, closing: r.closing })),
        name: dlName.trim(), email: dlEmail.trim(), dateLabel,
      });
      emailFinancingPlan({ name: dlName.trim(), email: dlEmail.trim(), plan, details });
      submitLead({ source: "Financing plan", name: dlName.trim(), email: dlEmail.trim(), details });
      setDlSent(true);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <main className="page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Eyebrow>Solar financing</Eyebrow>
          <h1>Own clean energy. Pay comfortably<span className="gold">.</span></h1>
          <p>Stop pouring money into diesel with nothing to show for it. Forra financing lets you own a solar system with a small upfront and monthly repayments that a system starts offsetting from day one.</p>
          <ul className="pr-points">
            {["Own from day one", "Flexible tenors", "No collateral on most home plans", "Transparent rates"].map((t) => (
              <li key={t}><TickIc size={15} color="#0A7A50" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* calculator */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <Eyebrow>Plan your payments</Eyebrow>
            <h2>See your monthly number before you commit.</h2>
            <p className="fin-intro-lead">Enter your system amount, set your upfront, frequency and number of repayments, and see the repayment instantly — with the full schedule one tap away. Figures are illustrative; final terms follow a free audit and a quick credit review.</p>
          </div>

          <div className="fin-calc fin-calc--wide">
            <div className="fin-head">
              <span className="fin-title"><WalletIc size={18} color="#0A7A50" /> Financing calculator</span>
              <span className="fin-chip">{rateLabel} · reducing balance</span>
            </div>

            <div className="fin-grid2">
              {/* inputs */}
              <div className="fin-col">
                <div className="fin-field">
                  <label className="fin-lbl">System amount</label>
                  <div className="fin-num-wrap">
                    <span className="fin-num-cur">₦</span>
                    <input className="fin-num" inputMode="numeric" value={Number(cost).toLocaleString("en-NG")}
                      onChange={(e) => setPriceInput(e.target.value)} />
                  </div>
                  <div className="fin-price-chips">
                    {PRESETS.map((p) => (
                      <button key={p.name} className={p.cost === cost ? "on" : ""}
                        onClick={() => { setPriceInput(String(p.cost)); if (dpMode === "fixed") setDownFixed(String(Math.round(p.cost * (upfrontPct || 30) / 100))); }}>
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="fin-field">
                  <div className="fin-field-head">
                    <label className="fin-lbl">Upfront payment</label>
                    <div className="fin-mini">
                      <button className={dpMode === "pct" ? "on" : ""} onClick={() => setDpMode("pct")}>%</button>
                      <button className={dpMode === "fixed" ? "on" : ""} onClick={() => setDpMode("fixed")}>Fixed ₦</button>
                    </div>
                  </div>
                  {dpMode === "pct" ? (
                    <div className="fin-slider">
                      <div className="fin-slider-top"><span>Slide to set</span><strong>{upfront}% · {fmtN(upfrontAmt)}</strong></div>
                      <input type="range" min="20" max="70" step="5" value={upfront} onChange={(e) => setUpfront(+e.target.value)} />
                      <div className="fin-minmax"><span>20% min</span><span>70%</span></div>
                    </div>
                  ) : (
                    <>
                      <div className="fin-num-wrap">
                        <span className="fin-num-cur">₦</span>
                        <input className="fin-num" inputMode="numeric" value={Number(upfrontAmt).toLocaleString("en-NG")}
                          onChange={(e) => setDownFixed(e.target.value)} />
                      </div>
                      <p className={belowMin ? "fin-hint fin-hint--warn" : "fin-hint"}>
                        That&apos;s {upfrontPct.toFixed(0)}% of the system amount.{belowMin ? " Below the 20% minimum upfront." : ""}
                      </p>
                    </>
                  )}
                </div>

                <div className="fin-field">
                  <label className="fin-lbl">Repayment frequency</label>
                  <select className="fin-select" value={freqKey} onChange={(e) => changeFreq(e.target.value as FreqKey)}>
                    {Object.values(FREQ).map((f) => (
                      <option key={f.key} value={f.key} disabled={!f.enabled}>{f.label}{f.enabled ? "" : " (soon)"}</option>
                    ))}
                  </select>
                </div>

                <div className="fin-field">
                  <label className="fin-lbl">Number of payments</label>
                  <div className="fin-slider">
                    <div className="fin-slider-top"><span>1st payment is your upfront</span><strong>{count} {plural(freq.unit, count)}</strong></div>
                    <input type="range" min={freq.min} max={freq.max} step={1} value={count} onChange={(e) => setCount(+e.target.value)} />
                    <div className="fin-minmax"><span>{freq.min} min</span><span>{freq.max}</span></div>
                  </div>
                  <div className="fin-price-chips">
                    {QUICK.filter((n) => n >= freq.min && n <= freq.max).map((n) => (
                      <button key={n} className={n === count ? "on" : ""} onClick={() => setCount(n)}>{n} {freq.unit === "month" ? "mo" : plural(freq.unit, n)}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* outputs */}
              <div className="fin-col">
                <div className="fin-result">
                  <span>Estimated {freq.label.toLowerCase()} repayment</span>
                  <strong>{fmtN(sched.first)}<em>/{freq.unit}</em></strong>
                  <p>{installments > 1 ? `Reduces to ${fmtN(sched.last)} by ${freq.unit} ${count} as you pay down. ` : ""}Illustrative — final terms follow your audit &amp; credit review.</p>
                </div>
                <div className="fin-breakdown">
                  <div className="fin-row"><label>System amount</label><strong>{fmtN(cost)}</strong></div>
                  <div className="fin-row"><label>Upfront today</label><strong>{fmtN(upfrontAmt)} · {upfrontPct.toFixed(0)}%</strong></div>
                  <div className="fin-row"><label>Amount financed</label><strong>{fmtN(financed)}</strong></div>
                  <div className="fin-row"><label>Total repayments</label><strong>{fmtN(sched.totalPaid)}</strong></div>
                  <div className="fin-row"><label>Total cost of system (upfront + repayments)</label><strong>{fmtN(grandTotal)}</strong></div>
                </div>
                {cost > 0 && (
                  <p className="fin-plain">
                    <b>In plain terms:</b> instead of paying {fmtN(cost)} upfront, you pay {fmtN(upfrontAmt)} today as your 1st payment, then clear the balance over the next {installments} {plural(freq.unit, installments)}{installments > 1 ? ` — starting at ${fmtN(sched.first)} and easing down to ${fmtN(sched.last)} as you pay it off` : ` with a final payment of ${fmtN(sched.first)}`}. At the end, the system is fully yours.
                  </p>
                )}
              </div>
            </div>

            <label className="fin-sched-toggle">
              <input type="checkbox" checked={showSchedule} onChange={(e) => setShowSchedule(e.target.checked)} />
              Show full repayment schedule
            </label>
            {showSchedule && (
              <div className="fin-sched">
                <div className="fin-sched-scroll">
                  <table>
                    <thead>
                      <tr><th>{periodTitle}</th><th>Amount paid off</th><th>Repayment</th><th>Balance left</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1 · Upfront</td>
                        <td className="pri">{fmtN(upfrontAmt)}</td>
                        <td>{fmtN(upfrontAmt)}</td>
                        <td>{fmtN(financed)}</td>
                      </tr>
                      {sched.rows.map((r) => (
                        <tr key={r.m}>
                          <td>{r.m + 1}</td>
                          <td className="pri">{fmtN(r.principal)}</td>
                          <td>{fmtN(r.payment)}</td>
                          <td>{fmtN(r.closing)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="fin-sched-cap">Your repayment is a little higher at the start and eases down each month as the balance you owe falls.</p>
              </div>
            )}

            <div className="fin-actions">
              <Btn onClick={openStart}>Check my eligibility</Btn>
              <button type="button" className="btn btn--outline" onClick={() => openExpert()}><span>Talk to an expert</span></button>
              <button type="button" className="btn btn--ghost fin-dl" onClick={openDl}><DocIc size={16} /><span>Download plan (PDF)</span></button>
            </div>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="section section--mist">
        <div className="container">
          <div className="section-head">
            <Eyebrow>How it works</Eyebrow>
            <h2>From diesel to ownership<br />in five steps.</h2>
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

      {/* plans */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <Eyebrow>Ways to pay</Eyebrow>
            <h2>A plan for every situation.</h2>
          </div>
          <div className="why-grid">
            {PLANS.map(([Ic, t, d, tag]) => (
              <article className="why-card" key={t}>
                <span className="why-ic"><Ic size={21} /></span>
                <h3>{t}{tag && <span className="plan-tag">{tag}</span>}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* eligibility */}
      <section className="section section--mist">
        <div className="container split split--top">
          <div>
            <Eyebrow>Eligibility</Eyebrow>
            <h2>What you'll need to qualify.</h2>
            <p className="lead">Straightforward requirements, no runaround. Whether you earn a salary or run a business, have these ready and approval on a home plan is typically 48 hours.</p>
            <div className="fin-cta-row">
              <Btn onClick={openStart}>Start my application</Btn>
              <Btn kind="outline" onClick={openExpert}>Ask a question</Btn>
            </div>
          </div>
          <div className="elig-lists">
            <div className="elig-group">
              <h4 className="elig-h"><span className="elig-tag">Everyone</span></h4>
              <ul className="check-list">
                {QUALIFY_COMMON.map((q) => (
                  <li key={q}><span className="check-ic"><TickIc size={16} color="#0A7A50" /></span>{q}</li>
                ))}
              </ul>
            </div>
            <div className="elig-two">
              <div className="elig-group">
                <h4 className="elig-h"><PeopleIc size={16} color="#0A7A50" />Salary earners</h4>
                <ul className="check-list check-list--sm">
                  {QUALIFY_EMPLOYEE.map((q) => (
                    <li key={q}><span className="check-ic"><TickIc size={15} color="#0A7A50" /></span>{q}</li>
                  ))}
                </ul>
              </div>
              <div className="elig-group">
                <h4 className="elig-h"><BuildingIc size={16} color="#0A7A50" />Business owners</h4>
                <ul className="check-list check-list--sm">
                  {QUALIFY_BUSINESS.map((q) => (
                    <li key={q}><span className="check-ic"><TickIc size={15} color="#0A7A50" /></span>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <Eyebrow>Questions</Eyebrow>
            <h2>Financing, answered.</h2>
          </div>
          <div className="faq">
            {FAQS.map(([q, a]) => (
              <details className="faq-item" key={q}>
                <summary>{q}<span className="faq-mark" aria-hidden="true" /></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark section--tight">
        <div className="container ab-cta">
          <div>
            <h2>Ready to run the numbers?</h2>
            <p>Start with a free audit — we'll size your system and hand you a financing plan you can actually keep.</p>
          </div>
          <div className="ab-cta-actions">
            <Btn kind="outline" onClick={openExpert}>Talk to an expert</Btn>
            <Link href="/audit" className="btn btn--primary"><span>Run a free audit</span><ArrowR size={17} /></Link>
          </div>
        </div>
      </section>

      {showDl && (
        <div className="aud-dlg" role="dialog" aria-modal="true" aria-label="Download financing plan" onClick={() => !downloading && setShowDl(false)}>
          <div className="aud-dlg-card" onClick={(e) => e.stopPropagation()}>
            <button className="xp-close" onClick={() => !downloading && setShowDl(false)} aria-label="Close">✕</button>
            {dlSent ? (
              <>
                <span className="aud-dlg-ic"><TickIc size={26} color="#0A7A50" /></span>
                <h3>Plan on its way</h3>
                <p>Your PDF is downloading, and we&apos;ve emailed a copy to {dlEmail.trim()}. A financing specialist will follow up to help you take the next step.</p>
                <button type="button" className="btn btn--primary aud-dlg-go" onClick={() => setShowDl(false)}><span>Done</span></button>
              </>
            ) : (
              <>
                <span className="aud-dlg-ic"><DocIc size={24} color="#0A7A50" /></span>
                <h3>Download your financing plan</h3>
                <p>We&apos;ll build a branded PDF with your numbers and the full schedule, download it, and email you a copy.</p>
                <label className="f-field"><span>Full name</span>
                  <input value={dlName} onChange={(e) => setDlName(e.target.value)} placeholder="Adaeze Okonkwo" /></label>
                <label className="f-field"><span>Email</span>
                  <input type="email" value={dlEmail} onChange={(e) => setDlEmail(e.target.value)} placeholder="you@email.com" /></label>
                <button type="button" className={"btn btn--primary aud-dlg-go" + (dlValid ? "" : " btn--disabled")} onClick={confirmDownload} disabled={!dlValid || downloading}>
                  <span>{downloading ? "Preparing…" : "Download plan"}</span><DocIc size={16} />
                </button>
                <p className="aud-dlg-note">We&apos;ll email your plan and use this to follow up. No spam.</p>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default FinancingContent;
