import Image from "next/image";

const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Clients", href: "#clients" },
  { label: "Get in touch", href: "#subscribe" },
];

const services = [
  "Marketing",
  "Customer Services",
  "Business Referral",
  "Client Relationship Management",
];

export function Footer() {
  return (
    <footer className="relative border-t border-hairline">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Image
              src="/brand/stg-lockup-t.png"
              alt="STG Marketing LLC"
              width={300}
              height={168}
              className="h-16 w-auto drop-shadow-[0_0_24px_rgba(74,144,255,0.35)]"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate">
              Helping clients build and implement marketing strategies that
              achieve coordinated activities and control — across the Asia
              Pacific, Middle Eastern and African regions.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.25em] text-slate/70">
              NAVIGATE
            </h4>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-slate transition-colors hover:text-offwhite"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.25em] text-slate/70">
              SERVICES
            </h4>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-slate transition-colors hover:text-offwhite"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rule my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate sm:flex-row">
          <p>
            © {new Date().getFullYear()} STG Marketing LLC. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-xs tracking-[0.2em] text-slate/60">
            MARKETING <span className="text-glow">LLC</span> · STRATEGY · GROWTH ·
            CONTROL
          </p>
        </div>
      </div>
    </footer>
  );
}
