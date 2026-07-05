/** Resource content — shared by list pages and their [slug] detail pages. Plain data (no JSX). */

export interface Section { heading?: string; body?: string[]; list?: string[] }
export interface Article {
  slug: string;
  title: string;
  category: string;
  blurb: string;
  meta: string;
  lead: string;
  sections: Section[];
  quote?: { text: string; name: string; role: string };
  stats?: [string, string][];
}
export interface Collection {
  base: string;
  kind: string;
  backLabel: string;
  eyebrow: string;
  h1: string;
  intro: string;
  points: string[];
  categories: string[];
  ctaTitle: string;
  ctaText: string;
  items: Article[];
}

export const BLOG: Collection = {
  base: "/blog", kind: "Article", backLabel: "All articles",
  eyebrow: "Forra blog", h1: "Clear thinking on clean energy",
  intro: "Practical, no-jargon writing on solar, financing and cutting your power costs in Nigeria — from the engineers and operators who install it every day.",
  points: ["Plain-English explainers", "Real Nigerian numbers", "Written by our team", "New posts regularly"],
  categories: ["All", "Solar 101", "Financing", "Case notes", "Tips", "Company"],
  ctaTitle: "Reading is a good start.",
  ctaText: "Turn it into a system sized for you — run a free audit and see the numbers for your own home or business.",
  items: [
    {
      slug: "how-to-size-a-home-solar-system", title: "How to size a solar system for your home", category: "Solar 101", meta: "6 min read",
      blurb: "A plain-English walk-through of turning the appliances you run into the right inverter, battery and panel spec.",
      lead: "Sizing a solar system isn't guesswork or a sales pitch — it's arithmetic. Here's how to turn the appliances you actually run into the right inverter, battery and panel array.",
      sections: [
        { heading: "Start with your load, not a package", body: ["The right system starts from what you run and for how long — not from a fixed 'home package'. List your appliances, their wattage, and the hours you use each per day.", "Multiply watts by hours to get watt-hours, and add them up. That daily figure in kilowatt-hours (kWh) is the foundation of every other decision."] },
        { heading: "Three numbers that matter", list: ["Inverter size (kVA) — must handle everything that could run at once, plus headroom for surge.", "Battery capacity (kWh) — enough usable energy for the hours of backup you want.", "Panel array (kW) — enough daily generation to recharge the battery and run daytime loads."] },
        { heading: "Let the audit do the maths", body: ["Our free audit does all of this in your browser: add appliances, set your state and backup target, and it sizes the exact inverter, battery and panels — with a cost and savings estimate.", "A site survey then confirms everything before installation, so you never over- or under-buy."] },
      ],
    },
    {
      slug: "true-cost-of-nepa-plus-generator", title: "NEPA + generator: what you're really spending", category: "Tips", meta: "5 min read",
      blurb: "Most homes underestimate their true cost of power. Here's how to add it up — and how much solar can claw back.",
      lead: "Most households and businesses badly underestimate what power actually costs them, because the spend is scattered across bills, fuel, maintenance and downtime.",
      sections: [
        { heading: "Add up the hidden line items", list: ["Your electricity bill (and any estimated-billing overpayment).", "Petrol or diesel for the generator, at today's prices.", "Servicing, oil, parts and the occasional rewind or replacement.", "The cost of downtime — lost work, spoiled food, unhappy customers."] },
        { heading: "The number surprises people", body: ["When you total a year of fuel and maintenance, most homes running a generator daily are spending far more than they think — often enough to have financed a solar system that would have paid for itself.", "Solar converts that unpredictable, rising spend into a fixed, falling one."] },
        { heading: "See it for your own setup", body: ["Our savings calculator turns your monthly electricity and fuel spend into an annual and ten-year figure — and shows what solar could claw back."] },
      ],
    },
    {
      slug: "lithium-vs-tubular-batteries", title: "Lithium vs tubular batteries in Nigeria", category: "Solar 101", meta: "7 min read",
      blurb: "Lifespan, depth of discharge, price and which one actually fits your budget and backup needs.",
      lead: "The battery is the heart of your system and usually its biggest single cost. Choosing between lithium and tubular comes down to lifespan, depth of discharge and budget.",
      sections: [
        { heading: "Lithium (LiFePO₄)", body: ["Lasts 10+ years, discharges deeply (80–90% usable), is compact and virtually maintenance-free. It costs more upfront but far less per usable kilowatt-hour over its life."] },
        { heading: "Tubular", body: ["Cheaper to buy, proven and repairable — but only about 50% usable depth of discharge, a shorter 2–4 year life, and it needs ventilation and occasional maintenance."] },
        { heading: "Which is right for you?", body: ["If you can stretch the upfront cost, lithium almost always wins on total cost of ownership. Tubular is a sensible entry point on a tight budget. Our audit and team help you weigh it for your backup needs and budget."] },
      ],
    },
    {
      slug: "how-forra-financing-works", title: "How Forra financing actually works", category: "Financing", meta: "5 min read",
      blurb: "Upfront, tenor, eligibility and what a monthly repayment really looks like — with no surprises.",
      lead: "Owning solar doesn't require a lump sum. Here's exactly how our financing turns a big one-off cost into a comfortable monthly payment.",
      sections: [
        { heading: "Upfront, then monthly", body: ["You choose an upfront amount (often 20–40%) and a repayment tenor. The balance is financed, and your system starts saving from day one — often offsetting much of the repayment."] },
        { heading: "Fast, light-touch approval", list: ["A completed energy audit", "Valid ID and proof of address", "A few months of bank statements", "Payslip and offer letter (employees) or CAC (businesses)"] },
        { heading: "No surprises", body: ["The calculator on our financing page gives an indicative monthly figure. Your exact terms follow the audit and a quick credit review, always confirmed in writing before you commit."] },
      ],
    },
    {
      slug: "inside-a-250kw-rice-mill-install", title: "Inside a 250kW rice-mill install", category: "Case notes", meta: "8 min read",
      blurb: "How we cut an agro-processor's energy cost by 44% and added night-shift capacity.",
      lead: "How we took an Abeokuta agro-processor off expensive, unreliable diesel — and added night-shift capacity in the process.",
      sections: [
        { heading: "The problem", body: ["The mill ran entirely on diesel gensets. Fuel was the largest line item after raw rice, and outages during processing meant spoiled batches and idle staff."] },
        { heading: "What we built", body: ["A 250kW solar array with storage, engineered around the mill's motor loads and daily processing schedule, integrated with the existing supply as backup."] },
        { heading: "The outcome", list: ["Processing energy cost down 44%", "Enough reliable power to add a night shift", "Diesel now a rare backup, not a daily expense"] },
      ],
    },
    {
      slug: "signs-your-generator-costs-too-much", title: "5 signs your generator is costing you too much", category: "Tips", meta: "4 min read",
      blurb: "Fuel, maintenance, downtime and noise — the hidden line items that make diesel far pricier than it looks.",
      lead: "Generators feel normal because they're everywhere — but a few signs tell you it's quietly draining far more than it should.",
      sections: [
        { heading: "The five signs", list: ["You refuel more than once a day.", "Servicing and parts are a regular, growing expense.", "It's your primary source of power, not backup.", "Noise and fumes affect your home, staff or customers.", "You've never actually added up a full year of its cost."] },
        { heading: "What to do about it", body: ["If two or more of these sound familiar, a solar system will almost certainly cost less over time — and pay for part of itself in fuel savings. Start with our savings calculator, then a free audit."] },
      ],
    },
    {
      slug: "what-band-a-tariff-means", title: "What a Band-A tariff means for your bill", category: "Tips", meta: "5 min read",
      blurb: "Reclassified feeders, higher rates and what it changes about the case for going solar.",
      lead: "If your feeder was reclassified to Band A, you're now paying a much higher rate for grid power. Here's what that changes.",
      sections: [
        { heading: "Higher rate, more supply", body: ["Band A feeders get more guaranteed daily supply — but at a significantly higher per-unit tariff. For heavy grid users, monthly bills can rise sharply."] },
        { heading: "Why it strengthens the solar case", body: ["The more expensive grid power becomes, the faster a solar system pays back. Every unit you self-generate is a unit you don't buy at the new rate."] },
        { heading: "Model your position", body: ["Use the savings calculator with your latest bill to see how solar changes your numbers under a Band-A tariff."] },
      ],
    },
    {
      slug: "why-we-monitor-every-system", title: "Why we monitor every system we install", category: "Company", meta: "4 min read",
      blurb: "Monitoring isn't a feature — it's how we prove performance, catch issues early and keep you saving.",
      lead: "Monitoring isn't an add-on we upsell — it's built into every Forra system, because you can't manage what you can't measure.",
      sections: [
        { heading: "Proof, not promises", body: ["The Forra app shows live generation, battery level and consumption. You see exactly what your system produces and what you're saving — no trust required."] },
        { heading: "Problems caught early", body: ["Because we monitor too, we often spot an underperforming panel or a battery issue before you'd ever notice, and act on it — frequently before it affects you."] },
        { heading: "Better systems over time", body: ["Fleet-wide data makes every design we do sharper and every recommendation more honest. Your system helps make the next one better."] },
      ],
    },
  ],
};

