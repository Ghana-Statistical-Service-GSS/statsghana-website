import Link from "next/link";
import { BOARD_MEMBERS } from "./board-data";
import { sortBoardMembers } from "./board-utils";

export default function BoardClient() {
  const members = sortBoardMembers(BOARD_MEMBERS);
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => {
        const content = (
          <>
            <div className="relative aspect-square w-full bg-slate-50">
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-slate-600">{member.role}</p>
              {member.bio?.length ? (
                <p className="text-sm leading-relaxed text-slate-600">
                  {member.bio[0]}
                </p>
              ) : null}
            </div>
          </>
        );

        return (
          <Link
            key={member.name}
            href={`/about/board/${member.slug}`}
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}
