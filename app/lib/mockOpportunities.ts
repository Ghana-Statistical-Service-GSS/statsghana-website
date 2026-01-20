export type Opportunity = {
  id: string;
  title: string;
  employmentType: string;
  department?: string;
  location: string;
  deadline: string;
  excerpt: string;
  postDate: string;
  cityTag?: string;
  imageSrc: string;
  applyUrl: string;
};

const PLACEHOLDER_IMAGE = "/images/placeholder.png";

export const opportunities: Opportunity[] = [
  {
    id: "survey-field-officer",
    title: "Survey Field Officer (Temporary Position)",
    employmentType: "Temporary",
    department: "Data Collection",
    location: "Accra",
    deadline: "May 31, 2024",
    excerpt:
      "Support field data collection activities and ensure high-quality survey administration across designated areas.",
    postDate: "April 21, 2024",
    cityTag: "Accra",
    imageSrc: PLACEHOLDER_IMAGE,
    applyUrl: "#",
  },
  {
    id: "statistician",
    title: "Statistician",
    employmentType: "Full-time",
    department: "Statistics & Data Analysis",
    location: "Accra",
    deadline: "June 10, 2024",
    excerpt:
      "Lead statistical analysis, data validation, and reporting to support evidence-based decision-making.",
    postDate: "June 10, 2024",
    cityTag: "Accra",
    imageSrc: PLACEHOLDER_IMAGE,
    applyUrl: "#",
  },
  {
    id: "data-processing-specialist",
    title: "Data Processing Specialist",
    employmentType: "Full-time",
    department: "IT & Data Management",
    location: "Accra",
    deadline: "June 15, 2024",
    excerpt:
      "Manage data processing workflows, ensure data integrity, and support systems for statistical production.",
    postDate: "June 15, 2024",
    cityTag: "Accra",
    imageSrc: PLACEHOLDER_IMAGE,
    applyUrl: "#",
  },
];
