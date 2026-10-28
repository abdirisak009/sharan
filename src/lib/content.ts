// Content drawn from the SHARAN Organisational Profile 2026.

export type Pillar = {
  slug: string;
  number: number;
  title: string;
  short: string;
  outcome: string;
  color: "river" | "sunrise" | "growth" | "deep";
  summary: string;
  activities: string[];
  alignment: string;
  sdgs: number[];
};

export const pillars: Pillar[] = [
  {
    slug: "climate-resilience",
    number: 1,
    title: "Climate Resilience & Sustainable Livelihoods",
    short: "Climate Resilience & Livelihoods",
    outcome: "Productive, climate-ready livelihoods",
    color: "growth",
    summary:
      "We help farming and riverine households protect what they have and grow what they need, by restoring the irrigation and river infrastructure that the Shabelle economy depends on.",
    activities: [
      "Rehabilitation of irrigation canals, embankments and water-control structures",
      "Support to smallholder farmers: inputs, climate-smart agriculture, cooperatives and market linkages",
      "Ecosystem-based adaptation, reforestation and riverbank stabilisation",
      "Cash-for-work that builds productive community assets",
    ],
    alignment: "Food Security, Early Recovery",
    sdgs: [2, 13, 15],
  },
  {
    slug: "preparedness-response",
    number: 2,
    title: "Disaster Preparedness, Emergency Response & Durable Solutions",
    short: "Preparedness, Response & Solutions",
    outcome: "Lives saved, durable solutions for IDPs",
    color: "river",
    summary:
      "We turn early warning into early action, respond fast when floods or drought strike, and stay to help displaced families find safe and dignified homes.",
    activities: [
      "Community early warning, contingency planning and anticipatory action",
      "Rapid needs assessments and emergency response: food, shelter, NFIs, WASH and cash",
      "Voluntary resettlement, durable shelter and land tenure for IDPs",
      "Integration of displaced families with host communities",
    ],
    alignment: "WASH, Shelter, CCCM, Protection",
    sdgs: [1, 11, 13],
  },
  {
    slug: "education-health-skills",
    number: 3,
    title: "Human Capital Development: Education, Health & Skills",
    short: "Education, Health & Skills",
    outcome: "Children learning, healthy, skilled youth",
    color: "sunrise",
    summary:
      "We bring schools, clinics and skills training to villages that have never had them, so that children learn, mothers and babies are healthy and young people find work.",
    activities: [
      "Schools in villages without education access; Education in Emergencies and Alternative Basic Education",
      "Teacher training and training of trainers",
      "Health centres and clinics in remote villages: maternal and child health, immunisation and nutrition outreach",
      "TVET centres, vocational and entrepreneurship training",
    ],
    alignment: "Education, Health, Nutrition, Livelihoods",
    sdgs: [3, 4, 8],
  },
  {
    slug: "peacebuilding",
    number: 4,
    title: "Peacebuilding, Social Cohesion & Local Governance",
    short: "Peace, Cohesion & Governance",
    outcome: "Peaceful, inclusive communities",
    color: "deep",
    summary:
      "Without peace, gains do not last. We bring elders, religious leaders, women and youth together to resolve disputes over land and water and to shape local decisions.",
    activities: [
      "Peace awareness and community dialogue",
      "Reconciliation with elders, religious leaders, women and youth",
      "Conflict-sensitive management of land and water; local peace committees and conflict early warning",
      "Women's and youth participation in local governance",
    ],
    alignment: "Protection",
    sdgs: [5, 16],
  },
];

export const valueChain = [
  {
    title: "Local reality",
    text: "Community priorities, lived risk and local knowledge of the river and land.",
  },
  {
    title: "Early action",
    text: "Early warning, preparedness and timely response before and during shocks.",
  },
  {
    title: "Recovery and services",
    text: "Education, health, livelihoods and durable solutions after the shock.",
  },
  {
    title: "Lasting resilience",
    text: "Stronger communities, local organisations and social cohesion that withstand the next shock.",
  },
];

