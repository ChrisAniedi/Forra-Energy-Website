"use client";

import ResourceList, { type ResourceListData } from "@/components/resources/ResourceList";

const BLOG_DATA: ResourceListData = {
  eyebrow: "Forra blog",
  h1: "Clear thinking on clean energy",
  intro: "Practical, no-jargon writing on solar, financing and cutting your power costs in Nigeria — from the engineers and operators who install it every day.",
  points: ["Plain-English explainers", "Real Nigerian numbers", "Written by our team", "New posts regularly"],
  categories: ["All", "Solar 101", "Financing", "Case notes", "Tips", "Company"],
  items: [
    { title: "How to size a solar system for your home", category: "Solar 101", blurb: "A plain-English walk-through of turning the appliances you run into the right inverter, battery and panel spec.", meta: "6 min read" },
    { title: "NEPA + generator: what you're really spending", category: "Tips", blurb: "Most homes underestimate their true cost of power. Here's how to add it up — and how much solar can claw back.", meta: "5 min read" },
    { title: "Lithium vs tubular batteries in Nigeria", category: "Solar 101", blurb: "Lifespan, depth of discharge, price and which one actually fits your budget and backup needs.", meta: "7 min read" },
    { title: "How Forra financing actually works", category: "Financing", blurb: "Upfront, tenor, eligibility and what a monthly repayment really looks like — with no surprises.", meta: "5 min read" },
    { title: "Inside a 250kW rice-mill install", category: "Case notes", blurb: "How we cut an agro-processor's energy cost by 44% and added night-shift capacity.", meta: "8 min read" },
    { title: "5 signs your generator is costing you too much", category: "Tips", blurb: "Fuel, maintenance, downtime and noise — the hidden line items that make diesel far pricier than it looks.", meta: "4 min read" },
    { title: "What a Band-A tariff means for your bill", category: "Tips", blurb: "Reclassified feeders, higher rates and what it changes about the case for going solar.", meta: "5 min read" },
    { title: "Why we monitor every system we install", category: "Company", blurb: "Monitoring isn't a feature — it's how we prove performance, catch issues early and keep you saving.", meta: "4 min read" },
  ],
  ctaTitle: "Reading is a good start.",
  ctaText: "Turn it into a system sized for you — run a free audit and see the numbers for your own home or business.",
};

const LEARNING_DATA: ResourceListData = {
  eyebrow: "Solar learning hub",
  h1: "Understand solar, step by step",
  intro: "Short, structured lessons that take you from 'how does this even work' to confidently sizing and owning a solar system — no engineering degree required.",
  points: ["Beginner-friendly", "Structured lessons", "Nigeria-specific", "Free to learn"],
  categories: ["All", "Basics", "Sizing", "Batteries", "Financing", "Maintenance"],
  items: [
    { title: "How a hybrid solar system works", category: "Basics", blurb: "Panels, inverter, battery and grid — how the pieces fit together to keep your power on.", meta: "Lesson · 6 min" },
    { title: "Reading your energy bill", category: "Basics", blurb: "Understand tariffs, units and what you're actually paying per kilowatt-hour today.", meta: "Lesson · 5 min" },
    { title: "Sizing 101: appliances to kVA", category: "Sizing", blurb: "Turn your daily loads into peak demand and the right inverter size.", meta: "Lesson · 8 min" },
    { title: "Sizing your battery & backup", category: "Sizing", blurb: "Match storage to the hours of backup you actually want, without overpaying.", meta: "Lesson · 7 min" },
    { title: "Battery chemistry explained", category: "Batteries", blurb: "Lithium vs tubular vs gel — lifespan, depth of discharge and cost, made simple.", meta: "Lesson · 6 min" },
    { title: "Depth of discharge & battery life", category: "Batteries", blurb: "Why how deep you drain a battery decides how long it lasts.", meta: "Lesson · 5 min" },
    { title: "Financing your system", category: "Financing", blurb: "Upfront vs monthly, tenor and how to think about payback.", meta: "Lesson · 6 min" },
    { title: "Caring for your solar system", category: "Maintenance", blurb: "Simple habits and the Forra app checks that keep your system performing for years.", meta: "Lesson · 5 min" },
  ],
  ctaTitle: "Ready to put it to work?",
  ctaText: "Use the free audit to apply what you've learned and size a system for your exact load.",
};

