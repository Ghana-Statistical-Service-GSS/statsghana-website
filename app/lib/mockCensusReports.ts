export type CensusReport = {
  id: string;
  title: string;
  description: string;
  year: number;
  reportType: string;
  thumbnail: string;
  fileUrl: string;
};

const PLACEHOLDER_THUMB = "/images/publications/census-reports/image.png";

export const mockCensusReports: CensusReport[] = [
  {
    id: "phc-2021-summary",
    title: "PHC 2021 – Summary Report",
    description:
      "Key findings and highlights from the 2021 Population and Housing Census.",
    year: 2022,
    reportType: "Summary",
    thumbnail: PLACEHOLDER_THUMB,
    fileUrl: "#",
  },
  {
    id: "phc-2021-thematic-urban",
    title: "PHC 2021 – Urbanization & Housing Thematic Report",
    description:
      "Housing conditions, urban growth patterns, and settlement characteristics.",
    year: 2023,
    reportType: "Thematic Report",
    thumbnail: PLACEHOLDER_THUMB,
    fileUrl: "#",
  },
  {
    id: "phc-2010-analytical",
    title: "PHC 2010 – Analytical Report",
    description:
      "Demographic analysis and population structure based on the 2010 census.",
    year: 2013,
    reportType: "Analytical Report",
    thumbnail: PLACEHOLDER_THUMB,
    fileUrl: "#",
  },
  {
    id: "phc-2010-main",
    title: "PHC 2010 – Main Report",
    description:
      "Comprehensive report covering population, housing, and social indicators.",
    year: 2012,
    reportType: "Main Report",
    thumbnail: PLACEHOLDER_THUMB,
    fileUrl: "#",
  },
  {
    id: "phc-2000-main",
    title: "PHC 2000 – Main Report",
    description:
      "Baseline population and housing indicators from the 2000 census.",
    year: 2005,
    reportType: "Main Report",
    thumbnail: PLACEHOLDER_THUMB,
    fileUrl: "#",
  },
  {
    id: "phc-2021-technical",
    title: "PHC 2021 – Technical Report",
    description:
      "Methodology, field operations, and quality assurance documentation.",
    year: 2022,
    reportType: "Technical Report",
    thumbnail: PLACEHOLDER_THUMB,
    fileUrl: "#",
  },
  {
    id: "phc-2021-atlas",
    title: "PHC 2021 – Statistical Atlas",
    description:
      "Maps and visualizations of population distribution and key indicators.",
    year: 2023,
    reportType: "Atlas",
    thumbnail: PLACEHOLDER_THUMB,
    fileUrl: "#",
  },
  {
    id: "agc-2017-main",
    title: "Agricultural Census 2017/18 – Main Report",
    description:
      "National overview of agricultural production, crops, and livestock.",
    year: 2019,
    reportType: "Main Report",
    thumbnail: PLACEHOLDER_THUMB,
    fileUrl: "#",
  },
  {
    id: "agc-2017-summary",
    title: "Agricultural Census 2017/18 – Summary Report",
    description:
      "Highlights from the agricultural census including key sector insights.",
    year: 2019,
    reportType: "Summary",
    thumbnail: PLACEHOLDER_THUMB,
    fileUrl: "#",
  },
  {
    id: "phc-2010-thematic-disability",
    title: "PHC 2010 – Disability Thematic Report",
    description:
      "Profile of disability indicators and social inclusion across regions.",
    year: 2014,
    reportType: "Thematic Report",
    thumbnail: PLACEHOLDER_THUMB,
    fileUrl: "#",
  },
  {
    id: "phc-2021-thematic-youth",
    title: "PHC 2021 – Youth & Age Structure Report",
    description:
      "Age composition, dependency ratios, and youth-focused indicators.",
    year: 2023,
    reportType: "Analytical Report",
    thumbnail: PLACEHOLDER_THUMB,
    fileUrl: "#",
  },
];
