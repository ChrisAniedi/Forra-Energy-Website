"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import ExpertPanel from "@/components/overlays/ExpertPanel";
import GetStartedWizard from "@/components/overlays/GetStartedWizard";

interface OverlayApi {
  openExpert: () => void;
  openStart: () => void;
}

const OverlayCtx = createContext<OverlayApi>({ openExpert: () => {}, openStart: () => {} });

/** App-wide access to the two conversion flows. Rendered once in the root layout. */
export function OverlayProvider({ children }: { children: ReactNode }) {
  const [expertOpen, setExpertOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  return (
    <OverlayCtx.Provider value={{ openExpert: () => setExpertOpen(true), openStart: () => setStartOpen(true) }}>
      {children}
      {expertOpen && <ExpertPanel onClose={() => setExpertOpen(false)} />}
      {startOpen && <GetStartedWizard onClose={() => setStartOpen(false)} />}
    </OverlayCtx.Provider>
  );
}

export const useOverlay = () => useContext(OverlayCtx);
