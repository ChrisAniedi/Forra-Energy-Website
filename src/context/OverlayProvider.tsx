"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import ExpertPanel from "@/components/overlays/ExpertPanel";
import GetStartedWizard from "@/components/overlays/GetStartedWizard";

/** Optional context handed to an overlay — e.g. the system an audit recommended. */
export interface OverlayPrefill {
  summary: string;
  intent?: string;
}

interface OverlayApi {
  openExpert: (prefill?: OverlayPrefill) => void;
  openStart: (prefill?: OverlayPrefill) => void;
}

const OverlayCtx = createContext<OverlayApi>({ openExpert: () => {}, openStart: () => {} });

/** Buttons often pass the click event to these handlers — only accept real prefill objects. */
const asPrefill = (v: unknown): OverlayPrefill | null =>
  v && typeof v === "object" && typeof (v as { summary?: unknown }).summary === "string"
    ? (v as OverlayPrefill)
    : null;

/** App-wide access to the two conversion flows. Rendered once in the root layout. */
export function OverlayProvider({ children }: { children: ReactNode }) {
  const [expertOpen, setExpertOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [startPrefill, setStartPrefill] = useState<OverlayPrefill | null>(null);
  const [expertPrefill, setExpertPrefill] = useState<OverlayPrefill | null>(null);
  return (
    <OverlayCtx.Provider
      value={{
        openExpert: (p) => { setExpertPrefill(asPrefill(p)); setExpertOpen(true); },
        openStart: (p) => { setStartPrefill(asPrefill(p)); setStartOpen(true); },
      }}
    >
      {children}
      {expertOpen && <ExpertPanel prefill={expertPrefill} onClose={() => setExpertOpen(false)} />}
      {startOpen && <GetStartedWizard prefill={startPrefill} onClose={() => setStartOpen(false)} />}
    </OverlayCtx.Provider>
  );
}

export const useOverlay = () => useContext(OverlayCtx);
