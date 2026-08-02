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
        _subject: `Your Forra Energy audit${o.isQuote ? " — quote request" : ""}, ${o.name}`,
        _template: "table",
        _captcha: "false",
        _cc: `${LEADS_CC},${o.email}`, // team + the client both receive this
        Name: o.name,
        Recommended_system: o.system,
        Your_report: o.details,
        Next_steps: o.isQuote
          ? "Thanks for requesting a quote. An energy expert will contact you shortly to talk through your options and schedule a free site visit. Your detailed PDF report was also downloaded to your device."
          : "Your detailed PDF report was downloaded to your device. An energy expert will reach out to help you take the next step and, if you'd like, schedule a free site visit.",
        Submitted: new Date().toISOString(),
      }),
    });
  } catch {
    /* fire-and-forget */
  }
}
