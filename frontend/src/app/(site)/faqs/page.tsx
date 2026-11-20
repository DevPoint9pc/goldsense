import type { Metadata } from 'next';
import { FaqBrowser } from '@/components/site/faq-browser';
import { faqCategories, faqs } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'FAQs',
  description:
    'Answers about GoldSense™ — how the technology works, testing depth, device setup, digital reports, booking and support.',
  alternates: { canonical: '/faqs' },
};

export default function FaqsPage() {
  return (
    <section className="px-4 pb-24 pt-16 md:pb-24 md:pt-24">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-center text-3xl leading-[1.18] font-medium md:text-4xl">
          Everything You Need to Know
          <br className="hidden md:block" /> About GoldSense™
        </h1>
        <div className="mt-12 md:mt-18">
          <FaqBrowser items={faqs} categories={faqCategories} />
        </div>
      </div>
    </section>
  );
}
