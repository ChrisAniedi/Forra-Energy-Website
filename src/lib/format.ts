/** Format a number as Naira, e.g. 8500000 -> "₦8,500,000". */
export const fmtN = (n: number): string => "₦" + Math.round(n).toLocaleString("en-NG");
