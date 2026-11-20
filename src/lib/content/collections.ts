// Describes every editable content collection: which page it appears on, and
// the shape of its data. The admin editor renders its forms from these
// descriptions, and the server uses them to validate what an admin saves.
// This module is shared by server and client code, so it holds no data access.

export const ACCENTS = ["river", "sunrise", "growth", "deep"] as const;

// Icon names available in components/ui.tsx.
export const ICON_NAMES = [
  "Accessibility", "Baby", "CloudRain", "GraduationCap", "Handshake", "HeartHandshake", "Landmark", "Leaf",
  "Lightbulb", "Megaphone", "Scale", "Search", "ShieldCheck", "Sparkles", "Stethoscope", "Store", "Tent", "Users",
  "Waves", "Wheat",
] as const;

// Photo keys in src/lib/photos.ts.
export const PHOTO_KEYS = [
  "riverAerial", "farmAfgoi", "floodJowharVillage", "floodFamilies", "idpCamp", "idpWater", "classroom", "clinic",
  "elderCanal", "riverWaterWomen",
] as const;

export const PROJECT_STATUSES = ["Concept", "In discussion", "Active", "Completed"] as const;

type Base = { name: string; label: string; help?: string };

export type Field =
  | (Base & { type: "text" | "textarea" | "number" })
  | (Base & { type: "select"; options: readonly string[] })
  | (Base & { type: "strings" | "numbers" })
  | (Base & { type: "list"; fields: Field[]; titleField?: string })
  | (Base & { type: "group"; fields: Field[] });

export type Collection = {
  key: string;
  label: string;
  page: string;
  description: string;
  root: Field;
};

const text = (name: string, label: string, help?: string): Field => ({ type: "text", name, label, help });
const area = (name: string, label: string, help?: string): Field => ({ type: "textarea", name, label, help });
const accent = (name = "color", label = "Colour"): Field => ({ type: "select", name, label, options: ACCENTS });
const icon = (): Field => ({ type: "select", name: "icon", label: "Icon", options: ICON_NAMES });
const list = (fields: Field[], titleField = "title"): Field => ({ type: "list", name: "", label: "", fields, titleField });
const strings = (): Field => ({ type: "strings", name: "", label: "" });
const titleText = list([text("title", "Title"), area("text", "Text")]);
const hero = (name: string, label: string): Field => ({
  type: "group",
  name,
  label,
  fields: [text("eyebrow", "Small label above the title"), area("title", "Title"), area("intro", "Introduction")],
});

