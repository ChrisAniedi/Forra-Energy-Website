import type { Package } from "@/components/shop/packages";

/** Stylized product render — swap for photography in production. */
export const SystemArt = ({ p }: { p: Package }) => (
  <div className={"pr-stage pr-stage--" + p.chem.toLowerCase()}>
    <span className={"pr-chem pr-chem--" + p.chem.toLowerCase()}>{p.chem === "Lithium" ? "LiFePO₄" : "Tubular"}</span>
    <span className={"pr-stock" + (p.stock === "In stock" ? " on" : "")}>{p.stock}</span>
    <div className="art-panels">{Array.from({ length: Math.min(p.panelCount, 8) }).map((_, i) => <span key={i} />)}</div>
    <div className="art-scene">
      <div className="art-inverter"><span className="art-screen" /><span className="art-led" /></div>
      <div className={"art-batt art-batt--" + p.chem.toLowerCase()}>
        {Array.from({ length: p.battN }).map((_, i) => <span key={i} />)}
      </div>
    </div>
  </div>
);
