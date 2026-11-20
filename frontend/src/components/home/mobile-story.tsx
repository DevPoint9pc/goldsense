import Image from 'next/image';
import Link from 'next/link';
import { BOOKING_HREF } from '@/data/navigation';
import {
  goldsenseHighlights,
  mobileImages,
  storyCopy,
  touchstoneMethods,
  xrfLimits,
} from '@/data/home';
import { cn } from '@/lib/utils';

/**
 * Phone version of the landing story: the same chapters as the desktop scroll animation,
 * stacked as plain sections with an image each.
 */
export function MobileStory() {
  return (
    <div className="story:hidden">
      <section
        aria-labelledby="mobile-hero-heading"
        className="relative -mt-18 h-svh min-h-150 overflow-hidden bg-[#F3DDC6]"
      >
        <Image
          src={mobileImages.hero.src}
          alt=""
          fill
          priority
          sizes="(min-width: 768px) and (orientation: landscape) 0px, 100vw"
          className="object-cover"
        />
        <h1
          id="mobile-hero-heading"
          className="absolute inset-x-4 top-1/2 -translate-y-1/2 text-center text-5xl leading-[1.05] font-medium"
        >
          Testing Gold
          <br />
          Should Not
          <br />
          Damage Gold
        </h1>
        <a
          href="#mobile-touchstone-heading"
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gs-ink/70 px-3.5 py-1.5 font-serif text-xs tracking-[1px] text-white uppercase"
        >
          Scroll
        </a>
      </section>

      <div className="bg-[#F3DDC6]">
        <section aria-labelledby="mobile-touchstone-heading" className="pt-14">
          <div className="container-wide">
            <h2
              id="mobile-touchstone-heading"
              className="scroll-mt-20 text-[32px] leading-[1.3] font-medium"
            >
              With traditional Touchstone testing, the{' '}
              <span className="marker-highlight">
                gold surface gets scraped
              </span>
            </h2>
            <p className="mt-3 text-[15px] leading-5.5 text-gs-ink">
              {storyCopy.touchstone.body}
            </p>
            <FeatureList items={touchstoneMethods} className="mt-10" />
            <p className="mt-10 font-serif text-[22px] leading-7.5 font-medium tracking-[-0.01em] text-gs-ink">
              {storyCopy.touchstone.closing}
            </p>
          </div>
          <FullWidth image={mobileImages.touchstone} className="mt-4" />
        </section>

        <section aria-labelledby="mobile-xrf-heading" className="pt-16">
          <div className="container-wide">
            <h2
              id="mobile-xrf-heading"
              className="text-center text-4xl leading-tight font-medium"
            >
              Then came the XRF karatometer
            </h2>
            <p className="mt-3 text-center text-sm text-gs-ink">
              {storyCopy.xrf.subtitle}
            </p>
            <FeatureList items={xrfLimits} className="mt-10" />
            <div className="mt-8 flex flex-col gap-3 text-[15px] leading-5.5 text-gs-ink">
              {storyCopy.xrf.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
            <p className="mt-8 font-serif text-[22px] leading-7.5 font-medium tracking-[-0.01em] text-gs-ink">
              {storyCopy.xrf.closing}
            </p>
          </div>
          <FullWidth image={mobileImages.xrf} className="mt-4" />
        </section>
      </div>

      <div className="bg-[#EDDCCA] pb-4 text-center">
        <section aria-labelledby="mobile-beyond-heading" className="pt-20">
          <h2
            id="mobile-beyond-heading"
            className="container-wide text-4xl leading-tight font-medium"
          >
            But what lies beyond the surface?
          </h2>
          <FullWidth image={mobileImages.beyond} className="mt-6" />
          <div className="container-wide">
            <p className="mt-10 font-serif font-medium text-[28px] leading-[1.15] text-gs-ink">
              Surface-Level
              <br />
              <span aria-label="is not">≠</span>
              <br />
              Complete Purity Insight
            </p>
            <p className="mx-auto mt-6 max-w-72 text-[15px] leading-5.5 text-gs-ink">
              {storyCopy.beyond.note}
            </p>
            <p className="mt-10 text-[15px] leading-5.5 text-gs-ink">
              {storyCopy.beyond.body}
            </p>
          </div>
        </section>

        <section aria-labelledby="mobile-deeper-heading" className="pt-24">
          <h2
            id="mobile-deeper-heading"
            className="container-wide text-4xl leading-tight font-medium"
          >
            What if we could look deeper?
          </h2>
          <FullWidth image={mobileImages.deeper} className="mt-6" />
          <div className="container-wide">
            <p className="mx-auto mt-10 max-w-80 font-serif text-[28px] leading-normal text-gs-ink">
              {storyCopy.deeper.caption}
            </p>
            <p className="mt-6 text-sm text-gs-ink">{storyCopy.deeper.note}</p>
          </div>
        </section>

        <section
          aria-labelledby="mobile-goldsense-heading"
          className="container-wide pt-24"
        >
          <h2
            id="mobile-goldsense-heading"
            className="text-4xl leading-[1.2] font-medium"
          >
            Presenting Goldsense™
          </h2>
          <p className="mt-2 font-serif text-base text-gs-ink">
            {storyCopy.goldsense.tagline}
          </p>
          <Image
            src={mobileImages.goldsense.src}
            alt="GoldSense™ device with a gold bangle placed on it"
            width={mobileImages.goldsense.width}
            height={mobileImages.goldsense.height}
            sizes="(min-width: 768px) and (orientation: landscape) 0px, 100vw"
            className="mt-10 h-auto w-full"
          />
          <p className="mt-10 text-sm leading-5.5 text-gs-ink">
            {storyCopy.goldsense.body}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <Link
              href={BOOKING_HREF}
              className="flex h-10 items-center justify-center rounded-full border border-transparent [background:linear-gradient(270deg,#FED98D_0%,#E3A352_100%)_padding-box,linear-gradient(90deg,#B57018_0%,#E0B358_100%)_border-box] text-sm font-medium text-gs-ink"
            >
              Order Now
            </Link>
            <Link
              href="/product"
              className="flex h-10 items-center justify-center rounded-full border border-[#3B2E27] text-sm text-gs-ink"
            >
              Know More
            </Link>
          </div>
          <FeatureList
            items={goldsenseHighlights}
            className="mt-10 text-left"
          />
        </section>
      </div>
    </div>
  );
}

/** A decorative image spanning the full screen width. */
function FullWidth({
  image,
  className,
}: {
  image: { src: string; width: number; height: number };
  className?: string;
}) {
  return (
    <Image
      src={image.src}
      alt=""
      width={image.width}
      height={image.height}
      sizes="(min-width: 768px) and (orientation: landscape) 0px, 100vw"
      className={cn('h-auto w-full', className)}
    />
  );
}

function FeatureList({
  items,
  className,
}: {
  items: { title: string; description: string }[];
  className?: string;
}) {
  return (
    <ul className={cn('flex flex-col gap-6', className)}>
      {items.map((item) => (
        <li key={item.title} className="border-l border-gs-ink pl-3">
          <p className="font-serif text-lg leading-6 font-medium text-gs-ink">
            {item.title}
          </p>
          <p className="mt-0.5 text-[13px] leading-4 text-gs-ink/70">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
