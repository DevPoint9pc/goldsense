import type { Metadata } from 'next';
import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';
import { ContactForm } from '@/components/contact/contact-form';
import { FaqAccordion } from '@/components/site/faq-accordion';
import { GlowHero } from '@/components/site/glow-hero';
import { siteButtonVariants } from '@/components/site/site-button-variants';
import { featuredFaqs } from '@/data/faqs';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Have questions about GoldSense™? From the technology to deployment, the IGM team can help you understand GoldSense™ and what it can do.',
  alternates: { canonical: '/contact-us' },
};

export default function ContactPage() {
  return (
    <>
      <GlowHero
        title="Have Questions? Let’s Talk"
        description="From the technology to deployment, our team can help you understand GoldSense™ and what it can do."
        className="md:pb-16"
      >
        <ContactForm />
      </GlowHero>

      <section
        aria-labelledby="contact-faq-heading"
        className="container-site pb-24 pt-20 md:pb-30 md:pt-30"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,var(--container-md))_minmax(0,var(--container-2xl))] lg:justify-between">
          <div>
            <h2
              id="contact-faq-heading"
              className="max-w-md text-3xl leading-[1.18] font-medium md:text-4xl"
            >
              Everything You Need to Know
            </h2>
            <p className="mt-5 max-w-sm text-sm md:text-base leading-5 text-gs-body">
              Find answers to common questions about GoldSense™, its technology,
              testing process and digital reports.
            </p>
            <h3 className="mt-12 text-lg leading-7 font-medium tracking-[-0.01em] md:mt-14 md:text-2xl">
              Still need help?
            </h3>
            <p className="mt-3 text-sm md:text-base leading-5 text-gs-body">
              Talk to our team for personalised assistance.
            </p>
            <Link
              href="#contact-form"
              className={cn(
                siteButtonVariants({ variant: 'secondary' }),
                'mt-5 h-12 gap-1 px-5 text-sm font-normal',
              )}
            >
              Contact Support
              <LuArrowRight
                aria-hidden="true"
                className="size-4"
                strokeWidth={2}
              />
            </Link>
          </div>
          <FaqAccordion items={featuredFaqs} className="[&_li]:rounded-xl" />
        </div>
      </section>
    </>
  );
}