export const values = [
  {
    letter: "S",
    title: "Solidarity",
    text: "We stand with communities before, during and after crises, and stay when others leave.",
  },
  {
    letter: "H",
    title: "Humanity and dignity",
    text: "Every person is of equal worth; assistance protects dignity, not only needs.",
  },
  {
    letter: "A",
    title: "Accountability and integrity",
    text: "We are honest and transparent with communities, authorities and partners, with zero tolerance for fraud, corruption, exploitation and abuse.",
  },
  {
    letter: "R",
    title: "Respect and inclusion",
    text: "We respect local culture, faith and knowledge; women, youth, minorities, IDPs and persons with disabilities are agents of change.",
  },
  {
    letter: "A",
    title: "Action and learning",
    text: "We act early and practically, learn from evidence and community feedback, and improve continuously.",
  },
  {
    letter: "N",
    title: "Neutrality and impartiality",
    text: "Assistance is based on need alone, never on clan, political or other affiliation.",
  },
];

export const objectives = [
  "Strengthen community preparedness and deliver timely, principled response to floods, droughts and other emergencies.",
  "Build climate-resilient livelihoods through irrigation rehabilitation, smallholder support and natural resource management.",
  "Expand equitable access to education, primary health care and market-relevant skills in underserved villages.",
  "Support displaced families to achieve safe and dignified durable solutions.",
  "Promote peaceful coexistence, reconciliation and inclusive local decision-making.",
];

export const groups = [
  {
    title: "Women and girls",
    text: "Carry much of the burden of displacement and food insecurity; face GBV risks and exclusion from decisions.",
    icon: "HeartHandshake",
  },
  {
    title: "Children",
    text: "Most out of school, most affected by malnutrition and disease, and at risk of child labour and recruitment.",
    icon: "Baby",
  },
  {
    title: "Youth",
    text: "A large and largely unemployed population; with skills and a voice, they become drivers of peace and recovery.",
    icon: "Sparkles",
  },
  {
    title: "Internally displaced persons",
    text: "Repeatedly displaced by floods, drought and conflict, often in protracted and unsafe sites.",
    icon: "Tent",
  },
  {
    title: "Minority and riverine communities",
    text: "Often excluded from land, services and aid along the Shabelle.",
    icon: "Waves",
  },
  {
    title: "Persons with disabilities and older people",
    text: "Face added barriers to aid, education, health and livelihoods.",
    icon: "Accessibility",
  },
] as const;

export const gaps = [
  {
    title: "Few Jowhar-based actors",
    text: "Most national NGOs are headquartered in Mogadishu, Baidoa or Kismayo, leaving Hirshabelle with limited local leadership in coordination.",
  },
  {
    title: "Response without resilience",
    text: "Seasonal relief rarely connects to irrigation, livelihoods, education and peace, so communities stay in the same cycle.",
  },
  {
    title: "Early warning without early action",
    text: "Forecasts exist, but community triggers, plans and resources to act on them are weak.",
  },
  {
    title: "Underserved villages",
    text: "Many riverine and rural villages still lack schools, health facilities and vocational opportunities.",
  },
];

export const workingMethods = [
  {
    title: "Rights-based",
    text: "Communities are rights-holders, not passive recipients. We help them claim their rights and hold duty-bearers accountable, guided by humanitarian principles and IHL.",
    icon: "Scale",
  },
  {
    title: "Community-centred",
    text: "Communities set priorities, manage committees and own assets. We build the capacity of CBOs, local authorities and community structures.",
    icon: "Users",
  },
  {
    title: "Resilience and DRR",
    text: "We analyse the causes of disasters with communities, link early warning to early action, and reduce exposure and vulnerability over time.",
    icon: "ShieldCheck",
  },
  {
    title: "Traditional and religious leaders",
    text: "Elders, religious leaders and other trusted figures are partners in early warning, reconciliation, girls' education and social change.",
    icon: "Landmark",
  },
  {
    title: "Rooted advocacy",
    text: "Advocacy starts from community priorities; we open doors so community voices reach district, state and national decision-makers.",
    icon: "Megaphone",
  },
  {
    title: "Innovation and evidence",
    text: "Mobile data collection, GIS mapping and digital feedback; we test new approaches before scaling them.",
    icon: "Lightbulb",
  },
] as const;

