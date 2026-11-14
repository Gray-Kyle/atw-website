import { BLOG_API_ORIGIN } from '../lib/site';

export type PublicPostAuthor = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type PublicPost = {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: PublicPostAuthor | null;
  status?: string | null;
  category?: string | null;
  tags?: string[] | null;
  featuredImage?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  readTime?: number | null;
};

/** Card/list projection used by the blog index UI (no full body). */
export type BlogCardPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string | null;
  updatedAt: string | null;
  readTime: number;
  category: string;
  topics: string[];
  featuredImage: string | null;
  authorName: string;
};

/**
 * Kyle: never ship U+2014 em dashes in site content.
 * Prefer a comma (reads naturally for word-word and spaced - cases).
 * Also normalize legacy "ATW Network" brand text from CMS posts to ATW.Net.
 */
export function stripEmDashes(text: string): string {
  return text
    .replace(/(\w)\u2014(\w)/g, '$1, $2')
    .replace(/\s*\u2014\s*/g, ', ')
    .replace(/,\s+,/g, ',')
    .replace(/\bATW Network\b/g, 'ATW.Net');
}

/**
 * Slugs / titles that look like smoke, scheduler, or placeholder posts.
 * Kyle should unpublish these in One; we still noindex and drop them from the sitemap.
 */
const TEST_BLOG_SLUG_PATTERNS: RegExp[] = [
  /^new-post$/i,
  /^test-post$/i,
  /^test-/i,
  /smoke/i,
  /codex-scheduler/i,
  /^schudled-/i,
  /^scheduled-/i,
  /^post-with-image$/i,
];

const TEST_BLOG_TITLE_PATTERNS: RegExp[] = [
  /^test\b/i,
  /\bsmoke\b/i,
  /\bschedule[rd]?\b/i,
];

export function isLikelyTestBlogPost(post: Pick<PublicPost, 'slug' | 'title' | 'status'>): boolean {
  const status = (post.status ?? '').toLowerCase();
  if (status && status !== 'published' && status !== 'public') {
    return true;
  }
  if (TEST_BLOG_SLUG_PATTERNS.some((re) => re.test(post.slug))) {
    return true;
  }
  if (post.title && TEST_BLOG_TITLE_PATTERNS.some((re) => re.test(post.title))) {
    return true;
  }
  return false;
}

/** True when a sitemap loc is a blog URL we should not advertise. */
export function isExcludedBlogSitemapUrl(pageUrl: string): boolean {
  try {
    const { pathname } = new URL(pageUrl);
    const match = pathname.match(/^\/blog\/([^/]+)\/?$/);
    if (!match) return false;
    return isLikelyTestBlogPost({ slug: decodeURIComponent(match[1]), title: '' });
  } catch {
    return false;
  }
}

/**
 * Editorial topic filters for the blog index.
 * API categories are coarse (Business, Marketing, …); topics map products + themes.
 */
export const BLOG_TOPICS = [
  { id: 'all', label: 'All' },
  { id: 'one', label: 'ATW One' },
  { id: 'orbit', label: 'Orbit' },
  { id: 'hub', label: 'Hub' },
  { id: 'workforce', label: 'Workforce' },
  { id: 'ai', label: 'AI' },
  { id: 'directory', label: 'Directory' },
  { id: 'operations', label: 'Business Operations' },
  { id: 'erp-crm', label: 'ERP / CRM' },
] as const;

export type BlogTopicId = (typeof BLOG_TOPICS)[number]['id'];

const TOPIC_PRODUCT_HREF: Record<Exclude<BlogTopicId, 'all' | 'operations' | 'erp-crm'>, string> = {
  one: '/one/',
  orbit: '/orbit/',
  hub: '/hub/',
  workforce: '/workforce/',
  ai: '/ai/',
  directory: '/systems/directory/',
};

export function productHrefForTopics(topics: readonly string[]): string | null {
  for (const topic of topics) {
    if (topic in TOPIC_PRODUCT_HREF) {
      return TOPIC_PRODUCT_HREF[topic as keyof typeof TOPIC_PRODUCT_HREF];
    }
  }
  if (topics.includes('erp-crm') || topics.includes('operations')) return '/one/';
  return null;
}

export function productLabelForHref(href: string): string {
  switch (href) {
    case '/one/':
      return 'ATW One';
    case '/orbit/':
      return 'ATW Orbit';
    case '/hub/':
      return 'ATW Hub';
    case '/workforce/':
      return 'ATW Workforce';
    case '/ai/':
      return 'ATW AI';
    case '/systems/directory/':
      return 'Directory';
    default:
      return 'ATW';
  }
}

