import { ChartIc, FlashIc, GlobeIc, PeopleIc, ShieldIc, WalletIc, type IconType } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/Eyebrow";

const WHY = [
  [FlashIc, "Reliable power", "Engineered for uptime — hybrid systems that keep you running when the grid doesn't."],
  [WalletIc, "Lower costs", "Cut grid bills and eliminate diesel — most customers save 40–60% monthly."],
  [ShieldIc, "Premium engineering", "Tier-1 panels, LiFePO₄ storage and certified installation teams nationwide."],
  [ChartIc, "Data-driven insights", "Every system ships with monitoring — decisions backed by your real usage."],
  [PeopleIc, "Long-term support", "Warranties, maintenance plans and a support team that picks up."],
  [GlobeIc, "Nationwide coverage", "Installations and service across Lagos, Abuja, PH and 12+ states."],
] as [IconType, string, string][];
const Why = () => (
  <section className="section section--mist">
    <div className="container">
      <div className="section-head">
        <Eyebrow>Why Forra</Eyebrow>
        <h2>Built like a technology company.<br />Backed like an engineering firm.</h2>
      </div>
      <div className="why-grid">
        {WHY.map(([Ic, t, d]) => (
          <article className="why-card" key={t}>
            <span className="why-ic"><Ic size={21} /></span>
            <h3>{t}</h3><p>{d}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Why;
