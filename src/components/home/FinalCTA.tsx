"use client";

import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useOverlay } from "@/context/OverlayProvider";

const FinalCTA = () => {
  const { openStart, openExpert } = useOverlay();
  return (
    <section className="final">
      <div className="container final-inner">
        <div className="final-glow" aria-hidden="true" />
        <Eyebrow light>Get started</Eyebrow>
        <h2>Power your future<br />with confidence<span className="gold">.</span></h2>
        <p>Whether you're planning your first installation, financing a system or looking for smarter ways to manage electricity — Forra gives you the technology, engineering and support to succeed.</p>
        <div className="final-actions">
          <Btn kind="gold" onClick={openStart}>Start Free Energy Audit</Btn>
          <Btn kind="glass" onClick={openStart}>Get Free Quote</Btn>
          <Btn kind="glass" onClick={openExpert}>Talk to an Energy Expert</Btn>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
