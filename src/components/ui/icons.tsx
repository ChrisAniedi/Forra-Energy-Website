import type { CSSProperties, ReactNode, SVGProps } from "react";

/**
 * Inline SVG icons drawn in Iconsax-linear style (1.6 stroke, rounded caps).
 * Production swap: `iconsax-react` — component names match 1:1.
 */
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "color" | "style"> {
  size?: number;
  color?: string;
  style?: CSSProperties;
}

export type IconType = (p: IconProps) => React.JSX.Element;

const I = ({ children, size = 22, color = "currentColor", style, ...rest }: IconProps & { children?: ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, ...style }}
    {...rest}
  >
    {children}
  </svg>
);

export const FlashIc: IconType = (p) => (<I {...p}><path d="M13 2 4.6 12.2c-.5.6-.1 1.5.7 1.5H11l-1 8.3 8.4-10.2c.5-.6.1-1.5-.7-1.5H13l1-8.3Z"/></I>);
export const SunIc: IconType = (p) => (<I {...p}><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></I>);
export const BatteryIc: IconType = (p) => (<I {...p}><rect x="2.5" y="7" width="17" height="10" rx="2.5"/><path d="M21.5 10.5v3M6.5 10.5v3M10 10.5v3"/></I>);
export const ChartIc: IconType = (p) => (<I {...p}><path d="M3 21h18"/><path d="M6 17V11M11 17V6M16 17v-4M21 17V8" strokeWidth="1.8"/></I>);
export const WalletIc: IconType = (p) => (<I {...p}><path d="M3.5 8.5v9A2.5 2.5 0 0 0 6 20h12a2.5 2.5 0 0 0 2.5-2.5v-6A2.5 2.5 0 0 0 18 9H4.6c-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1H17"/><circle cx="16.4" cy="14.5" r="1.1" fill="currentColor" stroke="none"/></I>);
export const BuildingIc: IconType = (p) => (<I {...p}><path d="M4 21h16M5.5 21V5.2c0-.7.5-1.2 1.2-1.2h6.6c.7 0 1.2.5 1.2 1.2V21M14.5 9.5h3.3c.7 0 1.2.5 1.2 1.2V21"/><path d="M8.5 7.5h2.5M8.5 11h2.5M8.5 14.5h2.5"/></I>);
export const HomeIc: IconType = (p) => (<I {...p}><path d="M3.5 10.6 12 3.5l8.5 7.1M5.5 9v9.5c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V9"/><path d="M9.8 20.5v-5c0-.8.7-1.5 1.5-1.5h1.4c.8 0 1.5.7 1.5 1.5v5"/></I>);
export const MonitorIc: IconType = (p) => (<I {...p}><rect x="2.5" y="4" width="19" height="13" rx="2.2"/><path d="M8.5 21h7M12 17v4"/><path d="M6.5 12.5 9 9.8l2.3 2 3.2-3.8 3 3" strokeWidth="1.5"/></I>);
export const DocIc: IconType = (p) => (<I {...p}><path d="M14 2.8H7.5A2.5 2.5 0 0 0 5 5.3v13.4a2.5 2.5 0 0 0 2.5 2.5h9a2.5 2.5 0 0 0 2.5-2.5V7.8L14 2.8Z"/><path d="M14 2.8v5h5M9 12.5h6M9 16h4"/></I>);
export const ArrowR: IconType = (p) => (<I {...p}><path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5"/></I>);
export const TickIc: IconType = (p) => (<I {...p}><circle cx="12" cy="12" r="9"/><path d="m8 12.2 2.6 2.6L16 9.6"/></I>);
export const ShieldIc: IconType = (p) => (<I {...p}><path d="M12 2.8 4.5 5.6v6.1c0 4.6 3.2 8 7.5 9.5 4.3-1.5 7.5-4.9 7.5-9.5V5.6L12 2.8Z"/><path d="m8.8 11.8 2.2 2.2 4.2-4.4"/></I>);
export const CpuIc: IconType = (p) => (<I {...p}><rect x="5.5" y="5.5" width="13" height="13" rx="2.5"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2.5v3M15 2.5v3M9 18.5v3M15 18.5v3M2.5 9h3M2.5 15h3M18.5 9h3M18.5 15h3"/></I>);
export const GaugeIc: IconType = (p) => (<I {...p}><path d="M4.5 18a8.5 8.5 0 1 1 15 0"/><path d="m12 14 3.6-4.6"/><circle cx="12" cy="14.5" r="1.4"/></I>);
export const LeafIc: IconType = (p) => (<I {...p}><path d="M19.5 4.5C10 4.5 5 9.5 5 15.5c0 1.7.4 3 1 4C7 13 11 9.5 16 8c-4 2.5-7.4 6.5-8.3 11.2.8.5 2 .8 3.3.8 6 0 8.5-6.5 8.5-15.5Z"/></I>);
export const PeopleIc: IconType = (p) => (<I {...p}><circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19.5c.6-3 2.9-4.7 5.5-4.7s4.9 1.7 5.5 4.7"/><circle cx="16.8" cy="9.5" r="2.4"/><path d="M16.3 14.6c2.2.2 3.8 1.7 4.3 4.1"/></I>);
export const GlobeIc: IconType = (p) => (<I {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9S14.6 18.4 12 21c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3Z"/></I>);
export const CalcIc: IconType = (p) => (<I {...p}><rect x="4.5" y="2.8" width="15" height="18.4" rx="2.4"/><path d="M8 7h8M8.2 11.5h.01M12 11.5h.01M15.8 11.5h.01M8.2 15h.01M12 15h.01M15.8 15h.01M8.2 18.2h.01M12 18.2h.01M15.8 18.2h.01" strokeWidth="2"/></I>);
export const BookIc: IconType = (p) => (<I {...p}><path d="M12 5.5C10.5 4 8.4 3.3 5.6 3.3c-.9 0-1.6.7-1.6 1.6v12.4c0 .9.7 1.6 1.6 1.6 2.8 0 4.9.7 6.4 2.2 1.5-1.5 3.6-2.2 6.4-2.2.9 0 1.6-.7 1.6-1.6V4.9c0-.9-.7-1.6-1.6-1.6-2.8 0-4.9.7-6.4 2.2ZM12 5.5V21"/></I>);
export const PhoneIc: IconType = (p) => (<I {...p}><path d="M20.5 16.9v2.2a2 2 0 0 1-2.2 2A17.6 17.6 0 0 1 2.9 5.7a2 2 0 0 1 2-2.2h2.2c.5 0 .9.3 1 .8l.8 3.1c.1.4 0 .8-.3 1.1L7.2 9.9a14.5 14.5 0 0 0 6.9 6.9l1.4-1.4c.3-.3.7-.4 1.1-.3l3.1.8c.5.1.8.5.8 1Z"/></I>);
export const MailIc: IconType = (p) => (<I {...p}><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7.5 8 5.5 8-5.5"/></I>);
export const PinIc: IconType = (p) => (<I {...p}><path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></I>);
export const ChevD: IconType = (p) => (<I {...p}><path d="m6 9.5 6 5.5 6-5.5"/></I>);
export const StarIc: IconType = (p) => (<I {...p}><path d="m12 3.2 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L12 3.2Z"/></I>);
export const TimerIc: IconType = (p) => (<I {...p}><circle cx="12" cy="13" r="8"/><path d="M12 9.5V13l2.5 2.5M9.5 2.5h5"/></I>);
export const HealthIc: IconType = (p) => (<I {...p}><path d="M12 20.5S3.5 15.4 3.5 9.3A4.6 4.6 0 0 1 12 6.9a4.6 4.6 0 0 1 8.5 2.4c0 6.1-8.5 11.2-8.5 11.2Z"/><path d="M7.5 12h2.6l1.2-2.4 1.6 4 1.2-1.6h2.4"/></I>);
export const SchoolIc: IconType = (p) => (<I {...p}><path d="m2.8 9 9.2-4.7L21.2 9 12 13.7 2.8 9Z"/><path d="M6.3 11v4.6c0 1.5 2.6 2.9 5.7 2.9s5.7-1.4 5.7-2.9V11M21.2 9v5.5"/></I>);
export const FactoryIc: IconType = (p) => (<I {...p}><path d="M3 21h18M4.5 21V11.5l5-3v3l5-3v3l5-3V21"/><path d="M8 17h1.6M12 17h1.6M16 17h1.6"/></I>);
export const TractorIc: IconType = (p) => (<I {...p}><circle cx="7" cy="16.5" r="3.8"/><circle cx="18" cy="17.5" r="2.6"/><path d="M10.8 16.5h4.6M5 12.7V7.5h6l1.8 5M11 7.5V5h4.5v7.7"/></I>);
export const HotelIc: IconType = (p) => (<I {...p}><path d="M3 20.5h18M4.5 20.5V6A2 2 0 0 1 6.5 4h11a2 2 0 0 1 2 2v14.5"/><path d="M8 8h2M14 8h2M8 12h2M14 12h2M10.4 20.5v-3.6c0-.6.5-1.1 1.1-1.1h1c.6 0 1.1.5 1.1 1.1v3.6"/></I>);
export const BankIc: IconType = (p) => (<I {...p}><path d="M3 9.5 12 4l9 5.5M4.5 9.5V18M9 9.5V18M15 9.5V18M19.5 9.5V18M3 20.5h18"/></I>);
export const ChurchIc: IconType = (p) => (<I {...p}><path d="M12 3v4M10 5h4M6.5 21v-8.2L12 9l5.5 3.8V21M3 21h18"/><path d="M10.3 21v-3.4c0-.9.8-1.7 1.7-1.7s1.7.8 1.7 1.7V21"/></I>);
export const EstateIc: IconType = (p) => (<I {...p}><path d="M2.8 21h18.4M4.2 21V10.8L9 7.5l4.8 3.3V21M13.8 12.6l3-2.1 3 2.1V21"/><path d="M7.2 12.5h1.4M7.2 16h1.4"/></I>);
export const ShopIc: IconType = (p) => (<I {...p}><path d="M4 8.5 5.3 4h13.4L20 8.5M4 8.5v10A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5v-10M4 8.5h16"/><path d="M9.3 12.2a2.7 2.7 0 0 0 5.4 0"/></I>);
export const WaIc: IconType = (p) => (<I {...p}><path d="M12 21a9 9 0 1 0-7.8-4.5L3 21l4.6-1.2A9 9 0 0 0 12 21Z"/><path d="M8.8 9.2c0 3.3 2.7 6 6 6l1.4-1.4-1.9-1.3-1 .7a4.6 4.6 0 0 1-2.5-2.5l.7-1-1.3-1.9-1.4 1.4Z" strokeWidth="1.3"/></I>);
export const SettingIc: IconType = (p) => (<I {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2.8 14 4.6l2.6-.6 1.2 2.4 2.6.8-.3 2.7L22 12l-1.9 2.1.3 2.7-2.6.8-1.2 2.4-2.6-.6-2 1.8-2-1.8-2.6.6-1.2-2.4-2.6-.8.3-2.7L2 12l1.9-2.1-.3-2.7 2.6-.8 1.2-2.4 2.6.6 2-1.8Z" strokeWidth="1.3"/></I>);

/* Appliance icons — used by the Solar Store "Comfortably powers" rows. */
export const BulbIc: IconType = (p) => (<I {...p}><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.6 1.2 1.5 1.4 2.5h5.2c.2-1 .7-1.9 1.4-2.5A6 6 0 0 0 12 3Z"/></I>);
export const FanIc: IconType = (p) => (<I {...p}><circle cx="12" cy="12" r="1.8"/><path d="M12 10.2c0-3.4-1.2-5.2-3-5.2-1.4 0-2.3 1-2.3 2.3 0 2 2.4 2.9 5.3 2.9ZM13.6 13c2.9 1.7 5 1.8 5.9.2.7-1.2.2-2.5-1-3.1-1.7-1-3.7.5-4.9 2.9ZM10.4 13c-2.9 1.7-3.8 3.6-2.9 5.2.7 1.2 2.1 1.5 3.3.8 1.7-1 1-3.5-.4-6Z"/></I>);
export const TvIc: IconType = (p) => (<I {...p}><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M9 21h6M8.5 3.5 12 6l3.5-2.5"/></I>);
export const FridgeIc: IconType = (p) => (<I {...p}><rect x="6.5" y="2.8" width="11" height="18.4" rx="2"/><path d="M6.5 9.5h11M9.3 6v1.6M9.3 12.5v3"/></I>);
export const AcIc: IconType = (p) => (<I {...p}><rect x="2.8" y="5" width="18.4" height="8" rx="2"/><path d="M6.5 10.2h11M6 16.5c.8.9.8 1.9 0 2.8M12 16.5c.8.9.8 1.9 0 2.8M18 16.5c.8.9.8 1.9 0 2.8"/></I>);
export const PumpIc: IconType = (p) => (<I {...p}><path d="M12 3.5s5.5 5.6 5.5 9.6a5.5 5.5 0 1 1-11 0c0-4 5.5-9.6 5.5-9.6Z"/><path d="M9.5 13.4a2.6 2.6 0 0 0 2.4 2.6"/></I>);
export const LaptopIc: IconType = (p) => (<I {...p}><rect x="4.5" y="4.5" width="15" height="10.5" rx="1.8"/><path d="M2.5 19.5h19M2.5 19.5 4.5 15M21.5 19.5 19.5 15"/></I>);
