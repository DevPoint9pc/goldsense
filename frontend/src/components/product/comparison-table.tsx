import { comparisonPdfPath, comparisonRows } from '@/data/product';
import { SectionIntro } from '@/components/site/section-intro';
import { BiSolidFilePdf } from 'react-icons/bi';
import { ButtonLink } from '../site/button-link';
import { strapiMediaUrl } from '@/lib/strapi-media';

export function ComparisonTable() {
  return (
    <section aria-labelledby="comparison-heading">
      <SectionIntro
        id="comparison-heading"
        eyebrow="Comparison"
        title="Verify With Precision"
      />
      <div className="mt-10 rounded-lg bg-white px-5 py-2 md:mt-13">
        <table className="block w-full border-collapse text-left md:table">
          <caption className="sr-only">
            GoldSense™ compared with an XRF karatometer
          </caption>
          <thead className="block md:table-header-group">
            <tr className="grid grid-cols-2 gap-x-4 border-b border-gs-line md:table-row">
              <th scope="col" className="hidden w-1/3 py-5 md:table-cell">
                <span className="sr-only">Criteria</span>
              </th>
              <th
                scope="col"
                className="py-5 font-serif text-base md:w-1/3 font-medium text-gs-ink md:text-lg"
              >
                GoldSense™
              </th>
              <th
                scope="col"
                className="py-5 font-serif text-base font-medium text-gs-ink md:text-lg"
              >
                XRF Karatometer
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {comparisonRows.map((row) => (
              <tr
                key={row.label}
                className="grid grid-cols-2 gap-x-4 border-b border-gs-line py-4 last:border-b-0 md:table-row md:py-0"
              >
                <th
                  scope="row"
                  className="col-span-2 pb-2 font-serif text-base font-medium text-gs-ink md:table-cell md:py-5 md:pr-6 md:text-lg"
                >
                  {row.label}
                </th>
                <td className="text-sm leading-5 text-gs-body md:py-5 md:pr-6 md:text-base">
                  {row.goldsense}
                </td>
                <td className="text-sm leading-5 text-gs-body md:py-5 md:text-base">
                  {row.xrf}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ButtonLink
        variant="secondary"
        className="mt-6 py-6 gap-3 px-5 text-sm font-normal md:text-base"
        href={strapiMediaUrl(comparisonPdfPath)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Explore Full Comparison
        <BiSolidFilePdf
          aria-hidden="true"
          className="ml-px size-6 fill-black"
        />
      </ButtonLink>
    </section>
  );
}
