# Lead capture → email (FormSubmit)

Every form on the site — Contact, Get Started, Talk to an Expert, Get a Quote and the
Audit report download — sends the submitted details to one email inbox via
[FormSubmit.co](https://formsubmit.co) (free, no account, no API key).

Wired through `src/lib/leads.ts`, already configured to:

- **To:** `hello@forra.energy`
- **CC:** `chris@forra.energy`

## Remaining one-time step: activate

The very first submission triggers a confirmation email from FormSubmit to
`hello@forra.energy`. Open it and click **Activate Form** (their anti-spam step, ~2 sec).
After that, every submission is emailed automatically, nicely formatted as a table, with
`chris@forra.energy` copied.

To change the recipients later, edit `LEADS_ENDPOINT` / `LEADS_CC` in `src/lib/leads.ts`.

### Optional: hide the address from page source
After activating, FormSubmit emails you a random alias like
`https://formsubmit.co/ajax/ab12cd34…`. Swap the endpoint to that so the raw email
isn't visible in the client bundle.

## What each email contains
`Source · Name · Email · Phone · Message · Details · Page · Submitted`

> Want a Google Sheet instead of (or in addition to) email later? FormSubmit forwards
> to Sheets on their paid tier, or we can switch `submitLead()` to a Google Apps Script
> web app — only the endpoint changes.
