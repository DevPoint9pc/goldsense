export function VideoCountBadge({ count, isLatest }: { count: number; isLatest: boolean }) {
  return (
    <div className="flex w-21 shrink-0 flex-col overflow-hidden rounded-md bg-white text-center">
      {isLatest ? (
        <span className="h-4 bg-gs-gold text-xs leading-4 text-white">Latest</span>
      ) : (
        <span aria-hidden="true" className="h-4" />
      )}
      <span className="font-serif text-3xl leading-8 font-medium text-gs-ink">{count}</span>
      <span className="pb-3 text-xs leading-4 text-gs-ink">Videos</span>
    </div>
  );
}
