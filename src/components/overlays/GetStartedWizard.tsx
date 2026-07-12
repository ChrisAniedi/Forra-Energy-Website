"use client";

import { useRouter } from "next/navigation";
/** Full-screen 4-step lead-qualification flow behind every Get Started CTA. */
import { useEscapeKey, useScrollLock } from "@/lib/hooks";
import { useState } from "react";
import { ArrowR, BuildingIc, GaugeIc, HomeIc, MailIc, PhoneIc, TickIc, WaIc, WalletIc, type IconType } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import { Btn } from "@/components/ui/Button";
import { submitLead } from "@/lib/leads";
import { useOverlay, type OverlayPrefill } from "@/context/OverlayProvider";

const GOALS = [
  [HomeIc, "Power my home", "Duplex, flat or estate residence"],
  [BuildingIc, "Power my business", "Office, shop, facility or site"],
  [WalletIc, "Explore financing", "I want a plan, not a lump sum"],
  [GaugeIc, "Not sure yet", "Start with a free energy audit"],
] as [IconType, string, string][];
const STATES_NG = ["Lagos", "Ogun", "Abuja (FCT)", "Rivers", "Oyo", "Kano", "Enugu", "Kaduna", "Delta", "Other"];
const PROPS = ["Flat / apartment", "Duplex / bungalow", "Office", "Shop / store", "School", "Hospital / clinic", "Factory / warehouse", "Estate", "Other"];
const SPENDS = ["Under ₦50k", "₦50k – ₦150k", "₦150k – ₦500k", "Over ₦500k"];
const GENS = ["No generator", "Occasional use", "Daily use"];
const BACKUPS = ["4–6 hours", "8–12 hours", "24/7 power"];
const GetStartedWizard = ({ onClose, prefill }: { onClose: () => void; prefill?: OverlayPrefill | null }) => {
  const router = useRouter();
  const goAudit = () => {
    onClose();
    router.push("/audit");
  };
  useScrollLock();
  const [step, setStep] = useState(0);
  interface WizardData {
    goal: string; state: string; prop: string; spend: string; gen: string; backup: string;
    name: string; phone: string; email: string; channels: string[];
  }
  const [d, setD] = useState<WizardData>({ goal: "", state: "Lagos", prop: "", spend: "", gen: "", backup: "", name: "", phone: "", email: "", channels: ["WhatsApp"] });
  const up = (k: keyof WizardData, v: string) => setD((p) => ({ ...p, [k]: v }));
  const toggleCh = (c: string) => setD((p) => ({ ...p, channels: p.channels.includes(c) ? p.channels.filter((x) => x !== c) : [...p.channels, c] }));
  useEscapeKey(onClose);
  const canNext = [
    !!d.goal,
    !!d.prop,
    !!d.spend && !!d.backup,
    Boolean(d.name.trim() && d.phone.trim().length >= 7 && d.channels.length > 0),
  ][step];
  const next = () => {
    if (!canNext) return;
    if (step === 3) {
      submitLead({
        source: "Get Started",
        name: d.name.trim(), phone: d.phone.trim(), email: d.email.trim(),
        details: `${d.goal} · ${d.prop} · ${d.state} · spend ${d.spend} · backup ${d.backup} · via ${d.channels.join("+")}${prefill?.summary ? ` · ${prefill.summary}` : ""}`,
      });
    }
    setStep(step + 1);
  };
  const rec = d.spend === SPENDS[0] ? "a 3.5–5kVA hybrid system" : d.spend === SPENDS[1] ? "a 5–10kVA hybrid system" : d.spend === SPENDS[2] ? "a 10–15kVA system with expanded storage" : "a commercial-grade system — our team will scope it properly";
  const titles = ["What brings you to Forra?", "Tell us about the property", "Your current power situation", "How do we reach you?"];
  return (
    <div className="wiz-root" role="dialog" aria-modal="true" aria-label="Get started">
      <div className="wiz-top">
        <a className="logo" href="#" onClick={(e) => e.preventDefault()}>
          <Logo />
        </a>
        <button className="xp-close" onClick={onClose} aria-label="Close">✕</button>
      </div>
      <div className="wiz-body">
        {prefill?.summary && step < 4 && (
          <div className="ov-prefill"><span>Your audit recommendation</span><strong>{prefill.summary}</strong></div>
        )}
        {step < 4 && (
          <>
            <div className="wiz-progress">
              {[0, 1, 2, 3].map((i) => <span key={i} className={i <= step ? "fill" : ""} />)}
            </div>
            <span className="wiz-count">Step {step + 1} of 4</span>
            <h2>{titles[step]}</h2>
          </>
        )}
        {step === 0 && (
          <>
            <div className="wiz-goals">
              {GOALS.map(([Ic, t, s]) => (
                <button key={t} className={"wiz-goal" + (d.goal === t ? " on" : "")} onClick={() => up("goal", t)}>
                  <span className="wiz-goal-ic"><Ic size={24} /></span>
                  <strong>{t}</strong><em>{s}</em>
                </button>
              ))}
            </div>
            <p className="wiz-alt">Prefer to size it yourself? <button className="eco-link" onClick={goAudit}>Run the self-audit<ArrowR size={14} /></button></p>
          </>
        )}
        {step === 1 && (
          <div className="wiz-pane">
            <div className="xp-group">
              <label>State</label>
              <div className="chip-row">
                {STATES_NG.map((s) => <button key={s} className={"chip" + (d.state === s ? " on" : "")} onClick={() => up("state", s)}>{s}</button>)}
              </div>
            </div>
            <div className="xp-group">
              <label>Property type</label>
              <div className="chip-row">
                {PROPS.map((p) => <button key={p} className={"chip" + (d.prop === p ? " on" : "")} onClick={() => up("prop", p)}>{p}</button>)}
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="wiz-pane">
            <div className="xp-group">
              <label>Monthly electricity + fuel spend</label>
              <div className="chip-row">
                {SPENDS.map((s) => <button key={s} className={"chip" + (d.spend === s ? " on" : "")} onClick={() => up("spend", s)}>{s}</button>)}
              </div>
            </div>
            <div className="xp-group">
              <label>Generator usage today</label>
              <div className="chip-row">
                {GENS.map((g) => <button key={g} className={"chip" + (d.gen === g ? " on" : "")} onClick={() => up("gen", g)}>{g}</button>)}
              </div>
            </div>
            <div className="xp-group">
              <label>How much backup do you want?</label>
              <div className="chip-row">
                {BACKUPS.map((b) => <button key={b} className={"chip" + (d.backup === b ? " on" : "")} onClick={() => up("backup", b)}>{b}</button>)}
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="wiz-pane">
            <div className="f-grid">
              <label className="f-field"><span>Full name</span>
                <input value={d.name} onChange={(e) => up("name", e.target.value)} placeholder="Adaeze Okonkwo" /></label>
              <label className="f-field"><span>Phone / WhatsApp</span>
                <input value={d.phone} onChange={(e) => up("phone", e.target.value)} placeholder="+234 800 000 0000" /></label>
            </div>
            <label className="f-field"><span>Email (optional)</span>
              <input type="email" value={d.email} onChange={(e) => up("email", e.target.value)} placeholder="you@company.com" /></label>
            <div className="xp-group">
              <label>Preferred contact <em className="lbl-hint">— select all that apply</em></label>
              <div className="chip-row">
                {([["WhatsApp", WaIc], ["Call", PhoneIc], ["Email", MailIc]] as [string, IconType][]).map(([c, Ic]) => (
                  <button key={c} className={"chip chip--ic" + (d.channels.includes(c) ? " on" : "")} onClick={() => toggleCh(c)}>
                    <Ic size={15} />{c}{d.channels.includes(c) && <TickIc size={14} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="wiz-done">
            <span className="ct-sent-ic"><TickIc size={34} color="#0A7A50" /></span>
            <h2>You're in, {d.name.split(" ")[0]}<span className="gold">.</span></h2>
            <p>Based on what you've told us, your property likely needs <strong>{rec}</strong>. An energy advisor will reach you by <strong>{d.channels.join(" + ")}</strong> within 24 hours to confirm details and schedule your free audit.</p>
            <div className="wiz-summary">
              {[["Goal", d.goal], ["Property", d.prop + " · " + d.state], ["Monthly spend", d.spend], ["Backup target", d.backup]].map(([k, v]) => (
                <div key={k}><label>{k}</label><strong>{v}</strong></div>
              ))}
            </div>
            <div className="wiz-done-actions">
              <Btn kind="outline" onClick={goAudit}>Run the self-audit now</Btn>
              <Btn onClick={onClose}>Done</Btn>
            </div>
          </div>
        )}
        {step < 4 && (
          <div className="wiz-nav">
            {step > 0 ? <button className="btn btn--outline" onClick={() => setStep(step - 1)}><span>Back</span></button> : <span />}
            <button className={"btn btn--primary" + (canNext ? "" : " btn--disabled")} onClick={next}>
              <span>{step === 3 ? "Submit" : "Continue"}</span><ArrowR size={17} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetStartedWizard;
