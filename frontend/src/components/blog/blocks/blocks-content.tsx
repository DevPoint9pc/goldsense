import { cn } from "@/lib/utils";
import type { BlocksContent as BlocksContentData } from "@/types/strapi";
import { BlocksBlock } from "./blocks-block";

export function BlocksContent({ content, className }: { content: BlocksContentData; className?: string }) {
  if (!content.length) return null;
  return (
    <div className={cn("flex flex-col gap-4 text-sm leading-6 text-gs-body md:text-base md:leading-7", className)}>
      {content.map((block, i) => (
        <BlocksBlock key={i} block={block} />
      ))}
    </div>
  );
}
