import Link from "next/link";
import { LuChevronLeft } from "react-icons/lu";
import type { BlogPostDetail } from "@/types/content";
import { BlogAuthorBadge } from "./blog-author-badge";
import { BlogShareLinks } from "./blog-share-links";
import { BlogTableOfContents } from "./blog-table-of-contents";

export function BlogPostSidebar({ post }: { post: BlogPostDetail }) {
  return (
    <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
      <Link href="/blogs" className="inline-flex items-center gap-2 self-start text-sm text-gs-ink hover:text-gs-gold">
        <LuChevronLeft aria-hidden="true" className="size-4" strokeWidth={2} />
        All Posts
      </Link>
      <div className="flex flex-col gap-6 lg:mt-8">
        <BlogAuthorBadge author={post.author} readingTime={post.readingTimeMinutes} />
        <BlogTableOfContents sections={post.sections} />
        <BlogShareLinks title={post.title} />
      </div>
    </aside>
  );
}
