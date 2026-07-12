"use client";

/** Slide-over quote request, prefilled with the selected Solar Store package. */
import { useState } from "react";
import type { Package } from "@/components/shop/packages";
import { Btn } from "@/components/ui/Button";
import { useEscapeKey, useScrollLock } from "@/lib/hooks";
import { submitLead } from "@/lib/leads";
import { BatteryIc, DocIc, FlashIc, ShieldIc, SunIc, TickIc, TimerIc } from "@/components/ui/icons";

const QuotePanel = ({ pkg, onClose }: { pkg: Package; onClose: () => void }) => {
  useScrollLock();
  useEscapeKey(onClose);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("Lagos");
  const [timeline, setTimeline] = useState("Within 1 month");
  const [pay, setPay] = useState("Financing");
  const [done, setDone] = useState(false);
  const valid = Boolean(name.trim() && phone.trim().length >= 7);
  const submit = () => {
    if (!valid) return;
    submitLead({ source: "Quote request", name: name.trim(), phone: phone.trim(), details: `${pkg.name} · ${state} · ${timeline} · ${pay}` });
    setDone(true);
  };
  return (
    <div className="xp-root" role="dialog" aria-modal="true" aria-label="Get a quote">
      <div className="xp-backdrop" onClick={onClose} />
      <aside className="xp-panel">
        <div className="xp-head">
          <div>
            <span className="xp-eyebrow"><span className="live-dot" />Get a quote</span>
            <h3>{pkg.name}</h3>
          </div>
          <button className="xp-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        {!done ? (
          <div className="xp-body">
            <div className="q-summary">
              <div className="q-summary-row"><span><FlashIc size={15} />{pkg.kva} kVA hybrid inverter</span><span><BatteryIc size={15} />{pkg.battery}</span></div>
              <div className="q-summary-row"><span><SunIc size={15} />{pkg.panels} panels</span><span><TimerIc size={15} />{pkg.backup} backup</span></div>
              <p className="q-note"><DocIc size={14} /> Your quote includes full pricing, financing plans and an installation timeline for your location.</p>
            </div>
            <div className="f-grid">
              <label className="f-field"><span>Full name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Adaeze Okonkwo" /></label>
              <label className="f-field"><span>Phone / WhatsApp</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 800 000 0000" /></label>
            </div>
            <div className="xp-group">
              <label>Installation state</label>
              <div className="chip-row">
                {["Lagos", "Ogun", "Abuja (FCT)", "Rivers", "Oyo", "Other"].map((s) => (
                  <button key={s} className={"chip" + (state === s ? " on" : "")} onClick={() => setState(s)}>{s}</button>
                ))}
              </div>
            </div>
            <div className="xp-group">
              <label>When do you want to install?</label>
              <div className="chip-row">
                {["ASAP", "Within 1 month", "1–3 months", "Just researching"].map((t) => (
                  <button key={t} className={"chip" + (timeline === t ? " on" : "")} onClick={() => setTimeline(t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="xp-group">
              <label>How would you pay?</label>
              <div className="chip-row">
                {["Full payment", "Financing"].map((p) => (
                  <button key={p} className={"chip" + (pay === p ? " on" : "")} onClick={() => setPay(p)}>{p}</button>
                ))}
              </div>
            </div>
            <Btn onClick={submit}>Get my quote</Btn>
            <p className="xp-note"><ShieldIc size={14} /> Free site survey. No obligation, no pressure.</p>
          </div>
        ) : (
          <div className="xp-done">
            <span className="ct-sent-ic"><TickIc size={30} color="#0A7A50" /></span>
            <h3>Quote on the way, {name.split(" ")[0]}.</h3>
            <p>A detailed quote for the <strong>{pkg.name}</strong> — pricing, {pay.toLowerCase()} options and timeline for {state} — will reach you within 24 hours.</p>
            <p className="xp-note-sm">We may call to confirm one or two details about your property.</p>
            <Btn kind="outline" onClick={onClose}>Done</Btn>
          </div>
        )}
      </aside>
    </div>
  );
};

export default QuotePanel;
