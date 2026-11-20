import { cacheLife, cacheTag } from "next/cache";
import { api } from "@/lib/api";
import { strapiMediaUrl } from "@/lib/strapi-media";
import { formatDateRange } from "@/lib/format";
import { slugify, uniqueSlugs } from "@/lib/slugify";
import { getVimeoVideo } from "@/lib/vimeo";
import type {
  BlogPost,
  BlogPostDetail,
  BlogSection,
  EventVideo,
  GoldSenseEvent,
  ImageAsset,
  MediaCoverage,
  MediaItem,
  PrivacyPolicy,
  TermsAndConditions,
} from "@/types/content";
import type {
  BlocksContent,
  StrapiBlogPost,
  StrapiBlogSection,
  StrapiEvent,
  StrapiEventVideo,
  StrapiMedia,
  StrapiPressItem,
  StrapiPrivacyPolicy,
  StrapiResponse,
  StrapiTermsAndConditions,
} from "@/types/strapi";

const MEDIA_FIELDS = ["url", "alternativeText", "width", "height"];
const CARD_FIELDS = ["title", "slug", "excerpt", "publishedDate", "publishedAt", "readingTime", "isFeatured"];

function fieldParams(fields: string[], populatePath?: string) {
  const key = populatePath ? `${populatePath}[fields]` : "fields";
  return Object.fromEntries(fields.map((field, i) => [`${key}[${i}]`, field]));
}

const relationParams = {
  ...fieldParams(MEDIA_FIELDS, "populate[coverImage]"),
  ...fieldParams(["name"], "populate[blog_category]"),
};

const cardParams = { ...fieldParams(CARD_FIELDS), ...relationParams };

const detailParams = {
  ...fieldParams([...CARD_FIELDS, "intro", "metaTitle", "metaDescription"]),
  ...relationParams,
  ...fieldParams(["name"], "populate[author]"),
  ...fieldParams(MEDIA_FIELDS, "populate[author][populate][avatar]"),
  "populate[sections]": "true",
};

function toImage(media: StrapiMedia | null | undefined, fallbackAlt: string): ImageAsset | null {
  if (!media?.url) return null;
  return {
    src: strapiMediaUrl(media.url),
    alt: media.alternativeText || fallbackAlt,
    width: media.width ?? 1200,
    height: media.height ?? 675,
  };
}

function toBlogPost(post: StrapiBlogPost): BlogPost {
  const title = post.title ?? "Untitled";
  return {
    id: post.documentId,
    slug: post.slug ?? post.documentId,
    title,
    excerpt: post.excerpt ?? "",
    publishedAt: post.publishedDate ?? post.publishedAt,
    readingTimeMinutes: post.readingTime ?? null,
    isFeatured: Boolean(post.isFeatured),
    category:
      post.blog_category?.name ? { name: post.blog_category.name, slug: slugify(post.blog_category.name) } : null,
    coverImage: toImage(post.coverImage, title),
  };
}

function blocksText(blocks: BlocksContent | null | undefined): string {
  const walk = (node: unknown): string => {
    if (!node || typeof node !== "object") return "";
    const n = node as { text?: string; children?: unknown[] };
    return (n.text ?? "") + " " + (n.children ?? []).map(walk).join(" ");
  };
  return (blocks ?? []).map(walk).join(" ");
}

function toSections(raw: StrapiBlogSection[] | undefined): BlogSection[] {
  const sections = (raw ?? []).filter((section) => section.title?.trim());
  const anchors = uniqueSlugs(sections.map((section) => section.title));
  return sections.map((section, i) => ({
    id: String(section.id),
    anchor: anchors[i],
    title: section.title,
    content: section.content ?? [],
  }));
}

function toBlogPostDetail(post: StrapiBlogPost): BlogPostDetail {
  const base = toBlogPost(post);
  const sections = toSections(post.sections);
  const intro = post.intro ?? [];

  const words = [intro, ...sections.map((s) => s.content)].map(blocksText).join(" ").split(/\s+/).filter(Boolean).length;

  return {
    ...base,
    readingTimeMinutes: base.readingTimeMinutes ?? (words ? Math.max(1, Math.round(words / 200)) : null),
    author: post.author?.name
      ? { name: post.author.name, avatar: toImage(post.author.avatar, post.author.name) }
      : null,
    intro,
    sections,
    metaTitle: post.metaTitle?.trim() || null,
    metaDescription: post.metaDescription?.trim() || null,
  };
}

const PAGE_SIZE = 100;

export async function getBlogPosts(): Promise<BlogPost[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("blog-posts");

  const posts: StrapiBlogPost[] = [];
  try {
    for (let page = 1; ; page++) {
      const { data } = await api.get<StrapiResponse<StrapiBlogPost[]>>("/blog-posts", {
        params: {
          ...cardParams,
          "sort[0]": "publishedDate:desc",
          "sort[1]": "publishedAt:desc",
          "pagination[page]": page,
          "pagination[pageSize]": PAGE_SIZE,
        },
      });
      posts.push(...data.data);
      const pageCount = data.meta.pagination?.pageCount ?? 1;
      if (page >= pageCount) break;
    }
  } catch {
    return [];
  }
  return posts.map(toBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("blog-posts", `blog-post:${slug}`);

  try {
    const { data } = await api.get<StrapiResponse<StrapiBlogPost[]>>("/blog-posts", {
      params: { ...detailParams, "filters[slug][$eq]": slug, "pagination[pageSize]": 1 },
    });
    const post = data.data[0];
    return post ? toBlogPostDetail(post) : null;
  } catch {
    return null;
  }
}

export async function getBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((post) => post.slug);
}

