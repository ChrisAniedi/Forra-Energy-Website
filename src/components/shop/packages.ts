import type { IconType } from "@/components/ui/icons";
import { AcIc, BuildingIc, BulbIc, FanIc, FridgeIc, LaptopIc, PumpIc, TvIc } from "@/components/ui/icons";

export interface Package {
  id: string;
  name: string;
  chem: "Lithium" | "Tubular";
  kva: number;
  kwh: number;
  battery: string;
  panels: string;
  panelCount: number;
  battN: number;
  backup: string;
  fit: string;
  bestFor: "home" | "business" | "both";
  stock: string;
  badge?: string;
  warranty: string;
  powers: IconType[];
  powersText: string;
  order: number;
  /** Estimated turnkey price (₦) — anchors the "from ₦X/mo" storefront figure. Confirmed at quote. */
  priceFrom: number;
  rating: number;
  reviews: number;
}

/** Illustrative financing anchor shown on cards: turnkey price over 24 months + light markup. */
export const monthlyFrom = (priceFrom: number) => Math.round((priceFrom * 1.2) / 24 / 1000) * 1000;

export interface SizeBand {
  id: string;
  label: string;
  test?: (kva: number) => boolean;
}

export const PACKAGES: Package[] = [
  { id: "lite-25", name: "Forra Lite 2.5", chem: "Lithium", kva: 3.5, kwh: 2.5, battery: "2.5 kWh LiFePO₄", panels: "4 × 450W", panelCount: 4, battN: 1, backup: "6–8 hrs", fit: "1–2 bedroom flat", bestFor: "home", stock: "In stock", badge: "Best starter", warranty: "10-yr battery", powers: [BulbIc, FanIc, TvIc, LaptopIc, FridgeIc], powersText: "Lights · fans · TV · laptops · fridge", order: 1, priceFrom: 1350000, rating: 4.8, reviews: 96 },
  { id: "core-5", name: "Forra Core 5", chem: "Lithium", kva: 5, kwh: 5, battery: "5 kWh LiFePO₄", panels: "6 × 550W", panelCount: 6, battN: 1, backup: "10–12 hrs", fit: "2–3 bedroom home", bestFor: "home", stock: "In stock", badge: "Most popular", warranty: "10-yr battery", powers: [BulbIc, FridgeIc, TvIc, AcIc, PumpIc], powersText: "Everything above + 1 AC + pump", order: 2, priceFrom: 2150000, rating: 4.9, reviews: 168 },
  { id: "core-5p", name: "Forra Core 5+", chem: "Lithium", kva: 5, kwh: 10, battery: "10 kWh LiFePO₄", panels: "8 × 550W", panelCount: 8, battN: 2, backup: "18–22 hrs", fit: "3-bed home · heavy backup", bestFor: "home", stock: "In stock", warranty: "10-yr battery", powers: [BulbIc, FridgeIc, TvIc, AcIc, PumpIc], powersText: "Core 5 loads, nearly round the clock", order: 3, priceFrom: 2950000, rating: 4.8, reviews: 74 },
  { id: "pro-10", name: "Forra Pro 10", chem: "Lithium", kva: 10, kwh: 15, battery: "15 kWh LiFePO₄", panels: "12 × 550W", panelCount: 8, battN: 3, backup: "Near-24h", fit: "Duplex · small office", bestFor: "both", stock: "In stock", warranty: "10-yr battery", powers: [AcIc, FridgeIc, PumpIc, LaptopIc, TvIc], powersText: "2–3 ACs · freezers · pump · office loads", order: 4, priceFrom: 5400000, rating: 4.9, reviews: 58 },
  { id: "max-15", name: "Forra Max 15", chem: "Lithium", kva: 15, kwh: 20, battery: "20 kWh LiFePO₄", panels: "18 × 550W", panelCount: 8, battN: 4, backup: "24/7 capable", fit: "Large duplex · SME", bestFor: "both", stock: "2–3 weeks", warranty: "10-yr battery", powers: [AcIc, AcIc, FridgeIc, PumpIc, LaptopIc], powersText: "Multiple ACs · full household or SME", order: 5, priceFrom: 7600000, rating: 4.7, reviews: 41 },
  { id: "com-30", name: "Forra Commercial 30", chem: "Lithium", kva: 30, kwh: 40, battery: "40 kWh LiFePO₄", panels: "36 × 550W", panelCount: 8, battN: 4, backup: "Engineered to load", fit: "Office · school · facility", bestFor: "business", stock: "2–3 weeks", badge: "Commercial", warranty: "10-yr battery", powers: [BuildingIc, AcIc, LaptopIc, FridgeIc, PumpIc], powersText: "Facility-scale — sized from your load profile", order: 6, priceFrom: 14500000, rating: 4.9, reviews: 33 },
  { id: "tub-15", name: "Forra Tubular 1.5", chem: "Tubular", kva: 1.5, kwh: 2.1, battery: "2 × 220Ah tubular", panels: "2 × 450W", panelCount: 2, battN: 2, backup: "4–6 hrs", fit: "Starter · light loads", bestFor: "home", stock: "In stock", badge: "Budget pick", warranty: "18-mo battery", powers: [BulbIc, FanIc, TvIc, LaptopIc], powersText: "Lights · fans · TV · laptops", order: 7, priceFrom: 620000, rating: 4.6, reviews: 112 },
  { id: "tub-25", name: "Forra Tubular 2.5", chem: "Tubular", kva: 2.5, kwh: 4.2, battery: "4 × 220Ah tubular", panels: "4 × 450W", panelCount: 4, battN: 4, backup: "6–8 hrs", fit: "1–2 bedroom flat", bestFor: "home", stock: "In stock", warranty: "18-mo battery", powers: [BulbIc, FanIc, TvIc, FridgeIc], powersText: "Lights · fans · TV · fridge", order: 8, priceFrom: 1050000, rating: 4.6, reviews: 87 },
  { id: "tub-35", name: "Forra Tubular 3.5", chem: "Tubular", kva: 3.5, kwh: 4.2, battery: "4 × 220Ah tubular", panels: "6 × 450W", panelCount: 6, battN: 4, backup: "8–10 hrs", fit: "Small home · shop", bestFor: "both", stock: "In stock", warranty: "18-mo battery", powers: [BulbIc, FanIc, TvIc, FridgeIc, PumpIc], powersText: "Lights · fans · TV · fridge · pump", order: 9, priceFrom: 1350000, rating: 4.7, reviews: 64 },
];
export const SIZE_BANDS: SizeBand[] = [
  { id: "all", label: "All sizes" },
  { id: "small", label: "Up to 2.5 kVA", test: (k) => k <= 2.5 },
  { id: "mid", label: "3.5 – 5 kVA", test: (k) => k >= 3.5 && k <= 5 },
  { id: "large", label: "6 – 10 kVA", test: (k) => k > 5 && k <= 10 },
  { id: "xl", label: "10 kVA+", test: (k) => k > 10 },
];
