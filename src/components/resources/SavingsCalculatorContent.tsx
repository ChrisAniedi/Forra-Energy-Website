"use client";

import { useState } from "react";
import { CalcIc, TickIc } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fmtN } from "@/lib/format";
import { useOverlay } from "@/context/OverlayProvider";

const SavingsCalculatorContent = () => {
  const { openStart } = useOverlay();
  const [bill, setBill] = useState(120000);
  const [fuel, setFuel] = useState(80000);
  const [cover, setCover] = useState(85);

  const current = bill + fuel;
  const monthlySave = Math.round((current * cover) / 100);
  const newMonthly = current - monthlySave;
  const annualSave = monthlySave * 12;
  const tenYr = annualSave * 10;
  const litres = Math.round((fuel * 12) / 1000); // ~₦1,000 / litre
  const co2 = +((litres * 2.64) / 1000).toFixed(1);

  return (
    <main className="page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Eyebrow>Savings calculator</Eyebrow>
          <h1>See what solar could save you<span className="gold">.</span></h1>
          <p>Enter what you spend on electricity and generator fuel today, and get an instant estimate of what going solar with Forra could put back in your pocket.</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container split split--rev">
          <div className="split-copy">
            <Eyebrow>Two numbers, that's it</Eyebrow>
            <h2>What are you<br />spending on power?</h2>
            <p className="lead">Add your monthly electricity bill and generator fuel, then adjust how much of that load solar covers. These are estimates — a free audit confirms them for your exact setup.</p>
            <ul className="pr-points">
              {["No sign-up needed", "Instant estimate", "Based on your real spend", "Refined by a free audit"].map((t) => (
                <li key={t}><TickIc size={15} color="#0A7A50" />{t}</li>
              ))}
            </ul>
          </div>

          <div className="fin-calc">
            <div className="fin-head">
              <span className="fin-title"><CalcIc size={18} color="#0A7A50" /> Savings calculator</span>
              <span className="fin-chip">Estimate</span>
            </div>
            <div className="aud-spend">
              <div className="aud-field">
                <label htmlFor="sav-bill">Monthly electricity</label>
                <div className="aud-money"><span>₦</span><input id="sav-bill" type="number" min={0} value={bill} onChange={(e) => setBill(+e.target.value || 0)} /></div>
              </div>
              <div className="aud-field">
                <label htmlFor="sav-fuel">Monthly fuel</label>
                <div className="aud-money"><span>₦</span><input id="sav-fuel" type="number" min={0} value={fuel} onChange={(e) => setFuel(+e.target.value || 0)} /></div>
              </div>
            </div>
            <div className="fin-slider">
              <div className="fin-slider-top"><label>Share of load on solar</label><strong>{cover}%</strong></div>
              <input type="range" min={60} max={95} step={5} value={cover} onChange={(e) => setCover(+e.target.value)} />
            </div>
            <div className="fin-result">
              <span>Estimated annual savings</span>
              <strong>{fmtN(annualSave)}<em>/year</em></strong>
              <p>≈ {fmtN(monthlySave)}/month · {fmtN(tenYr)} over 10 years</p>
            </div>
            <div className="sav-tiles">
              <div><label>New monthly spend</label><strong>{fmtN(newMonthly)}</strong></div>
              <div><label>Diesel avoided</label><strong>{litres.toLocaleString("en-NG")} L/yr</strong></div>
              <div><label>CO₂ cut</label><strong>{co2} t/yr</strong></div>
            </div>
            <Btn onClick={openStart}>Get my exact numbers</Btn>
            <p className="sav-note">Estimates assume solar offsets the selected share of your current spend. Your exact savings depend on your system size and usage — confirmed with a free audit.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SavingsCalculatorContent;
