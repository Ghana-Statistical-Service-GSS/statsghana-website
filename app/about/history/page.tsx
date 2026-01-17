const PAGE_TITLE = "History";
const BREADCRUMB = ["About GSS", "History"];

const paragraphs = [
  "Efforts to institutionalise the collection and dissemination of statistical information began in 1891, when the first population census in the country, then called the Gold Coast, was conducted. Several decades hence, in 1948, after the end of World War II, the Office of the Government Statistician was established. The functions of the Office continued to evolve and, in 1961, the Office of the Government Statistician was expanded and renamed as the Central Bureau of Statistics (CBS).",
  "In 1985, the Provisional National Defence Council (PNDC) passed the Statistical Service Law 135, which established the Ghana Statistical Service as part of the Ghana Public Service.",
  "The Law (PNDC Law 135) established the Statistical Service Board as the governing body that reports to the presidency. The GSS Board consists of a Chairman and five other members all of whom were appointed by the president. The Government Statistician is an ex-officio member of the GSS Board.",
  "Apart from the Head Office there are 10 Regional Offices and over 100 District Offices. GSS by its mandate has been conducting various censuses, surveys and compiling socio-economic data critical for the management and growth of the country and development of the private sector.",
];

export default function HistoryPage() {
  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">{BREADCRUMB.join(" / ")}</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {PAGE_TITLE}
        </h1>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-justify text-slate-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
