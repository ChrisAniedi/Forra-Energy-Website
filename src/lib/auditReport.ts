import type { jsPDF } from "jspdf";
import { SITE } from "@/lib/site";
import { CHEMS, batteryBank, type AuditResult, type ChemKey, type LoadItem, type SystemType } from "@/components/audit/appliances";

const REPORT_PHONE = "+234 (0) 706 100 9021";
const REPORT_WEB = "www.forra.energy";

export interface AuditReportInput {
  state: string;
  system: SystemType;
  chem: ChemKey;
  backup: number;
  res: AuditResult;
  monthly: number;
  term: number;
  load: LoadItem[];
  bill: number;
  fuel: number;
  budget?: number;
  name?: string;
  email?: string;
  dateLabel: string;
}

/** Helvetica (jsPDF built-in) can't render ₦ or subscripts — normalise to ASCII. */
const ascii = (s: string) =>
  s.replace(/₦/g, "NGN ")
    .replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (d) => "₀₁₂₃₄₅₆₇₈₉".indexOf(d).toString());
const money = (n: number) => "NGN " + Math.round(n).toLocaleString("en-NG");

const FOREST: [number, number, number] = [11, 43, 31];
const EMERALD: [number, number, number] = [10, 122, 80];
const INK: [number, number, number] = [19, 32, 26];
const SUB: [number, number, number] = [92, 107, 98];
const LINE: [number, number, number] = [223, 230, 225];

const L = 42;
const R = 553;

