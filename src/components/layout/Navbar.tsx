"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { NAV, NAV_ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { useOverlay } from "@/context/OverlayProvider";
import { ArrowR, ChevD, MailIc, PeopleIc, PhoneIc, PinIc } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";

const DropItem = ({ item }: { item: string }) => {
  const route = NAV_ROUTES[item];
  if (route) return <Link href={route}>{item}</Link>;
  return (
    <a className="nav-drop-soon" href="#" aria-disabled="true" tabIndex={-1} onClick={(e: MouseEvent) => e.preventDefault()}>
      {item}<span className="nav-soon">Soon</span>
    </a>
  );
};

/** Mobile menu item — real links close the menu; unreleased items show a "Soon" tag. */
const MobileItem = ({ item, onNav }: { item: string; onNav: () => void }) => {
  const route = NAV_ROUTES[item];
  if (route) return <Link href={route} onClick={onNav}>{item}</Link>;
  return <span className="mnav-soon">{item}<span className="nav-soon">Soon</span></span>;
};

const Navbar = () => {
  const { openExpert, openStart } = useOverlay();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // close the mobile menu on navigation
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // lock scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", fn);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", fn); };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

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
            <Logo />
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
            <button className="btn btn--ghost btn--sm nav-expert" onClick={() => openExpert()}><span>Talk to an Expert</span></button>
            <button className="btn btn--primary btn--sm nav-start" onClick={() => openStart()}><span>Get Started</span><ArrowR size={16} /></button>
          </div>
          <button className="nav-burger" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <div className="mnav-root" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mnav-backdrop" onClick={close} />
          <aside className="mnav-panel">
            <div className="mnav-head">
              <Link className="logo" href="/" onClick={close}><Logo /></Link>
              <button className="xp-close" onClick={close} aria-label="Close menu">✕</button>
            </div>
            <div className="mnav-body">
              {NAV.map((g) => (
                <details className="mnav-group" key={g.label}>
                  <summary>{g.label}<ChevD size={16} /></summary>
                  <div className="mnav-links">
                    {g.items.map((it) => <MobileItem key={it} item={it} onNav={close} />)}
                  </div>
                </details>
              ))}
              <Link href="/shop" className="mnav-solo" onClick={close}>Shop</Link>
            </div>
            <div className="mnav-foot">
              <div className="mnav-cta">
                <button className="btn btn--outline" onClick={() => { close(); openExpert(); }}><span>Talk to an Expert</span></button>
                <button className="btn btn--primary" onClick={() => { close(); openStart(); }}><span>Get Started</span><ArrowR size={16} /></button>
              </div>
              <div className="mnav-contact">
                <a href={SITE.phoneHref}><PhoneIc size={14} /> {SITE.phoneDisplay}</a>
                <a href={`mailto:${SITE.email}`}><MailIc size={14} /> {SITE.email}</a>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Navbar;
