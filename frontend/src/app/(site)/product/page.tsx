import type { Metadata } from 'next';
import { FaqSection } from '@/components/site/faq-section';
import { BookingCard } from '@/components/product/booking-card';
import { ComparisonTable } from '@/components/product/comparison-table';
import { DeviceComponents } from '@/components/product/device-components';
import { DigitalReport } from '@/components/product/digital-report';
import { HowItWorks } from '@/components/product/how-it-works';
import { ProbeAssessments } from '@/components/product/probe-assessments';
import { ProductHero } from '@/components/product/product-hero';
import { Reservation } from '@/components/product/reservation';
import { WorkflowSteps } from '@/components/product/workflow-steps';

export const metadata: Metadata = {
  title: 'The AI-Powered Digital Karatometer',
  description:
    'GoldSense™ assesses gold purity up to 7 mm per side with a compact, radiation-free, non-destructive two-probe system and AI-powered digital reports.',
  alternates: { canonical: '/product' },
};

export default function ProductPage() {
  return (
    <>
      <ProductHero />

      <div className="container-wide mt-28 flex flex-col gap-12 md:mt-60 lg:flex-row lg:justify-between lg:gap-10">
        <div className="flex min-w-0 flex-1 flex-col gap-28 md:gap-40 lg:max-w-4xl">
          <DeviceComponents />
          <ProbeAssessments />
          <ComparisonTable />
          <HowItWorks />
          <WorkflowSteps />
          <DigitalReport />
        </div>
        <div className="order-first lg:order-0 lg:w-[33%] lg:shrink-0">
          <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center">
            <BookingCard />
          </div>
        </div>
      </div>

      <Reservation />
      <FaqSection />
    </>
  );
}
