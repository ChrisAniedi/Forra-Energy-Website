import type { jsPDF } from "jspdf";
import { SITE } from "@/lib/site";

const REPORT_PHONE = "+234 (0) 706 100 9021";
const REPORT_WEB = "www.forra.energy";

export interface FinanceScheduleRow {
  m: number;
  principal: number;
  payment: number;
  closing: number;
}

export interface FinancePlanInput {
  cost: number;
  upfrontAmt: number;
  upfrontPct: number;
  financed: number;
  count: number; // number of repayments
  periodUnit: string; // e.g. "month"
  periodTitle: string; // e.g. "Month"
  rateLabel: string; // e.g. "3% / month"
  firstPayment: number;
  lastPayment: number;
  totalRepay: number;
  grandTotal: number;
  extraPct: number;
  rows: FinanceScheduleRow[];
  name?: string;
  email?: string;
  dateLabel: string;
}

/** Helvetica (jsPDF built-in) can't render ₦ — normalise to ASCII. */
const ascii = (s: string) => s.replace(/₦/g, "NGN ");
const money = (n: number) => "NGN " + Math.round(n).toLocaleString("en-NG");

const FOREST: [number, number, number] = [11, 43, 31];
const EMERALD: [number, number, number] = [10, 122, 80];
const INK: [number, number, number] = [19, 32, 26];
const SUB: [number, number, number] = [92, 107, 98];
const LINE: [number, number, number] = [223, 230, 225];

const L = 42;
const R = 553;

/** Draws the letterheaded financing plan into `doc`. Pure (no browser APIs) so it's testable. */
export function buildFinanceReport(doc: jsPDF, inp: FinancePlanInput, logo: { data: string; w: number; h: number } | null) {
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
  doc.setFillColor(242, 169, 28).rect(L, 89, 46, 2.4, "F");

  doc.setFont("helvetica", "bold").setFontSize(20).setTextColor(...FOREST);
  doc.text("Solar Financing Plan", L, 120);
  doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(...SUB);
  const preparedFor = inp.name ? `Prepared for ${inp.name}` : "Your indicative plan";
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

  // ---- headline ----
  heading("Your plan");
  doc.setFont("helvetica", "bold").setFontSize(16).setTextColor(...FOREST);
  const monthlyLine = inp.count > 1
    ? `${money(inp.firstPayment)} / ${inp.periodUnit}`
    : `${money(inp.firstPayment)}`;
  doc.text(ascii(monthlyLine), L, y);
  y += 16;
  doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(...SUB);
  const sub = inp.count > 1
    ? `First ${inp.periodUnit} payment, reducing to ${money(inp.lastPayment)} by ${inp.periodUnit} ${inp.count}`
    : "One repayment";
  doc.text(ascii(sub), L, y);
  y += 20;

  const periodPlural = `${inp.periodUnit}${inp.count === 1 ? "" : "s"}`;
  row("System amount", money(inp.cost));
  row("Upfront today", `${money(inp.upfrontAmt)}  (${inp.upfrontPct.toFixed(0)}%)`);
  row("Amount financed", money(inp.financed));
  row("Repayment plan", `${inp.count} ${periodPlural}`);
  row("Rate", `${inp.rateLabel}, reducing balance`);
  row("Total repayments", money(inp.totalRepay));
  row("Total cost of system (upfront + repayments)", money(inp.grandTotal));
  y += 12;

  // ---- schedule ----
  pageBreak(80);
  heading("Repayment schedule");
  const cols = { m: L, principal: 250, payment: 400, balance: R };
  doc.setFont("helvetica", "bold").setFontSize(8.5).setTextColor(...SUB);
  doc.text(inp.periodTitle.toUpperCase(), cols.m, y);
  doc.text("PRINCIPAL", cols.principal, y, { align: "right" });
  doc.text("REPAYMENT", cols.payment, y, { align: "right" });
  doc.text("BALANCE LEFT", cols.balance, y, { align: "right" });
  y += 6;
  doc.setDrawColor(...LINE).setLineWidth(0.7).line(L, y, R, y);
  y += 14;
  doc.setFont("helvetica", "normal").setFontSize(9.5).setTextColor(...INK);
  inp.rows.forEach((r) => {
    pageBreak(20);
    doc.text(String(r.m), cols.m, y);
    doc.text(ascii(money(r.principal)), cols.principal, y, { align: "right" });
    doc.text(ascii(money(r.payment)), cols.payment, y, { align: "right" });
    doc.text(ascii(money(r.closing)), cols.balance, y, { align: "right" });
    y += 13;
    doc.setDrawColor(...LINE).setLineWidth(0.4).line(L, y - 4, R, y - 4);
  });
  y += 16;

  // ---- disclaimer ----
  pageBreak(60);
  doc.setFont("helvetica", "italic").setFontSize(8.5).setTextColor(...SUB);
  const disc = doc.splitTextToSize(
    "This is an indicative plan for guidance only. Your monthly payment reduces over the term because it is calculated on the balance you still owe. Final terms follow a free energy audit and a quick credit review, and are confirmed in writing before anything is signed.",
    R - L,
  );
  doc.text(disc, L, y);

  // ---- branded green footer band ----
  const pages = doc.getNumberOfPages();
  const PW = 595.28;
  const top = 792;
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFillColor(...FOREST).rect(0, top, PW, 842 - top, "F");
    doc.setFillColor(242, 169, 28).rect(0, top, PW, 2.4, "F");
    doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(255, 255, 255);
    doc.text(SITE.name, L, top + 20);
    doc.text(`${i} / ${pages}`, R, top + 20, { align: "right" });
    doc.setFont("helvetica", "normal").setFontSize(7.5).setTextColor(169, 195, 182);
    doc.text(ascii(SITE.hq.address), L, top + 31);
    doc.text(`${REPORT_PHONE}  ·  ${SITE.email}  ·  ${REPORT_WEB}  ·  ${SITE.rc}`, L, top + 40);
  }
}

/** Browser entry: fetch the logo, build the PDF and trigger a download. */
export async function downloadFinanceReport(inp: FinancePlanInput) {
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
    logo = null;
  }

  buildFinanceReport(doc, inp, logo);
  doc.save("Forra-Energy-Financing-Plan.pdf");
}
