'use client';

import { useMemo, useState } from 'react';
import type { BlogPost } from '@/types/content';
import { SiteButton } from '@/components/site/site-button';
import { BlogCard } from './blog-card';
import { FeaturedBlogPost } from './featured-blog-post';

interface BlogListingProps {
  posts: BlogPost[];
  pageSize: number;
}

export function BlogListing({ posts, pageSize }: BlogListingProps) {
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return posts;
    return posts.filter((post) =>
      [post.title, post.excerpt, post.category?.name ?? ''].some((field) =>
        field.toLowerCase().includes(term),
      ),
    );
  }, [posts, query]);

  const featured = query
    ? undefined
    : (filtered.find((post) => post.isFeatured) ?? filtered[0]);
  const rest = featured
    ? filtered.filter((post) => post !== featured)
    : filtered;
  const visible = rest.slice(0, visibleCount);
  const hasMore = rest.length > visibleCount;

  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl leading-[1.18] font-medium md:text-4xl">
          The GoldSense™ Journal
        </h1>
        <label className="w-full md:w-sm">
          <span className="sr-only">Search blogs</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisibleCount(pageSize);
            }}
            placeholder="Search blogs"
            className="h-11 w-full rounded-lg bg-white px-4 text-sm text-gs-ink outline-none placeholder:text-gs-subtle focus-visible:ring-2 focus-visible:ring-gs-gold"
          />
        </label>
      </div>

      {featured && (
        <div className="mt-10 md:mt-15">
          <FeaturedBlogPost post={featured} />
        </div>
      )}

      {visible.length > 0 ? (
        <ul className="mt-16 grid gap-x-5 gap-y-12 md:grid-cols-2 md:mt-20 lg:grid-cols-3 lg:gap-y-13">
          {visible.map((post) => (
            <li key={post.id}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        !featured && (
          <p
            role="status"
            className="mt-16 text-center text-sm text-gs-muted md:text-base"
          >
            {query ? (
              <>No articles match “{query}”.</>
            ) : (
              'No articles published yet.'
            )}
          </p>
        )
      )}

      {hasMore && (
        <div className="mt-15 flex justify-center">
          <SiteButton
            size="sm"
            className="h-9 px-5"
            onClick={() => setVisibleCount((count) => count + pageSize)}
          >
            View More
          </SiteButton>
        </div>
      )}
    </>
  );
}
