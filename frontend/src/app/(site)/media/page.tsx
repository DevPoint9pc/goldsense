import type { Metadata } from 'next';
import { MediaTabs } from '@/components/media/media-tabs';
import { FaqSection } from '@/components/site/faq-section';
import { PageIntro } from '@/components/site/page-intro';
import { getMediaCoverage } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Media & Press',
  description:
    'Explore how GoldSense™ is being covered across business, technology, gold and jewellery media, and read IGM media releases.',
  alternates: { canonical: '/media' },
};

export default async function MediaPage() {
  const { news, releases } = await getMediaCoverage();

  return (
    <>
      <section className="container-site pt-16 md:pt-24">
        <PageIntro
          title="Media & Press"
          description="Explore how GoldSense™ is being covered across business, technology, gold and jewellery media."
        />
        <div className="mt-12 md:mt-14">
          <MediaTabs
            tabs={[
              {
                id: 'news',
                label: 'In the News',
                actionLabel: 'Read Article',
                items: news,
              },
              {
                id: 'releases',
                label: 'Media Release',
                actionLabel: 'Read release (PDF)',
                items: releases,
              },
            ]}
          />
        </div>
      </section>
      <FaqSection />
    </>
  );
}