export const collections: Collection[] = [
  // Home
  {
    key: "home",
    label: "Home page text",
    page: "Home",
    description: "Hero headline, introduction and the main paragraphs on the home page.",
    root: {
      type: "group",
      name: "",
      label: "",
      fields: [
        text("badge", "Badge above the headline"),
        text("titleStart", "Headline: first part"),
        text("titleHighlight", "Headline: highlighted part (orange)"),
        text("titleEnd", "Headline: last part"),
        area("intro", "Hero introduction"),
        area("whoWeAreLead", "Who we are: first paragraph"),
        area("whoWeAreBody", "Who we are: second paragraph"),
        area("whyIntro", "Why SHARAN matters: first paragraph"),
        area("whyFunding", "Why SHARAN matters: second paragraph"),
        area("foundingQuestion", "Founding question (quote)"),
        { type: "strings", name: "niche", label: "SHARAN's niche as a local NGO" },
      ],
    },
  },
  {
    key: "keyFacts",
    label: "Key facts",
    page: "Home",
    description: "The four numbers shown under the home page hero.",
    root: list([text("number", "Number"), text("label", "Label"), text("text", "Short text")], "label"),
  },
  { key: "valueChain", label: "Value chain", page: "Home", description: "Four steps from local reality to lasting resilience.", root: titleText },
  { key: "gaps", label: "The gap SHARAN fills", page: "Home", description: "Gaps listed in the 'Why SHARAN matters' section.", root: titleText },

  // About
  {
    key: "nameParts",
    label: "What our name stands for",
    page: "About",
    description: "Shabelle, Resilience, Action, Network.",
    root: list([text("word", "Word"), area("text", "Meaning"), accent()], "word"),
  },
  { key: "objectives", label: "Core objectives", page: "About", description: "The organisation's core objectives.", root: strings() },
  {
    key: "values",
    label: "Core values (S-H-A-R-A-N)",
    page: "About & Home",
    description: "The six values that spell the name.",
    root: list([text("letter", "Letter"), text("title", "Title"), area("text", "Text")]),
  },
  {
    key: "workingMethods",
    label: "Working methods",
    page: "About",
    description: "Six working methods.",
    root: list([text("title", "Title"), area("text", "Text"), icon()]),
  },
  { key: "lenses", label: "Cross-cutting lenses", page: "About", description: "Lenses applied to all work.", root: titleText },
  {
    key: "orgStructure",
    label: "Organisational structure",
    page: "About",
    description: "The governance chart: General Assembly, Board, Executive Director, Secretariat units and field offices.",
    root: {
      type: "group",
      name: "",
      label: "",
      fields: [
        text("heading", "Section title"),
        area("intro", "Introduction"),
        { type: "group", name: "assembly", label: "General Assembly", fields: [text("title", "Title"), area("text", "Responsibility")] },
        { type: "group", name: "board", label: "Board", fields: [text("title", "Title"), area("text", "Responsibility")] },
        { type: "group", name: "director", label: "Executive Director", fields: [text("title", "Title"), area("text", "Responsibility")] },
        text("secretariatLabel", "Secretariat label"),
        { type: "list", name: "units", label: "Secretariat units", titleField: "title", fields: [text("title", "Unit"), area("text", "What it does")] },
        { type: "group", name: "field", label: "Field level", fields: [text("title", "Title"), area("text", "Responsibility")] },
        area("boardPrinciple", "Board composition principle"),
      ],
    },
  },
  {
    key: "team",
    label: "Founding team",
    page: "About",
    description: "Founding members and their experience.",
    root: list([text("name", "Name"), text("initials", "Initials"), text("role", "Role"), area("bio", "Experience")], "name"),
  },
  {
    key: "groups",
    label: "Prioritised groups",
    page: "About & Home",
    description: "Groups SHARAN gives priority to.",
    root: list([text("title", "Group"), area("text", "Why they are prioritised"), icon()]),
  },

  // Programs
  {
    key: "pillars",
    label: "Strategic pillars",
    page: "Programs",
    description: "The four pillars, their activities and SDG alignment. Also used on Home, Impact and the footer.",
    root: list([
      text("title", "Title"),
      text("short", "Short title"),
      { type: "number", name: "number", label: "Number" },
      text("slug", "Link anchor", "Lowercase, no spaces. Changing it breaks existing links to this pillar."),
      text("outcome", "Outcome"),
      accent(),
      area("summary", "Summary"),
      { type: "strings", name: "activities", label: "What we do" },
      text("alignment", "Aligned with (clusters)"),
      { type: "numbers", name: "sdgs", label: "SDGs", help: "Numbers separated by commas, e.g. 2, 13, 15" },
    ]),
  },
  { key: "deliveryCycle", label: "Delivery cycle", page: "Programs", description: "The five-stage programme cycle.", root: titleText },
  {
    key: "capabilities",
    label: "Technical capabilities",
    page: "Programs",
    description: "Methods and deliverables partners can assess.",
    root: list([text("title", "Capability"), area("how", "How SHARAN works"), area("deliverables", "Typical deliverables"), icon()]),
  },
  { key: "engagementFormats", label: "Typical engagements", page: "Programs", description: "How partners work with us.", root: strings() },

  // Projects
  {
    key: "projects",
    label: "Projects",
    page: "Projects",
    description: "Projects in the pipeline and under way. Keep each status honest: concepts are not funded work.",
    root: list([
      text("title", "Project title"),
      { type: "select", name: "status", label: "Status", options: PROJECT_STATUSES },
      text("pillar", "Pillar"),
      text("location", "Location"),
      text("partner", "Partner"),
      text("period", "Period", "e.g. 2027–2028. Leave empty if not set yet."),
      area("summary", "Summary"),
      { type: "select", name: "photo", label: "Photo", options: PHOTO_KEYS },
    ]),
  },

  // Where we work
  {
    key: "regions",
    label: "Geographic phases",
    page: "Where we work",
    description: "Phase 1, 2 and 3 regions and districts.",
    root: list(
      [
        text("phase", "Phase"),
        text("label", "Label"),
        text("regions", "Regions"),
        { type: "strings", name: "districts", label: "Districts" },
        area("focus", "Focus"),
        accent(),
      ],
      "phase",
    ),
  },
  { key: "principles", label: "Coverage principles", page: "Where we work", description: "How we decide where and how to work.", root: titleText },
  {
    key: "helix",
    label: "Quadruple Helix",
    page: "Where we work",
    description: "The four groups SHARAN connects.",
    root: list([text("title", "Title"), area("text", "Text"), icon()]),
  },

  // Impact
  {
    key: "strategicDirections",
    label: "Strategic direction 2027–2029",
    page: "Impact",
    description: "Build, Deliver, Connect: goals and outcomes by 2029.",
    root: list(
      [
        text("name", "Name"),
        text("subtitle", "Subtitle"),
        accent(),
        { type: "list", name: "goals", label: "Goals", titleField: "goal", fields: [area("goal", "Goal"), area("outcome", "Key outcome by 2029")] },
      ],
      "name",
    ),
  },
  { key: "qualityGates", label: "Quality gates", page: "Impact", description: "Four quality gates on every programme.", root: titleText },
  {
    key: "alignment",
    label: "Strategic alignment",
    page: "Impact",
    description: "From village to global commitments.",
    root: list([text("level", "Level"), area("frameworks", "Frameworks"), area("contribution", "How SHARAN contributes")], "level"),
  },
  {
    key: "resourcing",
    label: "Sustainable resourcing",
    page: "Impact",
    description: "Funding sources and approach.",
    root: list([text("source", "Source"), area("approach", "Approach")], "source"),
  },

  // Accountability
  {
    key: "chsCommitments",
    label: "CHS commitments",
    page: "Accountability",
    description: "The nine Core Humanitarian Standard commitments.",
    root: list([area("right", "People and communities affected by crisis…"), area("practice", "SHARAN's practical commitment")], "right"),
  },
  { key: "protection", label: "Protection of vulnerable groups", page: "Accountability", description: "Safeguarding and protection.", root: titleText },
  { key: "systems", label: "Operational systems", page: "Accountability", description: "Controls partners can trust.", root: titleText },
  {
    key: "promises",
    label: "Promise of accountability",
    page: "Accountability",
    description: "Our promises to communities, authorities, partners and ourselves.",
    root: list([text("to", "To"), area("text", "Promise")], "to"),
  },

  // Get involved
  {
    key: "partnerGroups",
    label: "Partnership proposition",
    page: "Get involved",
    description: "Where SHARAN adds distinctive value for each partner group.",
    root: list([area("group", "Partner group"), area("value", "SHARAN's contribution")], "group"),
  },
  { key: "advantages", label: "Competitive advantage", page: "Get involved", description: "Why partner with SHARAN.", root: strings() },
  {
    key: "modalities",
    label: "Engagement modalities",
    page: "Get involved",
    description: "Lead, co-lead, implement, assess, convene.",
    root: list([text("title", "Title"), text("text", "Description")]),
  },
  { key: "roster", label: "Specialist roster", page: "Get involved", description: "Expertise we recruit for.", root: strings() },

  // Every page
  {
    key: "pages",
    label: "Page headers",
    page: "All pages",
    description: "The title and introduction at the top of each page.",
    root: {
      type: "group",
      name: "",
      label: "",
      fields: [
        hero("about", "About"),
        hero("programs", "Programs"),
        hero("projects", "Projects"),
        hero("whereWeWork", "Where we work"),
        hero("impact", "Impact"),
        hero("accountability", "Accountability"),
        hero("getInvolved", "Get involved"),
        hero("news", "News"),
        hero("contact", "Contact"),
      ],
    },
  },
  {
    key: "cta",
    label: "Partner call-to-action",
    page: "All pages",
    description: "The 'Partner with SHARAN' band near the bottom of each page.",
    root: { type: "group", name: "", label: "", fields: [text("eyebrow", "Small label"), area("title", "Title"), area("text", "Text")] },
  },
];

