"use client";

import SolutionPage, { type SolutionData } from "@/components/solutions/SolutionPage";
import {
  BatteryIc, BuildingIc, ChartIc, FridgeIc, GaugeIc, HealthIc, LeafIc, MonitorIc,
  ShieldIc, ShopIc, StarIc, WalletIc,
} from "@/components/ui/icons";

const SME_DATA: SolutionData = {
  eyebrow: "For small & growing businesses",
  h1: "Power that keeps you open",
  intro:
    "Outages and diesel eat into thin margins and send customers elsewhere. Forra keeps your shop, office or clinic running on clean, reliable power — for less than you spend on fuel today, with plans that fit your cash flow.",
  points: ["Stay open through outages", "Cut diesel & downtime", "Financing as operating cost", "Live usage monitoring"],
  stats: [
    { to: 40, suffix: "%+", l: "Avg. energy cost cut" },
    { to: 1, suffix: "-day", l: "Typical install" },
    { to: 500, suffix: "+", l: "Businesses powered" },
    { to: 97, suffix: "%", l: "Systems online" },
  ],
  benefitsEyebrow: "Why SMEs switch",
  benefitsTitle: "Reliability is the cheapest marketing you'll buy.",
  benefits: [
    [ShopIc, "Uptime protects revenue", "No more shutting early or turning customers away when the grid drops. Your business simply keeps running."],
    [WalletIc, "Kill the diesel bill", "Most SMEs replace the bulk of generator spend fast — the savings help cover the system's own repayment."],
    [ShieldIc, "Protect your equipment", "Clean, stable power protects fridges, POS, compressors and electronics from the surges that shorten their life."],
    [StarIc, "Look the part", "A quiet, always-lit space signals a serious business — no generator roar, no dark aisles, no fumes."],
    [ChartIc, "Pay from cash flow", "Finance the system and treat power as a predictable monthly cost instead of a lumpy fuel spend."],
    [MonitorIc, "See every naira", "Track generation, battery and usage in the Forra app so you know exactly what your power costs."],
  ],
  stepsEyebrow: "How it works",
  stepsTitle: "From fuel runs to always-on, fast.",
  steps: [
    ["Free business audit", "We assess your loads and opening hours — in person or via the self-audit — and size the right system."],
    ["Right-sized design", "Certified engineers design an inverter, battery and panel setup matched to your real demand, not a template."],
    ["Fast installation", "Most SMEs are installed with minimal disruption and a proper, safety-tested handover."],
    ["Monitor & support", "Your system goes live in the app, backed by warranties and a support team that answers."],
  ],
  quote: {
    text: "We used to close by 6pm when the grid went. Since Forra, we run full hours on solar — sales are up and we've stopped buying diesel entirely.",
    name: "Tunde Bakare", role: "Owner, Freshmart · Lagos", init: "TB",
  },
  ctaTitle: "Keep your business on.",
  ctaText: "Start with a free audit — we'll size your system and show you a financing plan that fits your cash flow.",
};

const COMMERCIAL_DATA: SolutionData = {
  eyebrow: "For commercial buildings & facilities",
  h1: "Enterprise-grade energy, engineered",
  intro:
    "Offices, malls, estates and industrial facilities need power that's reliable, efficient and accountable. Forra designs, installs and monitors three-phase solar and storage at scale — with financing and PPA options that protect your capital.",
  points: ["Three-phase engineering", "Peak-demand management", "PPA — no upfront capex", "Analytics & reporting"],
  stats: [
    { to: 2.6, dp: 1, suffix: " MW", l: "Installed capacity" },
    { to: 12, suffix: "+", l: "States covered" },
    { to: 99, suffix: "%", l: "Uptime target" },
    { to: 1900, suffix: " t", l: "CO₂ offset" },
  ],
  benefitsEyebrow: "Why facilities choose Forra",
  benefitsTitle: "Power infrastructure that pays for itself.",
  benefits: [
    [BuildingIc, "Designed for scale", "Three-phase systems engineered to your facility's load profile, with room to expand as you grow."],
    [GaugeIc, "Cut peak demand", "Solar and storage shave expensive peak loads and reduce reliance on grid and diesel during the costliest hours."],
    [WalletIc, "Protect your capital", "Choose financing or a Power Purchase Agreement — pay for energy produced, with little-to-no upfront cost."],
    [ShieldIc, "Resilience for critical loads", "Prioritised backup keeps lifts, servers, security and cold rooms running through any outage."],
    [LeafIc, "ESG you can report", "Verifiable carbon reductions and clean-energy metrics for your sustainability and compliance reporting."],
    [ChartIc, "Analytics & accountability", "Facility-wide monitoring and analytics show generation, consumption and savings across every meter."],
  ],
  stepsEyebrow: "How it works",
  stepsTitle: "Engineered from feasibility to live plant.",
  steps: [
    ["Feasibility & audit", "We profile your facility's demand, tariffs and roof/ground space to model the right system and returns."],
    ["Engineering design", "Detailed three-phase design — inverters, storage, protection and grid integration — signed off by our engineers."],
    ["Project installation", "Managed installation and commissioning with minimal disruption to operations and full safety compliance."],
    ["Monitor & optimise", "Ongoing monitoring, maintenance and optimisation to keep performance and savings at target."],
  ],
  quote: {
    text: "Forra scoped our office complex, financed the plant, and now manages it end to end. Our energy costs are down and, for the first time, fully visible.",
    name: "Ngozi Umeh", role: "Facilities Director · Abuja", init: "NU",
  },
  ctaTitle: "Build energy infrastructure that lasts.",
  ctaText: "Talk to our commercial team, or start with an audit to model your facility's system, savings and financing.",
};

