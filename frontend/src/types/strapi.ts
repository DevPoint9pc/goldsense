export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: { page: number; pageSize: number; pageCount: number; total: number };
  };
}

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number | null;
  height: number | null;
}

export interface TextNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface LinkNode {
  type: "link";
  url: string;
  children: TextNode[];
}

export type InlineNode = TextNode | LinkNode;

export interface ListItemNode {
  type: "list-item";
  children: InlineNode[];
}

export type BlockNode =
  | { type: "paragraph"; children: InlineNode[] }
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; children: InlineNode[] }
  | { type: "list"; format: "ordered" | "unordered"; children: (ListItemNode | Extract<BlockNode, { type: "list" }>)[] }
  | { type: "quote"; children: InlineNode[] }
  | { type: "code"; language?: string; children: TextNode[] }
  | { type: "image"; image: { url: string; alternativeText?: string | null; width?: number; height?: number }; children: TextNode[] };

export type BlocksContent = BlockNode[];

export interface StrapiBlogCategory {
  id: number;
  documentId: string;
  name: string | null;
}

export interface StrapiAuthor {
  id: number;
  documentId: string;
  name: string | null;
  avatar: StrapiMedia | null;
}

export interface StrapiBlogSection {
  id: number;
  title: string;
  content: BlocksContent | null;
}

export interface StrapiBlogPost {
  id: number;
  documentId: string;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  publishedDate: string | null;
  publishedAt: string;
  readingTime: number | null;
  isFeatured: boolean | null;
  coverImage: StrapiMedia | null;
  blog_category: StrapiBlogCategory | null;
  author?: StrapiAuthor | null;
  intro?: BlocksContent | null;
  sections?: StrapiBlogSection[];
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface StrapiPrivacyPolicy {
  id: number;
  documentId: string;
  title: string | null;
  effectiveDate: string | null;
  lastUpdated: string | null;
  updatedAt: string;
  sections?: StrapiBlogSection[];
}

export interface StrapiTermsAndConditions {
  id: number;
  documentId: string;
  title: string | null;
  version: string | null;
  effectiveDate: string | null;
  lastUpdated: string | null;
  updatedAt: string;
  intro?: BlocksContent | null;
  sections?: StrapiBlogSection[];
}

export interface StrapiEventVideo {
  id: number;
  title: string | null;
  thumbnail: StrapiMedia | null;
  videoUrl: string | null;
}

export interface StrapiEvent {
  id: number;
  documentId: string;
  name: string | null;
  venue: string | null;
  startDate: string;
  endDate: string | null;
  videos?: StrapiEventVideo[];
}

export interface StrapiPressItem {
  id: number;
  documentId: string;
  title: string | null;
  type: "news" | "release" | null;
  publication: string | null;
  logo: StrapiMedia | null;
  publishedDate: string | null;
  publishedAt: string;
  readingTime: number | null;
  url: string | null;
  file: { url: string } | null;
}
