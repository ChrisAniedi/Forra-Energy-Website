"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import { ArrowR, MailIc, PhoneIc, PinIc, SettingIc, ShieldIc, TickIc, TimerIc, WaIc } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useOverlay } from "@/context/OverlayProvider";
import { SITE } from "@/lib/site";

interface Office {
  tag: string;
  city: string;
  label: string;
  addr: string;
  hours: string[];
  tone: string;
  book?: boolean;
}

const OFFICES: Office[] = [
  { tag: "Headquarters", city: "Ikeja", label: "IKEJA", addr: SITE.hq.address, hours: ["Mon–Fri · 8am–6pm", "Sat · 9am–2pm"], tone: "a" },
  { tag: "Island office", city: "Lekki Phase 1", label: "LEKKI", addr: "Client meetings & commercial consultations — by appointment.", hours: ["Mon–Fri · by appointment"], tone: "b", book: true },
];
const ContactContent = () => {
  const { openExpert } = useOverlay();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", who: "Homeowner", subject: "New installation", msg: "" });
  const set = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });
  const valid = Boolean(form.name.trim() && form.email.includes("@") && form.phone.trim().length >= 7);
  return (
    <main className="page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Eyebrow>Contact</Eyebrow>
          <h1>Talk to us<span className="gold">.</span></h1>
          <p>Questions about a system, financing or your existing installation — a real engineer replies within one business day.</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container ct-layout">
          <div className="ct-main">
            <Eyebrow>Send a message</Eyebrow>
            <h2>We read everything.</h2>
            <p className="lead">Tell us about your property, your power situation or your project — the more detail, the better our first response.</p>
            {!sent ? (
              <div className="ct-form">
                <div className="f-grid">
                  <label className="f-field"><span>Full name</span>
                    <input value={form.name} onChange={set("name")} placeholder="Adaeze Okonkwo" /></label>
                  <label className="f-field"><span>Phone / WhatsApp</span>
                    <input value={form.phone} onChange={set("phone")} placeholder="+234 800 000 0000" /></label>
                </div>
                <label className="f-field"><span>Email</span>
                  <input type="email" value={form.email} onChange={set("email")} placeholder="you@company.com" /></label>
                <div className="f-grid">
                  <label className="f-field"><span>I am a</span>
                    <select value={form.who} onChange={set("who")}>
                      {["Homeowner", "Business owner", "Facility manager", "Estate / developer", "Partner / vendor", "Existing customer"].map((o) => <option key={o}>{o}</option>)}
                    </select></label>
                  <label className="f-field"><span>Subject</span>
                    <select value={form.subject} onChange={set("subject")}>
                      {["New installation", "Solar financing", "Commercial project", "Energy audit", "Support & maintenance", "Something else"].map((o) => <option key={o}>{o}</option>)}
                    </select></label>
                </div>
                <label className="f-field"><span>Message</span>
                  <textarea rows={5} value={form.msg} onChange={set("msg")} placeholder="Tell us about your property, current power costs, or what you'd like to achieve…" /></label>
                <Btn onClick={() => valid && setSent(true)}>Send message</Btn>
                {!valid && <p className="f-hint">Name, a valid email and phone number are required.</p>}
              </div>
            ) : (
              <div className="ct-sent">
                <span className="ct-sent-ic"><TickIc size={30} color="#0A7A50" /></span>
                <h3>Message received, {form.name.split(" ")[0]}.</h3>
                <p>We'll reply to <strong>{form.email}</strong> within one business day. Urgent? Call or WhatsApp us on {SITE.phoneDisplay}.</p>
              </div>
            )}
          </div>

          <aside className="ct-rail">
            <div className="rail-card">
              <h3>Direct lines</h3>
              <p className="rail-sub">Prefer talking to typing? Same team either way.</p>
              {[
                { Ic: PhoneIc, l: "Call", v: SITE.phoneDisplay, n: "Mon–Fri, 8am–6pm WAT" },
                { Ic: WaIc, l: "WhatsApp", v: SITE.phoneDisplay, n: "Fastest response" },
                { Ic: MailIc, l: "Email", v: SITE.email, n: "Replies within 24 hours" },
              ].map(({ Ic, l, v, n }) => (
                <div className="rail-row" key={l}>
                  <span className="rail-ic"><Ic size={18} /></span>
                  <div><label>{l}</label><strong>{v}</strong><em>{n}</em></div>
                </div>
              ))}
              <button className="btn btn--gold rail-cta" onClick={() => openExpert()}><span>Book a free consultation</span><ArrowR size={16} /></button>
              <p className="rail-note"><ShieldIc size={13} /> 15 minutes with an engineer — not a salesperson.</p>
            </div>
            <div className="ct-support">
              <span className="ct-support-ic"><SettingIc size={18} color="#B47B0B" /></span>
              <div>
                <strong>Existing customer?</strong>
                <p>Log service requests and track maintenance in the Client Portal, or email <em>{SITE.supportEmail}</em>.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--mist">
        <div className="container">
          <div className="section-head">
            <Eyebrow>Visit us</Eyebrow>
            <h2>Two doors in Lagos.</h2>
          </div>
          <div className="office-grid">
            {OFFICES.map((o) => (
              <article className="office2" key={o.city}>
                <div className={"office2-map office2-map--" + o.tone}>
                  <span className="office2-pin"><PinIc size={17} color="#fff" /></span>
                  <em>{o.label}</em>
                </div>
                <div className="office2-body">
                  <div className="office2-head">
                    <div>
                      <span className="office-tag">{o.tag}</span>
                      <h3>{o.city}</h3>
                    </div>
                    {o.book
                      ? <button className="eco-link" onClick={() => openExpert()}>Book a visit<ArrowR size={14} /></button>
                      : <button className="eco-link">Directions<ArrowR size={14} /></button>}
                  </div>
                  <p className="office2-addr"><PinIc size={15} color="#5C6B62" />{o.addr}</p>
                  <div className="office2-hours">
                    {o.hours.map((h) => <span key={h}><TimerIc size={14} />{h}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactContent;
