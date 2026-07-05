import { BatteryIc, ChartIc, CpuIc, GaugeIc, LeafIc, SettingIc, SunIc, WalletIc, type IconType } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Spark } from "@/components/ui/Spark";

const INTEL_FEATS = [
  ["Smart energy insights", GaugeIc], ["Consumption analytics", ChartIc], ["Solar production monitoring", SunIc],
  ["Battery health", BatteryIc], ["Cost optimization", WalletIc], ["Carbon impact tracking", LeafIc],
  ["Maintenance alerts", SettingIc], ["AI-assisted planning", CpuIc],
] as [string, IconType][];
const Intelligence = () => (
  <section className="section section--dark" id="intelligence">
    <div className="container">
      <div className="section-head section-head--light">
        <Eyebrow light>Energy intelligence</Eyebrow>
        <h2>Energy shouldn't just be consumed.<br />It should be understood.</h2>
        <p>Clear dashboards for energy flow, battery utilization, generation performance and consumption trends — so homes and businesses can find waste, cut costs and plan ahead.</p>
      </div>
      <div className="intel-grid">
        <div className="intel-dash">
          <div className="intel-dash-head">
            <div><label>This month · Surulere office</label><strong>2,418 kWh generated</strong></div>
            <span className="intel-pill up">▲ 12% vs last month</span>
          </div>
          <Spark color="#4FC08D" pts={[24, 30, 26, 44, 40, 58, 52, 66, 60, 74, 70, 86, 92, 88, 104]} />
          <div className="intel-mini">
            <div><label>Self-consumption</label><strong>81%</strong><Spark color="#F2A91C" pts={[40, 48, 44, 56, 52, 60, 58, 66, 62, 70, 74, 72, 78, 82, 86]} /></div>
            <div><label>Grid dependence</label><strong>9%</strong><Spark color="#4C9EEB" pts={[80, 74, 76, 66, 60, 62, 52, 48, 44, 40, 36, 32, 30, 26, 22]} /></div>
          </div>
          <div className="intel-reco">
            <span className="reco-ic"><CpuIc size={16} color="#F2A91C" /></span>
            <p><strong>Recommendation:</strong> shift borehole pumping to 11:00–14:00 to run fully on solar — est. <em>₦38,400/month</em> saved.</p>
          </div>
        </div>
        <ul className="intel-feats">
          {INTEL_FEATS.map(([f, Ic]) => (
            <li key={f}><span><Ic size={17} color="#8FD8B8" /></span>{f}</li>
          ))}
        </ul>
      </div>
      <div className="intel-cta"><Btn kind="gold">Explore Energy Intelligence</Btn></div>
    </div>
  </section>
);

export default Intelligence;
