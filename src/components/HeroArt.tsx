import { CloudRain, MapPin, ShieldCheck, Sprout } from "lucide-react";

/** Large animated take on the SHARAN mark: sunrise, sprout and the Shabelle. */
export function HeroArt() {
  const wave = (y: number) =>
    `M0 ${y} C60 ${y - 14} 120 ${y + 14} 180 ${y} C240 ${y - 14} 300 ${y + 14} 360 ${y} C420 ${y - 14} 480 ${y + 14} 540 ${y} C600 ${y - 14} 660 ${y + 14} 720 ${y} V420 H0Z`;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[520px]">
      <div className="absolute inset-0 rounded-full bg-river/30 blur-3xl" aria-hidden="true" />
      <svg viewBox="0 0 360 360" className="relative h-full w-full drop-shadow-2xl" aria-hidden="true">
        <defs>
          <clipPath id="hero-clip">
            <circle cx="180" cy="180" r="160" />
          </clipPath>
          <radialGradient id="sun" cx="0.5" cy="0.45" r="0.6">
            <stop offset="0" stopColor="#FFD08A" />
            <stop offset="0.6" stopColor="#F2A33A" />
            <stop offset="1" stopColor="#E08A1E" />
          </radialGradient>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1c5f9f" />
            <stop offset="0.7" stopColor="#4890d1" />
            <stop offset="1" stopColor="#fde8c8" />
          </linearGradient>
        </defs>
        <g clipPath="url(#hero-clip)">
          <rect width="360" height="360" fill="url(#sky)" />
          {[...Array(14)].map((_, i) => (
            <rect
              key={i}
              x="178"
              y="40"
              width="4"
              height="190"
              fill="#FFE2B0"
              opacity="0.18"
              transform={`rotate(${-78 + i * 12} 180 230)`}
            />
          ))}
          <circle cx="180" cy="232" r="86" fill="url(#sun)" />
          {/* Sprout */}
          <g className="origin-[180px_236px] animate-[float_7s_ease-in-out_infinite]">
            <path d="M180 240 V128" stroke="#237d3e" strokeWidth="12" strokeLinecap="round" />
            <path d="M180 180 C146 182 112 160 104 126 C142 124 172 144 180 180Z" fill="#2E9C4F" />
            <path d="M180 162 C200 124 236 104 270 110 C260 144 224 168 180 162Z" fill="#3DB262" />
            <path d="M180 180 C150 172 126 152 116 132" stroke="#237d3e" strokeWidth="2" fill="none" opacity="0.6" />
          </g>
          {/* River */}
          <g>
            <g className="animate-wave-slow">
              <path d={wave(236)} fill="#2373BE" />
            </g>
            <g className="animate-wave">
              <path d={wave(256)} fill="none" stroke="#fff" strokeWidth="7" />
            </g>
            <g className="animate-wave-slow [animation-direction:reverse]">
              <path d={wave(278)} fill="#14365C" />
            </g>
          </g>
        </g>
        <circle cx="180" cy="180" r="166" fill="none" stroke="#2373BE" strokeWidth="14" />
        <circle cx="180" cy="180" r="176" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="2 8" />
      </svg>

      {/* Floating fact chips */}
      <div className="absolute -left-2 top-[14%] flex animate-float items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl sm:-left-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sunrise-50 text-sunrise-600">
          <MapPin className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-xs font-semibold text-muted">Headquarters</span>
          <span className="block font-display text-sm font-extrabold text-deep">Jowhar, Hirshabelle</span>
        </span>
      </div>
      <div className="absolute -right-2 top-[42%] hidden sm:flex animate-float items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl [animation-delay:1.5s] sm:-right-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-river-50 text-river">
          <CloudRain className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-xs font-semibold text-muted">Act early</span>
          <span className="block font-display text-sm font-extrabold text-deep">Before the shock</span>
        </span>
      </div>
      <div className="absolute bottom-[6%] left-[8%] flex animate-float items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl [animation-delay:3s]">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-growth-50 text-growth">
          <Sprout className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-xs font-semibold text-muted">Stay for</span>
          <span className="block font-display text-sm font-extrabold text-deep">Lasting resilience</span>
        </span>
      </div>
      <div className="absolute bottom-[18%] right-[2%] hidden animate-float items-center gap-2 rounded-full bg-deep px-4 py-2 text-xs font-bold text-white shadow-xl [animation-delay:2.2s] sm:flex">
        <ShieldCheck className="h-4 w-4 text-sunrise" /> CHS-aligned
      </div>
    </div>
  );
}
