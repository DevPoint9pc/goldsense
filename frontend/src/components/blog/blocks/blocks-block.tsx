import Image from "next/image";
import { strapiMediaUrl } from "@/lib/strapi-media";
import { cn } from "@/lib/utils";
import type { BlockNode } from "@/types/strapi";
import { BlocksHtml } from "./blocks-html";
import { BlocksInline } from "./blocks-inline";
import { BlocksList } from "./blocks-list";

const headingClass: Record<number, string> = {
  1: "text-2xl md:text-3xl",
  2: "text-xl md:text-2xl",
  3: "text-lg md:text-xl",
  4: "text-base md:text-lg",
  5: "text-base",
  6: "text-sm",
};

export function BlocksBlock({ block }: { block: BlockNode }) {
  switch (block.type) {
    case "paragraph":
      if (block.children.every((child) => child.type === "text" && !child.text)) return null;
      return (
        <p>
          <BlocksInline nodes={block.children} />
        </p>
      );
    case "heading": {
      const Tag = `h${Math.min(Math.max(block.level + 1, 3), 6)}` as "h3";
      return (
        <Tag className={cn("mt-2 font-serif leading-snug font-medium text-gs-ink", headingClass[block.level])}>
          <BlocksInline nodes={block.children} />
        </Tag>
      );
    }
    case "list":
      return <BlocksList block={block} />;
    case "quote":
      return (
        <blockquote className="border-l-2 border-gs-gold pl-4 font-medium text-gs-ink">
          <BlocksInline nodes={block.children} />
        </blockquote>
      );
    case "code":
      if (block.language === "html") {
        return <BlocksHtml source={block.children.map((child) => child.text).join("")} />;
      }
      return (
        <pre className="overflow-x-auto rounded-md bg-gs-sand p-4 font-mono text-sm">
          {block.children.map((child) => child.text).join("")}
        </pre>
      );
    case "image": {
      const { url, alternativeText, width, height } = block.image;
      return (
        <Image
          src={strapiMediaUrl(url)}
          alt={alternativeText ?? ""}
          width={width ?? 1200}
          height={height ?? 675}
          sizes="(min-width: 1024px) 56rem, 100vw"
          className="h-auto w-full rounded-lg"
        />
      );
    }
    default:
      return null;
  }
}
