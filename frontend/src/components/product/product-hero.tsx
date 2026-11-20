import Image from 'next/image';
import {
  LuBrainCircuit,
  LuLayers,
  LuRadiation,
  LuShieldCheck,
  LuSmartphone,
} from 'react-icons/lu';
import { BOOKING_HREF } from '@/data/navigation';
import {
  productGallery,
  productHighlights,
  unitsAvailableLabel,
} from '@/data/product';
import { ButtonLink } from '@/components/site/button-link';

const highlightIcons = {
  depth: LuLayers,
  'non-destructive': LuShieldCheck,
  'radiation-free': LuRadiation,
  ai: LuBrainCircuit,
  reports: LuSmartphone,
};

export function ProductHero() {
  return (
    <section aria-labelledby="product-heading" className="pt-14 md:pt-22">
      <div className="container-wide flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col items-start gap-3">
          <h1
            id="product-heading"
            className="text-3xl font-medium md:text-4xl text-gs-ink leading-[1.18]"
          >
            The AI-Powered Digital Karatometer
          </h1>
          <p className="max-w-xl text-sm leading-5 text-gs-muted">
            Go beyond the surface. Assess gold purity with a compact,
            non-destructive system designed for deeper, more consistent and
            traceable verification.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 md:items-center md:pt-1">
          <ButtonLink href={BOOKING_HREF} size="lg" className="w-48 rounded-lg">
            Book GoldSense™
          </ButtonLink>
          <p className="text-xs font-medium text-gs-success">
            {unitsAvailableLabel}
          </p>
        </div>
      </div>

      <div className="mt-10 overflow-hidden md:mt-14 motion-reduce:overflow-x-auto motion-reduce:scrollbar-none motion-reduce:[&::-webkit-scrollbar]:hidden">
        <ul
          className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
          aria-label="GoldSense™ product images"
        >
          {[...productGallery, ...productGallery].map((image, index) => {
            const isCopy = index >= productGallery.length;
            return (
              <li
                key={`${image.src}-${index}`}
                aria-hidden={isCopy || undefined}
                className="shrink-0 pr-2"
              >
                <div className="relative aspect-square w-[78vw] overflow-hidden rounded-xl md:w-sm lg:w-md">
                  <Image
                    src={image.src}
                    alt={isCopy ? '' : image.alt}
                    fill
                    priority={index < 3}
                    sizes="(min-width: 1024px) 448px, (min-width: 768px) 360px, 78vw"
                    className="object-cover"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <ul className="container-wide mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {productHighlights.map((item) => {
          const Icon = highlightIcons[item.icon];
          return (
            <li key={item.title} className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white">
                <Icon
                  aria-hidden="true"
                  className="size-5 text-gs-ink"
                  strokeWidth={2}
                />
              </span>
              <div className="flex flex-col items-start gap-2">
                <span className="block font-medium  font-serif text-base md:text-lg leading-5 text-gs-ink">
                  {item.title}
                </span>
                <span className="block text-sm leading-4 text-gs-muted">
                  {item.description}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
