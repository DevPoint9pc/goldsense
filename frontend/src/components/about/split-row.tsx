export function SplitRow({ aside, children }: { aside: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid gap-6 md:grid-cols-[--spacing(77.5)_minmax(0,var(--container-xl))] md:gap-0">
      <div>{aside}</div>
      <div>{children}</div>
    </div>
  );
}
