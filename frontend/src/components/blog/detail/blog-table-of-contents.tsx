import { FaArrowTurnUp } from 'react-icons/fa6';
import type { BlogSection } from '@/types/content';

export function BlogTableOfContents({ sections }: { sections: BlogSection[] }) {
  if (!sections.length) return null;
  return (
    <nav aria-labelledby="toc-heading" className="rounded-lg bg-white p-5">
      <h2 id="toc-heading" className="text-2xl leading-7 font-medium">
        Table of Contents
      </h2>
      <ol className="mt-4 flex flex-col gap-3">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.anchor}`}
              className="flex gap-2 text-xs md:text-sm leading-5 text-gs-body transition-colors hover:text-gs-gold"
            >
              <FaArrowTurnUp
                aria-hidden="true"
                className="mt-1 size-3 shrink-0 rotate-90"
              />
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
