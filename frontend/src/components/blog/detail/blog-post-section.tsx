import type { BlogSection } from "@/types/content";
import { BlocksContent } from "../blocks/blocks-content";

export function BlogPostSection({ section, number }: { section: BlogSection; number?: number }) {
  return (
    <section
      id={section.anchor}
      aria-labelledby={`${section.anchor}-heading`}
      className="scroll-mt-24 border-t border-gs-line py-10"
    >
      <h2 id={`${section.anchor}-heading`} className="flex gap-3 text-xl leading-8 font-medium md:text-2xl">
        {number !== undefined && <span>{number}.</span>}
        <span>{section.title}</span>
      </h2>
      <BlocksContent content={section.content} className="mt-4" />
    </section>
  );
}
