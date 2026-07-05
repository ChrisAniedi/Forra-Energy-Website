"use client";

import Link from "next/link";
import { ArrowR, MailIc, MonitorIc, PeopleIc, PhoneIc, ShieldIc, TickIc, TimerIc, type IconType } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SITE } from "@/lib/site";
import { useOverlay } from "@/context/OverlayProvider";

const TOPICS: { label: string; href: string }[] = [
  { label: "Frequently asked questions", href: "/faqs" },
  { label: "Energy guides", href: "/guides" },
  { label: "Solar learning hub", href: "/learning" },
  { label: "Savings calculator", href: "/savings-calculator" },
];
const PROMISE: [IconType, string, string][] = [
  [TimerIc, "Fast response", "We aim to respond to support requests within one business day — often much sooner."],
  [MonitorIc, "We see it too", "Monitoring means we can often diagnose a system remotely before a visit is even needed."],
  [ShieldIc, "We handle warranties", "If it's a covered fault, we manage the manufacturer claim for you — no runaround."],
];

const SupportContent = () => {
  const { openExpert } = useOverlay();
  return (
    <main className="page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Eyebrow>Support</Eyebrow>
          <h1>We're here when you need us<span className="gold">.</span></h1>
          <p>Whether you're a customer with a service request or just have a question, reach us the way that suits you — and get help from real engineers, not a script.</p>
          <ul className="pr-points">
            {["Real engineers", "Fast response", "Remote diagnostics", "Warranty handled"].map((t) => (
              <li key={t}><TickIc size={15} color="#0A7A50" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="section-head"><Eyebrow>Get in touch</Eyebrow><h2>Pick a channel.</h2></div>
          <div className="kc-grid kc-grid--sup">
            <Link className="kc-card" href="/portal">
              <span className="kc-ic"><PeopleIc size={22} /></span>
              <h3>Client Portal</h3><p>Log and track service requests and maintenance for your system.</p>
              <span className="kc-go">Open portal<ArrowR size={15} /></span>
            </Link>
            <a className="kc-card" href={SITE.phoneHref}>
              <span className="kc-ic"><PhoneIc size={22} /></span>
              <h3>Call or WhatsApp</h3><p>{SITE.phoneDisplay}</p>
              <span className="kc-go">Call now<ArrowR size={15} /></span>
            </a>
            <a className="kc-card" href={`mailto:${SITE.supportEmail}`}>
              <span className="kc-ic"><MailIc size={22} /></span>
              <h3>Email support</h3><p>{SITE.supportEmail}</p>
              <span className="kc-go">Send email<ArrowR size={15} /></span>
            </a>
            <button type="button" className="kc-card" onClick={() => openExpert()}>
              <span className="kc-ic"><ShieldIc size={22} /></span>
              <h3>Talk to an engineer</h3><p>Book a free 15-minute consultation about your system.</p>
              <span className="kc-go">Book a call<ArrowR size={15} /></span>
            </button>
          </div>
        </div>
      </section>

      <section className="section section--mist section--tight">
        <div className="container">
          <div className="section-head"><Eyebrow>What to expect</Eyebrow><h2>Help that actually helps.</h2></div>
          <div className="why-grid">
            {PROMISE.map(([Ic, t, d]) => (
              <article className="why-card" key={t}>
                <span className="why-ic"><Ic size={21} /></span>
                <h3>{t}</h3><p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="section-head"><Eyebrow>Help yourself, fast</Eyebrow><h2>Common topics.</h2></div>
          <div className="sup-topics">
            {TOPICS.map((t) => (
              <Link key={t.label} className="sup-topic" href={t.href}>{t.label}<ArrowR size={15} /></Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SupportContent;