export async function getPrivacyPolicy(): Promise<PrivacyPolicy | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("privacy-policy");

  try {
    const { data } = await api.get<StrapiResponse<StrapiPrivacyPolicy | null>>("/privacy-policy", {
      params: { "populate[sections]": "true" },
    });
    const policy = data.data;
    if (!policy) return null;
    return {
      title: policy.title ?? "Privacy Policy",
      effectiveDate: policy.effectiveDate,
      lastUpdated: policy.lastUpdated ?? policy.updatedAt,
      sections: toSections(policy.sections),
    };
  } catch {
    return null;
  }
}

export async function getTermsAndConditions(): Promise<TermsAndConditions | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("terms-and-conditions");

  try {
    const { data } = await api.get<StrapiResponse<StrapiTermsAndConditions | null>>("/terms-and-conditions", {
      params: { "populate[sections]": "true" },
    });
    const terms = data.data;
    if (!terms) return null;
    return {
      title: terms.title ?? "Terms and Conditions",
      version: terms.version,
      effectiveDate: terms.effectiveDate,
      lastUpdated: terms.lastUpdated ?? terms.updatedAt,
      intro: terms.intro ?? [],
      sections: toSections(terms.sections),
    };
  } catch {
    return null;
  }
}

async function toEventVideo(eventId: string, video: StrapiEventVideo): Promise<EventVideo> {
  const title = video.title ?? "Untitled video";
  const vimeo = video.videoUrl ? await getVimeoVideo(video.videoUrl) : null;
  const thumbnail =
    toImage(video.thumbnail, title) ??
    (vimeo?.thumbnail ? { src: vimeo.thumbnail, alt: title, width: 1280, height: 720 } : null);
  return {
    id: `${eventId}-${video.id}`,
    title,
    thumbnail,
    vimeo: vimeo && { src: vimeo.src },
  };
}

export async function getEvents(): Promise<GoldSenseEvent[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("events");

  try {
    const { data } = await api.get<StrapiResponse<StrapiEvent[]>>("/events", {
      params: {
        ...fieldParams(["name", "venue", "startDate", "endDate"]),
        "populate[videos][populate][thumbnail][fields][0]": "url",
        "populate[videos][populate][thumbnail][fields][1]": "alternativeText",
        "populate[videos][populate][thumbnail][fields][2]": "width",
        "populate[videos][populate][thumbnail][fields][3]": "height",
        "sort[0]": "startDate:desc",
        "pagination[pageSize]": PAGE_SIZE,
      },
    });
    return await Promise.all(
      data.data.map(async (event, index) => ({
        id: event.documentId,
        name: event.name ?? "Untitled event",
        venue: event.venue ?? "",
        dateLabel: formatDateRange(event.startDate, event.endDate),
        isLatest: index === 0,
        videos: await Promise.all((event.videos ?? []).map((video) => toEventVideo(event.documentId, video))),
      })),
    );
  } catch {
    return [];
  }
}

function toMediaItem(item: StrapiPressItem): MediaItem | null {
  const publication = item.publication ?? "";
  const logo = toImage(item.logo, `${publication} logo`);
  if (!item.title || !logo) return null;
  const fileUrl = item.file?.url ? strapiMediaUrl(item.file.url) : null;
  return {
    id: item.documentId,
    title: item.title,
    publication,
    logo,
    publishedAt: item.publishedDate ?? item.publishedAt,
    readingTimeMinutes: item.readingTime ?? null,
    url: fileUrl ?? (item.url?.trim() || null),
  };
}

export async function getMediaCoverage(): Promise<MediaCoverage> {
  "use cache";
  cacheLife("minutes");
  cacheTag("press-items");

  const coverage: MediaCoverage = { news: [], releases: [] };
  try {
    for (let page = 1; ; page++) {
      const { data } = await api.get<StrapiResponse<StrapiPressItem[]>>("/press-items", {
        params: {
          ...fieldParams(["title", "type", "publication", "publishedDate", "publishedAt", "readingTime", "url"]),
          ...fieldParams(MEDIA_FIELDS, "populate[logo]"),
          ...fieldParams(["url"], "populate[file]"),
          "sort[0]": "publishedDate:desc",
          "sort[1]": "publishedAt:desc",
          "pagination[page]": page,
          "pagination[pageSize]": PAGE_SIZE,
        },
      });
      for (const item of data.data) {
        const mediaItem = toMediaItem(item);
        if (mediaItem) (item.type === "release" ? coverage.releases : coverage.news).push(mediaItem);
      }
      if (page >= (data.meta.pagination?.pageCount ?? 1)) break;
    }
  } catch {
    return coverage;
  }
  return coverage;
}
