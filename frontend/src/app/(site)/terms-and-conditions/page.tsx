import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalDocument } from '@/components/site/legal-document';
import { getTermsAndConditions } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description:
    'The terms that govern your use of the GoldSense™ mobile application and karatometer device from India Gold Metaverse.',
  alternates: { canonical: '/terms-and-conditions' },
};

export default async function TermsAndConditionsPage() {
  const terms = await getTermsAndConditions();
  if (!terms) notFound();
  return <LegalDocument document={terms} />;
}
