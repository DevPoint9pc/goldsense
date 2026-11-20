import Image from "next/image";
import type { BlogAuthor } from "@/types/content";
import { formatReadingTime } from "@/lib/format";

export function BlogAuthorBadge({ author, readingTime }: { author: BlogAuthor | null; readingTime: number | null }) {
  if (!author && readingTime === null) return null;
  return (
    <div className="flex items-center gap-3">
      {author?.avatar && (
        <Image
          src={author.avatar.src}
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-full object-cover"
        />
      )}
      <div className="flex flex-col">
        {author && <span className="text-sm leading-5 font-medium text-gs-ink">{author.name}</span>}
        {readingTime !== null && <span className="text-xs leading-4 text-gs-muted">{formatReadingTime(readingTime)}</span>}
      </div>
    </div>
  );
}
