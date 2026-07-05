import { ArrowR, BankIc, BuildingIc, ChurchIc, EstateIc, FactoryIc, HealthIc, HomeIc, HotelIc, PeopleIc, SchoolIc, ShopIc, TractorIc, type IconType } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/Eyebrow";

const INDUSTRIES = [
  [HomeIc, "Residential"], [ShopIc, "Small businesses"], [BuildingIc, "Corporate offices"],
  [HealthIc, "Healthcare"], [SchoolIc, "Education"], [FactoryIc, "Manufacturing"],
  [HotelIc, "Hospitality"], [TractorIc, "Agriculture"], [EstateIc, "Real estate"],
  [BankIc, "Government"], [ChurchIc, "Religious orgs"], [PeopleIc, "Markets & informal traders"],
] as [IconType, string][];
const Industries = () => (
  <section className="section section--mist" id="solutions">
    <div className="container">
      <div className="section-head">
        <Eyebrow>Solutions</Eyebrow>
        <h2>Every sector runs on power.<br />We design for each one.</h2>
      </div>
      <div className="ind-grid">
        {INDUSTRIES.map(([Ic, n]) => (
          <button className="ind-card" key={n}>
            <span className="ind-ic"><Ic size={22} /></span>
            <span className="ind-name">{n}</span>
            <ArrowR size={15} className="ind-arrow" />
          </button>
        ))}
      </div>
    </div>
  </section>
);

export default Industries;
