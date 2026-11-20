import Link from "next/link";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "./ui";
import { NewsletterForm } from "./Forms";
import { site } from "@/lib/site";
import { getContent } from "@/lib/content";

const social = [
  {
    label: "Facebook",
    href: site.social.facebook,
    path: "M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9H16l.5-4h-3V8.9c0-.6.3-.9 1-.9Z",
  },
  {
    label: "X",
    href: site.social.x,
    path: "M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5Z",
  },
  {
    label: "LinkedIn",
    href: site.social.linkedin,
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4V9.5Z",
  },
];

export async function Footer() {
  const pillars = await getContent("pillars");
  return (
    <footer className="relative overflow-hidden bg-deep-950 text-river-100">
      <div className="brand-rule h-1.5 w-full" />
      <div className="bg-dots-light absolute inset-0 opacity-60" aria-hidden="true" />
      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-6 max-w-sm leading-relaxed text-river-200">
              A Somali-led, community-rooted organisation helping riverine, rural and displaced communities anticipate
              climate shocks, recover with dignity and build lasting resilience.
            </p>
            <p className="mt-6 font-display text-sm font-semibold italic text-sunrise">{site.tagline}</p>
            <div className="mt-6 flex gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-river"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-widest !text-white">Organisation</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  ["/about", "About us"],
                  ["/projects", "Projects"],
                  ["/where-we-work", "Where we work"],
                  ["/impact", "Impact & strategy"],
                  ["/accountability", "Accountability"],
                  ["/news", "News & insights"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="transition hover:text-sunrise">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-widest !text-white">Programs</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {pillars.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/programs#${p.slug}`} className="transition hover:text-sunrise">
                      {p.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-widest !text-white">Get involved</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  ["/get-involved#partner", "Partner with us"],
                  ["/get-involved#donate", "Donate"],
                  ["/get-involved#volunteer", "Volunteer"],
                  ["/get-involved#careers", "Careers"],
                  ["/contact", "Contact"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="transition hover:text-sunrise">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest !text-white">Stay informed</h3>
            <p className="mt-5 text-sm text-river-200">Updates from the Shabelle, a few times a year.</p>
            <NewsletterForm />
            <ul className="mt-8 space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sunrise" /> {site.address}
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sunrise" />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sunrise" />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 rounded-2xl bg-white/5 p-5 text-sm ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 shrink-0 text-sunrise" />
            Have a concern or complaint about our work? You can report it safely and confidentially.
          </p>
          <Link href="/accountability#feedback" className="shrink-0 font-bold text-sunrise hover:text-white">
            Report a concern →
          </Link>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-river-300 sm:flex-row sm:justify-between">
          <p>
            © {2026} {site.fullName} ({site.name}). All rights reserved.
          </p>
          <p>Regional names are used for orientation only and do not imply a position on administrative or political status.</p>
        </div>
      </Container>
    </footer>
  );
}
