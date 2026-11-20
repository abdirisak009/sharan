// Schematic map of the Shabelle corridor. Positions are projected from
// approximate coordinates (x = (lon - 42) * 100, y = (5.5 - lat) * 100).
const places = [
  { name: "Beledweyne", x: 320, y: 76, phase: 2 },
  { name: "Bulo Burte", x: 357, y: 165, phase: 2 },
  { name: "Mahaday", x: 366, y: 248, phase: 1 },
  { name: "Jowhar", x: 350, y: 276, phase: 1, hq: true },
  { name: "Adale", x: 430, y: 270, phase: 1 },
  { name: "Balcad", x: 340, y: 316, phase: 1 },
  { name: "Afgooye", x: 305, y: 336, phase: 2 },
  { name: "Mogadishu", x: 340, y: 352, phase: 3 },
  { name: "Qoryooley", x: 248, y: 368, phase: 2 },
  { name: "Marka", x: 280, y: 388, phase: 2 },
];

// Labels drawn to the left of their dot so they do not collide with neighbours.
const labelLeft = new Set(["Jowhar", "Afgooye", "Qoryooley"]);

const phaseColor = { 1: "#2373BE", 2: "#2E9C4F", 3: "#F2A33A" } as const;

export function ShabelleMap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 650 600" className={className} role="img" aria-labelledby="map-title">
      <title id="map-title">
        Schematic map of the Shabelle River corridor showing SHARAN&apos;s phased areas of work, with headquarters in Jowhar.
      </title>
      <defs>
        <linearGradient id="ocean" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d6e7f7" />
          <stop offset="1" stopColor="#aecfee" />
        </linearGradient>
        <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fef6ea" />
          <stop offset="1" stopColor="#faf7f2" />
        </linearGradient>
        <pattern id="map-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#14365C" opacity="0.08" />
        </pattern>
      </defs>
      <rect width="650" height="600" fill="url(#land)" />
      <rect width="650" height="600" fill="url(#map-dots)" />
      {/* Indian Ocean */}
      <path
        d="M-10 630 L54 590 C110 540 170 480 230 430 L277 392 C300 375 318 362 336 354 C370 330 405 302 435 282 C480 245 515 205 540 170 C580 115 615 65 660 10 L660 610 L-10 610Z"
        fill="url(#ocean)"
      />
      <path
        d="M-10 630 L54 590 C110 540 170 480 230 430 L277 392 C300 375 318 362 336 354 C370 330 405 302 435 282 C480 245 515 205 540 170 C580 115 615 65 660 10"
        fill="none"
        stroke="#7bb1e2"
        strokeWidth="2"
      />
      <text x="520" y="430" fill="#4890d1" fontSize="18" fontStyle="italic" fontFamily="var(--font-display)" opacity="0.8">
        Indian Ocean
      </text>

      {/* Phase 3 halo */}
      <ellipse cx="300" cy="330" rx="250" ry="230" fill="#F2A33A" opacity="0.06" />
      {/* Phase 2 corridor */}
      <path
        d="M300 40 C340 70 370 130 375 200 C380 260 370 330 320 360 C280 385 230 400 200 420"
        fill="none"
        stroke="#2E9C4F"
        strokeOpacity="0.12"
        strokeWidth="90"
        strokeLinecap="round"
      />
      {/* Phase 1 core */}
      <ellipse cx="370" cy="285" rx="85" ry="58" fill="#2373BE" opacity="0.14" />

      {/* Shabelle River */}
      <path
        id="shabelle"
        d="M290 -5 C300 30 315 55 320 76 C330 115 352 135 357 165 C362 200 368 230 358 258 C352 275 352 290 345 305 C338 318 332 328 312 336 C290 345 268 360 248 368 C215 385 190 405 160 425 C130 445 105 465 85 495"
        fill="none"
        stroke="#2373BE"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M290 -5 C300 30 315 55 320 76 C330 115 352 135 357 165 C362 200 368 230 358 258 C352 275 352 290 345 305 C338 318 332 328 312 336 C290 345 268 360 248 368 C215 385 190 405 160 425 C130 445 105 465 85 495"
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
        strokeDasharray="6 10"
        strokeLinecap="round"
        className="animate-dash"
      />
      <text fill="#1c5f9f" fontSize="15" fontWeight="700" fontFamily="var(--font-display)" letterSpacing="3">
        <textPath href="#shabelle" startOffset="72%">
          SHABELLE RIVER
        </textPath>
      </text>

      {/* Region labels */}
      {[
        { t: "HIRAAN", x: 230, y: 120 },
        { t: "MIDDLE SHABELLE", x: 395, y: 215 },
        { t: "LOWER SHABELLE", x: 40, y: 320 },
        { t: "BANADIR", x: 365, y: 375 },
      ].map((r) => (
        <text
          key={r.t}
          x={r.x}
          y={r.y}
          fill="#14365C"
          opacity="0.45"
          fontSize="12"
          fontWeight="800"
          letterSpacing="2.5"
          fontFamily="var(--font-display)"
        >
          {r.t}
        </text>
      ))}

      {places.map((p) => (
        <g key={p.name}>
          {p.hq && (
            <circle cx={p.x} cy={p.y} r="10" fill="#F2A33A" opacity="0.5">
              <animate attributeName="r" values="10;26;10" dur="2.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0;0.55" dur="2.6s" repeatCount="indefinite" />
            </circle>
          )}
          <circle
            cx={p.x}
            cy={p.y}
            r={p.hq ? 9 : 6}
            fill={p.hq ? "#14365C" : phaseColor[p.phase as 1 | 2 | 3]}
            stroke="#fff"
            strokeWidth="3"
          />
          <text
            x={p.x + (labelLeft.has(p.name) ? -14 : 14)}
            y={p.y + 5}
            textAnchor={labelLeft.has(p.name) ? "end" : "start"}
            fill="#14365C"
            fontSize={p.hq ? 17 : 13}
            fontWeight={p.hq ? 800 : 600}
            fontFamily="var(--font-display)"
            paintOrder="stroke"
            stroke="#faf7f2"
            strokeWidth="4"
          >
            {p.name}
            {p.hq ? " · HQ" : ""}
          </text>
        </g>
      ))}

      {/* Compass */}
      <g transform="translate(590 70)">
        <circle r="24" fill="#fff" stroke="#d6e7f7" />
        <path d="M0 -16 L6 4 L0 0 L-6 4Z" fill="#14365C" />
        <text y="-28" textAnchor="middle" fontSize="11" fontWeight="800" fill="#14365C">
          N
        </text>
      </g>
    </svg>
  );
}

export function MapLegend() {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-deep">
      <li className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-deep ring-4 ring-sunrise/40" /> Headquarters
      </li>
      <li className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-river" /> Phase 1 · Core
      </li>
      <li className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-growth" /> Phase 2 · Expansion
      </li>
      <li className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-sunrise" /> Phase 3 · Wider reach
      </li>
    </ul>
  );
}
