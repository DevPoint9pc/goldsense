import Image from 'next/image';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { FaClock, FaShareFromSquare } from 'react-icons/fa6';
import { reportFeatures } from '@/data/product';
import { SectionIntro } from '@/components/site/section-intro';

const reportIcons = {
  'test-id': FaClock,
  'surface-purity': FaStarHalf,
  'overall-purity': FaStar,
  share: FaShareFromSquare,
};

export function DigitalReport() {
  return (
    <section aria-labelledby="report-heading">
      <SectionIntro
        id="report-heading"
        eyebrow="Digital report"
        title="Every assessment leaves a record"
        description="Every GoldSense™ assessment generates a digital report with the details you need to review, verify and share the result."
        className="[&>p:last-child]:max-w-xl"
      />
      <ul className="mt-10 grid max-w-3xl gap-x-12 gap-y-6 md:grid-cols-2 md:mt-13">
        {reportFeatures.map((item) => {
          const Icon = reportIcons[item.icon];
          return (
            <li key={item.title} className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white">
                <Icon aria-hidden="true" className="size-5 text-gs-ink" />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-base leading-5 font-medium md:text-lg">{item.title}</h3>
                <p className="max-w-2xs text-sm leading-5 text-gs-muted">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="relative mt-10 aspect-2280/1797 w-full max-w-3xl overflow-hidden rounded-xl">
        <Image
          src="/assets/product/product-digital-report-device-app.png"
          alt="GoldSense™ probe on the device beside a smartphone showing a 21.90 karat result"
          fill
          sizes="(min-width: 1024px) 760px, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
