/** Minimal sparkline. Points are 0–100-ish values, drawn left to right. */
export const Spark = ({ pts, color }: { pts: number[]; color: string }) => {
  const d = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * 260} ${56 - p * 0.5}`)
    .join(" ");
  return (
    <svg viewBox="0 0 260 60" className="spark">
      <path d={d} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d={`${d} L 260 60 L 0 60 Z`} fill={color} opacity="0.10" stroke="none" />
    </svg>
  );
};
