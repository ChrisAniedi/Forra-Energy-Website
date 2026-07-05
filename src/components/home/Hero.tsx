"use client";

import CommandCenter from "@/components/home/CommandCenter";
import { TickIc } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CountUp } from "@/components/ui/CountUp";
import { useOverlay } from "@/context/OverlayProvider";

const Hero = () => {
  const { openStart } = useOverlay();
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid-lines" />
        <div className="hero-glow hero-glow--a" />
        <div className="hero-glow hero-glow--b" />
      </div>
      <div className="container">
        <div className="hero-center">
          <Eyebrow>Africa's Intelligent Energy Platform</Eyebrow>
          <h1>Powering a smarter, more reliable and sustainable future<span className="gold">.</span></h1>
          <p className="hero-sub">
            Forra Energy helps homes and businesses reduce electricity costs, improve energy
            reliability and embrace clean energy — through intelligent technology, flexible
            financing and expertly designed solar solutions.
          </p>
          <div className="hero-actions">
            <Btn onClick={openStart}>Start Your Energy Audit</Btn>
            <Btn kind="outline" onClick={() => document.getElementById("financing")?.scrollIntoView({ behavior: "smooth" })}>Explore Solar Financing</Btn>
          </div>
          <ul className="trust">
            {["Certified engineers", "Flexible financing", "Premium equipment", "Nationwide installation"].map((t) => (
              <li key={t}><TickIc size={16} color="#0A7A50" />{t}</li>
            ))}
          </ul>
        </div>
        <CommandCenter />
        <div className="metrics">
          {[
            { k: <CountUp to={2.6} dp={1} suffix=" MW" />, l: "Installed capacity" },
            { k: <CountUp to={380} suffix="+" />, l: "Projects completed" },
            { k: <CountUp to={1500} suffix="+" />, l: "Customers served" },
            { k: <CountUp to={850} prefix="₦" suffix="M+" />, l: "Customer savings" },
            { k: <CountUp to={1900} suffix=" t" />, l: "CO₂ offset" },
          ].map((m, i) => (
            <div className="metric" key={i}><strong>{m.k}</strong><span>{m.l}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
