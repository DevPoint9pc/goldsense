import { BOOKING_HREF } from '@/data/navigation';
import { unitsAvailableLabel } from '@/data/product';
import { ButtonLink } from '@/components/site/button-link';

export function BookingCard() {
  return (
    <aside
      aria-label="Book GoldSense™"
      className="rounded-lg bg-white p-5 flex flex-col gap-5"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-medium leading-8">
          GoldSense™ Karatometer
        </h2>
        <p className=" text-sm text-gs-muted">
          Assess gold purity with precision, without damaging the gold.
        </p>
      </div>
      <p className=" text-base font-medium text-gs-success">
        {unitsAvailableLabel}
      </p>
      <div className=" flex flex-col gap-2">
        <ButtonLink
          href="/contact-us"
          variant="secondary"
          className=" w-full text-base font-normal"
        >
          Talk to our team
        </ButtonLink>
        <ButtonLink href={BOOKING_HREF} className=" w-full text-base">
          Book GoldSense™
        </ButtonLink>
      </div>
    </aside>
  );
}
