"use client";

import Link from "next/link";
import { ArrowR, BookIc, CalcIc, ChartIc, DocIc, GaugeIc, PeopleIc, ShieldIc, TickIc, type IconType } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useOverlay } from "@/context/OverlayProvider";

const HUB: { ic: IconType; title: string; desc: string; href: string }[] = [
  { ic: BookIc, title: "Solar Learning Hub", desc: "Structured lessons from the basics to sizing your own system.", href: "/learning" },
  { ic: DocIc, title: "Energy Guides", desc: "In-depth, downloadable references for homes, businesses and buyers.", href: "/guides" },
  { ic: ChartIc, title: "Blog", desc: "Plain-English explainers and insights from our engineers.", href: "/blog" },
  { ic: CalcIc, title: "Savings Calculator", desc: "Estimate what going solar could save you every month.", href: "/savings-calculator" },
  { ic: GaugeIc, title: "Case Studies", desc: "Real installs across Nigeria and the outcomes they delivered.", href: "/case-studies" },
  { ic: PeopleIc, title: "FAQs", desc: "Quick answers to the questions we hear most.", href: "/faqs" },
  { ic: ShieldIc, title: "Support", desc: "Get help with an existing Forra system or service request.", href: "/support" },
];

const KnowledgeContent = () => {
  const { openStart } = useOverlay();
  return (
    <main className="page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Eyebrow>Knowledge Center</Eyebrow>
          <h1>Everything you need to go solar with confidence<span className="gold">.</span></h1>
          <p>Guides, lessons, real case studies and tools — all in one place — to help you understand solar, size it right and make a decision you'll be glad about.</p>
          <ul className="pr-points">
            {["Learn the basics", "Compare and plan", "See real results", "Get support"].map((t) => (
              <li key={t}><TickIc size={15} color="#0A7A50" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="kc-grid">
            {HUB.map(({ ic: Ic, title, desc, href }) => (
              <Link className="kc-card" href={href} key={title}>
                <span className="kc-ic"><Ic size={22} /></span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <span className="kc-go">Explore<ArrowR size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark section--tight">
        <div className="container ab-cta">
          <div>
            <h2>Prefer to just see your numbers?</h2>
            <p>Skip the reading — a free audit sizes a system for your exact load and shows the cost and savings.</p>
          </div>
          <div className="ab-cta-actions">
            <Link href="/savings-calculator" className="btn btn--outline"><span>Savings calculator</span></Link>
            <Btn onClick={openStart}>Run a free audit</Btn>
          </div>
        </div>
      </section>
    </main>
  );
};

export default KnowledgeContent;