export const LEARNING: Collection = {
  base: "/learning", kind: "Lesson", backLabel: "All lessons",
  eyebrow: "Solar learning hub", h1: "Understand solar, step by step",
  intro: "Short, structured lessons that take you from 'how does this even work' to confidently sizing and owning a solar system — no engineering degree required.",
  points: ["Beginner-friendly", "Structured lessons", "Nigeria-specific", "Free to learn"],
  categories: ["All", "Basics", "Sizing", "Batteries", "Financing", "Maintenance"],
  ctaTitle: "Ready to put it to work?",
  ctaText: "Use the free audit to apply what you've learned and size a system for your exact load.",
  items: [
    {
      slug: "how-a-hybrid-system-works", title: "How a hybrid solar system works", category: "Basics", meta: "Lesson · 6 min",
      blurb: "Panels, inverter, battery and grid — how the pieces fit together to keep your power on.",
      lead: "A hybrid system blends solar, battery and grid so you always have the cheapest available power — and never a gap. Here's how the pieces work together.",
      sections: [
        { heading: "The four parts", list: ["Panels — turn sunlight into DC electricity.", "Inverter — converts it to the AC your appliances use, and manages the flow.", "Battery — stores surplus energy for night and outages.", "Grid (optional) — one more input the inverter can draw on or top up from."] },
        { heading: "How power flows", body: ["By day, panels run your loads and charge the battery, and any surplus is stored. At night or during an outage, the battery takes over seamlessly. If needed, the grid or a generator can supplement — the inverter decides automatically."] },
        { heading: "Why hybrid", body: ["You get solar savings, battery backup and grid reliability in one system, with no manual switching and no gap when the grid drops."] },
      ],
    },
    {
      slug: "reading-your-energy-bill", title: "Reading your energy bill", category: "Basics", meta: "Lesson · 5 min",
      blurb: "Understand tariffs, units and what you're actually paying per kilowatt-hour today.",
      lead: "Before you can save on power, you need to know what you're paying for it. Here's how to read your bill and find your true cost per unit.",
      sections: [
        { heading: "Key figures", list: ["Units consumed (kWh) — how much energy you used.", "Tariff band and rate — your price per kWh.", "Fixed charges and VAT — added on top."] },
        { heading: "Find your real rate", body: ["Divide your total bill by the units consumed to get your effective cost per kWh. Then add your generator fuel to see your blended true cost of power — usually much higher than the grid rate alone."] },
      ],
    },
    {
      slug: "sizing-appliances-to-kva", title: "Sizing 101: appliances to kVA", category: "Sizing", meta: "Lesson · 8 min",
      blurb: "Turn your daily loads into peak demand and the right inverter size.",
      lead: "Your inverter size is set by how much can run at once. This lesson turns a list of appliances into the right kVA.",
      sections: [
        { heading: "Add up simultaneous load", body: ["List each appliance's wattage and how many you might run at the same time. Sum the wattage of everything that could be on together — that's your peak load."] },
        { heading: "From watts to kVA", body: ["Divide peak watts by 1,000 for kW, then by a power factor of about 0.8 to get kVA, and add roughly 20% headroom for surge and growth. Round up to a standard inverter size."] },
        { heading: "Shortcut", body: ["The free audit does this automatically as you add appliances — a good way to sanity-check your own maths."] },
      ],
    },
    {
      slug: "sizing-your-battery-and-backup", title: "Sizing your battery & backup", category: "Sizing", meta: "Lesson · 7 min",
      blurb: "Match storage to the hours of backup you actually want, without overpaying.",
      lead: "The battery decides how long you stay powered. Size it to the hours of backup you actually want — no more, no less.",
      sections: [
        { heading: "Start from daily energy", body: ["Take your daily consumption in kWh and the number of backup hours you want. The energy you need to store is roughly your average hourly use times those hours."] },
        { heading: "Account for usable depth", body: ["You can't drain a battery to zero. Divide the energy you need by the usable depth of discharge — about 90% for lithium, 50% for tubular — to get the nominal capacity to buy."] },
      ],
    },
    {
      slug: "battery-chemistry-explained", title: "Battery chemistry explained", category: "Batteries", meta: "Lesson · 6 min",
      blurb: "Lithium vs tubular vs gel — lifespan, depth of discharge and cost, made simple.",
      lead: "Lithium, tubular and gel behave very differently. Knowing how helps you choose the right one for your budget and backup needs.",
      sections: [
        { heading: "The three you'll see", list: ["Lithium (LiFePO₄): long life, deep discharge, low maintenance, higher upfront.", "Tubular: affordable, repairable, shorter life, needs maintenance.", "Gel: sealed and maintenance-free, but shorter life and shallow discharge."] },
        { heading: "The metric that matters", body: ["Compare cost per usable kilowatt-hour over the battery's life, not just the sticker price. Lithium usually wins there despite costing more upfront."] },
      ],
    },
    {
      slug: "depth-of-discharge-and-battery-life", title: "Depth of discharge & battery life", category: "Batteries", meta: "Lesson · 5 min",
      blurb: "Why how deep you drain a battery decides how long it lasts.",
      lead: "How deeply you drain a battery each cycle largely decides how many years it lasts. This is the single most misunderstood spec.",
      sections: [
        { heading: "What DoD means", body: ["Depth of discharge is how much of a battery's capacity you use before recharging. Draw 8kWh from a 10kWh battery and that's 80% DoD."] },
        { heading: "Deeper drains, shorter life", body: ["Every chemistry has a safe DoD. Regularly exceeding it shortens lifespan fast. Lithium tolerates deep cycling (80–90%); tubular and gel prefer shallower (~50%), which is why they're sized larger for the same usable energy."] },
      ],
    },
    {
      slug: "financing-your-system", title: "Financing your system", category: "Financing", meta: "Lesson · 6 min",
      blurb: "Upfront vs monthly, tenor and how to think about payback.",
      lead: "You don't need to pay it all at once. This lesson covers how solar financing works and how to think about payback.",
      sections: [
        { heading: "Upfront, tenor, monthly", body: ["A larger upfront lowers your monthly repayment; a longer tenor spreads it further. Your system's savings offset part of the payment from day one."] },
        { heading: "Thinking about payback", body: ["Payback is roughly system cost divided by your annual savings. When grid and diesel are expensive, payback is short — often just a few years — after which the energy is effectively free."] },
      ],
    },
    {
      slug: "caring-for-your-solar-system", title: "Caring for your solar system", category: "Maintenance", meta: "Lesson · 5 min",
      blurb: "Simple habits and the Forra app checks that keep your system performing.",
      lead: "A well-installed system needs little from you — but a few simple habits keep it performing at its best for years.",
      sections: [
        { heading: "Simple routine", list: ["Keep panels reasonably clean and unshaded.", "Glance at the Forra app now and then for anything unusual.", "Don't add big new loads without checking your system can carry them.", "Book periodic checks as your plan recommends."] },
        { heading: "We watch it too", body: ["Monitoring means many issues are caught remotely before they affect you. If something needs a visit, we'll usually know before you do."] },
      ],
    },
  ],
};

