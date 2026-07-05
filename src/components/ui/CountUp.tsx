"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/hooks";

interface CountUpProps {
  to: number;
  dur?: number;
  prefix?: string;
  suffix?: string;
  dp?: number;
}

/** Animated counter that starts when scrolled into view. */
export const CountUp = ({ to, dur = 1600, prefix = "", suffix = "", dp = 0 }: CountUpProps) => {
  const [ref, seen] = useInView<HTMLSpanElement>();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let start: number | undefined;
    let raf: number;
    const step = (t: number) => {
      if (start === undefined) start = t;
      const p = Math.min((t - start) / dur, 1);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, dur]);
  return (
    <span ref={ref}>
      {prefix}
      {v.toLocaleString("en-NG", { maximumFractionDigits: dp, minimumFractionDigits: dp })}
      {suffix}
    </span>
  );
};
