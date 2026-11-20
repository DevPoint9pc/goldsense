import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostBody } from "@/components/blog/detail/blog-post-body";
import { BlogPostHeader } from "@/components/blog/detail/blog-post-header";
import { BlogPostSidebar } from "@/components/blog/detail/blog-post-sidebar";
import { FaqSection } from "@/components/site/faq-section";
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/strapi";

const PLACEHOLDER_SLUG = "__no-posts-yet__";

export const instant = false;

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return (slugs.length ? slugs : [PLACEHOLDER_SLUG]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  const title = post.metaTitle ?? post.title;
  const description = post.metaDescription ?? post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: post.publishedAt,
      images: post.coverImage ? [{ url: post.coverImage.src, alt: post.coverImage.alt }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <div className="container-wide grid gap-10 pt-10 lg:grid-cols-[--spacing(92)_minmax(0,1fr)] lg:gap-20">
        <BlogPostSidebar post={post} />
        <article className="lg:pt-14">
          <BlogPostHeader post={post} />
          <BlogPostBody post={post} />
        </article>
      </div>
      <FaqSection />
    </>
  );
}
