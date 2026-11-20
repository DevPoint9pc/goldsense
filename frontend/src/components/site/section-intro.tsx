import { cn } from '@/lib/utils';

interface SectionIntroProps {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

export function SectionIntro({
  id,
  eyebrow,
  title,
  description,
  className,
}: SectionIntroProps) {
  return (
    <div className={cn('flex flex-col items-start gap-4', className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        id={id}
        className={cn(
          'text-3xl font-medium md:text-4xl text-gs-ink leading-[1.18]',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(' max-w-lg text-sm md:text-base leading-5 text-gs-ink')}
        >
          {description}
        </p>
      )}
    </div>
  );
}
