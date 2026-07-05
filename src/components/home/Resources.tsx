import { ArrowR, BatteryIc, BookIc, CalcIc, FlashIc, type IconType } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

const RES = [
  [BookIc, "Solar buying guide", "What to know before you buy — panels, inverters, batteries, warranties."],
  [BatteryIc, "Battery technology", "LiFePO₄ vs tubular: lifespan, depth of discharge and real costs."],
  [FlashIc, "Hybrid systems, explained", "How solar, battery and grid work together in a Nigerian home."],
  [CalcIc, "Savings calculator", "Estimate your monthly and five-year savings in two minutes."],
] as [IconType, string, string][];
const Resources = () => (
  <section className="section" id="resources">
    <div className="container">
      <div className="section-head section-head--row">
        <div>
          <Eyebrow>Knowledge center</Eyebrow>
          <h2>Learn before you spend.</h2>
        </div>
        <Btn kind="outline" small>Browse all resources</Btn>
      </div>
      <div className="res-grid">
        {RES.map(([Ic, t, d]) => (
          <article className="res-card" key={t}>
            <span className="res-ic"><Ic size={20} /></span>
            <h3>{t}</h3><p>{d}</p>
            <button className="eco-link">Read guide<ArrowR size={15} /></button>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Resources;
