export interface NavGroup {
  label: string;
  items: string[];
}

export const NAV: NavGroup[] = [
  { label: "Products", items: ["Energy Audit", "Solar Financing", "Solar Systems", "Energy Intelligence", "Energy Monitoring", "Commercial Energy", "Energy Analytics", "Client Portal"] },
  { label: "Solutions", items: ["Residential", "SMEs", "Commercial Buildings", "Healthcare", "Education", "Hospitality", "Manufacturing", "Agriculture", "Government", "Real Estate", "Religious Organizations"] },
  { label: "Resources", items: ["Knowledge Center", "Blog", "Solar Learning Hub", "Energy Guides", "Savings Calculator", "Case Studies", "FAQs", "Support"] },
  { label: "Company", items: ["About", "Projects", "Partners", "Careers", "Contact"] },
];

/** Items with live routes. Everything else renders as a disabled link until its page ships. */
export const NAV_ROUTES: Record<string, string> = {
  "Energy Audit": "/audit",
  "Solar Financing": "/financing",
  "Solar Systems": "/shop",
  Residential: "/residential",
  SMEs: "/smes",
  "Commercial Buildings": "/commercial",
  Healthcare: "/healthcare",
  About: "/about",
  Contact: "/contact",
  "Client Portal": "/portal",
};
