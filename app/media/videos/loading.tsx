export default function MediaVideosLoading() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f5f1ea] via-white to-[#f5f1ea] py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">Home / Media / Videos</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Videos
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Loading videos from the GSS YouTube and TikTok channels...
        </p>
        <div className="mt-8 grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={`video-loading-${index}`}
              className="h-80 animate-pulse rounded-xl border border-white/60 bg-white/80 shadow-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
