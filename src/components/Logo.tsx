import Link from "next/link";

export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <clipPath id="sharan-mark-clip">
          <circle cx="50" cy="50" r="42" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="42" fill="#fff" />
      <g clipPath="url(#sharan-mark-clip)">
        <circle cx="50" cy="62" r="22" fill="#F2A33A" />
        <path d="M50 64 V34" stroke="#2E9C4F" strokeWidth="5" strokeLinecap="round" />
        <path d="M50 46 C40 46 31 40 29 31 C39 31 47 36 50 46Z" fill="#2E9C4F" />
        <path d="M50 42 C56 32 66 27 75 29 C72 38 62 44 50 42Z" fill="#3DB262" />
        <path d="M0 62 C18 54 34 70 50 62 C66 54 82 70 100 62 V100 H0Z" fill="#2373BE" />
        <path d="M0 68 C18 60 34 76 50 68 C66 60 82 76 100 68" stroke="#fff" strokeWidth="3" fill="none" />
        <path d="M0 74 C18 67 34 82 50 74 C66 67 82 82 100 74 V100 H0Z" fill="#14365C" />
      </g>
      <circle cx="50" cy="50" r="44" fill="none" stroke="#2373BE" strokeWidth="7" />
    </svg>
  );
}

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const light = variant === "light";
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="SHARAN home">
      <LogoMark className="h-11 w-11 shrink-0 transition-transform duration-500 group-hover:rotate-[8deg]" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.45rem] font-extrabold tracking-[0.12em] ${light ? "text-white" : "text-deep"}`}
        >
          SHARAN
        </span>
        <span
          className={`mt-1 hidden font-display text-[0.52rem] font-semibold tracking-[0.18em] sm:block ${light ? "text-river-200" : "text-river"}`}
        >
          SHABELLE RESILIENCE &amp; ACTION NETWORK
        </span>
      </span>
    </Link>
  );
}
