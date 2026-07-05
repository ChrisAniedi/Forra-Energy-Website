import { CpuIc, GaugeIc, MonitorIc, SettingIc, ShieldIc, TimerIc, WalletIc, type IconType } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/Eyebrow";

const PROCESS = [
  ["Consultation", TimerIc], ["Energy audit", GaugeIc], ["Custom design", CpuIc],
  ["Financing", WalletIc], ["Installation", SettingIc], ["Monitoring", MonitorIc], ["Long-term support", ShieldIc],
] as [string, IconType][];
const Process = () => (
  <section className="section section--mist">
    <div className="container">
      <div className="section-head">
        <Eyebrow>How it works</Eyebrow>
        <h2>From first call to full independence.</h2>
      </div>
      <div className="proc-track">
        <div className="proc-line" />
        {PROCESS.map(([t, Ic], i) => (
          <div className="proc-step" key={t}>
            <span className="proc-node"><Ic size={19} /></span>
            <em>Step {i + 1}</em>
            <strong>{t}</strong>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
