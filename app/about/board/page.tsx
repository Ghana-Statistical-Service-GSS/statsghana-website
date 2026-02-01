import Container from "../../components/Container";
import BoardClient from "./BoardClient";

const PAGE_TITLE = "Board Members";
const PAGE_SUBTITLE =
  "Meet the Board of Directors guiding Ghana Statistical Service.";

export default function BoardPage() {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <p className="text-sm text-slate-500">About GSS / Board</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {PAGE_TITLE}
        </h1>
        <p className="mt-3 text-slate-600">{PAGE_SUBTITLE}</p>

        <BoardClient />
      </Container>
    </section>
  );
}
