import type { CSSProperties, ReactNode } from "react";

/**
 * Fades and lifts its children in as they scroll into view. Pure CSS
 * (scroll-driven animations, see .reveal in globals.css): no JavaScript, and
 * content stays visible in browsers without support or with reduced motion.
 * `delay` (ms) staggers siblings by starting their animation slightly later.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}) {
  const style = delay ? ({ "--reveal-delay": `${Math.min(delay / 12, 30)}%` } as CSSProperties) : undefined;
  return (
    <Tag className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}
