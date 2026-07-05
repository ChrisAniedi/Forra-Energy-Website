"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowR, BankIc, BuildingIc, ChartIc, HomeIc, PeopleIc, TickIc, WalletIc, type IconType } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fmtN } from "@/lib/format";
import { useOverlay } from "@/context/OverlayProvider";

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
  ["What interest rate do you charge?", "Rates are illustrative until your credit review. The calculator on this page shows an indicative figure so you can plan; your final offer is confirmed in writing before anything is signed."],
  ["How fast is approval?", "Home plans are typically approved within 48 hours of receiving your documents. SME and commercial facilities take a little longer due to additional checks."],
  ["What happens if I want to pay off early?", "You can settle early at any time. We only charge for the months you've used — there's no early-exit penalty on standard home plans."],
  ["Can I finance only part of the system?", "Yes. Choose any upfront amount from 20% upwards; the balance is what you finance. A larger upfront lowers your monthly repayment."],
];

const FinancingContent = () => {
  const { openStart, openExpert } = useOverlay();
  const [preset, setPreset] = useState(0);
  const [upfront, setUpfront] = useState(30);
  const [tenor, setTenor] = useState(24);
  const cost = PRESETS[preset].cost;
  const upfrontAmt = (cost * upfront) / 100;
  const financed = cost - upfrontAmt;
  const monthly = (financed * (1 + 0.21 * (tenor / 12))) / tenor;

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
        <div className="container split split--rev">
          <div className="split-copy">
            <Eyebrow>Plan your payments</Eyebrow>
            <h2>See your monthly number<br />before you commit.</h2>
            <p className="lead">Move the sliders to model a plan. These figures are illustrative — your exact terms follow a free audit and a quick credit review.</p>
            <ol className="fin-steps">
              {["Pick a system size", "Set your upfront %", "Choose a repayment tenor", "See your monthly repayment"].map((s, i) => (
                <li key={s}><span>{i + 1}</span>{s}</li>
              ))}
            </ol>
          </div>
          <div className="fin-calc">
            <div className="fin-head">
              <span className="fin-title"><WalletIc size={18} color="#0A7A50" /> Financing calculator</span>
              <span className="fin-chip">Illustrative</span>
            </div>
            <div className="fin-presets">
              {PRESETS.map((p, i) => (
                <button key={p.name} className={i === preset ? "on" : ""} onClick={() => setPreset(i)}>{p.name}</button>
              ))}
            </div>
            <div className="fin-row"><label>System cost</label><strong>{fmtN(cost)}</strong></div>
            <div className="fin-slider">
              <div className="fin-slider-top"><label>Upfront payment</label><strong>{upfront}% · {fmtN(upfrontAmt)}</strong></div>
              <input type="range" min="20" max="70" step="5" value={upfront} onChange={(e) => setUpfront(+e.target.value)} />
            </div>
            <div className="fin-tenors">
              <label>Repayment period</label>
              <div>{[12, 24, 36, 48].map((t) => (
                <button key={t} className={t === tenor ? "on" : ""} onClick={() => setTenor(t)}>{t} mo</button>
              ))}</div>
            </div>
            <div className="fin-result">
              <span>Estimated monthly repayment</span>
              <strong>{fmtN(monthly)}<em>/month</em></strong>
              <p>Amount financed {fmtN(financed)} · illustrative rate, final terms follow your audit &amp; credit review.</p>
            </div>
            <Btn onClick={openStart}>Check my eligibility</Btn>
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
    </main>
  );
};

export default FinancingContent;