const GUIDES_DATA: ResourceListData = {
  eyebrow: "Energy guides",
  h1: "In-depth guides, ready when you are",
  intro: "Deeper, downloadable references for homeowners, businesses and buyers — the details you'll want on hand when you're planning, comparing or making the switch.",
  points: ["Practical checklists", "For homes & businesses", "Buyer-focused", "Free to use"],
  categories: ["All", "Homeowners", "Businesses", "Buyers", "Technical"],
  items: [
    { title: "The Nigerian homeowner's solar guide", category: "Homeowners", blurb: "Everything a household needs to plan, size, finance and live with a solar system.", meta: "Guide · 24 pages" },
    { title: "SME energy playbook", category: "Businesses", blurb: "How small businesses cut power costs, protect uptime and finance solar as an operating cost.", meta: "Guide · 20 pages" },
    { title: "Solar buyer's checklist", category: "Buyers", blurb: "The questions to ask, the specs to compare and the red flags to avoid before you buy.", meta: "Guide · 8 pages" },
    { title: "Battery sizing reference", category: "Technical", blurb: "Formulas, depth-of-discharge tables and worked examples for sizing storage.", meta: "Guide · 12 pages" },
    { title: "Financing & eligibility guide", category: "Buyers", blurb: "Plans, documents and how approval works — everything you need before you apply.", meta: "Guide · 10 pages" },
    { title: "Maintenance & warranty handbook", category: "Technical", blurb: "Keeping your system healthy and understanding exactly what your warranties cover.", meta: "Guide · 14 pages" },
  ],
  ctaTitle: "Skip straight to the numbers.",
  ctaText: "A free audit gives you a system spec, cost and savings estimate tailored to you — no reading required.",
};

const CASE_STUDIES_DATA: ResourceListData = {
  eyebrow: "Case studies",
  h1: "Real systems, measured results",
  intro: "Every Forra project is engineered, installed and monitored — so we can show you exactly what changed. Filter by sector to see outcomes from homes, businesses and facilities across Nigeria.",
  points: ["Verified outcomes", "Across every sector", "Still monitored today", "Nigeria-wide"],
  categories: ["All", "Residential", "Healthcare", "Commercial", "Education", "Hospitality", "Manufacturing", "Agriculture"],
  items: [
    { title: "Lekki estate goes diesel-free", category: "Residential", blurb: "A 120kW system took 38 homes off generators and cut the estate's service charge by 31%.", meta: "Lekki Phase 1, Lagos · 120 kW" },
    { title: "Zero outage minutes in theatre", category: "Healthcare", blurb: "A 65kW + 120kWh system gave a Lagos medical centre seamless, silent critical-care power.", meta: "Ikeja, Lagos · 65 kW + 120 kWh" },
    { title: "Rice mill cuts processing cost 44%", category: "Agriculture", blurb: "250kW of solar added night-shift capacity and slashed an agro-processor's energy bill.", meta: "Abeokuta, Ogun · 250 kW" },
    { title: "A school that never cancels prep", category: "Education", blurb: "A 90kW + 80kWh system keeps classrooms and boarding lit, redirecting diesel spend to staff.", meta: "Enugu · 90 kW + 80 kWh" },
    { title: "Office complex halves peak demand", category: "Commercial", blurb: "A 300kW system cut expensive peak-hour grid demand and put every meter under monitoring.", meta: "Victoria Island, Lagos · 300 kW" },
    { title: "The generator gets retired", category: "Hospitality", blurb: "A 140kW + 200kWh system gave a 120-room hotel a seamless, silent guest experience.", meta: "Ibadan, Oyo · 140 kW + 200 kWh" },
    { title: "Bottling line, always on", category: "Manufacturing", blurb: "500kW of solar protected line uptime and cut the plant's energy cost per unit by 38%.", meta: "Kano · 500 kW" },
    { title: "Off-grid poultry, fully reliable", category: "Agriculture", blurb: "A 60kW off-grid system secured cold storage and ventilation with no grid connection at all.", meta: "Kaduna · 60 kW" },
  ],
  ctaTitle: "Your results could be next.",
  ctaText: "Start with a free audit — we'll size the right system and show you the outcome you can expect.",
};

export const BlogContent = () => <ResourceList data={BLOG_DATA} />;
export const LearningContent = () => <ResourceList data={LEARNING_DATA} />;
export const GuidesContent = () => <ResourceList data={GUIDES_DATA} />;
export const CaseStudiesContent = () => <ResourceList data={CASE_STUDIES_DATA} />;