export const GUIDES: Collection = {
  base: "/guides", kind: "Guide", backLabel: "All guides",
  eyebrow: "Energy guides", h1: "In-depth guides, ready when you are",
  intro: "Deeper references for homeowners, businesses and buyers — the details you'll want on hand when you're planning, comparing or making the switch. Read here, or print to keep.",
  points: ["Practical checklists", "For homes & businesses", "Buyer-focused", "Free to use"],
  categories: ["All", "Homeowners", "Businesses", "Buyers", "Technical"],
  ctaTitle: "Skip straight to the numbers.",
  ctaText: "A free audit gives you a system spec, cost and savings estimate tailored to you — no reading required.",
  items: [
    {
      slug: "nigerian-homeowners-solar-guide", title: "The Nigerian homeowner's solar guide", category: "Homeowners", meta: "Guide · 24 pages",
      blurb: "Everything a household needs to plan, size, finance and live with a solar system.",
      lead: "Everything a household needs to plan, size, finance and live with a solar system — start to finish.",
      sections: [
        { heading: "1. Understand your needs", body: ["Map what you run and the backup you want. Decide whether you need whole-home backup or just the essentials — lights, fans, fridge, TV and Wi-Fi."] },
        { heading: "2. Size and choose", body: ["Use the audit to size the inverter, battery and panels, and choose your battery chemistry to fit your budget and lifespan expectations."] },
        { heading: "3. Finance and install", body: ["Pick an upfront and tenor that suit you, get approved, and let certified engineers install — usually in a single day."] },
        { heading: "Before you buy, check", list: ["The system is sized from your real load", "Warranties are registered manufacturer warranties", "Monitoring is included", "Installation is by certified engineers"] },
      ],
    },
    {
      slug: "sme-energy-playbook", title: "SME energy playbook", category: "Businesses", meta: "Guide · 20 pages",
      blurb: "How small businesses cut power costs, protect uptime and finance solar as an operating cost.",
      lead: "How small businesses cut power costs, protect uptime and finance solar as an operating cost rather than a capital shock.",
      sections: [
        { heading: "Treat power as a P&L line", body: ["Total your electricity, fuel, maintenance and downtime. That's your real energy cost — and the budget solar competes against."] },
        { heading: "Protect what earns", body: ["Prioritise the loads that make you money — tills, fridges, machines — so backup is sized where it matters most."] },
        { heading: "Finance it as OPEX", body: ["Financing turns a lumpy fuel bill into a predictable monthly cost, often lower than what you spend on diesel today."] },
      ],
    },
    {
      slug: "solar-buyers-checklist", title: "Solar buyer's checklist", category: "Buyers", meta: "Guide · 8 pages",
      blurb: "The questions to ask, the specs to compare and the red flags to avoid before you buy.",
      lead: "The questions to ask and the red flags to avoid before you put money down.",
      sections: [
        { heading: "Ask every installer", list: ["How did you size this — from my load, or a template?", "What's the usable capacity and lifespan of the battery?", "Are the warranties manufacturer-registered?", "Is monitoring included?", "Who actually does the installation?"] },
        { heading: "Red flags", body: ["Vague sizing, no site survey, unbranded equipment and prices that seem too good usually mean an undersized or short-lived system."] },
      ],
    },
    {
      slug: "battery-sizing-reference", title: "Battery sizing reference", category: "Technical", meta: "Guide · 12 pages",
      blurb: "Formulas, depth-of-discharge tables and worked examples for sizing storage.",
      lead: "Formulas, depth-of-discharge figures and worked examples for sizing storage correctly.",
      sections: [
        { heading: "Core formula", body: ["Nominal capacity (kWh) = energy needed during backup ÷ usable depth of discharge. Energy needed = average load × backup hours."] },
        { heading: "Usable depth by chemistry", list: ["Lithium (LiFePO₄): about 90%", "Gel: about 50%", "Tubular: about 50%"] },
        { heading: "Worked example", body: ["Need 6kWh over your backup window on lithium: 6 ÷ 0.9 ≈ 6.7kWh nominal, so a 7kWh+ battery. On tubular: 6 ÷ 0.5 = 12kWh nominal for the same usable energy."] },
      ],
    },
    {
      slug: "financing-and-eligibility-guide", title: "Financing & eligibility guide", category: "Buyers", meta: "Guide · 10 pages",
      blurb: "Plans, documents and how approval works — everything you need before you apply.",
      lead: "Plans, documents and how approval works — everything to have ready before you apply.",
      sections: [
        { heading: "Plans", body: ["Choose an upfront amount and tenor to fit your cash flow. Home plans are typically approved within 48 hours of receiving your documents."] },
        { heading: "What you'll need", list: ["Completed energy audit", "Valid government ID", "Proof of address", "3–6 months of bank statements", "Payslips and offer letter (employees) or CAC (businesses)"] },
        { heading: "Approval", body: ["A light-touch credit review confirms your terms, always in writing before anything is signed."] },
      ],
    },
    {
      slug: "maintenance-and-warranty-handbook", title: "Maintenance & warranty handbook", category: "Technical", meta: "Guide · 14 pages",
      blurb: "Keeping your system healthy and understanding exactly what your warranties cover.",
      lead: "Keeping your system healthy and understanding exactly what your warranties cover.",
      sections: [
        { heading: "Routine care", list: ["Keep panels clean and unshaded", "Monitor performance in the Forra app", "Service per your maintenance plan"] },
        { heading: "What warranties cover", body: ["Equipment carries registered manufacturer warranties — for example 10-year lithium batteries and 25-year panels. Workmanship is covered separately by our installation guarantee."] },
        { heading: "Making a claim", body: ["If a covered fault occurs, we manage the manufacturer claim for you — no runaround."] },
      ],
    },
  ],
};

