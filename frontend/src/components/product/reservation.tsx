import { BOOKING_HREF } from '@/data/navigation';
import { reservationSteps } from '@/data/product';
import { ButtonLink } from '@/components/site/button-link';

export function Reservation() {
  return (
    <section
      aria-labelledby="reserve-heading"
      className="container-site pt-28 md:pt-63"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <h2
          id="reserve-heading"
          className="text-4xl leading-tight font-medium md:text-6xl"
        >
          Reserve your GoldSense
        </h2>
        <p className="font-serif text-xl leading-8 font-medium tracking-[-0.01em] text-gs-ink md:text-2xl">
          <span className="marker-highlight px-1">25% advance per unit</span>
        </p>
        <p className="-mt-2 text-sm leading-5 text-gs-body italic">
          Advance is arranged offline and adjusted against the final invoice.
        </p>
        <ButtonLink
          href={BOOKING_HREF}
          size="lg"
          className="mt-2 w-48 rounded-lg"
        >
          Book GoldSense™
        </ButtonLink>
      </div>
      <ol className="mt-16 grid md:mt-30 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-0">
        {reservationSteps.map((step, index) => (
          <li
            key={step.title}
            className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 gap-y-1 border-t border-gs-line py-6 last:border-b md:flex md:flex-col md:gap-3 md:border-0 md:last:border-b-0 md:py-0 lg:pr-12"
          >
            <span
              aria-hidden="true"
              className="row-span-2 font-serif text-4xl leading-12 font-medium tracking-[-0.02em] text-gs-ink"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="self-end text-lg leading-6 font-medium tracking-[-0.01em] md:self-auto md:text-2xl">
              {step.title}
            </h3>
            <p className="text-sm leading-5 text-gs-muted md:max-w-3xs md:text-base">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
