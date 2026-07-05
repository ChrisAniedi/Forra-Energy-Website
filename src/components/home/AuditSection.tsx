"use client";

import { useState, useEffect } from "react";
import { ArrowR, BatteryIc, DocIc, FlashIc, SunIc, TickIc, type IconType } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useOverlay } from "@/context/OverlayProvider";

const AUDIT_STEPS = [
  { t: "Appliances & usage", d: "Fridge, ACs, pumping machine, TVs — we estimate your daily kWh from what you actually run." },
  { t: "System sizing", d: "The right inverter, battery bank and panel array for your load profile — no guesswork." },
  { t: "Cost & savings", d: "Installation estimate, projected monthly savings and payback period, side by side." },
  { t: "Your report", d: "A professional assessment report you can download, share and finance against." },
];
const AuditSection = () => {
  const { openStart } = useOverlay();
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % AUDIT_STEPS.length), 3400);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="section section--mist" id="audit">
      <div className="container split">
        <div className="split-copy">
          <Eyebrow>Interactive energy audit</Eyebrow>
          <h2>Know exactly what your property needs.</h2>
          <p className="lead">
            A free audit that estimates your daily electricity usage, calculates the ideal
            inverter size, battery capacity and panel requirements — then hands you a
            professional assessment report.
          </p>
          <ol className="audit-steps">
            {AUDIT_STEPS.map((s, i) => (
              <li key={s.t} className={i === step ? "on" : ""} onClick={() => setStep(i)}>
                <span className="audit-num">{String(i + 1).padStart(2, "0")}</span>
                <div><strong>{s.t}</strong><p>{s.d}</p></div>
              </li>
            ))}
          </ol>
          <Btn onClick={openStart}>Launch Free Energy Audit</Btn>
        </div>
        <div className="audit-ui">
          <div className="audit-window">
            <div className="win-bar"><span /><span /><span /><em>forra.energy/audit</em></div>
            <div className="audit-body">
              <div className="audit-progress">
                {AUDIT_STEPS.map((_, i) => <span key={i} className={i <= step ? "fill" : ""} />)}
              </div>
              {step === 0 && (
                <div className="audit-pane">
                  <h4>What do you run daily?</h4>
                  {[["1.5HP Air Conditioner ×2", "2.24 kW"], ["Deep freezer", "0.35 kW"], ["Pumping machine", "0.75 kW"], ["Lighting & TVs", "0.42 kW"]].map(([a, b]) => (
                    <div className="audit-row" key={a}><span><TickIc size={16} color="#0FA36B" />{a}</span><em>{b}</em></div>
                  ))}
                  <div className="audit-total"><span>Estimated daily usage</span><strong>18.6 kWh</strong></div>
                </div>
              )}
              {step === 1 && (
                <div className="audit-pane">
                  <h4>Recommended system</h4>
                  {([["Hybrid inverter", "5 kVA / 48V", SunIc], ["Lithium battery", "10 kWh LiFePO₄", BatteryIc], ["Solar array", "8 × 550W panels", FlashIc]] as [string, string, IconType][]).map(([a, b, Ic]) => (
                    <div className="audit-row" key={a}><span><Ic size={16} color="#0A7A50" />{a}</span><em>{b}</em></div>
                  ))}
                  <div className="audit-total"><span>Backup at typical load</span><strong>~14 hours</strong></div>
                </div>
              )}
              {step === 2 && (
                <div className="audit-pane">
                  <h4>Cost & projected savings</h4>
                  <div className="audit-row"><span>Installation estimate</span><em>₦8.2M – ₦9.1M</em></div>
                  <div className="audit-row"><span>Current monthly energy spend</span><em>₦486,000</em></div>
                  <div className="audit-row"><span>Projected with Forra</span><em className="good">₦212,000</em></div>
                  <div className="audit-total"><span>Payback period</span><strong>2.7 years</strong></div>
                </div>
              )}
              {step === 3 && (
                <div className="audit-pane audit-pane--report">
                  <div className="report-badge"><DocIc size={26} color="#0A7A50" /></div>
                  <h4>Your assessment is ready</h4>
                  <p>12-page report · sizing, costs, savings & financing options</p>
                  <button className="btn btn--primary btn--sm"><span>Download report</span><ArrowR size={15} /></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuditSection;
