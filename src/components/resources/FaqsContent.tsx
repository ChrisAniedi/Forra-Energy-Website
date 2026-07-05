"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowR, TickIc } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useOverlay } from "@/context/OverlayProvider";

interface Faq { q: string; a: string; cat: string }
const FAQS: Faq[] = [
  { cat: "Getting started", q: "How do I know what size system I need?", a: "Run our free audit — add your appliances and it sizes the exact inverter, battery and panels. Or book a survey and our engineers do it for you." },
  { cat: "Getting started", q: "Is my property suitable for solar?", a: "Almost certainly. We install on roofs and ground mounts across homes, businesses and facilities. A quick site survey confirms the best layout for you." },
  { cat: "Getting started", q: "How long does the whole process take?", a: "Most homes go from audit to installed in one to two weeks. Larger commercial projects take longer depending on scope and site works." },
  { cat: "Systems", q: "Lithium or tubular batteries — which should I choose?", a: "Lithium lasts longer (10+ years) and discharges deeper; tubular is cheaper upfront. Our audit and team help you pick for your budget and backup needs." },
  { cat: "Systems", q: "Will solar power my air conditioners?", a: "Yes — with the right inverter and battery sizing. We size specifically for heavy loads like ACs, pumps and freezers, not just lights and TVs." },
  { cat: "Systems", q: "What happens at night or on cloudy days?", a: "Your battery carries you through the night, and the grid or a generator can top up if ever needed. Hybrid systems switch between sources seamlessly." },
  { cat: "Systems", q: "Do I still need the grid?", a: "Hybrid systems use the grid as one input; off-grid systems don't need it at all. We design to whichever you want." },
  { cat: "Financing", q: "Can I pay in instalments?", a: "Yes. Choose an upfront amount and a repayment tenor on the financing page — home plans are often approved within 48 hours." },
  { cat: "Financing", q: "Do I need collateral?", a: "Most home financing is unsecured — the system itself is the security. Larger commercial facilities may have different terms, confirmed at review." },
  { cat: "Financing", q: "What will my monthly repayment be?", a: "Use the financing calculator for an indicative figure. Your exact terms follow a free audit and a quick credit review, always confirmed in writing first." },
  { cat: "Installation", q: "How long does installation take?", a: "Most homes are installed in a single day, with tidy cabling, safety testing and a proper handover of your new system." },
  { cat: "Installation", q: "Who actually installs the system?", a: "Certified Forra engineers and technicians — never uncertified subcontractors. Quality of install is what makes a system last." },
  { cat: "Support", q: "Is the system monitored?", a: "Yes — every system goes live in the Forra app, so you and we can see generation, battery level and usage in real time." },
  { cat: "Support", q: "What warranties do I get?", a: "Registered manufacturer warranties on equipment — for example 10-year lithium batteries and 25-year panels. We handle claims on your behalf." },
  { cat: "Support", q: "What if something goes wrong?", a: "Our support team and maintenance plans keep your system running, and monitoring often catches issues before you'd ever notice them." },
];
const CATS = ["All", "Getting started", "Systems", "Financing", "Installation", "Support"];

const FaqsContent = () => {
  const { openExpert } = useOverlay();
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? FAQS : FAQS.filter((f) => f.cat === cat);

  return (
    <main className="page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Eyebrow>FAQs</Eyebrow>
          <h1>Questions, answered<span className="gold">.</span></h1>
          <p>The things people ask us most about solar, systems, financing, installation and support — in plain language. Can't find it? Talk to an expert.</p>
          <ul className="pr-points">
            {["Straight answers", "No jargon", "Updated regularly", "Ask us anything"].map((t) => (
              <li key={t}><TickIc size={15} color="#0A7A50" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="chip-row co-filters">
            {CATS.map((c) => (
              <button key={c} className={"chip" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <div className="faq">
            {list.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>{f.q}<span className="faq-mark" aria-hidden="true" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark section--tight">
        <div className="container ab-cta">
          <div>
            <h2>Still have a question?</h2>
            <p>Talk to an engineer — not a salesperson — or head to support for help with an existing system.</p>
          </div>
          <div className="ab-cta-actions">
            <Link href="/support" className="btn btn--outline"><span>Go to support</span></Link>
            <Btn onClick={openExpert}>Talk to an expert</Btn>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FaqsContent;
