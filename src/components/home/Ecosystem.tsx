/** Product ecosystem — six cards forming the Assess → Manage customer journey. */
import { ArrowR, BuildingIc, CpuIc, DocIc, GaugeIc, SunIc, WalletIc } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/Eyebrow";

const ECO = [
  { Icon: GaugeIc, name: "Energy Audit", tag: "Assess", d: "Calculate your usage, size the right inverter, battery and panels, and get a downloadable assessment report.", cta: "Launch Energy Audit", tint: "mint" },
  { Icon: WalletIc, name: "Solar Financing", tag: "Finance", d: "Own your system with flexible plans tailored to your budget — from homes to industrial projects.", cta: "Explore Financing", tint: "gold" },
  { Icon: SunIc, name: "Solar Systems", tag: "Build", d: "Professionally engineered residential, commercial and industrial systems built with premium components.", cta: "View Solar Solutions", tint: "sky" },
  { Icon: BuildingIc, name: "Commercial Energy", tag: "Scale", d: "Dependable infrastructure for offices, schools, hospitals, factories, estates and large organizations.", cta: "Explore Commercial", tint: "mint" },
  { Icon: CpuIc, name: "Energy Intelligence", tag: "Understand", d: "Real-time monitoring, analytics and insights — see how power is generated, stored and consumed, and where to cut waste.", cta: "Explore Intelligence", tint: "gold" },
  { Icon: DocIc, name: "Client Portal", tag: "Manage", d: "Installation progress, financing, payments, warranties, reports and support — in one workspace.", cta: "Access Portal", tint: "sky" },
];
const Ecosystem = () => (
  <section className="section" id="products">
    <div className="container">
      <div className="section-head">
        <Eyebrow>Product ecosystem</Eyebrow>
        <h2>One intelligent platform.<br />Every energy solution.</h2>
        <p>Not a list of services — a connected system that takes you from first assessment to daily optimization.</p>
      </div>
      <div className="eco-grid">
        {ECO.map(({ Icon, name, tag, d, cta, tint }) => (
          <article key={name} className={`eco-card eco-card--${tint}`}>
            <div className="eco-top">
              <span className="eco-icon"><Icon size={22} /></span>
              <span className="eco-tag">{tag}</span>
            </div>
            <h3>{name}</h3>
            <p>{d}</p>
            <button className="eco-link">{cta}<ArrowR size={15} /></button>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Ecosystem;
