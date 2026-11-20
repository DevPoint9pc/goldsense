import type { BlocksContent } from "./strapi";

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroupItem extends NavLink {
  description: string;
  icon: "blogs" | "events" | "media";
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
}

export type FaqCategory =
  | "product"
  | "testing-accuracy"
  | "device-setup"
  | "app-reports"
  | "booking-pricing"
  | "support";

export interface BlogCategory {
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTimeMinutes: number | null;
  isFeatured: boolean;
  category: BlogCategory | null;
  coverImage: ImageAsset | null;
}

export interface BlogAuthor {
  name: string;
  avatar: ImageAsset | null;
}

export interface BlogSection {
  id: string;
  anchor: string;
  title: string;
  content: BlocksContent;
}

export interface BlogPostDetail extends BlogPost {
  author: BlogAuthor | null;
  intro: BlocksContent;
  sections: BlogSection[];
  metaTitle: string | null;
  metaDescription: string | null;
}

export interface PrivacyPolicy {
  title: string;
  effectiveDate: string | null;
  lastUpdated: string;
  sections: BlogSection[];
}

export interface TermsAndConditions extends PrivacyPolicy {
  version: string | null;
  intro: BlocksContent;
}

export interface EventVideo {
  id: string;
  title: string;
  thumbnail: ImageAsset | null;
  vimeo: { src: string } | null;
}

export interface GoldSenseEvent {
  id: string;
  name: string;
  venue: string;
  dateLabel: string;
  isLatest: boolean;
  videos: EventVideo[];
}

export interface MediaItem {
  id: string;
  title: string;
  publication: string;
  logo: ImageAsset;
  publishedAt: string;
  readingTimeMinutes: number | null;
  url: string | null;
}

export interface MediaCoverage {
  news: MediaItem[];
  releases: MediaItem[];
}