/** Draws the full letterheaded report into `doc`. Pure (no browser APIs) so it's testable. */
export function buildReport(doc: jsPDF, inp: AuditReportInput, logo: { data: string; w: number; h: number } | null) {
  const { res, system, chem, state, backup, monthly, term, load } = inp;
  const backupLabel = system === "On-grid"
    ? "—"
    : res.constrained
      ? `~${res.backupAchieved} hours (budget-limited)`
      : backup === 24 ? "24/7" : backup + " hours";

  // ---- letterhead ----
  if (logo) {
    const w = 150;
    doc.addImage(logo.data, "PNG", L, 40, w, (w * logo.h) / logo.w);
  } else {
    doc.setFont("helvetica", "bold").setFontSize(18).setTextColor(...FOREST);
    doc.text("ForraEnergy", L, 62);
  }
  doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(...SUB);
  doc.text(REPORT_PHONE, R, 48, { align: "right" });
  doc.text(SITE.email, R, 61, { align: "right" });
  doc.text(REPORT_WEB, R, 74, { align: "right" });

  doc.setDrawColor(...FOREST).setLineWidth(1).line(L, 90, R, 90);
  doc.setFillColor(242, 169, 28).rect(L, 89, 46, 2.4, "F"); // gold brand tab on the rule

  doc.setFont("helvetica", "bold").setFontSize(20).setTextColor(...FOREST);
  doc.text("Energy Audit Report", L, 120);
  doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(...SUB);
  const preparedFor = inp.name ? `Prepared for ${inp.name}  ·  ${state} ${system} system` : `Prepared for a ${state} ${system} system`;
  doc.text(ascii(`${inp.dateLabel}  ·  ${preparedFor}`), L, 138);

  let y = 168;
  const heading = (t: string) => {
    doc.setFont("helvetica", "bold").setFontSize(10).setTextColor(...EMERALD);
    doc.text(t.toUpperCase(), L, y);
    y += 8;
    doc.setDrawColor(...LINE).setLineWidth(0.7).line(L, y, R, y);
    y += 18;
  };
  const row = (label: string, value: string) => {
    doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(...SUB);
    doc.text(ascii(label), L, y);
    doc.setFont("helvetica", "bold").setTextColor(...INK);
    doc.text(ascii(value), R, y, { align: "right" });
    y += 15;
    doc.setDrawColor(...LINE).setLineWidth(0.5).line(L, y - 5, R, y - 5);
    y += 3;
  };
  const pageBreak = (needed: number) => {
    if (y + needed > 775) { doc.addPage(); y = 60; }
  };

  // ---- recommended system ----
  heading("Recommended system");
  doc.setFont("helvetica", "bold").setFontSize(16).setTextColor(...FOREST);
  const reco = `${res.inverterKva} kVA ${system}${res.batteryKwh > 0 ? `  ·  ${res.batteryKwh} kWh` : ""}`;
  doc.text(ascii(reco), L, y);
  y += 16;
  doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(...SUB);
  doc.text(ascii(res.batteryKwh > 0 ? `${CHEMS[chem].label} · ${CHEMS[chem].life}` : "Grid-tied — no battery storage"), L, y);
  y += 20;

  if (res.constrained) {
    const note = doc.splitTextToSize(
      ascii(`Note: this system is sized to your budget of ${money(inp.budget || 0)} — it is not the ideal system for your load. The best-fit system for full backup is approximately ${money(res.bestTotal)}.`),
      R - L - 20,
    );
    const boxH = note.length * 12 + 14;
    doc.setFillColor(253, 243, 220);
    doc.rect(L, y, R - L, boxH, "F");
    doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(180, 123, 11);
    doc.text(note, L + 10, y + 14);
    y += boxH + 14;
  }

  const bank = batteryBank(chem, res.batteryKwh);
  row("Inverter", `${res.inverterKva} kVA`);
  row("Battery storage", res.batteryKwh > 0 ? `${res.batteryKwh} kWh${bank ? ` · ${bank}` : ""}` : "—");
  row("Solar panels", `${res.panelCount} × 550W`);
  row("Estimated daily generation", `${res.dailyGen} kWh`);
  row("Daily usage", `${res.dailyKwh} kWh`);
  row("Peak load", `${res.peakKw} kW`);
  row("Backup target", backupLabel);
  y += 12;

  // ---- cost & savings ----
  pageBreak(140);
  heading("Cost, financing & savings");
  row("Estimated system cost", `${money(res.costLow)} – ${money(res.costHigh)}`);
  row("Financing from", `${money(monthly)} / month over ${term} months`);
  if (res.monthlySavings > 0) {
    row("Estimated monthly savings", money(res.monthlySavings));
    row("Estimated payback", `${res.paybackYears} years`);
  }
  row("CO2 avoided", `${res.co2Tonnes} tonnes / year`);
  y += 12;

  // ---- appliances ----
  pageBreak(80);
  heading("Your appliances");
  const cols = { name: L, qty: 330, watts: 410, hrs: 480, kwh: R };
  doc.setFont("helvetica", "bold").setFontSize(8.5).setTextColor(...SUB);
  doc.text("APPLIANCE", cols.name, y);
  doc.text("QTY", cols.qty, y, { align: "right" });
  doc.text("WATTS", cols.watts, y, { align: "right" });
  doc.text("HRS/DAY", cols.hrs, y, { align: "right" });
  doc.text("KWH/DAY", cols.kwh, y, { align: "right" });
  y += 6;
  doc.setDrawColor(...LINE).setLineWidth(0.7).line(L, y, R, y);
  y += 14;
  doc.setFont("helvetica", "normal").setFontSize(9.5).setTextColor(...INK);
  load.forEach((p) => {
    pageBreak(20);
    const nm = doc.splitTextToSize(ascii(p.name), 270)[0];
    doc.text(nm, cols.name, y);
    doc.text(String(p.qty), cols.qty, y, { align: "right" });
    doc.text(String(p.watts), cols.watts, y, { align: "right" });
    doc.text(String(p.hours), cols.hrs, y, { align: "right" });
    doc.text(((p.watts * p.qty * p.hours) / 1000).toFixed(2), cols.kwh, y, { align: "right" });
    y += 13;
    doc.setDrawColor(...LINE).setLineWidth(0.4).line(L, y - 4, R, y - 4);
  });
  y += 16;

  // ---- disclaimer ----
  pageBreak(60);
  doc.setFont("helvetica", "italic").setFontSize(8.5).setTextColor(...SUB);
  const disc = doc.splitTextToSize(
    "This is an estimate generated from the figures you provided and typical Nigerian pricing. It sizes the system, cost and savings for planning only, and is confirmed with a free site survey before installation. Financing figures are illustrative and subject to a credit review.",
    R - L,
  );
  doc.text(disc, L, y);

  // ---- branded green footer band on every page ----
  const pages = doc.getNumberOfPages();
  const PW = 595.28;
  const top = 792;
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFillColor(...FOREST).rect(0, top, PW, 842 - top, "F");
    doc.setFillColor(242, 169, 28).rect(0, top, PW, 2.4, "F"); // gold accent line
    doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(255, 255, 255);
    doc.text(SITE.name, L, top + 20);
    doc.text(`${i} / ${pages}`, R, top + 20, { align: "right" });
    doc.setFont("helvetica", "normal").setFontSize(7.5).setTextColor(169, 195, 182);
    doc.text(ascii(SITE.hq.address), L, top + 31);
    doc.text(`${REPORT_PHONE}  ·  ${SITE.email}  ·  ${REPORT_WEB}  ·  ${SITE.rc}`, L, top + 40);
  }
}

/** Browser entry: fetch the logo, build the PDF and trigger a download. */
export async function downloadAuditReport(inp: AuditReportInput) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  let logo: { data: string; w: number; h: number } | null = null;
  try {
    const blob = await (await fetch("/Forra-logo-top.png")).blob();
    const data = await new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = reject;
      r.readAsDataURL(blob);
    });
    const dims = await new Promise<{ w: number; h: number }>((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
      img.onerror = () => resolve({ w: 931, h: 176 });
      img.src = data;
    });
    logo = { data, ...dims };
  } catch {
    logo = null; // fall back to a text wordmark
  }

  buildReport(doc, inp, logo);
  doc.save(`Forra-Energy-Audit-${inp.state.replace(/\s+/g, "-")}.pdf`);
}
