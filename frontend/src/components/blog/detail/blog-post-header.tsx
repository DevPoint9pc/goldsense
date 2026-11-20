import type { BlogPostDetail } from '@/types/content';
import { formatDate } from '@/lib/format';
import { BlogCover } from '../blog-cover';

export function BlogPostHeader({ post }: { post: BlogPostDetail }) {
  return (
    <header>
      <h1 className="text-3xl leading-[1.18] font-medium md:text-4xl">
        {post.title}
      </h1>
      {post.excerpt && (
        <p className="mt-4 text-base leading-6 text-gs-body md:text-xl md:leading-7">
          {post.excerpt}
        </p>
      )}
      <BlogCover
        image={post.coverImage}
        priority
        sizes="(min-width: 1024px) 57rem, 100vw"
        className="mt-6 aspect-video md:mt-8"
      />
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs leading-4 text-gs-body">
          Published{' '}
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </p>
        {post.category && (
          <span className="inline-flex h-7 items-center rounded-full bg-gs-sand px-3 text-xs text-gs-ink">
            {post.category.name}
          </span>
        )}
      </div>
    </header>
  );
}
