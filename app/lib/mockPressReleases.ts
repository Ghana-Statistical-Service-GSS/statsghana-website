export type PressRelease = {
  id: string;
  title: string;
  excerpt: string;
  dateISO: string;
  imageSrc: string;
  slug: string;
};

const PLACEHOLDER_IMAGE = "/images/placeholder.png";

export const mockPressReleases: PressRelease[] = [
  {
    id: "press-2024-cpi",
    title: "GSS Releases April 2024 CPI Bulletin",
    excerpt:
      "The Ghana Statistical Service has released the April 2024 Consumer Price Index bulletin with updated inflation indicators.",
    dateISO: "2024-05-15",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "gss-releases-april-2024-cpi-bulletin",
  },
  {
    id: "press-2024-phc-prelim",
    title: "Press Release: Preliminary PHC 2021 Results",
    excerpt:
      "Preliminary results from the 2021 Population and Housing Census have been released for public information.",
    dateISO: "2024-03-20",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "press-release-preliminary-phc-2021-results",
  },
  {
    id: "press-2024-agri",
    title: "Agricultural Census Fieldwork Update",
    excerpt:
      "GSS provides an update on the progress of agricultural census field activities nationwide.",
    dateISO: "2024-02-11",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "agricultural-census-fieldwork-update",
  },
  {
    id: "press-2023-gdp",
    title: "Quarterly GDP Estimates Released",
    excerpt:
      "Latest quarterly GDP estimates indicate continued growth in key sectors of the economy.",
    dateISO: "2023-12-22",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "quarterly-gdp-estimates-released",
  },
  {
    id: "press-2023-dhs",
    title: "GSS Publishes DHS 2022 Summary",
    excerpt:
      "The Demographic and Health Survey summary report has been published for policymakers and stakeholders.",
    dateISO: "2023-09-08",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "gss-publishes-dhs-2022-summary",
  },
  {
    id: "press-2023-inflation",
    title: "Inflation Rate Update: August 2023",
    excerpt:
      "GSS provides updated inflation figures with a breakdown across regions and categories.",
    dateISO: "2023-08-30",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "inflation-rate-update-august-2023",
  },
];
