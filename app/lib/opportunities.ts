export type Opportunity = {
  id: string;
  title: string;
  excerpt: string;
  dateISO: string;
  imageSrc: string;
  slug: string;
  documentKey: string;
  sourcePage: 1 | 2;
};

const PLACEHOLDER_IMAGE = "/images/placeholder.png";

export const opportunities: Opportunity[] = [
  {
  id: "website-security-consultancy-2026",
  title: "Consultancy Services for Secure Code Review, Penetration Testing, and Patch Support for the In-House Redevelopment of the GSS Website",
  excerpt: "The Ghana Statistical Service (GSS) is currently revamping its official website and data dissemination platform using an internal development team. As the primary repository for national data, the platform's integrity, availability, and confidentiality are paramount.",
  dateISO: "2026-03-28",
  imageSrc: "/images/security_consultancy.png",
  slug: "website-security-consultancy-2026",
  documentKey: "newsevent/opportunities/website-security-consultancy-2026-tor.pdf",
  sourcePage: 1
  },
];
