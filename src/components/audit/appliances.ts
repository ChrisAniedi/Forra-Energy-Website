import {
  AcIc, BulbIc, FanIc, FridgeIc, LaptopIc, MonitorIc, PumpIc, TvIc,
  type IconType,
} from "@/components/ui/icons";

/** One selectable appliance in the audit library. watts = per-unit draw, hours = typical hrs/day. */
export interface Appliance {
  id: string;
  name: string;
  watts: number;
  hours: number;
  cat: string;
}

/** An appliance the user has added to their load, with quantity + edited hours. */
export interface LoadItem extends Appliance {
  qty: number;
}

export const CATEGORIES = [
  "Lighting", "Cooling & fans", "Screens", "Kitchen", "Work & IT", "Water", "Laundry", "Other",
] as const;

/** Category icon shown on the tab strip. */
export const CAT_ICON: Record<string, IconType> = {
  Lighting: BulbIc, "Cooling & fans": FanIc, Screens: TvIc, Kitchen: FridgeIc,
  "Work & IT": LaptopIc, Water: PumpIc, Laundry: MonitorIc, Other: AcIc,
};

/** Preset wattages/hours reflect typical Nigerian household + SME usage. */
export const APPLIANCES: Appliance[] = [
  // Lighting
  { id: "led9", name: "LED bulb (9W)", watts: 9, hours: 6, cat: "Lighting" },
  { id: "led18", name: "LED bulb (18W)", watts: 18, hours: 6, cat: "Lighting" },
  { id: "flood", name: "Security floodlight", watts: 30, hours: 11, cat: "Lighting" },
  // Cooling & fans
  { id: "ceilfan", name: "Ceiling fan", watts: 75, hours: 8, cat: "Cooling & fans" },
  { id: "standfan", name: "Standing fan", watts: 50, hours: 8, cat: "Cooling & fans" },
  { id: "ac1", name: "AC — 1HP", watts: 900, hours: 6, cat: "Cooling & fans" },
  { id: "ac15", name: "AC — 1.5HP", watts: 1300, hours: 6, cat: "Cooling & fans" },
  { id: "ac2", name: "AC — 2HP", watts: 1750, hours: 6, cat: "Cooling & fans" },
  // Screens
  { id: "tv32", name: "TV — 32\"", watts: 70, hours: 5, cat: "Screens" },
  { id: "tv43", name: "TV — 43\"", watts: 100, hours: 5, cat: "Screens" },
  { id: "tv55", name: "TV — 55\"", watts: 150, hours: 5, cat: "Screens" },
  { id: "decoder", name: "DSTV / decoder", watts: 30, hours: 6, cat: "Screens" },
  { id: "sound", name: "Sound system", watts: 80, hours: 4, cat: "Screens" },
  // Kitchen
  { id: "fridge", name: "Refrigerator", watts: 150, hours: 12, cat: "Kitchen" },
  { id: "freezer", name: "Deep freezer", watts: 200, hours: 12, cat: "Kitchen" },
  { id: "micro", name: "Microwave", watts: 1200, hours: 0.5, cat: "Kitchen" },
  { id: "kettle", name: "Electric kettle", watts: 1500, hours: 0.5, cat: "Kitchen" },
  { id: "blender", name: "Blender", watts: 1000, hours: 0.25, cat: "Kitchen" },
  { id: "rice", name: "Rice cooker", watts: 700, hours: 1, cat: "Kitchen" },
  { id: "disp", name: "Water dispenser", watts: 100, hours: 8, cat: "Kitchen" },
  // Work & IT
  { id: "laptop", name: "Laptop", watts: 65, hours: 8, cat: "Work & IT" },
  { id: "desktop", name: "Desktop PC", watts: 200, hours: 8, cat: "Work & IT" },
  { id: "monitor", name: "Monitor (24\")", watts: 30, hours: 8, cat: "Work & IT" },
  { id: "printer", name: "Printer", watts: 150, hours: 2, cat: "Work & IT" },
  { id: "router", name: "Router / Wi-Fi", watts: 15, hours: 24, cat: "Work & IT" },
  { id: "cctv", name: "CCTV system", watts: 40, hours: 24, cat: "Work & IT" },
  { id: "pos", name: "POS machine", watts: 30, hours: 10, cat: "Work & IT" },
  { id: "phones", name: "Phone charging (×5)", watts: 50, hours: 4, cat: "Work & IT" },
  // Water
  { id: "pump05", name: "Water pump — 0.5HP", watts: 373, hours: 1, cat: "Water" },
  { id: "pump1", name: "Water pump — 1HP", watts: 746, hours: 1, cat: "Water" },
  { id: "borehole", name: "Borehole pump", watts: 850, hours: 2, cat: "Water" },
  // Laundry
  { id: "washer", name: "Washing machine", watts: 500, hours: 1, cat: "Laundry" },
  { id: "iron", name: "Electric iron", watts: 1000, hours: 1, cat: "Laundry" },
  { id: "dryer", name: "Tumble dryer", watts: 2000, hours: 1, cat: "Laundry" },
  { id: "hairdryer", name: "Hair dryer", watts: 1200, hours: 0.5, cat: "Laundry" },
  // Other
  { id: "gate", name: "Electric gate / fence", watts: 200, hours: 1, cat: "Other" },
  { id: "pa", name: "PA system", watts: 500, hours: 5, cat: "Other" },
  { id: "cpap", name: "CPAP device", watts: 60, hours: 8, cat: "Other" },
  { id: "oxygen", name: "Oxygen concentrator", watts: 300, hours: 12, cat: "Other" },
];