export const lenses = [
  {
    title: "Social cohesion and peaceful coexistence",
    text: "Conflict analysis, Do No Harm, fair targeting across clans and groups, and dialogue in every programme.",
  },
  {
    title: "Gender equality and women's empowerment",
    text: "Women in leadership of committees, gender analysis, and safe access to services and income.",
  },
  {
    title: "Environment and climate",
    text: "Environmental screening of all projects, climate-smart design and protection of natural resources.",
  },
  {
    title: "Minority rights and disability inclusion",
    text: "Targeted outreach, accessible facilities and inclusive decision-making.",
  },
];

export const deliveryCycle = [
  {
    title: "Assess",
    text: "Joint needs, risk and context analysis with communities and authorities; conflict and protection analysis; identification of the most vulnerable.",
  },
  {
    title: "Engage",
    text: "Community entry through elders, local authorities, women's and youth groups; forming or strengthening committees; agreement on roles.",
  },
  {
    title: "Co-design",
    text: "Locally feasible, conflict-sensitive solutions; results framework, targeting criteria, budget and safeguards agreed with communities.",
  },
  {
    title: "Deliver",
    text: "Implementation through community structures, local procurement and labour; close monitoring and rapid adaptation.",
  },
  {
    title: "Sustain and learn",
    text: "Handover of assets with operation and maintenance plans; evaluation, learning and sharing results with communities and partners.",
  },
];

export const capabilities = [
  {
    title: "Emergency response & anticipatory action",
    how: "Rapid needs assessment, community early warning, trigger-based contingency plans, cash and in-kind assistance",
    deliverables: "Assessment reports, contingency plans, distributions, post-distribution monitoring",
    icon: "CloudRain",
  },
  {
    title: "Climate resilience & natural resources",
    how: "Participatory risk mapping, irrigation and embankment rehabilitation, ecosystem-based adaptation",
    deliverables: "Rehabilitated canals and embankments, community adaptation plans, restored land",
    icon: "Leaf",
  },
  {
    title: "Livelihoods & food security",
    how: "Value-chain and market analysis, farmer training, cooperatives, cash-for-work",
    deliverables: "Trained farmers, functioning cooperatives, productive assets",
    icon: "Wheat",
  },
  {
    title: "Education & skills",
    how: "School construction, EiE, Alternative Basic Education, teacher training and ToT, TVET",
    deliverables: "Classrooms, enrolled learners, trained teachers, skilled youth",
    icon: "GraduationCap",
  },
  {
    title: "Primary health care",
    how: "Health facility construction and support, community health outreach, nutrition screening and referral",
    deliverables: "Functioning health posts, trained community health workers, referral systems",
    icon: "Stethoscope",
  },
  {
    title: "Durable solutions",
    how: "Site planning, shelter, land tenure facilitation, host–IDP integration",
    deliverables: "Resettled households, secured tenure, integrated communities",
    icon: "Tent",
  },
  {
    title: "Peacebuilding & social cohesion",
    how: "Conflict analysis, dialogue facilitation, peace committees, women and youth inclusion",
    deliverables: "Peace agreements, functioning committees, dialogue reports",
    icon: "Handshake",
  },
  {
    title: "Research, MEAL & knowledge",
    how: "Mixed-method assessments, baselines, evaluations, community feedback systems",
    deliverables: "Baseline and evaluation reports, dashboards, learning briefs",
    icon: "Search",
  },
] as const;

export const engagementFormats = [
  "Emergency response and anticipatory action in flood- or drought-affected districts",
  "Integrated resilience programmes (irrigation, livelihoods, natural resources) over 12–36 months",
  "Construction and operation of schools, health posts and vocational centres with community and government partners",
  "Needs assessments, baselines and community consultations for partners and consortia",
  "Community dialogue, reconciliation and social cohesion processes",
];

