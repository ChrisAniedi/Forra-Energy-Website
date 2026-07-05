"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { NAV, NAV_ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { MailIc, PinIc, WaIc } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";

const FootLink = ({ item }: { item: string }) => {
  const route = NAV_ROUTES[item];
  if (route) return <Link href={route}>{item}</Link>;
  return (
    <a href="#" aria-disabled onClick={(e: MouseEvent) => e.preventDefault()}>
      {item}
    </a>
  );
};

const Footer = () => (
  <footer className="foot">
    <div className="container foot-grid">
      <div className="foot-brand">
        <Link className="logo logo--light" href="/">
          <Logo light />
        </Link>
        <p>Africa's intelligent energy platform. Generate, finance, manage and optimize clean energy — all in one place.</p>
        <div className="foot-contact">
          <span><WaIc size={16} /> {SITE.phoneDisplay}</span>
          <span><MailIc size={16} /> {SITE.email}</span>
          <span><PinIc size={16} /> HQ · {SITE.hq.address}</span>
          <span><PinIc size={16} /> Island office · {SITE.island.address}</span>
        </div>
      </div>
      {NAV.map((g) => (
        <div className="foot-col" key={g.label}>
          <h4>{g.label}</h4>
          {g.items.slice(0, 6).map((it) => <FootLink key={it} item={it} />)}
        </div>
      ))}
      <div className="foot-col foot-news">
        <h4>Stay powered</h4>
        <p>Energy insights, financing offers and product updates. Monthly, no spam.</p>
        <div className="foot-input">
          <input placeholder="you@company.com" />
          <button className="btn btn--gold btn--sm"><span>Subscribe</span></button>
        </div>
      </div>
    </div>
    <div className="container foot-base">
      <span>© 2026 Forra Energy Technologies Ltd. {SITE.rc}</span>
      <div className="foot-legal">
        {["Privacy Policy", "Terms & Conditions", "LinkedIn", "Instagram", "X"].map((l) => (
          <a key={l} href="#" onClick={(e: MouseEvent) => e.preventDefault()}>{l}</a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
