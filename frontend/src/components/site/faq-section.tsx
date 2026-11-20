import { featuredFaqs } from '@/data/faqs';
import { cn } from '@/lib/utils';
import { FaqAccordion } from './faq-accordion';

export function FaqSection({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="faq-heading"
      className={cn('px-4 pb-20 pt-16 md:pb-38 md:pt-53', className)}
    >
      <h2
        id="faq-heading"
        className="text-center text-3xl leading-[1.18] font-medium md:text-4xl"
      >
        Frequently Asked Questions
      </h2>
      <FaqAccordion
        items={featuredFaqs}
        className="mx-auto mt-6 w-full max-w-xl 3xl:max-w-4xl"
      />
    </section>
  );
}