const HEALTHCARE_DATA: SolutionData = {
  eyebrow: "For clinics & hospitals",
  h1: "Uninterrupted power for critical care",
  intro:
    "In healthcare, an outage isn't an inconvenience — it's a risk to life. Forra delivers seamless, silent, always-on power for clinics and hospitals, protecting the cold chain, diagnostics and theatres that can't afford to go dark.",
  points: ["Zero-gap critical backup", "Cold-chain protection", "Silent & clean", "Financing for facilities"],
  stats: [
    { to: 99, suffix: ".9%", l: "Uptime target" },
    { to: 24, suffix: "/7", l: "Critical backup" },
    { to: 12, suffix: "+", l: "States covered" },
    { to: 1, suffix: "-day", l: "Rapid deployment" },
  ],
  benefitsEyebrow: "Why healthcare trusts Forra",
  benefitsTitle: "When power can't fail, design like it.",
  benefits: [
    [HealthIc, "Zero-gap backup", "Seamless switchover keeps theatres, ICUs, monitors and life-support running without a flicker or a gap."],
    [FridgeIc, "Protect the cold chain", "Stable, continuous power safeguards vaccines, blood and medication from spoilage during any outage."],
    [BatteryIc, "Silent, clean power", "No generator noise or fumes near wards and consulting rooms — calmer recovery and cleaner air for patients."],
    [MonitorIc, "Power for diagnostics", "Reliable supply for imaging, lab and diagnostic equipment so care isn't delayed by the grid."],
    [ShieldIc, "Monitoring & alerts", "Live system health and battery alerts in the Forra app mean issues are caught before they become emergencies."],
    [WalletIc, "Financing for facilities", "Spread the cost with financing built for clinics and hospitals — critical resilience without a capital shock."],
  ],
  stepsEyebrow: "How it works",
  stepsTitle: "Resilience, planned around your critical loads.",
  steps: [
    ["Critical-load audit", "We map life-safety, cold-chain and diagnostic loads to design backup exactly where it matters most."],
    ["Redundant design", "Engineers design a resilient system with prioritised circuits and the storage to ride through long outages."],
    ["Careful installation", "Installed and commissioned around your operations, with rigorous safety testing and clear handover."],
    ["Monitor & maintain", "24/7 monitoring, alerts and maintenance keep critical power dependable, year after year."],
  ],
  quote: {
    text: "Our vaccine fridges and theatre used to be at the mercy of the grid. Forra gave us seamless backup — we haven't lost power to a critical area since.",
    name: "Dr. Amaka Nwosu", role: "Medical Director · Enugu", init: "AN",
  },
  ctaTitle: "Power that patients can count on.",
  ctaText: "Talk to our healthcare team, or run a free audit to size resilient backup for your facility's critical loads.",
};

export const SmeContent = () => <SolutionPage data={SME_DATA} />;
export const CommercialContent = () => <SolutionPage data={COMMERCIAL_DATA} />;
export const HealthcareContent = () => <SolutionPage data={HEALTHCARE_DATA} />;