export const chsCommitments = [
  { right: "can exercise their rights and take part in decisions", practice: "Community consultation and committees at every stage of the project cycle" },
  { right: "access timely and effective support", practice: "Rapid assessment and response; pre-positioned plans for floods and drought" },
  { right: "are better prepared and more resilient", practice: "Early warning, contingency plans and resilient livelihoods" },
  { right: "access support that does not cause harm", practice: "Do No Harm, conflict sensitivity and environmental screening" },
  { right: "can safely report concerns and complaints", practice: "Hotline, help desks and complaint boxes, with responses tracked" },
  { right: "access coordinated, complementary support", practice: "Active participation in clusters and state coordination" },
  { right: "access support adapted on feedback and learning", practice: "Regular feedback reviews and adaptive management" },
  { right: "interact with respectful, competent staff", practice: "Code of conduct, training and supportive supervision" },
  { right: "can expect resources to be managed ethically", practice: "Financial controls, audits and anti-fraud measures" },
];

export const protection = [
  { title: "Protection mainstreaming", text: "Safety, dignity, meaningful access, accountability and participation in every intervention." },
  { title: "Safeguarding and PSEA", text: "A safeguarding policy aligned with the IASC Core Principles; trained focal points; safe recruitment; survivor-centred referral." },
  { title: "Child protection", text: "Child safeguarding policy; prevention of child labour and recruitment; safe learning spaces." },
  { title: "GBV risk mitigation", text: "Safe distribution sites, lighting and sanitation design, and referral to specialised services." },
];

export const governance = [
  { layer: "General Assembly", text: "Highest authority; approves the constitution, elects the Board, sets strategic direction and receives annual reports." },
  { layer: "Board of Directors", text: "Strategic oversight, policy approval, financial stewardship and risk oversight; elects the Chairperson, Secretary and Treasurer." },
  { layer: "Executive Director", text: "Leads the Secretariat, partnerships, organisational performance, programme quality and implementation of Board decisions." },
  { layer: "Secretariat (Jowhar HQ)", text: "Manages programmes, MEAL, finance, administration, HR, field coordination, communications and donor reporting." },
  { layer: "Field offices and community structures", text: "Deliver programmes and keep SHARAN accountable to the communities it serves." },
];

export const regions = [
  {
    phase: "Phase 1",
    label: "Core",
    regions: "Middle Shabelle",
    districts: ["Jowhar", "Balcad", "Mahaday", "Adale"],
    focus: "HQ operations, flood and drought response, education, livelihoods",
    color: "river",
  },
  {
    phase: "Phase 2",
    label: "Expansion",
    regions: "Hiraan & Lower Shabelle",
    districts: ["Beledweyne", "Bulo Burte", "Afgooye", "Marka", "Qoryooley"],
    focus: "Riverine resilience, durable solutions, peacebuilding",
    color: "growth",
  },
  {
    phase: "Phase 3",
    label: "Wider reach",
    regions: "South & Central Somalia",
    districts: ["Banadir", "Galgaduud", "Bay", "Bakool", "Gedo", "Juba regions"],
    focus: "Partnership and consortium-based programmes",
    color: "sunrise",
  },
] as const;

export const strategicDirections = [
  {
    name: "BUILD",
    subtitle: "Organisational strength",
    color: "river",
    goals: [
      { goal: "Complete federal and state registration and adopt core policies", outcome: "Fully registered, with board-approved finance, HR, procurement, safeguarding and MEAL policies" },
      { goal: "Establish sound financial and programme systems", outcome: "Clean annual external audits; passes UN and INGO partner capacity assessments" },
      { goal: "Build a skilled, diverse team", outcome: "Core team in place, with women in at least 30% of leadership roles" },
    ],
  },
  {
    name: "DELIVER",
    subtitle: "Locally led resilience",
    color: "growth",
    goals: [
      { goal: "Deliver integrated programmes across the four pillars in Middle Shabelle", outcome: "Documented, community-validated results in resilience, education, health and peace" },
      { goal: "Establish community early warning and anticipatory action", outcome: "Target villages have functioning early warning committees and contingency plans" },
      { goal: "Expand in phases to Hiraan and Lower Shabelle", outcome: "Operations active in at least two additional regions" },
    ],
  },
  {
    name: "CONNECT",
    subtitle: "Partnerships and influence",
    color: "sunrise",
    goals: [
      { goal: "Become an active partner in humanitarian coordination", outcome: "Participates in clusters and state forums and is eligible for pooled funds" },
      { goal: "Diversify partnerships and funding", outcome: "Funding from at least four partners; no single donor above 50% of income" },
      { goal: "Generate and share community evidence", outcome: "Assessments and learning briefs published and used in district and state planning" },
    ],
  },
] as const;

