export function RouteSkeleton({
  kind,
}: {
  kind: "catalog" | "form" | "lobby" | "fields";
}) {
  if (kind === "fields") {
    return (
      <div className="space-y-4" aria-hidden>
        <div className="skeleton h-4 w-40" />
        <div className="skeleton h-12 w-full" />
        <div className="skeleton h-12 w-full" />
        <div className="skeleton h-12 w-36" />
      </div>
    );
  }

  if (kind === "form") {
    return (
      <div className="relative z-[1] mx-auto w-full max-w-[480px] flex-1 px-5 py-10 md:px-7 md:py-14" aria-hidden>
        <div className="skeleton mb-8 h-12 w-full" />
        <div className="skeleton mb-4 h-4 w-28" />
        <div className="skeleton mb-6 h-12 w-full" />
        <div className="skeleton mb-4 h-4 w-24" />
        <div className="skeleton mb-8 h-12 w-full" />
        <div className="skeleton h-12 w-40" />
      </div>
    );
  }

  if (kind === "lobby") {
    return (
      <div className="relative z-[1] mx-auto w-full max-w-[720px] flex-1 px-5 py-10 md:px-7 md:py-14" aria-hidden>
        <div className="skeleton mb-4 h-3 w-24" />
        <div className="skeleton mb-8 h-12 w-64" />
        <div className="skeleton mb-6 h-20 w-full" />
        <div className="space-y-3">
          <div className="skeleton h-16 w-full" />
          <div className="skeleton h-16 w-full" />
          <div className="skeleton h-16 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-[1] mx-auto w-full max-w-[1440px] flex-1 px-5 py-10 md:px-7 md:py-14" aria-hidden>
      <div className="skeleton mb-4 h-12 w-56" />
      <div className="skeleton mb-10 h-4 w-72" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="skeleton h-64 w-full" />
        <div className="skeleton h-64 w-full" />
        <div className="skeleton h-64 w-full" />
      </div>
    </div>
  );
}
