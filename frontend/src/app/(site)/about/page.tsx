import { type Metadata } from 'next';
import Image from 'next/image';
import { FaqSection } from '@/components/site/faq-section';
import { Logo } from '@/components/site/logo';
import { igmPillars, mentorBio, technologyHighlights } from '@/data/about';
import { SplitRow } from '@/components/about/split-row';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Gold is Technology™. Learn how IGM - India Gold Metaverse is building the technology ecosystem behind GoldSense™, guided by Jignesh Shah.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <section className="container-site pt-20 md:pt-35">
        <h1 className="text-5xl leading-[1.05] font-medium tracking-[-0.03em] md:text-7xl lg:text-8xl">
          Gold is Technology™
        </h1>
        <div className="mt-8 md:mt-15">
          <SplitRow
            aside={
              <span className="inline-flex h-7 items-center rounded-md bg-gs-sand px-3 text-xs font-semibold uppercase tracking-[0.04em] text-gs-ink">
                The Vision
              </span>
            }
          >
            <p className="text-lg leading-normal font-medium text-gs-body md:text-2xl md:leading-8">
              Gold has been trusted for generations. IGM is building the
              technology ecosystem to transform how gold is discovered, tested,
              traded, owned and experienced.
            </p>
          </SplitRow>
        </div>
      </section>

      <div className="relative mt-16 aspect-video w-full md:mt-25 md:aspect-1440/666">
        <Image
          src="/assets/about/about-hero-goldsense-device-bangle.png"
          alt="GoldSense™ device assessing a gold bangle, with the purity report shown on a smartphone"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <section
        aria-labelledby="igm-heading"
        className="container-site pt-24 md:pt-34"
      >
        <SplitRow
          aside={
            <Image
              src="/assets/brand/igm-logo-tagline.png"
              alt="IGM - India Gold Metaverse"
              width={193}
              height={96}
              className="h-auto w-30"
            />
          }
        >
          <h2
            id="igm-heading"
            className="text-3xl leading-[1.18] font-medium md:text-4xl"
          >
            India Gold Metaverse
          </h2>
          <div className="mt-6 flex flex-col gap-5 font-medium text-sm md:text-base leading-6 text-gs-body">
            <p>
              IGM is building a new-age technology ecosystem designed to
              transform the way gold is discovered, tested, traded, owned and
              experienced.
            </p>
            <p>
              At its core, IGM is on a mission to convert gold into technology
              by bringing greater Programmability, Transmissibility,
              Fractionalization and Transparency to one of the world&apos;s
              oldest and most trusted stores of value.
            </p>
            <p>
              By combining technology with India&apos;s deep cultural and
              economic relationship with gold, IGM seeks to create an integrated
              digital ecosystem spanning:
            </p>
          </div>
        </SplitRow>

        <ol className="mt-16 grid gap-12 md:mt-38 md:grid-cols-3 md:gap-20">
          {igmPillars.map((pillar, index) => (
            <li key={pillar.title}>
              <div className="flex items-baseline justify-between border-b border-gs-line-strong pb-3 font-serif text-lg leading-6 font-medium tracking-[-0.01em] text-gs-ink md:text-2xl">
                <h3 className="text-lg leading-6 font-medium md:text-2xl">
                  {pillar.title}
                </h3>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-6 text-sm font-medium md:text-base leading-5 text-gs-body">
                {pillar.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="goldsense-heading"
        className="container-site pt-32 md:pt-73"
      >
        <SplitRow aside={<Logo className="w-42" />}>
          <h2
            id="goldsense-heading"
            className="max-w-lg text-3xl leading-[1.18] font-medium md:text-4xl"
          >
            Redefining how gold is verified, valued and trusted
          </h2>
          <div className="mt-7 flex flex-col gap-5 font-medium text-sm md:text-base leading-6 text-gs-body">
            <p>
              GoldSense™ is a first-of-its-kind portable, AI-powered scientific
              digital karatometer.
            </p>
            <p>
              Unlike conventional XRF karatometers, which are bulky, immobile,
              and only analyse the surface-level purity of gold, GoldSense™ uses
              AI-driven, multi-layer, non-destructive analysis to examine both
              surface-level and sub-surface purity up to 14,000 microns depth of
              composite material in two assessments (7,000 microns + 7,000
              microns).
            </p>
          </div>
        </SplitRow>

        <h2 className="mt-20 text-2xl leading-[1.18] font-medium md:mt-35 md:text-4xl">
          Technology that looks beyond the surface
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {technologyHighlights.map((item) => (
            <li
              key={item.title}
              className="border-l border-gs-line-strong pl-5 lg:mr-15"
            >
              <h3 className="text-lg leading-6 font-medium tracking-[-0.01em] md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-2 max-w-53 text-sm font-normal md:text-base leading-5 text-gs-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="mentor-heading"
        className="container-footer pt-28 md:pt-55"
      >
        <div className="grid gap-10 md:grid-cols-[minmax(0,min(var(--container-xl),45%))_minmax(0,1fr)]">
          <div className="relative aspect-600/768 w-full overflow-hidden">
            <Image
              src="/assets/about/jignesh-shah-portrait.png"
              alt="Portrait of Jignesh Shah, Mentor & Coach of IGM"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-[56%_center]"
            />
          </div>
          <div className="lg:pt-22">
            <p className="text-base leading-4 font-medium text-gs-ink">
              Guided by
            </p>
            <h2
              id="mentor-heading"
              className="mt-2 text-3xl leading-[1.18] font-medium md:text-4xl"
            >
              Jignesh Shah
            </h2>
            <p className="mt-3 text-base font-medium leading-4 text-gs-ink">
              Mentor &amp; Coach, IGM
            </p>
            <div className="mt-8 flex max-w-xl flex-col gap-6 text-sm md:text-base leading-6 text-gs-body">
              {mentorBio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl text-center md:mt-12">
          <p className="text-lg leading-relaxed text-gs-body md:text-xl md:leading-8">
            In his new avatar, Jignesh Shah, as the Mentor &amp; Coach of IGM,
            is on a quest to redefine the gold markets with technology, driven
            by a powerful new philosophy:
          </p>
          <p className="mt-6 font-sans text-3xl leading-[1.18] font-medium text-gs-ink md:mt-7 md:text-4xl">
            Gold is Technology™
          </p>
        </div>
      </section>

      <FaqSection />
    </>
  );
}
