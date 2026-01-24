const PAGE_TITLE = "Privacy & Confidentiality Policy";
const BREADCRUMB = ["About GSS", "Privacy & Confidentiality"];

const sections = [
  {
    title: "Introduction",
    body: [
      "The Ghana Statistical Service (GSS) is mandated under the Statistical Service Act, 2019 (Act 1003) to collect, compile, analyze, and disseminate official statistics in Ghana.",
      "GSS is committed to protecting the privacy, confidentiality, and security of all information provided by individuals, households, businesses, and institutions.",
      "This Privacy and Confidentiality Policy explains how data are collected, used, stored, protected, and disseminated in accordance with national laws and international statistical standards.",
    ],
  },
  {
    title: "Legal Framework",
    body: [
      "The protection of data collected by GSS is governed by:",
    ],
    list: [
      "Statistical Service Act, 2019 (Act 1003)",
      "Data Protection Act, 2012 (Act 843)",
      "UN Fundamental Principles of Official Statistics",
      "African Charter on Statistics",
      "Relevant international best practices",
    ],
  },
  {
    title: "Confidentiality of Statistical Information",
    body: ["3.1 Protection of Respondents"],
    list: [
      "Used strictly for statistical purposes",
      "Treated as confidential",
      "Protected against unauthorized disclosure",
    ],
    note: "GSS does not release:",
    noteList: [
      "Names of individuals or businesses",
      "Addresses or contact details",
      "Identification numbers",
      "Any information that could directly or indirectly identify a respondent",
    ],
  },
  {
    title: "Legal Obligation of Staff",
    body: [
      "All GSS staff, temporary field officers, consultants, and partners are legally bound by confidentiality obligations.",
      "Before accessing data, personnel are required to:",
    ],
    list: [
      "Take an Oath of Secrecy",
      "Sign Confidentiality Agreements",
      "Comply with internal information security policies",
    ],
    closing:
      "Unauthorized disclosure of confidential information constitutes an offence under Act 1003.",
  },
  {
    title: "Use of Data",
    body: ["Information collected by GSS is used only for:"],
    list: [
      "Producing official statistics",
      "Policy formulation and planning",
      "Research and development",
      "Monitoring national development indicators",
    ],
    note: "Data are never used for:",
    noteList: [
      "Tax assessment",
      "Law enforcement",
      "Immigration control",
      "Commercial marketing",
      "Administrative sanctions",
    ],
  },
  {
    title: "Data Anonymization and Disclosure Control",
    body: [
      "Before dissemination:",
    ],
    list: [
      "Personal identifiers are removed",
      "Data are aggregated",
      "Statistical disclosure control methods are applied",
    ],
    closing:
      "These measures ensure that no individual or business can be identified and published statistics represent groups, not persons.",
  },
  {
    title: "Data Access and Sharing",
    body: ["6.1 Public Access", "GSS publishes aggregated statistical data through:"],
    list: [
      "Official reports and publications",
      "The GSS website",
      "Online data portals and dashboards",
    ],
    closing: "All publicly released data are fully anonymized.",
  },
  {
    title: "Restricted Microdata Access",
    body: [
      "Access to anonymized microdata may be granted under controlled conditions for:",
    ],
    list: ["Academic research", "Policy analysis", "Institutional studies"],
    closing:
      "Such access is subject to formal application and approval, signed data access agreements, strict usage conditions, and no attempt at respondent identification.",
  },
  {
    title: "Data Security Measures",
    body: [
      "GSS employs robust technical and organizational safeguards, including:",
    ],
    list: [
      "Secure servers and databases",
      "Access control and user authentication",
      "Encryption of sensitive data",
      "Regular system monitoring and audits",
      "Backup and disaster recovery procedures",
    ],
    closing:
      "These measures protect data against unauthorized access, loss or destruction, alteration, or misuse.",
  },
  {
    title: "Privacy of Website Users",
    body: [
      "When you visit the GSS website:",
    ],
    list: [
      "No personally identifiable information is collected without consent",
      "Basic technical information (such as browser type or IP address) may be logged for security and analytics purposes",
      "Cookies may be used to enhance user experience",
    ],
    closing:
      "GSS does not sell, trade, or share website user information with third parties for commercial purposes.",
  },
  {
    title: "Rights of Data Providers",
    body: ["All respondents have the right to:"],
    list: [
      "Be informed of the purpose of data collection",
      "Expect confidentiality of their responses",
      "Decline to answer questions not required by law",
      "Receive assurance that their information will not be misused",
    ],
    closing:
      "Participation in surveys and censuses is protected by law, and confidentiality is guaranteed.",
  },
  {
    title: "Breach Management",
    body: ["In the unlikely event of a data breach, GSS will:"],
    list: [
      "Immediately investigate the incident",
      "Contain and mitigate potential risks",
      "Notify relevant authorities where required",
      "Strengthen controls to prevent recurrence",
    ],
  },
  {
    title: "Updates to This Policy",
    body: [
      "This Privacy and Confidentiality Policy may be updated periodically to reflect:",
    ],
    list: [
      "Changes in legislation",
      "Technological advancements",
      "Institutional reforms",
    ],
    closing: "Any updates will be published on the GSS website.",
  },
  {
    title: "Contact Information",
    body: [
      "For enquiries related to privacy, confidentiality, or data protection, please contact:",
      "Ghana Statistical Service",
      "Head Office, Accra, Ghana",
      "Email: info@statsghana.gov.gh",
      "Website: https://statsghana.gov.gh",
    ],
  },
];

export default function PrivacyConfidentialityPage() {
  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">{BREADCRUMB.join(" / ")}</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {PAGE_TITLE}
        </h1>
        <p className="mt-2 text-slate-600">Ghana Statistical Service (GSS)</p>

        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">
                {section.title}
              </h2>
              {section.body?.map((paragraph) => (
                <p key={paragraph} className="text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              {section.list ? (
                <ul className="list-disc space-y-2 pl-5 text-slate-700">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {section.note ? (
                <p className="text-slate-700 leading-relaxed">{section.note}</p>
              ) : null}
              {section.noteList ? (
                <ul className="list-disc space-y-2 pl-5 text-slate-700">
                  {section.noteList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {section.closing ? (
                <p className="text-slate-700 leading-relaxed">{section.closing}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