function haystack(post: PublicPost): string {
  return [
    post.title,
    post.excerpt ?? '',
    post.category ?? '',
    ...(post.tags ?? []),
    post.slug,
  ]
    .join(' ')
    .toLowerCase();
}

/** Assign one or more topic ids from API category + title/tags keywords. */
export function topicsForPost(post: PublicPost): BlogTopicId[] {
  const text = haystack(post);
  const topics = new Set<BlogTopicId>();

  if (/\bworkforce\b|\bagents?\b/.test(text)) topics.add('workforce');
  if (/\batw ai\b|\bai\b|\bartificial intelligence\b/.test(text)) topics.add('ai');
  if (/\borbit\b|\bmail\b|\bcalendar\b|\bmeetings?\b|\bemail\b/.test(text)) topics.add('orbit');
  if (/\bhub\b|\binbox\b|\boutlook\b/.test(text)) topics.add('hub');
  if (/\bdirectory\b|\bidentity\b|\baccess\b|\bsso\b/.test(text)) topics.add('directory');
  if (/\batw one\b|\bone workspace\b/.test(text)) topics.add('one');
  if (/\berp\b|\bcrm\b|\bzoho\b|\bsalesforce\b|\bodoo\b|\bhubspot\b|\bquickbooks\b/.test(text)) {
    topics.add('erp-crm');
  }
  if (
    /\binventory\b|\bmanufacturing\b|\bwms\b|\boperations\b|\bwarehouse\b|\bretail\b|\blogistics\b/.test(
      text,
    )
  ) {
    topics.add('operations');
  }

  const category = (post.category ?? '').toLowerCase();
  if (category === 'manufacturing') topics.add('operations');
  if (category === 'marketing' || category === 'business') {
    if (topics.size === 0) topics.add('operations');
  }
  if (category === 'technology' || category === 'development' || category === 'analytics') {
    if (topics.size === 0) topics.add('one');
  }

  if (topics.size === 0) topics.add('erp-crm');
  return [...topics];
}

export function primaryTopicLabel(topics: readonly string[], fallbackCategory?: string | null): string {
  const ordered = BLOG_TOPICS.filter((t) => t.id !== 'all' && topics.includes(t.id));
  if (ordered[0]) return ordered[0].label;
  return fallbackCategory?.trim() || 'ATW';
}

