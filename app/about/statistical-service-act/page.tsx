const PAGE_TITLE = "Statistical Service Act";
const BREADCRUMB = ["About GSS", "Statistical Service Act"];

const intro = [
  "Privacy and Confidentiality: Act 1003",
];

const sections = [
  {
    title: "The Object of the Service",
    body: "3. The object of the Service is to provide quality, relevant, accurate, and timely statistical information for the purposes of national development.",
  },
  {
    title: "Official statistics",
    body: "24. Where a public corporation or partner institution produces statistics and the statistics are considered by the Service to be of an acceptable standard, the statistics shall be considered to be official statistics and shall be treated as statistics prepared by the Service.",
  },
  {
    title: "Authority to obtain information and access to records",
    body: [
      "25. (1) The Government Statistician may, by notice in writing, request a person to provide information, estimates or returns, concerning matters specified in the First Schedule.",
      "(2) The information requested by the Government Statistician shall be",
      "(a) in the form and manner specified in the notice; and",
      "(b) provided within the period stated in the notice.",
      "(3) Where a person has the custody of or is responsible for any document or public record that will assist with the completion or correction of information, that person shall grant the Government Statistician access to the document or public record.",
    ],
  },
  {
    title: "Entry of premises",
    body: "26. The Government Statistician may enter any premises without hindrance or obstruction for the discharge of a duty within reasonable hours.",
  },
  {
    title: "Agreement to share information",
    body: [
      "27. (1) The Government Statistician may enter into an agreement to share information collected from a respondent between Ministries, Departments and Agencies, District Assemblies, public corporations and partner institutions.",
      "(2) The agreement shall provide that the respondent be informed that the information is being collected on behalf of the Service to be shared with another entity or partner institution for statistical purposes.",
      "(3) Where the respondent notifies the Government Statistician that it objects to the sharing of information by the Service with another entity or partner institution, the information shall not be shared unless the entity is required by law to obtain the information from the respondent.",
    ],
  },
  {
    title: "Shared information",
    body: "28. The information to be shared under an agreement includes replies to original enquiries and supplementary information collected by the Service, entity or partner.",
  },
  {
    title: "Information request by Gazette notification",
    body: "29. Without limiting the request for information by an agreement between the Government Statistician and an entity or partner institution, the Government Statistician may, by notice in the Gazette, request the submission of returns by an entity within a specified period and the entity shall comply.",
  },
  {
    title: "Official secrecy",
    body: "30. The duty of a person to provide a document or information in accordance with this Act shall not affect the non-disclosure provisions of an official secret or confidential information in any other enactment.",
  },
  {
    title: "Restriction on publication",
    body: [
      "31. (1) A member of the Service shall not publish or show any information that identifies a specific person or respondent to a third party except with the prior written consent of the person making the return or giving the answer.",
      "(2) The information may be in the following forms:",
      "(a) an individual return or part of a return made for official purposes;",
      "(b) an answer given to any question, or",
      "(c) a report, abstract or other document, containing particulars in any return or answer arranged to identify particulars with any person or undertaking.",
      "(3) The restriction on publication shall not apply to information transmitted by the Government Statistician to the Office of the President, a Ministry, Department or Agency for statistical purposes.",
      "(4) Nothing in this section shall prevent or restrict the publication of a report, abstract or other document that would make identification of any person possible where the activities of the undertaking are unique, if the report, abstract or other document is   arranged to disclose only the following information:",
      "(a) the quantity, value and description of goods and services produced, imported, exported or sold;",
      "(b) the number and the economic and social characteristics of employees of the person;",
      "(c) the amount and extent of any investment of the person; and",
      "(d) any other information that has been furnished or supplied under this Act where the person furnishing or supplying the information has not provided written objection to the publication before the publication of the report.",
      "(5) A member of the Service shall ensure",
      "(a) the protection of the private life and business secrets of data providers including",
      "(i) households;",
      "(ii) companies;",
      "(iii) public institutions, and",
      "(iv) other responders;",
      "(b) the confidentiality of the information provided under paragraph (a); and",
      "(c) the use of the information provided under paragraph (a) strictly for statistical purposes.",
    ],
  },
  {
    title: "General statistics",
    body: "32. Without limiting the duties of the Service under this Act or affecting any of its powers or duties in respect of specific statistics that may otherwise be authorised or required under this Act, the Government Statistician shall collect, compile, analyse, abstract, publish and disseminate statistics in relation to any of the matters specified in the First Schedule under the supervision of the Board.",
  },
  {
    title: "Confidentiality",
    body: [
      "50. (1) Individual data collected by the Service and a public corporation or a partner institution working in collaboration with the Service is strictly confidential and shall be used exclusively for statistical purposes.",
      "(2) Identifiable individual information is not to be disclosed in the process of computing statistics or in the dissemination of statistical results.",
      "(3) A person who processes individual data shall ensure that it is processed",
      "(a) in a lawful manner; and",
      "(b) without infringing the privacy of the respondent.",
      "(4) Despite subsection (1), the Government Statistician may release records with identifiers removed if satisfied that the records will be used for genuine research purposes and if a written undertaking has been obtained from the recipient of the records that",
      "(a) the recipient is satisfied that the records cannot be identified as relating to a particular person;",
      "(b) the records will not be released except with the written consent of the Government Statistician; and",
      "(c) a copy of the research findings will be made available to the Government Statistician.",
    ],
  },
  {
    title: "Assurance to data providers",
    body: "51. An individual or entity interviewed during a statistical survey shall be informed of the objective of the interview and measures put in place to protect the data provided by the individual or entity.",
  },
  {
    title: "Dissemination of statistical information",
    body: [
      "52. (1) The Service shall present statistical information in a clear and comprehensive form and make it available and accessible to all, accompanied by the requisite metadata.",
      "(2) Despite subsection (1), micro-data shall not be made available to users unless the laws and procedures in relation to the data are respected and confidentiality maintained.",
      "(3) The Service shall correct its statistical publications containing significant errors by using standard statistical practices and inform data users of the correction.",
      "(4) In the case of serious errors in the publication, the Service shall suspend the dissemination of the statistical publication and inform data users of the suspension.",
    ],
  },
  {
    title: "(Section 57)",
    body: "Enactments to be read as one with this Act: Data Protection Act, 2012 (Act 843)",
  },
  {
    title: "Section 18",
    body: [
      "Section 18 that requires a person who processes personal data to ensure that the personal data is processed",
      "(a) without infringing the privacy rights of the data subject;",
      "(b) in a lawful manner; and",
      "(c) in a reasonable manner.",
    ],
  },
  {
    title: "Section 26",
    body: "Section 26 that requires a data controller who processes personal data to ensure that the data is complete, accurate, up to date and not misleading having regard to the purpose for the collection or processing of the personal data.",
  },
  {
    title: "Section 34",
    body: "Section 34 that states that the provisions of any legislation relating to the right to information of any data subject shall be additional to data subject rights under the Act.",
  },
  {
    title: "Section 65(3)",
    body: [
      "Subsection (3) of section 65 that provides that personal data which is processed only for research purposes is exempt from the provisions of the Act if",
      "(a) the data is processed in compliance with the relevant conditions; and",
      "(b) the results of the research or resulting statistics are not made available in the form which identifies the data subject or any of them.",
    ],
  },
];

export default function StatisticalServiceActPage() {
  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">{BREADCRUMB.join(" / ")}</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {PAGE_TITLE}
        </h1>

        {intro.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-justify text-slate-700 leading-relaxed">
            {paragraph}
          </p>
        ))}

        <div className="mt-6 space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-900">
                {section.title}
              </h2>
              {Array.isArray(section.body) ? (
                <div className="space-y-2 text-justify text-slate-700 leading-relaxed">
                  {section.body.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              ) : (
                <p className="text-justify text-slate-700 leading-relaxed">{section.body}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-6 text-sm text-slate-600">
          <button type="button" className="font-semibold text-indigo-700 hover:text-indigo-900">
            Read more...
          </button>
          <button type="button" className="font-semibold text-indigo-700 hover:text-indigo-900">
            Download:
          </button>
        </div>
      </div>
    </section>
  );
}
