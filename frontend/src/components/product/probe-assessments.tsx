import Image from 'next/image';
import { probeAssessments } from '@/data/product';
import { SectionIntro } from '@/components/site/section-intro';

export function ProbeAssessments() {
  return (
    <section aria-labelledby="probe-heading">
      <SectionIntro
        id="probe-heading"
        eyebrow="The two-probe system"
        title="Two assessments. One deeper picture"
        description="GoldSense™ combines dual assessment, AI-powered analysis and digital reporting in one compact, portable system."
      />
      <ul className="mt-10 grid gap-4 md:grid-cols-2 md:mt-13">
        {probeAssessments.map((item) => (
          <li key={item.title} className="flex flex-col gap-2 rounded-lg bg-white p-5">
            <p className="eyebrow">{item.probe}</p>
            <h3 className="text-lg leading-6 font-medium tracking-[-0.01em] md:text-2xl">
              {item.title}
            </h3>
            <p className="text-sm leading-5 text-gs-muted">{item.description}</p>
            <div className="relative mt-3 aspect-1287/621 overflow-hidden rounded-md bg-gs-cream">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 1024px) 430px, (min-width: 768px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-2">
        <h3 className="text-xl leading-8 font-medium md:text-3xl">Surface + Depth</h3>
        <p className="max-w-lg text-sm leading-5 text-gs-muted md:text-base">
          Two assessments of up to 7 mm each, enabling assessment across up to 14 mm of composite material.
        </p>
      </div>
    </section>
  );
}
