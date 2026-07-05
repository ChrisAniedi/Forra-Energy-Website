/** Single source of truth for company contact details. */
export const SITE = {
  name: "Forra Energy",
  tagline: "Africa's Intelligent Energy Platform",
  phoneDisplay: "+234 903 526 6832",
  phoneHref: "tel:+2349035266832",
  email: "hello@forra.energy",
  supportEmail: "support@forra.energy",
  hq: {
    label: "Ikeja HQ",
    address: "5 Oyetubo St, Ikeja 101233, Lagos, Nigeria",
  },
  island: {
    label: "Lekki Island Office",
    address: "Lekki Phase 1, Lagos",
  },
  coverage: "Installing in 12+ states",
  rc: "RC 1847263",
} as const;
