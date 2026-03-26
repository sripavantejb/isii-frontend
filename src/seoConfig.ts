export interface SeoEntry {
  title: string;
  description: string;
  canonicalPath?: string;
}

export const SEO_CONFIG: Record<string, SeoEntry> = {
  "/": {
    title: "ISII | Institute for Strategic Intelligence and Intervention",
    description:
      "Enabling consequential decisions at the intersection of geopolitics, technology and capital through strategic insight and interventions.",
  },
  "/about": {
    title: "About ISII | Strategic Intelligence & Intervention",
    description:
      "Enabling consequential decisions at the intersection of geopolitics, technology and capital through strategic insight and interventions.",
  },
  "/about/mission": {
    title: "Mission and Purpose | ISII",
    description:
      "Learn ISII's mission and purpose in generating strategic intelligence for high-stakes decisions during systemic transition.",
  },
  "/about/people": {
    title: "People | ISII",
    description:
      "Explore ISII’s leadership and experts driving strategic intelligence, decision-making, and interventions across geopolitics, technology and capital.",
  },
  "/about/context": {
    title: "Context | ISII",
    description:
      "Understand ISII's context, distinctiveness and strategic intervention logic across geopolitics, technology and capital.",
  },
  "/about/people/ketan-patel": {
    title: "Ketan Patel | Chair, Force for Good & CEO, GPC | ISII",
    description:
      "Profile of Ketan Patel, Chair of Force for Good who leads Greater Pacific Capital, advising governments and shaping strategy and investment.",
  },
  "/about/people/glenn-gaffney": {
    title: "Glenn Gaffney | Former CIA Director & EVP, IQT | ISII",
    description:
      "Profile of Glenn Gaffney, former CIA Director of Science and Technology and EVP at IQT, with expertise in national security and technology.",
  },
  "/about/people/jon-miller": {
    title: "Jon Miller | CEO, Integrated Media & Former AOL CEO | ISII",
    description:
      "Profile of Jon Miller, former AOL and News Corp Digital Media CEO, with experience in technology, media leadership, and venture investing.",
  },
  "/about/people/garry-jacobs": {
    title: "Garry Jacobs | CEO, World Academy of Art & Science | ISII",
    description:
      "Profile of Garry Jacobs, CEO of WAAS and Chairman of World University Consortium, with expertise in global development, governance, and economic research.",
  },
  "/about/people/shaurya-doval": {
    title: "Shaurya Doval | India Foundation & Torch Investments | ISII",
    description:
      "Profile of Shaurya Doval, co-founder of India Foundation and investment leader at GPC and Torch Investments, with global experience in policy and finance.",
  },
  "/capabilities/pivotal-thinking": {
    title: "Pivotal Thinking | ISII",
    description:
      "Strategic intelligence on transitions, shocks and inflection points across geopolitics, technology, economics, climate and society.",
  },
  "/capabilities/pivotal-thinking/content-library": {
    title: "Pivotal Thinking Content Library | ISII Insights",
    description:
      "Browse the Pivotal Thinking content library featuring insights on geopolitics, strategy, technology, and global transitions.",
  },
  "/press-and-news": {
    title: "Press & News | ISII",
    description:
      "news updates",
  },
  "/capabilities/perspectives": {
    title: "Perspectives | Reports & Strategic Insights | ISII",
    description:
      "A collection of reports and strategic insights across geopolitics, technology, economics, climate and society.",
  },
  "/capabilities/perspectives/content-library": {
    title: "Perspectives Content Library | ISII",
    description:
      "Access the Perspectives content library featuring reports and strategic insights across geopolitics, technology, economics, climate and society.",
  },
  "/capabilities/strategic-counsel": {
    title: "Strategic Counsel | Growth, Sovereignty & Transition | ISII",
    description:
      "Strategic counsel on growth, sovereignty, and transition, addressing complex challenges across national security, strategy, finance, and environment.",
  },
  "/capabilities/strategic-counsel/growth-and-prosperity": {
    title: "Growth & Prosperity | Strategic Counsel | ISII",
    description:
      "Strategic counsel on economic growth, prosperity, and enterprise systems, including capital mobilisation, industrial strategy, and national development.",
  },
  "/capabilities/strategic-counsel/securing-sovereignty": {
    title: "Securing Sovereignty | Strategic Counsel | ISII",
    description:
      "Strategic counsel on securing sovereignty through AI, energy, and infrastructure security, resilient supply chains, and alliances in a shifting global order.",
  },
  "/capabilities/strategic-counsel/mobilising-transition": {
    title: "Mobilising Transition | Strategic Counsel | ISII",
    description:
      "Strategic counsel on transitioning to the Information Era, covering AI, technology, energy, infrastructure, and institutional transformation.",
  },
  "/capabilities/programmes": {
    title: "Programmes | Financial Inclusion & Digital Innovation | ISII",
    description:
      "Programmes focused on financial inclusion and digital technologies to expand access, improve education, and enhance human performance.",
  },
  "/capabilities/projects-and-intervention": {
    title: "Experience | Projects & Strategic Interventions | ISII",
    description:
      "Selected projects and interventions across security, governance, AI, capital allocation, and economic systems driving national growth and resilience.",
  },
  "/capabilities/experience": {
    title: "Experience | Projects & Strategic Interventions | ISII",
    description:
      "Selected projects and interventions across security, governance, AI, capital allocation, and economic systems driving national growth and resilience.",
    canonicalPath: "/capabilities/projects-and-intervention",
  },
  "/privacy-policy": {
    title: "Privacy Policy | ISII",
    description:
      "Learn how ISII collects, uses, and protects personal data, including data retention, legal obligations, and your rights under applicable laws.",
  },
};
