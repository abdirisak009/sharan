// Organisation details. Items marked "confirm" are still placeholders in the
// 2026 Organisational Profile and should be updated before launch.
export const site = {
  name: "SHARAN",
  fullName: "Shabelle Resilience & Action Network",
  tagline: "Rooted in the Shabelle. Ready before the shock. Resilient for good.",
  description:
    "SHARAN is a Somali-led, community-rooted organisation helping riverine, rural and displaced communities in South and Central Somalia anticipate climate shocks, recover with dignity and build lasting resilience.",
  url: "https://sharan-somalia.org",
  email: "info@sharan-somalia.org", // confirm
  phone: "+252 61 000 0000", // confirm
  feedbackLine: "+252 61 000 0000", // confirm: community complaints hotline
  address: "Jowhar, Middle Shabelle, Hirshabelle State, Somalia",
  social: {
    x: "https://x.com/SHARAN_Somalia", // confirm
    facebook: "https://facebook.com/SHARANSomalia", // confirm
    linkedin: "https://linkedin.com/company/sharan-somalia", // confirm
  },
};

// `icon` names are mapped to icons in components/Header.tsx.
export const nav = [
  { href: "/about", label: "About", icon: "about", hint: "Story, values and structure" },
  { href: "/programs", label: "Programs", icon: "programs", hint: "Our four strategic pillars" },
  { href: "/projects", label: "Projects", icon: "projects", hint: "Pipeline and work under way" },
  { href: "/where-we-work", label: "Where we work", icon: "map", hint: "Rooted in the Shabelle" },
  { href: "/impact", label: "Impact", icon: "impact", hint: "Strategy 2027–2029" },
  { href: "/news", label: "News", icon: "news", hint: "Updates by category" },
  { href: "/contact", label: "Contact", icon: "contact", hint: "Talk to our team in Jowhar" },
] as const;
