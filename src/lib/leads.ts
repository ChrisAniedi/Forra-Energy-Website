/**
 * Lead capture → email, via FormSubmit.co (no account/key needed).
 *
 * Set LEADS_ENDPOINT to `https://formsubmit.co/ajax/<your-email>` (or, after the first
 * activation email, the hashed `https://formsubmit.co/ajax/<random-string>` to keep the
 * address out of the page source). This URL is public by design — safe in the client.
 * Empty string = safe no-op, so nothing breaks before it's set.
 */
const LEADS_ENDPOINT = process.env.NEXT_PUBLIC_LEADS_ENDPOINT || "https://formsubmit.co/ajax/hello@forra.energy";
const LEADS_CC = "chris@forra.energy";

export interface Lead {
  source: string; // where it came from, e.g. "Contact form", "Audit report"
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  details?: string; // extra context (system, budget, topic, etc.)
}

export async function submitLead(lead: Lead): Promise<void> {
  if (!LEADS_ENDPOINT) return;
  try {
    await fetch(LEADS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `New Forra lead — ${lead.source}`,
        _template: "table",
        _captcha: "false",
        _cc: LEADS_CC,
        Source: lead.source,
        Name: lead.name || "—",
        Email: lead.email || "—",
        Phone: lead.phone || "—",
        Message: lead.message || "—",
        Details: lead.details || "—",
        Page: typeof location !== "undefined" ? location.pathname : "—",
        Submitted: new Date().toISOString(),
      }),
    });
  } catch {
    /* never block the UI on lead capture */
  }
}

/** Emails the client a copy of their financing plan + next steps (CCs the client + the team). */
export async function emailFinancingPlan(o: {
  name: string;
  email: string;
  plan: string; // one-line plan summary
  details: string; // fuller breakdown
}): Promise<void> {
  if (!LEADS_ENDPOINT) return;
  try {
    await fetch(LEADS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `Your Forra Energy financing plan, ${o.name}`,
        _template: "box",
        _captcha: "false",
        _cc: `${LEADS_CC},${o.email}`,
        Hi_there: `Hi ${o.name}, thanks for planning your solar financing with Forra. Here's the plan you built — your full PDF, with the month-by-month schedule, is on your device.`,
        Your_plan: o.plan,
        The_details: o.details,
        What_happens_next: "One of our financing specialists will reach out to walk you through the numbers, answer any questions, and — after a free audit — confirm your final terms in writing. No obligation at all.",
        Warm_regards: "The Forra Energy team · hello@forra.energy · +234 903 526 6832 · www.forra.energy",
      }),
    });
  } catch {
    /* fire-and-forget */
  }
}

/** Emails the client a copy of their audit report + next steps (CCs the client + the team). */
export async function emailClientReport(o: {
  name: string;
  email: string;
  system: string;
  details: string;
  isQuote: boolean;
}): Promise<void> {
  if (!LEADS_ENDPOINT) return;
  try {
    await fetch(LEADS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `Your Forra Energy audit report, ${o.name}`,
        _template: "box",
        _captcha: "false",
        _cc: `${LEADS_CC},${o.email}`, // team + the client both receive this
        Hi_there: `Hi ${o.name}, thank you for using the Forra Energy audit. Here's a quick summary of the system we've recommended for you — your full PDF report is on your device.`,
        Your_recommended_system: o.system,
        The_details: o.details,
        What_happens_next: o.isQuote
          ? "One of our energy experts will reach out to you shortly to talk through your options and arrange a free site visit at a time that suits you — no obligation at all."
          : "An energy expert will follow up to help you take the next step and, whenever you're ready, arrange a free site visit — no obligation at all.",
        Warm_regards: "The Forra Energy team · hello@forra.energy · +234 903 526 6832 · www.forra.energy",
      }),
    });
  } catch {
    /* fire-and-forget */
  }
}
