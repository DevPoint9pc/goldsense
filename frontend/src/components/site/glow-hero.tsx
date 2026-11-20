import { cn } from '@/lib/utils';

const glowBackground = [
  'linear-gradient(118deg, transparent 0 34%, rgb(255 255 255 / 0.32) 38%, transparent 44%)',
  'linear-gradient(118deg, transparent 0 52%, rgb(255 255 255 / 0.22) 57%, transparent 63%)',
  'linear-gradient(118deg, transparent 0 70%, rgb(255 255 255 / 0.18) 75%, transparent 82%)',
  'radial-gradient(ellipse 60% 70% at 8% 45%, rgb(255 246 237 / 0.9), transparent 70%)',
  'linear-gradient(180deg, #fdebd2 0%, #fdeed9 55%, #fbe9d3 100%)',
].join(', ');

interface GlowHeroProps {
  title: string;
  description: string;
  className?: string;
  children: React.ReactNode;
}

export function GlowHero({
  title,
  description,
  className,
  children,
}: GlowHeroProps) {
  return (
    <section
      className={cn(
        'relative isolate -mt-18 overflow-hidden pt-30 pb-20 md:pt-36',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: glowBackground }}
      />
      <div className="container-site flex flex-col items-center">
        <h1 className="text-center text-3xl leading-[1.18] font-medium md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-lg text-center text-sm leading-5 text-gs-body md:text-sm">
          {description}
        </p>
        <div className="mt-10 w-full max-w-xl md:mt-11">{children}</div>
      </div>
    </section>
  );
}
