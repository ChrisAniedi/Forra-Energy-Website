import type { ReactNode } from "react";

/** Section label with brand dot. `light` variant for dark backgrounds. */
export const Eyebrow = ({ children, light }: { children: ReactNode; light?: boolean }) => (
  <div className={"eyebrow" + (light ? " eyebrow--light" : "")}>
    <span className="eyebrow-dot" />
    {children}
  </div>
);
