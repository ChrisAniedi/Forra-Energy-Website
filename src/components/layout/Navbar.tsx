"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { NAV, NAV_ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { useOverlay } from "@/context/OverlayProvider";
import { ArrowR, ChevD, FlashIc, MailIc, PeopleIc, PhoneIc, PinIc } from "@/components/ui/icons";

const DropItem = ({ item }: { item: string }) => {
  const route = NAV_ROUTES[item];
  if (route) return <Link href={route}>{item}</Link>;
  return (
    <a href="#" aria-disabled onClick={(e: MouseEvent) => e.preventDefault()}>
      {item}
    </a>
  );
};

const Navbar = () => {
  const { openExpert, openStart } = useOverlay();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header className={"site-head" + (scrolled ? " site-head--scrolled" : "")}>
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-loc">
            <span><PinIc size={13} /> {SITE.hq.label}</span>
            <span><PinIc size={13} /> {SITE.island.label}</span>
            <span className="topbar-tag">{SITE.coverage}</span>
          </div>
          <div className="topbar-links">
            <a href={SITE.phoneHref}><PhoneIc size={13} /> {SITE.phoneDisplay}</a>
            <a href={`mailto:${SITE.email}`} className="topbar-mail"><MailIc size={13} /> {SITE.email}</a>
            <Link href="/portal" className="topbar-portal"><PeopleIc size={13} /> Client Portal</Link>
          </div>
        </div>
      </div>
      <div className="nav-main">
        <div className="container nav-inner">
          <Link className="logo" href="/">
            <span className="logo-mark"><FlashIc size={16} color="#0B2B1F" /></span>
            <span className="logo-word">Forra<em>Energy</em></span>
          </Link>
          <nav className="nav-links">
            {NAV.map((g) => (
              <div key={g.label} className="nav-item">
                <button className="nav-link">{g.label}<ChevD size={14} /></button>
                <div className="nav-drop">
                  {g.items.map((it) => <DropItem key={it} item={it} />)}
                </div>
              </div>
            ))}
            <Link href="/shop" className="nav-link">Shop</Link>
          </nav>
          <div className="nav-cta">
            <button className="btn btn--ghost btn--sm nav-expert" onClick={openExpert}><span>Talk to an Expert</span></button>
            <button className="btn btn--primary btn--sm" onClick={openStart}><span>Get Started</span><ArrowR size={16} /></button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
