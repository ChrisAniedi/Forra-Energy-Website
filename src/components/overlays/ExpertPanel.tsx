"use client";

/** Right slide-over: books a free 15-minute expert consultation. */
import { useEscapeKey, useScrollLock } from "@/lib/hooks";
import { useState } from "react";
import { MonitorIc, PhoneIc, ShieldIc, TickIc, WaIc, type IconType } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";

const ExpertPanel = ({ onClose }: { onClose: () => void }) => {
  useScrollLock();
  const [topic, setTopic] = useState("New installation");
  const [channel, setChannel] = useState("WhatsApp");
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  useEscapeKey(onClose);
  const slots = ["Today · 2–4 PM", "Today · 4–6 PM", "Tomorrow · 10–12 AM", "Tomorrow · 2–4 PM", "Pick another time"];
  const valid = Boolean(name.trim() && phone.trim().length >= 7 && slot);
  return (
    <div className="xp-root" role="dialog" aria-modal="true" aria-label="Talk to an expert">
      <div className="xp-backdrop" onClick={onClose} />
      <aside className="xp-panel">
        <div className="xp-head">
          <div>
            <span className="xp-eyebrow"><span className="live-dot" />Free 15-minute consultation</span>
            <h3>Talk to an energy expert</h3>
          </div>
          <button className="xp-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        {!done ? (
          <div className="xp-body">
            <div className="xp-group">
              <label>What's this about?</label>
              <div className="chip-row">
                {["New installation", "Solar financing", "Commercial project", "Existing system support"].map((t) => (
                  <button key={t} className={"chip" + (topic === t ? " on" : "")} onClick={() => setTopic(t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="xp-group">
              <label>How should we reach you?</label>
              <div className="chip-row">
                {([["Call", PhoneIc], ["WhatsApp", WaIc], ["Video call", MonitorIc]] as [string, IconType][]).map(([c, Ic]) => (
                  <button key={c} className={"chip chip--ic" + (channel === c ? " on" : "")} onClick={() => setChannel(c)}><Ic size={15} />{c}</button>
                ))}
              </div>
            </div>
            <div className="xp-group">
              <label>Pick a time (WAT)</label>
              <div className="chip-row">
                {slots.map((s) => (
                  <button key={s} className={"chip" + (slot === s ? " on" : "")} onClick={() => setSlot(s)}>{s}</button>
                ))}
              </div>
            </div>
            <div className="f-grid">
              <label className="f-field"><span>Your name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tunde Bakare" /></label>
              <label className="f-field"><span>Phone / WhatsApp</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 800 000 0000" /></label>
            </div>
            <Btn onClick={() => valid && setDone(true)}>Book consultation</Btn>
            <p className="xp-note"><ShieldIc size={14} /> You'll speak with an engineer, not a salesperson. No obligation.</p>
          </div>
        ) : (
          <div className="xp-done">
            <span className="ct-sent-ic"><TickIc size={30} color="#0A7A50" /></span>
            <h3>Booked, {name.split(" ")[0]}.</h3>
            <p>An energy expert will reach you by <strong>{channel}</strong> — <strong>{slot}</strong> — about <strong>{topic.toLowerCase()}</strong>.</p>
            <p className="xp-note-sm">A confirmation is on its way to {phone}.</p>
            <Btn kind="outline" onClick={onClose}>Done</Btn>
          </div>
        )}
      </aside>
    </div>
  );
};

export default ExpertPanel;
