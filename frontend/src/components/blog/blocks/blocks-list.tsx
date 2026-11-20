import { cn } from "@/lib/utils";
import type { BlockNode, ListItemNode } from "@/types/strapi";
import { BlocksInline } from "./blocks-inline";

type ListBlock = Extract<BlockNode, { type: "list" }>;

/** Items already labelled in their text, e.g. "(a) …" or "(iv) …", so no bullet is drawn. */
const LABELLED_ITEM = /^\([a-z0-9]+\)\s/i;

function isLabelled(block: ListBlock) {
  return block.children.every((item) => {
    if (item.type === "list") return true;
    const first = (item as ListItemNode).children[0];
    return first?.type === "text" && LABELLED_ITEM.test(first.text);
  });
}

export function BlocksList({ block }: { block: ListBlock }) {
  const Tag = block.format === "ordered" ? "ol" : "ul";
  return (
    <Tag
      className={cn(
        "flex flex-col gap-2 pl-6",
        isLabelled(block) ? "list-none" : block.format === "ordered" ? "list-decimal" : "list-disc",
      )}
    >
      {block.children.map((item, i) =>
        item.type === "list" ? (
          <li key={i} className="list-none">
            <BlocksList block={item} />
          </li>
        ) : (
          <li key={i} className="pl-1">
            <BlocksInline nodes={(item as ListItemNode).children} />
          </li>
        ),
      )}
    </Tag>
  );
}
