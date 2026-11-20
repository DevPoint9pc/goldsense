import type { BlogPost } from '@/types/content';
import { formatDate, formatReadingTime } from '@/lib/format';

export function BlogMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-col items-start gap-3">
      <p className="flex items-center gap-2 text-xs md:text-sm leading-4 text-gs-body">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        {post.readingTimeMinutes !== null && (
          <>
            <span
              aria-hidden="true"
              className="size-1 rounded-full bg-gs-body"
            />
            <span>{formatReadingTime(post.readingTimeMinutes)}</span>
          </>
        )}
      </p>
      {post.category && (
        <span className="inline-flex h-6 items-center rounded-full bg-gs-sand px-3 text-xs md:text-sm text-gs-ink">
          {post.category.name}
        </span>
      )}
    </div>
  );
}
