import Link from 'next/link';
import type { BlogPost } from '@/types/content';
import { BlogCover } from './blog-cover';
import { BlogMeta } from './blog-meta';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex flex-col">
      <BlogCover
        image={post.coverImage}
        sizes="(min-width: 1024px) 440px, (min-width: 768px) 50vw, 100vw"
        className="aspect-440/244"
      />
      <div className="mt-6">
        <BlogMeta post={post} />
      </div>
      <h2 className="mt-3 text-lg leading-7 font-medium tracking-[-0.015em] md:text-2xl">
        <Link
          href={`/blogs/${post.slug}`}
          className="after:absolute after:inset-0 hover:text-gs-gold"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 line-clamp-2 text-sm leading-5 text-gs-body md:text-base">
        {post.excerpt}
      </p>
    </article>
  );
}