export const CASE_STUDIES: Collection = {
  base: "/case-studies", kind: "Case study", backLabel: "All case studies",
  eyebrow: "Case studies", h1: "Real systems, measured results",
  intro: "Every Forra project is engineered, installed and monitored — so we can show you exactly what changed. Filter by sector to see outcomes from homes, businesses and facilities across Nigeria.",
  points: ["Verified outcomes", "Across every sector", "Still monitored today", "Nigeria-wide"],
  categories: ["All", "Residential", "Healthcare", "Commercial", "Education", "Hospitality", "Manufacturing", "Agriculture"],
  ctaTitle: "Your results could be next.",
  ctaText: "Start with a free audit — we'll size the right system and show you the outcome you can expect.",
  items: [
    {
      slug: "lekki-estate-goes-diesel-free", title: "Lekki estate goes diesel-free", category: "Residential", meta: "Lekki Phase 1, Lagos · 120 kW",
      blurb: "A 120kW system took 38 homes off generators and cut the estate's service charge by 31%.",
      lead: "A 38-home estate replaced its communal generators with solar — and cut service charges in the process.",
      stats: [["System", "120 kW"], ["Homes", "38"], ["Generation", "168 MWh/yr"], ["Service charge", "−31%"]],
      sections: [
        { heading: "The challenge", body: ["Communal diesel gensets powered common areas and backup across the estate. Fuel and maintenance drove service charges up, and residents endured noise and outages."] },
        { heading: "What we built", body: ["A 120kW solar and storage system covering common-area power, boreholes and estate lighting, integrated with the grid as backup."] },
        { heading: "The results", list: ["Diesel eliminated across the estate", "Service charge reduced by 31%", "Quiet, reliable common-area power", "Fully monitored for the facility manager"] },
      ],
      quote: { text: "The generators are gone, the estate is quiet, and our service charge actually went down. 'Solar-powered' is now one of our best sales lines.", name: "Chidi Okonkwo", role: "Estate Manager · Lagos" },
    },
    {
      slug: "zero-outage-minutes-in-theatre", title: "Zero outage minutes in theatre", category: "Healthcare", meta: "Ikeja, Lagos · 65 kW + 120 kWh",
      blurb: "A 65kW + 120kWh system gave a Lagos medical centre seamless, silent critical-care power.",
      lead: "A Lagos medical centre eliminated outage risk in its theatres with seamless, silent backup.",
      stats: [["System", "65 kW"], ["Storage", "120 kWh"], ["Critical backup", "24/7"], ["Outage minutes", "0"]],
      sections: [
        { heading: "The challenge", body: ["Grid instability and generator changeover gaps put theatres, the cold chain and patient monitors at risk during procedures."] },
        { heading: "What we built", body: ["A 65kW + 120kWh hybrid system with prioritised critical circuits and instant, gap-free switchover."] },
        { heading: "The results", list: ["Zero outage minutes in theatres since commissioning", "Vaccine and blood cold chain protected", "No generator noise or fumes near wards", "Live monitoring with battery alerts"] },
      ],
      quote: { text: "We haven't lost power to a critical area since. For a hospital, that's everything.", name: "Dr. Amaka Nwosu", role: "Medical Director · Lagos" },
    },
    {
      slug: "rice-mill-cuts-processing-cost", title: "Rice mill cuts processing cost 44%", category: "Agriculture", meta: "Abeokuta, Ogun · 250 kW",
      blurb: "250kW of solar added night-shift capacity and slashed an agro-processor's energy bill.",
      lead: "An agro-processor cut energy costs 44% and added a night shift after switching from diesel to solar.",
      stats: [["System", "250 kW"], ["Generation", "372 MWh/yr"], ["Energy cost", "−44%"], ["Capacity", "+ night shift"]],
      sections: [
        { heading: "The challenge", body: ["The mill ran entirely on diesel. Fuel was its largest cost after raw rice, and outages during processing meant spoiled batches and idle staff."] },
        { heading: "What we built", body: ["A 250kW solar array with storage, engineered around the mill's motor loads and processing schedule, with the grid and gensets as backup."] },
        { heading: "The results", list: ["Processing energy cost down 44%", "Reliable power to run a night shift", "Diesel now a rare backup, not a daily expense"] },
      ],
      quote: { text: "Fuel used to be our second-biggest cost. Now the mill runs on solar by day and we've added a shift.", name: "Bola Adewale", role: "Operations · Abeokuta" },
    },
    {
      slug: "a-school-that-never-cancels-prep", title: "A school that never cancels prep", category: "Education", meta: "Enugu · 90 kW + 80 kWh",
      blurb: "A 90kW + 80kWh system keeps classrooms and boarding lit, redirecting diesel spend to staff.",
      lead: "A boarding school kept classrooms and prep reliably lit while redirecting its diesel budget to teaching.",
      stats: [["System", "90 kW"], ["Storage", "80 kWh"], ["Running cost", "−45%"], ["Prep cancelled", "Never"]],
      sections: [
        { heading: "The challenge", body: ["Evening prep and boarding depended on a costly, unreliable generator, and diesel was eating into a budget that should have gone to teaching."] },
        { heading: "What we built", body: ["A 90kW + 80kWh system sized for both school-day loads and overnight boarding, lighting and security."] },
        { heading: "The results", list: ["Classrooms and prep lit every evening", "Running costs cut by 45%", "Diesel budget redirected to staff and facilities"] },
      ],
      quote: { text: "Prep has never been cancelled since. The money we saved on diesel now pays for teachers.", name: "Mrs. Folake Adeniyi", role: "Proprietor · Enugu" },
    },
    {
      slug: "office-complex-halves-peak-demand", title: "Office complex halves peak demand", category: "Commercial", meta: "Victoria Island, Lagos · 300 kW",
      blurb: "A 300kW system cut expensive peak-hour grid demand and put every meter under monitoring.",
      lead: "A Lagos office complex halved its expensive peak-hour grid demand and put every meter under monitoring.",
      stats: [["System", "300 kW"], ["Generation", "440 MWh/yr"], ["Peak demand", "−50%"], ["Meters monitored", "All"]],
      sections: [
        { heading: "The challenge", body: ["Peak-hour grid tariffs and diesel backup made energy one of the building's largest and least predictable costs."] },
        { heading: "What we built", body: ["A 300kW three-phase solar and storage system that shaves peak demand and covers critical loads, with facility-wide monitoring."] },
        { heading: "The results", list: ["Peak grid demand cut by half", "Energy costs down and fully visible", "Critical systems backed up through outages"] },
      ],
      quote: { text: "Our energy costs are down and, for the first time, completely visible.", name: "Ngozi Umeh", role: "Facilities Director · Lagos" },
    },
    {
      slug: "the-generator-gets-retired", title: "The generator gets retired", category: "Hospitality", meta: "Ibadan, Oyo · 140 kW + 200 kWh",
      blurb: "A 140kW + 200kWh system gave a 120-room hotel a seamless, silent guest experience.",
      lead: "A 120-room hotel retired its generator and gave guests a seamless, silent stay.",
      stats: [["System", "140 kW"], ["Storage", "200 kWh"], ["Guest blackouts", "0"], ["Energy cost", "−40%"]],
      sections: [
        { heading: "The challenge", body: ["Guests felt every outage and every generator start — noise, fumes and dark corridors that hurt comfort ratings and repeat bookings."] },
        { heading: "What we built", body: ["A 140kW + 200kWh system carrying rooms, cooling, lifts and Wi-Fi seamlessly, with the generator kept only as deep backup."] },
        { heading: "The results", list: ["Zero guest-felt blackouts", "Generator effectively retired", "Energy cost down 40%", "Higher comfort ratings"] },
      ],
      quote: { text: "The changeover is invisible now — no noise, no dark corridors. Our comfort ratings have climbed.", name: "Emeka Okafor", role: "General Manager · Ibadan" },
    },
    {
      slug: "bottling-line-always-on", title: "Bottling line, always on", category: "Manufacturing", meta: "Kano · 500 kW",
      blurb: "500kW of solar protected line uptime and cut the plant's energy cost per unit by 38%.",
      lead: "A bottling plant protected its line uptime and cut energy cost per unit by nearly 40%.",
      stats: [["System", "500 kW"], ["Generation", "740 MWh/yr"], ["Cost per unit", "−38%"], ["Uptime", "Protected"]],
      sections: [
        { heading: "The challenge", body: ["A single outage could ruin a batch and cost hours restarting the line, while diesel made every bottle more expensive to produce."] },
        { heading: "What we built", body: ["A 500kW three-phase solar and storage system engineered for the plant's motor loads, bridging outages instantly."] },
        { heading: "The results", list: ["Line uptime protected through outages", "Energy cost per unit down 38%", "Diesel hours sharply reduced"] },
      ],
      quote: { text: "A single outage used to ruin a batch. Now the line runs straight through.", name: "Ibrahim Danjuma", role: "Plant Manager · Kano" },
    },
    {
      slug: "off-grid-poultry-fully-reliable", title: "Off-grid poultry, fully reliable", category: "Agriculture", meta: "Kaduna · 60 kW",
      blurb: "A 60kW off-grid system secured cold storage and ventilation with no grid connection at all.",
      lead: "An off-grid poultry farm secured its cold storage and ventilation with no grid connection at all.",
      stats: [["System", "60 kW"], ["Grid", "Off-grid"], ["Generation", "88 MWh/yr"], ["Cold chain", "Secured"]],
      sections: [
        { heading: "The challenge", body: ["The farm sat beyond the grid and ran on diesel around the clock to keep ventilation and cold storage alive — costly and fragile."] },
        { heading: "What we built", body: ["A 60kW fully off-grid solar and storage system sized for continuous ventilation, pumping and cold storage."] },
        { heading: "The results", list: ["Reliable power day and night, fully off-grid", "Cold storage and ventilation secured", "Diesel dependence removed"] },
      ],
      quote: { text: "The grid never reached us. Now the farm runs reliably on solar, day and night.", name: "Musa Aliyu", role: "Farm Owner · Kaduna" },
    },
  ],
};

export const COLLECTIONS: Record<string, Collection> = {
  blog: BLOG,
  learning: LEARNING,
  guides: GUIDES,
  "case-studies": CASE_STUDIES,
};
