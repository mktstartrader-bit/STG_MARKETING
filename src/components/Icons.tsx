import type { SVGProps } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

/* The 4-point spark from the STG mark */
export function Spark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M12 0.5 C12.7 6.6 17.4 11.3 23.5 12 C17.4 12.7 12.7 17.4 12 23.5 C11.3 17.4 6.6 12.7 0.5 12 C6.6 11.3 11.3 6.6 12 0.5 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Megaphone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l3.5 4V6L6 10H4a1 1 0 0 0-1 1Z" />
      <path d="M9.5 6 18 3v18l-8.5-3" />
      <path d="M18 8.5a3.5 3.5 0 0 1 0 7" />
    </svg>
  );
}

export function Headset(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M20 19v.5a3 3 0 0 1-3 3h-4" />
    </svg>
  );
}

export function Handshake(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.6-4.6" />
      <path d="M3 8 7 4l5 3 4-3 5 4" />
      <path d="M3 8v6l4 4 2.5-2.5" />
      <path d="M12 7 8.5 10.5a1.8 1.8 0 0 0 2.5 2.5L14 10" />
      <path d="M21 8v6" />
    </svg>
  );
}

export function Users(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-1a6 6 0 0 1 12 0v1" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8" />
      <path d="M17 14.5a6 6 0 0 1 4 5.5v0" />
    </svg>
  );
}

export function Check(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Target(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function Gauge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 15a9 9 0 1 1 17 0" />
      <path d="m12 12 4-2.5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function Compass(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </svg>
  );
}

export function Mail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}
