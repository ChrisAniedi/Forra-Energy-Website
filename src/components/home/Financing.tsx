"use client";

import { useState } from "react";
import { WalletIc } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fmtN } from "@/lib/format";
import { useOverlay } from "@/context/OverlayProvider";

const PRESETS = [
  { name: "Home · 5kVA hybrid", cost: 8500000 },
  { name: "SME · 15kVA three-phase", cost: 21500000 },
  { name: "Commercial · 60kW plant", cost: 78000000 },
];
const FIN_STEPS = ["Complete an energy audit", "Receive your recommended solution", "Choose a comfortable upfront payment", "Select a flexible repayment plan", "Install and enjoy uninterrupted power"];
const Financing = () => {
  const { openStart } = useOverlay();
  const [preset, setPreset] = useState(0);
  const [upfront, setUpfront] = useState(30);
  const [tenor, setTenor] = useState(24);
  const cost = PRESETS[preset].cost;
  const upfrontAmt = (cost * upfront) / 100;
  const financed = cost - upfrontAmt;
  const monthly = (financed * (1 + 0.21 * (tenor / 12))) / tenor;
  return (
    <section className="section" id="financing">
      <div className="container split split--rev">
        <div className="split-copy">
          <Eyebrow>Solar financing</Eyebrow>
          <h2>Own clean energy.<br />Pay comfortably.</h2>
          <p className="lead">A fintech-grade financing journey — transparent numbers, no surprises, and a system that starts paying for itself from day one.</p>
          <ol className="fin-steps">
            {FIN_STEPS.map((s, i) => (
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
            <div>{[12, 24, 36].map((t) => (
              <button key={t} className={t === tenor ? "on" : ""} onClick={() => setTenor(t)}>{t} mo</button>
            ))}</div>
          </div>
          <div className="fin-result">
            <span>Estimated monthly repayment</span>
            <strong>{fmtN(monthly)}<em>/month</em></strong>
            <p>Amount financed {fmtN(financed)} · illustrative rate, final terms follow your audit & credit review.</p>
          </div>
          <Btn onClick={openStart}>Check my eligibility</Btn>
        </div>
      </div>
    </section>
  );
};

export default Financing;