export const qualityGates = [
  { title: "Inception", text: "Needs, targeting, risks, safeguards and community agreement confirmed before work begins." },
  { title: "Verified delivery", text: "Beneficiary lists, distributions and works checked and documented." },
  { title: "Community validation", text: "Results reviewed with communities and authorities, including complaints and gaps." },
  { title: "Handover and learning", text: "Assets handed over with maintenance plans; lessons documented and applied." },
];

export const systems = [
  { title: "Programme management", text: "Approved workplans, clear roles, milestone tracking, risk escalation and timely narrative reporting." },
  { title: "Financial management", text: "Budget control, segregation of duties, bank-based transactions, monthly reconciliation and annual external audit." },
  { title: "Procurement and logistics", text: "Competitive, documented procurement with thresholds, a procurement committee and asset registers." },
  { title: "Human resources", text: "Fair, transparent recruitment; code of conduct signed by all staff and volunteers; gender balance in hiring." },
  { title: "MEAL", text: "Results frameworks, baselines, regular monitoring, third-party verification where needed, evaluation and learning." },
  { title: "Anti-fraud and anti-corruption", text: "Zero-tolerance policy, whistleblowing channel, beneficiary verification and partner due diligence." },
  { title: "Security and access", text: "Context monitoring, community acceptance, movement planning and incident reporting." },
  { title: "Data protection", text: "Informed consent, data minimisation, secure storage and anonymisation of sensitive information." },
];

export const partnerGroups = [
  { group: "Federal and Hirshabelle State authorities, SoDMA, district administrations", value: "Community-level data, early warning links, joint assessments, delivery of public priorities in hard-to-reach villages" },
  { group: "UN agencies and pooled funds", value: "A credible local first responder for area-based coordination in Hirshabelle; access and community acceptance" },
  { group: "International NGOs and consortia", value: "Local implementation, contextual knowledge, community mobilisation and field monitoring" },
  { group: "Climate and resilience funders", value: "Locally owned adaptation, irrigation and ecosystem projects with community maintenance" },
  { group: "Universities and research bodies", value: "Field access, community-based research and translation of evidence into practice" },
  { group: "Communities, CBOs, women's and youth groups", value: "Capacity strengthening, a voice in planning and a reliable partner on the ground" },
];

export const advantages = [
  "Headquartered in Jowhar, the Hirshabelle capital, inside the communities we serve rather than managing them from a distance.",
  "One organisation across the nexus: emergency response, resilience, basic services and peace in a single coherent approach.",
  "Strong technical foundation in MEAL, research, education and training from our founding team.",
  "Lean and cost-efficient, delivering through community structures and local procurement.",
  "Neutral and inclusive, with governance designed to avoid clan or political capture.",
];

export const modalities = [
  { title: "Lead", text: "Direct implementation" },
  { title: "Co-lead", text: "Consortium partner" },
  { title: "Implement", text: "Sub-grantee" },
  { title: "Assess", text: "Needs assessments, baselines, monitoring" },
  { title: "Convene", text: "Community and stakeholder dialogue" },
];

export const promises = [
  { to: "To communities", text: "We will listen, involve you in decisions, answer your complaints and share results with you." },
  { to: "To authorities", text: "We will coordinate, respect national and state policies, and report openly." },
  { to: "To partners and donors", text: "We will use every resource responsibly, report on time and be honest about what works and what does not." },
  { to: "To ourselves", text: "We will review progress every year and conduct a mid-term review in 2028 to adjust our strategy to new risks and lessons." },
];

export const team = [
  {
    name: "Mohamednur Keynan Ali",
    role: "Founding Member",
    bio: "About 15 years across humanitarian, education and development work: monitoring and evaluation, research and report writing, strategy development and ToT; climate adaptation, flood needs assessments and child-protection assessments; multi-stakeholder assignments for organisations including Oxfam UK and GAIN. Dean of the Faculty of Education, Somali International University.",
    initials: "MK",
  },
];
