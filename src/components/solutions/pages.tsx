"use client";

import SolutionPage, { type SolutionData } from "@/components/solutions/SolutionPage";
import {
  AcIc, BatteryIc, BuildingIc, BulbIc, ChartIc, CpuIc, FactoryIc, FanIc, FridgeIc, GaugeIc,
  HealthIc, HotelIc, LaptopIc, LeafIc, MonitorIc, PumpIc, SchoolIc, SettingIc, ShieldIc,
  ShopIc, StarIc, TvIc, WalletIc,
} from "@/components/ui/icons";

const SME_DATA: SolutionData = {
  eyebrow: "For small & growing businesses",
  h1: "Power that keeps you open",
  intro:
    "Outages and diesel eat into thin margins and send customers elsewhere. Forra keeps your shop, office or clinic running on clean, reliable power — for less than you spend on fuel today, with plans that fit your cash flow.",
  points: ["Stay open through outages", "Cut diesel & downtime", "Financing as operating cost", "Live usage monitoring"],
  powersTitle: "What stays on",
  powers: [[ShopIc, "Point-of-sale & tills"], [FridgeIc, "Fridges & freezers"], [BulbIc, "Lighting"], [FanIc, "Fans & AC"], [LaptopIc, "Office & Wi-Fi"]],
  coverage: 96,
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
  challengesEyebrow: "Sound familiar?",
  challengesTitle: "Your problems, solved.",
  challenges: [
    ["The grid drops and we lose sales", "A hybrid battery bank carries your core loads instantly — tills, lights and fridges never blink, so trading continues through any outage."],
    ["Diesel is eating our margin", "Solar covers most daytime demand and recharges your batteries, cutting fuel runs to rare backup — and the savings help repay the system."],
    ["We can't predict our power costs", "Financing turns a lumpy fuel bill into a fixed monthly figure, and the Forra app shows exactly where every kilowatt goes."],
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
  powersTitle: "Critical systems",
  powers: [[CpuIc, "Servers & IT rooms"], [AcIc, "HVAC & cooling"], [BuildingIc, "Lifts & access"], [MonitorIc, "Security & CCTV"], [PumpIc, "Water & fire pumps"]],
  coverage: 98,
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
  challengesEyebrow: "The facility reality",
  challengesTitle: "Big-building problems, engineered away.",
  challenges: [
    ["Peak tariffs and diesel are crushing our OPEX", "Solar-plus-storage shaves the costliest peak hours and offsets grid demand, with a PPA option so you pay only for the energy produced."],
    ["An outage takes down critical systems", "Prioritised circuits keep lifts, servers, security and cold rooms live on battery while non-essential load is gracefully shed."],
    ["We need to report on sustainability", "Facility-wide monitoring gives verifiable generation and carbon data, ready to drop into your ESG and compliance reports."],
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
  powersTitle: "Critical care loads",
  powers: [[HealthIc, "Theatres & ICU"], [FridgeIc, "Vaccine & blood cold chain"], [MonitorIc, "Diagnostics & monitors"], [BulbIc, "Ward lighting"], [AcIc, "Climate control"]],
  coverage: 99,
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
  challengesEyebrow: "The stakes in healthcare",
  challengesTitle: "Where failure isn't an option.",
  challenges: [
    ["An outage during a procedure is a real risk", "Seamless switchover keeps theatres, ICUs and monitors powered without a flicker — backup measured in a fraction of a second, not seconds."],
    ["We keep losing vaccines and blood to power cuts", "Continuous power holds your cold chain steady around the clock, with app alerts the moment a fridge drifts out of range."],
    ["Generators are noisy and fume-filled near wards", "Silent solar and battery power replaces the generator for most hours, giving patients cleaner air and calmer recovery."],
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

const EDUCATION_DATA: SolutionData = {
  eyebrow: "For schools & universities",
  h1: "Uninterrupted learning, powered by the sun",
  intro:
    "Every outage is a lesson interrupted and a diesel bill that could have paid a teacher. Forra keeps classrooms, labs, dormitories and exam halls reliably lit and cool — cutting running costs so more of every fee goes into learning.",
  points: ["Lights & labs stay on", "Free up budget from diesel", "Quiet, safe campus", "Financing over school terms"],
  powersTitle: "Kept running",
  powers: [[BulbIc, "Classrooms & halls"], [LaptopIc, "Computer labs"], [FanIc, "Fans & cooling"], [MonitorIc, "Security & CCTV"], [PumpIc, "Water supply"]],
  coverage: 95,
  stats: [
    { to: 45, suffix: "%+", l: "Running-cost cut" },
    { to: 12, suffix: " hrs", l: "Backup for boarding" },
    { to: 200, suffix: "+", l: "Classrooms powered" },
    { to: 25, suffix: "-yr", l: "Panel warranty" },
  ],
  benefitsEyebrow: "Why schools switch",
  benefitsTitle: "Money into teaching, not diesel.",
  benefits: [
    [SchoolIc, "Learning never stops", "Classrooms, labs and the exam hall stay lit and running, so timetables and results aren't at the mercy of the grid."],
    [WalletIc, "Free up the budget", "Solar slashes running costs, redirecting money from fuel to teachers, books and facilities — financed over terms you can plan around."],
    [BulbIc, "Reliable evening study", "Sized storage carries dormitories, security lighting and study halls through the night, every night."],
    [ShieldIc, "A safer campus", "Silent power means no generator fumes near children and steady lighting keeps the grounds secure after dark."],
    [LeafIc, "A living lesson", "A visible solar array is a real-world teaching tool and a statement of the values your school stands for."],
    [MonitorIc, "Simple oversight", "Bursars track generation, usage and savings in the Forra app — clear numbers for the board and PTA."],
  ],
  challengesEyebrow: "Campus challenges",
  challengesTitle: "The school-day problems we fix.",
  challenges: [
    ["Classes and exams stop when power does", "Battery backup keeps classrooms, labs and the exam hall lit and running, so learning isn't interrupted by the grid."],
    ["Fees can't stretch to huge diesel bills", "Solar cuts running costs sharply, freeing budget for teachers and facilities instead of fuel — spread over terms a school can plan around."],
    ["Boarding and evening study need reliable light", "Right-sized storage carries dormitories, security lighting and study halls through the night, every night."],
  ],
  stepsEyebrow: "How it works",
  stepsTitle: "From assessment to always-on campus.",
  steps: [
    ["Campus energy audit", "We assess classrooms, labs, boarding and pumps to size a system for both school hours and overnight loads."],
    ["Tailored design", "Engineers design an array and storage that fit your roofs, budget and term-time and holiday usage patterns."],
    ["Installation in the break", "We schedule around the calendar — typically installing during a holiday for zero disruption to teaching."],
    ["Monitor & support", "Your system goes live in the app with warranties and support the bursary can rely on."],
  ],
  quote: {
    text: "We were spending a fortune on diesel just to keep the lights on for prep. Forra financed a solar system that paid for itself in savings — and prep has never been cancelled since.",
    name: "Mrs. Folake Adeniyi", role: "Proprietor, Brightfield Schools · Ibadan", init: "FA",
  },
  ctaTitle: "Power a school that never pauses.",
  ctaText: "Start with a free audit — we'll size a system for your campus and a plan that fits the school calendar.",
};

const HOSPITALITY_DATA: SolutionData = {
  eyebrow: "For hotels, resorts & venues",
  h1: "Seamless comfort your guests never question",
  intro:
    "Guests pay for calm, cool rooms and an experience that never falters. Forra delivers silent, always-on power that keeps rooms, kitchens and amenities running through any outage — cutting one of your biggest costs at the same time.",
  points: ["Zero-blackout guest experience", "No generator noise or fumes", "Cut energy costs", "Financed, predictable payments"],
  powersTitle: "Guest-facing loads",
  powers: [[AcIc, "Rooms & AC"], [FridgeIc, "Kitchen & cold rooms"], [BulbIc, "Lighting & ambiance"], [TvIc, "TV & Wi-Fi"], [PumpIc, "Water & pool pumps"]],
  coverage: 97,
  stats: [
    { to: 40, suffix: "%+", l: "Energy cost cut" },
    { to: 0, dp: 0, prefix: "", suffix: " blackouts", l: "Felt by guests" },
    { to: 24, suffix: "/7", l: "Seamless power" },
    { to: 97, suffix: "%", l: "Systems online" },
  ],
  benefitsEyebrow: "Why hospitality switches",
  benefitsTitle: "The experience is the product. Protect it.",
  benefits: [
    [HotelIc, "Zero-blackout stays", "Instant battery backup keeps rooms, AC, lifts and Wi-Fi seamless — guests never know the grid went out."],
    [BatteryIc, "Silence sells", "No generator roar or diesel fumes to break the calm — just clean, quiet power that protects your ambiance and reviews."],
    [WalletIc, "Cut a top-3 cost", "Solar offsets the bulk of daytime load — cooling, kitchens and laundry — turning a heavy bill into predictable payments."],
    [FridgeIc, "Protect your kitchen", "Stable power safeguards cold rooms, freezers and stock from the spoilage a sudden outage can cause."],
    [StarIc, "Better reviews", "Reliable comfort and a quieter property show up directly in guest ratings and repeat bookings."],
    [MonitorIc, "Full visibility", "Track generation, battery and consumption across the property from the Forra app."],
  ],
  challengesEyebrow: "The guest experience",
  challengesTitle: "What can't be allowed to fail.",
  challenges: [
    ["Guests won't tolerate blackouts", "Instant battery backup keeps rooms, AC, lifts and Wi-Fi seamless — the switchover is invisible to guests."],
    ["Generator noise and fumes hurt the experience", "Silent solar power replaces the generator for most hours, protecting the calm and air quality guests are paying for."],
    ["Energy is one of our biggest costs", "Solar offsets the bulk of daytime load — kitchens, cooling and laundry — turning a heavy bill into predictable, financed payments."],
  ],
  stepsEyebrow: "How it works",
  stepsTitle: "From walk-through to worry-free.",
  steps: [
    ["Property audit", "We assess rooms, kitchens, cooling and amenities to size a system for peak occupancy and quiet seasons alike."],
    ["Tailored design", "Engineers design storage and solar to carry guest-critical loads seamlessly, prioritising comfort and continuity."],
    ["Discreet installation", "Installed with minimal disruption to operations and guests, tidily and safety-tested throughout."],
    ["Monitor & support", "Your system goes live in the app, backed by warranties and responsive support."],
  ],
  quote: {
    text: "Our guests used to feel every power cut. Now the changeover is invisible — no noise, no dark corridors. Our ratings for comfort have climbed and our diesel spend has collapsed.",
    name: "Emeka Okafor", role: "GM, Lakeview Hotel · Lagos", init: "EO",
  },
  ctaTitle: "Give guests an experience that never flickers.",
  ctaText: "Start with a free audit — we'll size a system for your property and a financing plan that protects your margins.",
};

const MANUFACTURING_DATA: SolutionData = {
  eyebrow: "For factories & industrial plants",
  h1: "Keep the line running, cut the cost per unit",
  intro:
    "Every minute of downtime is lost output, and diesel makes every unit more expensive to produce. Forra engineers three-phase solar and storage that keep your lines running and drive down energy cost — with the headroom to scale as you grow.",
  points: ["Protect uptime & output", "Lower cost per unit", "Three-phase, built to scale", "Financing & PPA options"],
  powersTitle: "Plant loads",
  powers: [[SettingIc, "Production lines"], [CpuIc, "PLCs & controls"], [FridgeIc, "Cold storage"], [PumpIc, "Pumps & compressors"], [BulbIc, "Plant lighting"]],
  coverage: 94,
  stats: [
    { to: 35, suffix: "%+", l: "Energy cost cut" },
    { to: 99, suffix: "%", l: "Uptime target" },
    { to: 2.6, dp: 1, suffix: " MW", l: "Installed capacity" },
    { to: 12, suffix: "+", l: "States covered" },
  ],
  benefitsEyebrow: "Why plants choose Forra",
  benefitsTitle: "Reliable power is production capacity.",
  benefits: [
    [FactoryIc, "Protect your output", "Storage bridges outages instantly so lines, PLCs and cold storage keep running — no lost batches, no restart downtime."],
    [GaugeIc, "Lower cost per unit", "Solar and storage offset heavy daytime loads and shave peak demand, cutting both energy cost and generator hours."],
    [SettingIc, "Engineered for machinery", "Three-phase systems designed for motor start-up currents and industrial loads, not scaled-up home kit."],
    [WalletIc, "Protect capital", "Finance the system or use a PPA — pay for energy produced and keep working capital in the business."],
    [ShieldIc, "Ride through outages", "Prioritised backup keeps critical process and safety systems live while non-essential load is shed."],
    [ChartIc, "Data for efficiency", "Load and generation analytics reveal where energy goes, so you can trim waste line by line."],
  ],
  challengesEyebrow: "On the plant floor",
  challengesTitle: "The production problems we remove.",
  challenges: [
    ["Downtime from outages costs us production", "Storage bridges outages instantly so lines, PLCs and cold storage keep running — protecting output and raw materials."],
    ["Three-phase machinery and diesel are expensive to run", "Right-sized solar and storage offset heavy daytime loads and peak demand, cutting energy cost and generator hours together."],
    ["We need power we can scale as we grow", "Modular three-phase systems are engineered with headroom, so added machines and shifts are a capacity upgrade, not a rebuild."],
  ],
  stepsEyebrow: "How it works",
  stepsTitle: "From load study to a plant that runs.",
  steps: [
    ["Industrial load study", "We profile your machinery, shifts and demand peaks to size a system that holds up under real production loads."],
    ["Three-phase design", "Engineers design inverters, storage and protection matched to motor loads, safety systems and grid integration."],
    ["Managed installation", "Installed and commissioned around your production schedule, with full compliance and safety testing."],
    ["Monitor & optimise", "Ongoing monitoring and maintenance keep uptime and savings on target as your output grows."],
  ],
  quote: {
    text: "A single outage used to ruin a batch and cost us hours restarting. Forra's system carries the line straight through — output is up and our energy cost per unit is down.",
    name: "Ibrahim Danjuma", role: "Plant Manager · Kano", init: "ID",
  },
  ctaTitle: "Turn reliable power into more output.",
  ctaText: "Talk to our industrial team, or start with an audit to model your plant's system, savings and financing.",
};

export const SmeContent = () => <SolutionPage data={SME_DATA} />;
export const CommercialContent = () => <SolutionPage data={COMMERCIAL_DATA} />;
export const HealthcareContent = () => <SolutionPage data={HEALTHCARE_DATA} />;
export const EducationContent = () => <SolutionPage data={EDUCATION_DATA} />;
export const HospitalityContent = () => <SolutionPage data={HOSPITALITY_DATA} />;
export const ManufacturingContent = () => <SolutionPage data={MANUFACTURING_DATA} />;