/** A ready-made load profile the user can start from instead of building from scratch. */
export const PRESETS: { id: string; label: string; note: string; items: [string, number][] }[] = [
  { id: "flat", label: "1–2 bed flat", note: "Lights, fans, TV, fridge, laptops", items: [["led9", 8], ["ceilfan", 2], ["standfan", 1], ["tv43", 1], ["decoder", 1], ["fridge", 1], ["laptop", 2], ["router", 1], ["phones", 1], ["pump05", 1]] },
  { id: "duplex", label: "3-bed / duplex", note: "Everyday home + 2 ACs", items: [["led9", 14], ["flood", 2], ["ceilfan", 4], ["ac15", 2], ["tv55", 1], ["decoder", 1], ["fridge", 1], ["freezer", 1], ["laptop", 2], ["router", 1], ["cctv", 1], ["pump1", 1], ["iron", 1], ["phones", 1]] },
  { id: "office", label: "Small office / shop", note: "Workstations, ACs, security", items: [["led18", 10], ["ac15", 2], ["desktop", 4], ["monitor", 4], ["laptop", 2], ["printer", 1], ["router", 1], ["cctv", 1], ["pos", 2], ["fridge", 1], ["phones", 2]] },
];

/** Peak sun hours by state — drives panel sizing. Northern states get more sun. */
export const SUN_HOURS: Record<string, number> = {
  "Lagos": 4.8, "Ogun": 4.8, "Oyo": 5.0, "Osun": 5.0, "Ondo": 4.9, "Ekiti": 5.0,
  "Abuja (FCT)": 5.6, "Niger": 5.7, "Kwara": 5.4, "Kogi": 5.3, "Benue": 5.4, "Nasarawa": 5.5, "Plateau": 5.6,
  "Kano": 6.0, "Kaduna": 5.8, "Katsina": 6.1, "Sokoto": 6.3, "Kebbi": 6.1, "Zamfara": 6.0, "Jigawa": 6.1,
  "Bauchi": 5.8, "Gombe": 5.8, "Borno": 6.2, "Yobe": 6.2, "Adamawa": 5.7, "Taraba": 5.5,
  "Rivers": 4.5, "Bayelsa": 4.4, "Delta": 4.6, "Edo": 4.8, "Cross River": 4.6, "Akwa Ibom": 4.5, "Imo": 4.7, "Abia": 4.7, "Anambra": 4.8, "Enugu": 4.9, "Ebonyi": 4.9,
};

export const STATES = [
  "Lagos", "Abuja (FCT)", "Rivers", "Oyo", "Kano", "Ogun", "Kaduna", "Enugu", "Delta", "Edo",
  "Anambra", "Imo", "Abia", "Akwa Ibom", "Cross River", "Bayelsa", "Ondo", "Osun", "Ekiti",
  "Kwara", "Kogi", "Niger", "Benue", "Nasarawa", "Plateau", "Katsina", "Sokoto", "Kebbi",
  "Zamfara", "Jigawa", "Bauchi", "Gombe", "Borno", "Yobe", "Adamawa", "Taraba", "Ebonyi",
];

export const CHEMS = {
  Lithium: { key: "Lithium", label: "Lithium (LiFePO₄)", dod: 0.9, perKwh: 120000, life: "10+ yr lifespan" },
  Tubular: { key: "Tubular", label: "Tubular", dod: 0.5, perKwh: 75000, life: "2–4 yr lifespan" },
  GEL: { key: "GEL", label: "GEL", dod: 0.5, perKwh: 95000, life: "3–5 yr lifespan" },
} as const;
export type ChemKey = keyof typeof CHEMS;

