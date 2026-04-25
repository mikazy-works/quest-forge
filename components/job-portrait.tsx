import { getPortraitSpec } from "@/lib/job-portrait";

type JobPortraitProps = {
  jobName: string;
  element: string;
};

function ArchetypeShape({
  archetype,
  primary,
  secondary,
  line
}: {
  archetype: ReturnType<typeof getPortraitSpec>["archetype"];
  primary: string;
  secondary: string;
  line: string;
}) {
  switch (archetype) {
    case "knight":
      return (
        <>
          <path d="M150 92 L212 126 L196 222 L150 258 L104 222 L88 126 Z" fill={primary} fillOpacity="0.32" stroke={line} strokeWidth="4" />
          <path d="M150 110 L186 130 L176 204 L150 224 L124 204 L114 130 Z" fill={secondary} fillOpacity="0.7" />
          <path d="M150 58 L172 96 L150 120 L128 96 Z" fill={secondary} stroke={line} strokeWidth="3" />
          <path d="M150 132 L150 236" stroke={line} strokeWidth="4" />
          <path d="M122 164 L178 164" stroke={line} strokeWidth="4" />
        </>
      );
    case "mage":
      return (
        <>
          <path d="M150 70 L198 110 L178 244 L122 244 L102 110 Z" fill={primary} fillOpacity="0.26" stroke={line} strokeWidth="4" />
          <circle cx="150" cy="118" r="30" fill={secondary} fillOpacity="0.9" stroke={line} strokeWidth="4" />
          <path d="M150 148 L150 238" stroke={line} strokeWidth="4" />
          <path d="M110 198 Q150 172 190 198" fill="none" stroke={line} strokeWidth="4" />
          <path d="M94 90 L114 52 L150 38 L186 52 L206 90" fill="none" stroke={line} strokeWidth="4" />
        </>
      );
    case "rogue":
      return (
        <>
          <path d="M150 64 L204 116 L164 250 L136 250 L96 116 Z" fill={primary} fillOpacity="0.24" stroke={line} strokeWidth="4" />
          <path d="M114 120 Q150 88 186 120" fill="none" stroke={line} strokeWidth="5" />
          <path d="M112 118 L92 198" stroke={line} strokeWidth="4" />
          <path d="M188 118 L208 198" stroke={line} strokeWidth="4" />
          <path d="M132 150 L168 150 L150 226 Z" fill={secondary} fillOpacity="0.92" />
        </>
      );
    case "summoner":
      return (
        <>
          <circle cx="150" cy="156" r="72" fill={primary} fillOpacity="0.24" stroke={line} strokeWidth="4" />
          <circle cx="150" cy="156" r="36" fill={secondary} fillOpacity="0.9" />
          <path d="M150 68 L166 112 L212 112 L176 140 L190 184 L150 158 L110 184 L124 140 L88 112 L134 112 Z" fill="none" stroke={line} strokeWidth="4" />
          <path d="M150 88 L150 224" stroke={line} strokeWidth="3" strokeDasharray="8 8" />
        </>
      );
    case "priest":
      return (
        <>
          <path d="M150 62 Q208 112 192 244 L108 244 Q92 112 150 62 Z" fill={primary} fillOpacity="0.2" stroke={line} strokeWidth="4" />
          <path d="M150 84 L150 210" stroke={line} strokeWidth="4" />
          <path d="M118 128 L182 128" stroke={line} strokeWidth="4" />
          <circle cx="150" cy="92" r="18" fill={secondary} fillOpacity="0.9" />
          <path d="M116 202 Q150 180 184 202" fill="none" stroke={line} strokeWidth="4" />
        </>
      );
    case "vanguard":
    default:
      return (
        <>
          <path d="M150 72 L206 112 L182 250 L118 250 L94 112 Z" fill={primary} fillOpacity="0.24" stroke={line} strokeWidth="4" />
          <path d="M126 132 L174 132 L188 198 L150 228 L112 198 Z" fill={secondary} fillOpacity="0.84" />
          <path d="M104 102 L80 180" stroke={line} strokeWidth="4" />
          <path d="M196 102 L220 180" stroke={line} strokeWidth="4" />
          <path d="M150 84 L150 122" stroke={line} strokeWidth="4" />
        </>
      );
  }
}

export function JobPortrait({ jobName, element }: JobPortraitProps) {
  const { archetype, palette, title } = getPortraitSpec(jobName, element);

  return (
    <svg
      viewBox="0 0 300 320"
      role="img"
      aria-label={title}
      className="job-portrait-svg"
    >
      <defs>
        <radialGradient id={`bg-${element}`} cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor={palette.secondary} stopOpacity="0.38" />
          <stop offset="55%" stopColor={palette.primary} stopOpacity="0.18" />
          <stop offset="100%" stopColor="#08101f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`shape-${element}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.secondary} />
          <stop offset="100%" stopColor={palette.primary} />
        </linearGradient>
        <filter id={`glow-${element}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="0" y="0" width="300" height="320" rx="28" fill="url(#bg-${element})" />
      <circle cx="150" cy="160" r="108" fill={palette.glow} />
      <circle cx="150" cy="156" r="94" fill="none" stroke={palette.line} strokeOpacity="0.18" strokeWidth="2" />
      <circle cx="150" cy="156" r="72" fill="none" stroke={palette.line} strokeOpacity="0.14" strokeWidth="2" />
      <g filter={`url(#glow-${element})`}>
        <ArchetypeShape
          archetype={archetype}
          primary={`url(#shape-${element})`}
          secondary={palette.secondary}
          line={palette.line}
        />
      </g>
      <path d="M72 270 Q150 234 228 270" fill="none" stroke={palette.line} strokeOpacity="0.35" strokeWidth="3" />
      <text x="150" y="292" textAnchor="middle" fill={palette.line} fontSize="18" fontWeight="700" letterSpacing="2">
        {element} ELEMENT
      </text>
    </svg>
  );
}
