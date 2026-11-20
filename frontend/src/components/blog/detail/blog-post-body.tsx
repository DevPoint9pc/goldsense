import type { BlogPostDetail } from "@/types/content";
import { BlocksContent } from "../blocks/blocks-content";
import { BlogPostSection } from "./blog-post-section";

export function BlogPostBody({ post }: { post: BlogPostDetail }) {
  return (
    <div className="mt-10">
      <BlocksContent content={post.intro} className="pb-10" />
      {post.sections.map((section) => (
        <BlogPostSection key={section.id} section={section} />
      ))}
    </div>
  );
}