export const SYSTEM_TYPES = [
  { key: "Hybrid", label: "Hybrid", note: "Solar + battery + grid" },
  { key: "Off-grid", label: "Off-grid", note: "Fully independent" },
  { key: "On-grid", label: "On-grid", note: "Grid-tied, no battery" },
] as const;
export type SystemType = (typeof SYSTEM_TYPES)[number]["key"];

/* --- pricing constants — clearly-marked ESTIMATES, refined at survey --- */
const PRICE = { perKva: 90000, panel: 100000, panelW: 550, installPct: 0.16 };
const STD_KVA = [1.5, 2.5, 3.5, 5, 7.5, 10, 15, 20, 30, 40, 50];
const FIN_MARKUP = 1.2; // illustrative financing markup across the term

const ceilTo = (v: number, step: number) => Math.ceil(v / step) * step;
const roundKva = (v: number) => STD_KVA.find((k) => k >= v) ?? ceilTo(v, 10);

export interface AuditResult {
  dailyKwh: number;
  peakKw: number;
  inverterKva: number;
  batteryKwh: number;
  panelCount: number;
  arrayKw: number;
  dailyGen: number;
  backupHours: number;
  total: number;
  costLow: number;
  costHigh: number;
  monthlySavings: number;
  newSpend: number;
  paybackYears: number;
  co2Tonnes: number;
  empty: boolean;
}

export interface AuditInput {
  load: LoadItem[];
  chem: ChemKey;
  system: SystemType;
  backupHours: number;
  sunHours: number;
  currentSpend: number; // monthly ₦ (bill + fuel)
}

export function calcAudit(inp: AuditInput): AuditResult {
  const { load, chem, system, backupHours, sunHours, currentSpend } = inp;
  const dailyWh = load.reduce((s, a) => s + a.watts * a.qty * a.hours, 0);
  const dailyKwh = dailyWh / 1000;
  const connectedW = load.reduce((s, a) => s + a.watts * a.qty, 0);
  const peakKw = (connectedW * 1.2) / 1000; // 20% inverter headroom

  const empty = load.length === 0 || dailyKwh === 0;
  const inverterKva = empty ? 0 : roundKva(peakKw / 0.8);

  const usableKwh = dailyKwh * (backupHours / 24);
  const batteryKwh = system === "On-grid" || empty ? 0 : ceilTo(usableKwh / CHEMS[chem].dod, 0.5);

  const derate = system === "Off-grid" ? 0.72 : 0.8;
  const panelKw = empty ? 0 : dailyKwh / (sunHours * derate);
  const panelCount = empty ? 0 : Math.max(2, Math.ceil((panelKw * 1000) / PRICE.panelW));
  const arrayKw = (panelCount * PRICE.panelW) / 1000;
  const dailyGen = +(arrayKw * sunHours * 0.75).toFixed(1);

  const equip = inverterKva * PRICE.perKva + batteryKwh * CHEMS[chem].perKwh + panelCount * PRICE.panel;
  const total = empty ? 0 : Math.round(equip * (1 + PRICE.installPct));
  const costLow = Math.round((total * 0.92) / 10000) * 10000;
  const costHigh = Math.round((total * 1.08) / 10000) * 10000;

  const newSpend = empty ? 0 : Math.round(currentSpend * 0.12);
  const monthlySavings = empty ? 0 : Math.max(0, currentSpend - newSpend);
  const paybackYears = monthlySavings > 0 ? +(total / (monthlySavings * 12)).toFixed(1) : 0;
  const co2Tonnes = +((dailyKwh * 365 * 0.44) / 1000).toFixed(1); // ~0.44 kg CO₂ / kWh grid+diesel

  return {
    dailyKwh: +dailyKwh.toFixed(1), peakKw: +peakKw.toFixed(1), inverterKva, batteryKwh: +batteryKwh.toFixed(1),
    panelCount, arrayKw: +arrayKw.toFixed(2), dailyGen, backupHours, total, costLow, costHigh,
    monthlySavings, newSpend, paybackYears, co2Tonnes, empty,
  };
}

export const financingMonthly = (total: number, term: number) =>
  total > 0 ? Math.round((total * FIN_MARKUP) / term / 1000) * 1000 : 0;

export const FIN_TERMS = [6, 12, 18, 24, 36];
