import ManagementCard from "../../components/ManagementCard";
import { MANAGEMENT } from "../../lib/management";

const PAGE_TITLE = "Management";
const PAGE_SUBTITLE = "Meet the leadership of the Ghana Statistical Service.";

export default function ManagementPage() {
  const gs = MANAGEMENT.find((person) => person.group === "GS");
  const dgs = MANAGEMENT.find((person) => person.group === "DGS");
  const directors = MANAGEMENT.filter((person) => person.group === "DIRECTOR");

  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">About GSS / Management</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {PAGE_TITLE}
        </h1>
        <p className="mt-3 text-slate-600">{PAGE_SUBTITLE}</p>

        {gs ? (
          <div className="mx-auto mt-10 max-w-xl">
            <ManagementCard person={gs} variant="featured" />
          </div>
        ) : null}

        {dgs ? (
          <div className="mx-auto mt-8 max-w-xl">
            <ManagementCard person={dgs} variant="lead" />
          </div>
        ) : null}

        <div className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Directors</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {directors.map((person) => (
              <ManagementCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
