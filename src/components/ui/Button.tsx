"use client";

import type { ReactNode } from "react";
import { ArrowR } from "@/components/ui/icons";

export interface BtnProps {
  children: ReactNode;
  kind?: "primary" | "outline" | "ghost" | "gold" | "glass";
  small?: boolean;
  icon?: boolean;
  onClick?: () => void;
  className?: string;
}

/** Site-wide pill button. `kind` maps to the design-system variants in base.css. */
export const Btn = ({ children, kind = "primary", small, icon = true, onClick, className }: BtnProps) => (
  <button
    className={`btn btn--${kind}${small ? " btn--sm" : ""}${className ? " " + className : ""}`}
    onClick={onClick}
  >
    <span>{children}</span>
    {icon && <ArrowR size={17} />}
  </button>
);
