"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** Returns [ref, seen] — seen flips true once the element enters the viewport. */
export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.35 }
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        ob.disconnect();
      }
    }, options);
    ob.observe(el);
    return () => ob.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, seen];
}

/** Locks body scroll while the calling component is mounted (overlays). */
export function useScrollLock(): void {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
}

/** Calls the handler on Escape keydown. */
export function useEscapeKey(onEscape: () => void): void {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onEscape]);
}
