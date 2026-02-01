import Container from "../../components/Container";
import Link from "next/link";

const PAGE_TITLE = "Data Request";
const PAGE_SUBTITLE =
  "Request access to GSS datasets and related materials through the official process.";

const FORM_URL = "/data/datarequest/GSS_DATA_REQUEST_AGREEMENT_FORM.doc";

export default function DataRequestPage() {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <p className="text-sm text-slate-500">Data Request / Request Data</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {PAGE_TITLE}
        </h1>
        <p className="mt-3 text-slate-600">{PAGE_SUBTITLE}</p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm leading-relaxed text-slate-700">
            Complete the GSS Data Request Form, and send it by email
            (datarequest@statsghana.gov.gh) or fax with a brief description
            (one or two pages long) of the proposed study/research to our
            administration office. There is no need to supply any additional
            supporting documents initially, unless there are special
            circumstances that you wish to draw our attention to. If additional
            documents are required, they will be requested later as part of the
            application process. All enquiries and applications should be
            channelled through the head office. Please do not apply to any
            employee directly as this may jeopardise your chances of obtaining
            the data. If there is need for any payment to be made, you will be
            informed officially. Please study the agreement form carefully
            before you forward it.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={FORM_URL}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              Download Data Request Form
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
