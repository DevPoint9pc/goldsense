export function OrderStepIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-medium leading-7 tracking-[-0.015em]">
        {title}
      </h2>
      <p className="mt-1 text-sm leading-5 text-gs-ink">{description}</p>
    </div>
  );
}
