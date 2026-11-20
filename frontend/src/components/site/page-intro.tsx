export function PageIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-3xl leading-[1.18] font-medium md:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-xl text-sm md:text-base leading-5 text-gs-body">
        {description}
      </p>
    </div>
  );
}
