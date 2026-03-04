export default function PressReleasesLoading() {
  return (
    <div className="bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">Home / News &amp; Events / Press Releases</p>
        <div className="mt-3 rounded-2xl border border-[#241B5A]/20 bg-[#241B5A] p-6 text-white sm:p-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Press Releases</h1>
          <p className="mt-2 text-sm text-white/85 sm:text-base">Loading press releases...</p>
        </div>
        <div className="mt-6 space-y-4">
          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
