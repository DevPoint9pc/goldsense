import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalDocument } from '@/components/site/legal-document';
import { getPrivacyPolicy } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How India Gold Metaverse collects, uses, shares and protects personal data in connection with GoldSense™ and its companion application.',
  alternates: { canonical: '/privacy-policy' },
};

export default async function PrivacyPolicyPage() {
  const policy = await getPrivacyPolicy();
  if (!policy) notFound();
  return <LegalDocument document={policy} />;
}
