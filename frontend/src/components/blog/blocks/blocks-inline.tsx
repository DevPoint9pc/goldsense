import { Fragment } from "react";
import type { InlineNode } from "@/types/strapi";

export function BlocksInline({ nodes }: { nodes: InlineNode[] }) {
  return nodes.map((node, i) => {
    if (node.type === "link") {
      const external = /^https?:\/\//.test(node.url);
      return (
        <a
          key={i}
          href={node.url}
          className="underline underline-offset-2 hover:text-gs-gold"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <BlocksInline nodes={node.children} />
        </a>
      );
    }
    let text: React.ReactNode = node.text;
    if (node.code) text = <code className="rounded-sm bg-gs-sand px-1 font-mono text-[0.9em]">{text}</code>;
    if (node.bold) text = <strong className="font-semibold text-gs-ink">{text}</strong>;
    if (node.italic) text = <em>{text}</em>;
    if (node.underline) text = <u>{text}</u>;
    if (node.strikethrough) text = <s>{text}</s>;
    return <Fragment key={i}>{text}</Fragment>;
  });
}
