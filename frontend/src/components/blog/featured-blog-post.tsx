import Link from 'next/link';
import { type BlogPost } from '@/types/content';
import { BlogCover } from './blog-cover';
import { BlogMeta } from './blog-meta';

export function FeaturedBlogPost({ post }: { post: BlogPost }) {
  return (
    <article className="group relative grid gap-8 lg:grid-cols-[minmax(0,min(var(--container-3xl),60%))_minmax(0,1fr)] lg:gap-10">
      <BlogCover
        image={post.coverImage}
        priority
        sizes="(min-width: 1024px) 760px, 100vw"
        className="aspect-760/420"
      />
      <div className="lg:pt-7">
        <BlogMeta post={post} />
        <h2 className="mt-4 max-w-lg text-2xl leading-[1.18] font-medium md:text-4xl">
          <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="mt-4 max-w-md text-sm md:text-base leading-5 text-gs-body">
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}
