"use client";

import { useState } from "react";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fmtN } from "@/lib/format";

const Savings = () => {
  const [grid, setGrid] = useState(185000);
  const [diesel, setDiesel] = useState(320000);
  const [maint, setMaint] = useState(45000);
  const before = grid + diesel + maint;
  const after = Math.round(before * 0.42);
  const saveM = before - after;
  const save5 = saveM * 60;
  const co2 = Math.round((diesel / 1100) * 2.7 * 12) / 1000; // rough t/yr from litres
  const pct = Math.min(100, Math.round((after / before) * 100));
  return (
    <section className="section" id="calculator">
      <div className="container split">
        <div className="split-copy">
          <Eyebrow>Savings calculator</Eyebrow>
          <h2>Life before Forra.<br />Life after Forra.</h2>
          <p className="lead">Put in what you currently spend on NEPA bills, diesel and generator servicing — see what clean energy changes.</p>
          <div className="calc-inputs">
            {([["Monthly electricity bill", grid, setGrid], ["Monthly generator fuel", diesel, setDiesel], ["Generator maintenance", maint, setMaint]] as [string, number, (n: number) => void][]).map(([l, v, set]) => (
              <label key={l} className="calc-field">
                <span>{l}</span>
                <div className="calc-input"><em>₦</em>
                  <input type="number" value={v} min="0" step="5000" onChange={(e) => set(Math.max(0, +e.target.value))} />
                </div>
              </label>
            ))}
          </div>
          <Btn>Calculate My Savings</Btn>
        </div>
        <div className="calc-result">
          <div className="calc-bars">
            <div className="calc-bar">
              <label>Today</label>
              <div className="bar bar--before"><span style={{ width: "100%" }} /></div>
              <strong>{fmtN(before)}<em>/mo</em></strong>
            </div>
            <div className="calc-bar">
              <label>With Forra</label>
              <div className="bar bar--after"><span style={{ width: pct + "%" }} /></div>
              <strong>{fmtN(after)}<em>/mo</em></strong>
            </div>
          </div>
          <div className="calc-stats">
            <div><label>Monthly savings</label><strong className="good">{fmtN(saveM)}</strong></div>
            <div><label>Five-year savings</label><strong>{fmtN(save5)}</strong></div>
            <div><label>Typical payback</label><strong>~{Math.max(1.5, Math.round((8500000 / Math.max(saveM, 1)) * 10) / 10)} yrs</strong></div>
            <div><label>Carbon reduced</label><strong>{co2.toFixed(1)} t/yr</strong></div>
          </div>
          <p className="calc-note">Estimates based on typical Lagos Band-A tariffs and diesel at market rates. Your audit refines these numbers.</p>
        </div>
      </div>
    </section>
  );
};

export default Savings;
