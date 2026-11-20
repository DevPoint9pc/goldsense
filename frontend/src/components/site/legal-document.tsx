import { BlogPostSection } from '@/components/blog/detail/blog-post-section';
import { BlogTableOfContents } from '@/components/blog/detail/blog-table-of-contents';
import { BlocksContent } from '@/components/blog/blocks/blocks-content';
import { FaqSection } from '@/components/site/faq-section';
import { formatDate } from '@/lib/format';
import type { BlocksContent as BlocksContentData } from '@/types/strapi';
import type { PrivacyPolicy } from '@/types/content';

interface LegalDocumentProps {
  document: PrivacyPolicy & { version?: string | null; intro?: BlocksContentData };
}

/** Shared layout for the Strapi-managed legal pages (privacy policy, terms). */
export function LegalDocument({ document }: LegalDocumentProps) {
  return (
    <>
      <div className="container-wide grid grid-cols-[minmax(0,1fr)] gap-10 pt-14 md:pt-25 lg:grid-cols-[--spacing(92)_minmax(0,var(--container-4xl))] lg:justify-between">
        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <dl className="flex flex-col gap-2 text-sm leading-5 text-gs-ink">
            {document.version && (
              <div className="flex gap-2">
                <dt className="font-medium">Version:</dt>
                <dd className="text-gs-body">{document.version}</dd>
              </div>
            )}
            <div className="flex gap-2">
              <dt className="font-medium">Effective date:</dt>
              <dd className="text-gs-body">
                {document.effectiveDate ? formatDate(document.effectiveDate) : 'TBD'}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium">Last updated:</dt>
              <dd className="text-gs-body">{formatDate(document.lastUpdated)}</dd>
            </div>
          </dl>
          <BlogTableOfContents sections={document.sections} />
        </aside>

        <article>
          <h1 className="text-3xl leading-[1.18] font-medium md:text-4xl">{document.title}</h1>
          {document.intro && <BlocksContent content={document.intro} className="mt-6" />}
          <div className="mt-6 [&>section:first-child]:border-t-0">
            {document.sections.map((section, index) => (
              <BlogPostSection key={section.id} section={section} number={index + 1} />
            ))}
          </div>
        </article>
      </div>

      <FaqSection />
    </>
  );
}
