import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/blog-listing";
import { FaqSection } from "@/components/site/faq-section";
import { getBlogPosts } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "The GoldSense™ Journal",
  description:
    "Articles on gold testing, purity verification, testing depth and the technology behind GoldSense™.",
  alternates: { canonical: "/blogs" },
};

const BLOG_PAGE_SIZE = 9;

export default async function BlogsPage() {
  const posts = await getBlogPosts();
  return (
    <>
      <section className="container-wide pt-14 md:pt-18">
        <BlogListing posts={posts} pageSize={BLOG_PAGE_SIZE} />
      </section>
      <FaqSection />
    </>
  );
}
