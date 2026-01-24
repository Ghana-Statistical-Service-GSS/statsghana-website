import {
  BarChart3,
  BookOpen,
  ClipboardList,
  Database,
  FlaskConical,
  Headset,
  HelpCircle,
  Scale,
} from "lucide-react";

export type FAQItem = {
  id: string;
  question: string;
  answer: string | string[];
};

export type FAQCategory = {
  id: string;
  title: string;
  tone: "red" | "green" | "teal" | "blue" | "navy" | "orange";
  icon: typeof HelpCircle;
  items: FAQItem[];
};

export const faqCategories: FAQCategory[] = [
  {
    id: "general",
    title: "General Information",
    tone: "red",
    icon: HelpCircle,
    items: [
      {
        id: "general-what-is-gss",
        question: "What is the Ghana Statistical Service, and what do you do?",
        answer:
          "GSS is Ghana’s national statistical agency responsible for producing and disseminating official statistics.",
      },
      {
        id: "general-reliable",
        question: "Are the statistics provided by GSS official and reliable?",
        answer:
          "Yes. GSS statistics are official, quality-assured, and produced according to national and international standards.",
      },
      {
        id: "general-update",
        question: "How often does GSS update its data?",
        answer:
          "Update frequency depends on the program (e.g., CPI monthly, some surveys quarterly or annually).",
      },
      {
        id: "general-updates",
        question: "How do I stay informed about GSS news and updates?",
        answer:
          "Follow GSS news on the website and official social channels, or subscribe to updates when available.",
      },
    ],
  },
  {
    id: "data-statistics",
    title: "Data & Statistics",
    tone: "green",
    icon: BarChart3,
    items: [
      {
        id: "data-access",
        question: "How do I access statistical data from GSS?",
        answer:
          "Use StatsBank or the relevant data pages to browse, filter, and download official datasets.",
      },
      {
        id: "data-download",
        question: "Can I download data for my research or analysis?",
        answer:
          "Yes. Where available, datasets can be downloaded in formats such as Excel or CSV.",
      },
    ],
  },
  {
    id: "surveys-census",
    title: "Surveys & Census",
    tone: "teal",
    icon: ClipboardList,
    items: [
      {
        id: "surveys-which",
        question: "What national surveys and censuses does GSS conduct?",
        answer:
          "GSS conducts population, agricultural, economic, and sectoral surveys and censuses to inform policy and planning.",
      },
      {
        id: "surveys-how",
        question: "How are surveys and censuses conducted?",
        answer:
          "They are conducted using scientifically designed sampling or full enumeration, with trained field staff and quality controls.",
      },
    ],
  },
  {
    id: "data-access-requests",
    title: "Data Access & Requests",
    tone: "orange",
    icon: Database,
    items: [
      {
        id: "requests-how",
        question: "How can I request specific data from GSS?",
        answer:
          "Use the Data Request page and provide details on indicators, geography, and time period.",
      },
      {
        id: "requests-cost",
        question: "Is there a cost for accessing detailed data?",
        answer:
          "Some requests may attract fees depending on the scope; you’ll be contacted if applicable.",
      },
    ],
  },
  {
    id: "publications",
    title: "Publications",
    tone: "blue",
    icon: BookOpen,
    items: [
      {
        id: "publications-find",
        question: "Where can I find GSS publications and reports?",
        answer:
          "Visit Publications for census reports, survey reports, administrative data, and governance documents.",
      },
      {
        id: "publications-cite",
        question: "How can I cite GSS data in my research?",
        answer:
          "Cite Ghana Statistical Service as the source and include the publication title and year.",
      },
    ],
  },
  {
    id: "technical-support",
    title: "Technical Support",
    tone: "navy",
    icon: Headset,
    items: [
      {
        id: "technical-tools",
        question: "Does GSS offer APIs or data download tools?",
        answer:
          "Select platforms provide download tools and APIs; check StatsBank or data portals for details.",
      },
      {
        id: "technical-contact",
        question: "Who can I contact for technical support or assistance?",
        answer:
          "Use the Contact page or email info@statsghana.gov.gh for technical support.",
      },
    ],
  },
  {
    id: "methodology",
    title: "Methodology",
    tone: "green",
    icon: FlaskConical,
    items: [
      {
        id: "methodology-surveys",
        question: "What methodology does GSS use for surveys?",
        answer:
          "GSS uses internationally recognized statistical methods tailored to Ghana’s context.",
      },
      {
        id: "methodology-accuracy",
        question: "How is the accuracy of data ensured?",
        answer:
          "Through rigorous sampling design, field supervision, validation, and statistical quality checks.",
      },
    ],
  },
  {
    id: "legal",
    title: "Legal & Confidentiality",
    tone: "red",
    icon: Scale,
    items: [
      {
        id: "legal-confidentiality",
        question: "How does GSS ensure the confidentiality of data?",
        answer:
          "GSS follows legal and ethical standards to protect respondent confidentiality and data privacy.",
      },
      {
        id: "legal-frameworks",
        question: "What are the legal frameworks governing GSS operations?",
        answer:
          "GSS operates under the Statistical Service Act and other relevant national regulations.",
      },
    ],
  },
];
