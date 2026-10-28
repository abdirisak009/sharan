export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Announcement" | "Insight" | "Strategy" | "Accountability";
  date: string; // ISO
  readMinutes: number;
  accent: "river" | "sunrise" | "growth" | "deep";
  body: { heading?: string; paragraphs: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "introducing-sharan",
    title: "Introducing SHARAN: a local first responder with a long-term mandate",
    excerpt:
      "Born on the banks of the Shabelle, SHARAN brings early action, essential services, livelihoods and peace together in one locally owned approach.",
    category: "Announcement",
    date: "2026-10-01",
    readMinutes: 4,
    accent: "river",
    body: [
      {
        paragraphs: [
          "SHARAN was born on the banks of the Shabelle. Its founders are Somali professionals in humanitarian response, education, research and community development who watched the same villages around Jowhar flood one season and go hungry the next, while support arrived late and left little behind.",
          "They asked a simple question: what if the people closest to the river led the response, before, during and after each shock? SHARAN is their answer, combining frontline response with schools, clinics, irrigation, skills and peace.",
        ],
      },
      {
        heading: "What our name stands for",
        paragraphs: [
          "Shabelle is where we are rooted. Resilience is the change we work for. Action is how we work: early, practical and accountable. Network is our method: we work through communities, local organisations and partners rather than around them.",
        ],
      },
      {
        heading: "Headquartered where the need is",
        paragraphs: [
          "SHARAN is headquartered in Jowhar, the capital of Hirshabelle State, inside the communities it serves. Our initial operational regions are Middle Shabelle, Hiraan and Lower Shabelle, with a mandate that covers South and Central Somalia.",
        ],
      },
    ],
  },
  {
    slug: "early-warning-needs-early-action",
    title: "Why early warning is not enough without early action",
    excerpt:
      "Forecasts for the Shabelle exist. What is often missing are community triggers, plans and resources to act on them before the water rises.",
    category: "Insight",
    date: "2026-09-18",
    readMinutes: 5,
    accent: "sunrise",
    body: [
      {
        paragraphs: [
          "Along the Shabelle, a crisis rarely arrives alone. Flooding submerges IDP shelters and farmland, damages latrines and raises cholera risk. The next season, failed rains dry the river and push families into hunger and displacement.",
          "Forecasts exist, but in many villages the community triggers, contingency plans and resources needed to act on them are weak. Warnings arrive, and families are left to decide alone what to do.",
        ],
      },
      {
        heading: "From forecast to locally owned action",
        paragraphs: [
          "SHARAN works with village committees, river and water-user groups, women's and youth groups and elders to agree in advance what will trigger action, who will act and with what resources.",
          "By 2029 we aim for every target village to have a functioning early warning committee and a contingency plan, and for SHARAN to hold a modest emergency reserve so it can respond to floods and drought before external funds arrive.",
        ],
      },
    ],
  },
  {
    slug: "strategic-direction-2027-2029",
    title: "Build, Deliver, Connect: our strategic direction for 2027–2029",
    excerpt:
      "Our first three years focus on organisational credibility and proven delivery, not visibility alone. Here is what we commit to achieve by 2029.",
    category: "Strategy",
    date: "2026-08-27",
    readMinutes: 6,
    accent: "growth",
    body: [
      {
        paragraphs: [
          "SHARAN's strategy for 2027–2029 rests on three directions: BUILD a trusted non-profit organisation, DELIVER locally led resilience, and CONNECT communities to partners and decision-makers.",
        ],
      },
      {
        heading: "Build",
        paragraphs: [
          "We will complete federal and state registration, adopt board-approved finance, HR, procurement, safeguarding and MEAL policies, achieve clean annual external audits, and build a core team with women in at least 30% of leadership roles.",
        ],
      },
      {
        heading: "Deliver",
        paragraphs: [
          "We will deliver integrated programmes across our four pillars in Middle Shabelle, establish community early warning and anticipatory action, and expand in phases to Hiraan and Lower Shabelle.",
        ],
      },
      {
        heading: "Connect",
        paragraphs: [
          "We will become an active partner in humanitarian coordination, diversify our funding so that no single donor provides more than half our income, and publish assessments and learning briefs that are used in district and state planning.",
        ],
      },
    ],
  },
  {
    slug: "our-promise-of-accountability",
    title: "Our promise of accountability to communities and partners",
    excerpt:
      "How SHARAN applies the nine commitments of the Core Humanitarian Standard, and how anyone can raise a concern safely.",
    category: "Accountability",
    date: "2026-08-05",
    readMinutes: 4,
    accent: "deep",
    body: [
      {
        paragraphs: [
          "SHARAN places people affected by crisis at the centre of everything it does. Our programmes follow the Core Humanitarian Standard, the Humanitarian Charter and Sphere Minimum Standards, and the humanitarian principles of humanity, neutrality, impartiality and independence.",
        ],
      },
      {
        heading: "Feedback that is answered",
        paragraphs: [
          "Communities can raise concerns through a hotline, help desks, community meetings and complaint boxes. Every complaint is logged, answered and reported, and feedback is reviewed regularly so programmes can adapt.",
        ],
      },
      {
        heading: "Zero tolerance",
        paragraphs: [
          "We have zero tolerance for fraud, corruption, sexual exploitation and abuse. Our safeguarding policy is aligned with the IASC Core Principles, with trained focal points, safe recruitment and survivor-centred referral.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