export function estimateReadTimeMinutes(post: PublicPost): number {
  if (typeof post.readTime === 'number' && post.readTime > 0) return post.readTime;
  const text = (post.content ?? post.excerpt ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = text ? text.split(' ').length : 200;
  return Math.max(1, Math.round(words / 200));
}

export function defaultAuthorName(post: PublicPost): string {
  const name = post.author?.name?.trim();
  if (name && !/^unknown$/i.test(name) && !/^admin$/i.test(name)) return name;
  return 'ATW.Net team';
}

export function normalizePost(post: PublicPost): PublicPost {
  return {
    ...post,
    title: stripEmDashes(post.title),
    excerpt: post.excerpt ? stripEmDashes(post.excerpt) : post.excerpt,
    content: post.content ? stripEmDashes(post.content) : post.content,
    seoTitle: post.seoTitle ? stripEmDashes(post.seoTitle) : post.seoTitle,
    seoDescription: post.seoDescription ? stripEmDashes(post.seoDescription) : post.seoDescription,
  };
}

export function toBlogCard(post: PublicPost): BlogCardPost {
  const topics = topicsForPost(post);
  return {
    slug: post.slug,
    title: post.title,
    excerpt: (post.excerpt || '').trim(),
    publishedAt: post.publishedAt ?? null,
    updatedAt: post.updatedAt ?? null,
    readTime: estimateReadTimeMinutes(post),
    category: primaryTopicLabel(topics, post.category),
    topics,
    featuredImage: post.featuredImage?.trim() || null,
    authorName: defaultAuthorName(post),
  };
}

export function sortPostsNewestFirst(posts: PublicPost[]): PublicPost[] {
  return [...posts].sort((a, b) => {
    const da = Date.parse(a.publishedAt || a.createdAt || '') || 0;
    const db = Date.parse(b.publishedAt || b.createdAt || '') || 0;
    return db - da;
  });
}

export async function fetchIndexablePosts(limit = 100): Promise<PublicPost[]> {
  const posts = await fetchPublicPosts(limit);
  return sortPostsNewestFirst(
    posts.map(normalizePost).filter((post) => !isLikelyTestBlogPost(post)),
  );
}

export type TocItem = { id: string; text: string; level: 2 | 3 };

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

/** Remove CMS-injected JSON-LD so the page owns a single BlogPosting graph. */
export function stripEmbeddedJsonLd(html: string): string {
  return html.replace(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
    '',
  );
}

/** Inject id attributes on h2/h3 and return TOC items. */
export function enhanceHtmlWithToc(html: string): { html: string; toc: TocItem[] } {
  if (!html) return { html: '', toc: [] };
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const nextHtml = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (full, level, attrs, inner) => {
    const text = String(inner)
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!text) return full;
    let id = slugifyHeading(text) || `section-${toc.length + 1}`;
    let n = 2;
    while (used.has(id)) {
      id = `${slugifyHeading(text)}-${n++}`;
    }
    used.add(id);
    toc.push({ id, text, level: Number(level) as 2 | 3 });
    if (/\sid=/.test(attrs)) return full;
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
  return { html: nextHtml, toc };
}

export type BlogFaq = { q: string; a: string };

/** Pull FAQ pairs from HTML when the post includes an FAQ heading. */
export function extractFaqsFromHtml(html: string): BlogFaq[] {
  if (!html) return [];
  const faqMatch = html.match(
    /<h[23][^>]*>\s*(?:frequently asked questions|faq|common questions)\s*<\/h[23]>([\s\S]*?)(?=<h[12][^>]*>|$)/i,
  );
  if (!faqMatch) return [];
  const section = faqMatch[1];
  const faqs: BlogFaq[] = [];

  const details = [...section.matchAll(/<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi)];
  for (const m of details) {
    const q = m[1].replace(/<[^>]+>/g, '').trim();
    const a = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (q && a) faqs.push({ q: stripEmDashes(q), a: stripEmDashes(a) });
  }
  if (faqs.length) return faqs.slice(0, 8);

  const dts = [...section.matchAll(/<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/gi)];
  for (const m of dts) {
    const q = m[1].replace(/<[^>]+>/g, '').trim();
    const a = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (q && a) faqs.push({ q: stripEmDashes(q), a: stripEmDashes(a) });
  }
  if (faqs.length) return faqs.slice(0, 8);

  const strongQs = [
    ...section.matchAll(
      /<(?:p|h[34])[^>]*>\s*(?:<strong>|<b>)([^<?]+\?)\s*(?:<\/strong>|<\/b>)\s*<\/(?:p|h[34])>\s*<p[^>]*>([\s\S]*?)<\/p>/gi,
    ),
  ];
  for (const m of strongQs) {
    const q = m[1].replace(/<[^>]+>/g, '').trim();
    const a = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (q && a) faqs.push({ q: stripEmDashes(q), a: stripEmDashes(a) });
  }
  return faqs.slice(0, 8);
}

/** Short answer / key takeaways block when the HTML includes a matching heading. */
export function extractTakeawaysFromHtml(html: string): string[] {
  if (!html) return [];
  const match = html.match(
    /<h[23][^>]*>\s*(?:short answer|key takeaways?|tl;?dr|summary)\s*<\/h[23]>([\s\S]*?)(?=<h[23][^>]*>|$)/i,
  );
  if (!match) return [];
  const section = match[1];
  const items = [...section.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) =>
    stripEmDashes(m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()),
  );
  if (items.length) return items.filter(Boolean).slice(0, 6);
  const paras = [...section.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) =>
    stripEmDashes(m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()),
  );
  return paras.filter(Boolean).slice(0, 3);
}

export function relatedPosts(
  current: PublicPost,
  all: readonly PublicPost[],
  limit = 3,
): PublicPost[] {
  const topics = new Set(topicsForPost(current));
  const scored = all
    .filter((p) => p.slug !== current.slug && !isLikelyTestBlogPost(p))
    .map((p) => {
      const pt = topicsForPost(p);
      const overlap = pt.filter((t) => topics.has(t)).length;
      const sameCategory =
        (current.category || '').toLowerCase() &&
        (current.category || '').toLowerCase() === (p.category || '').toLowerCase()
          ? 1
          : 0;
      return { p, score: overlap * 2 + sameCategory };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  const picked = scored.slice(0, limit).map((x) => x.p);
  if (picked.length >= limit) return picked;
  const rest = all.filter(
    (p) => p.slug !== current.slug && !picked.some((x) => x.slug === p.slug) && !isLikelyTestBlogPost(p),
  );
  return [...picked, ...rest.slice(0, limit - picked.length)];
}

export function formatBlogDate(iso?: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/New_York',
  });
}

/**
 * Load public posts at build time from the One product API.
 * Auth (`auth.atw.net`) does not expose `/api/posts/public` (404); One does.
 */
export async function fetchPublicPosts(limit = 100): Promise<PublicPost[]> {
  try {
    const res = await fetch(`${BLOG_API_ORIGIN}/api/posts/public?limit=${limit}`);
    if (!res.ok) return [];
    const data = (await res.json()) as { posts?: PublicPost[] };
    return data.posts ?? [];
  } catch {
    return [];
  }
}
