const PAGE_TITLE = "Core Mandate";
const BREADCRUMB = ["About GSS", "Core Mandate"];

const mandates = [
  "Collect, compile, analyze, abstract, publish and disseminate statistical information related to the commercial, industrial, financial, social, demographic, economic and other activities and conditions of the people of Ghana.",
  "Coordinate the National Statistical System to ensure coherence and quality across official statistics.",
  "Provide timely, reliable, and relevant statistics to support evidence-based decision-making.",
];

export default function CoreMandatePage() {
  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">{BREADCRUMB.join(" / ")}</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {PAGE_TITLE}
        </h1>
        <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
          The Ghana Statistical Service&apos;s core mandate is to provide
          authoritative statistics for national development and good
          governance.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-700">
          {mandates.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