export function getCollection(key: string) {
  return collections.find((c) => c.key === key);
}

/**
 * Cleans a value submitted from the admin editor so it matches the field's
 * shape: unknown keys are dropped, text is trimmed and length-limited, numbers
 * are parsed and select values must be one of the options. Throws on bad input.
 */
export function sanitize(field: Field, value: unknown, path = ""): unknown {
  const where = path || "content";
  // A field added after the content was first saved starts out empty.
  if (value === undefined || value === null) value = emptyValue(field);
  switch (field.type) {
    case "text":
    case "textarea": {
      if (typeof value !== "string") throw new Error(`${where} must be text`);
      const v = value.trim();
      if (v.length > 5000) throw new Error(`${where} is too long`);
      return v;
    }
    case "number": {
      const n = typeof value === "number" ? value : Number(value);
      if (!Number.isFinite(n)) throw new Error(`${where} must be a number`);
      return n;
    }
    case "select":
      if (typeof value !== "string" || !field.options.includes(value)) throw new Error(`${where} has an invalid choice`);
      return value;
    case "strings":
      if (!Array.isArray(value)) throw new Error(`${where} must be a list`);
      return value.map((v, i) => sanitize({ type: "textarea", name: "", label: "" }, v, `${where}[${i + 1}]`)).filter((v) => v !== "");
    case "numbers":
      if (!Array.isArray(value)) throw new Error(`${where} must be a list of numbers`);
      return value.map((v, i) => sanitize({ type: "number", name: "", label: "" }, v, `${where}[${i + 1}]`));
    case "list":
      if (!Array.isArray(value)) throw new Error(`${where} must be a list`);
      if (value.length > 200) throw new Error(`${where} has too many items`);
      return value.map((item, i) => sanitize({ ...field, type: "group" }, item, `${where} item ${i + 1}`));
    case "group": {
      if (typeof value !== "object" || value === null || Array.isArray(value)) throw new Error(`${where} must be an object`);
      const obj = value as Record<string, unknown>;
      return Object.fromEntries(
        field.fields.map((f) => [f.name, sanitize(f, obj[f.name], path ? `${path} › ${f.label}` : f.label)]),
      );
    }
  }
}

/** An empty value of the right shape, used when an admin adds a new item. */
export function emptyValue(field: Field): unknown {
  switch (field.type) {
    case "text":
    case "textarea":
      return "";
    case "number":
      return 0;
    case "select":
      return field.options[0];
    case "strings":
    case "numbers":
    case "list":
      return [];
    case "group":
      return Object.fromEntries(field.fields.map((f) => [f.name, emptyValue(f)]));
  }
}
