import { BLOG_API_ORIGIN } from '../lib/site';

export type PublicPost = {
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  publishedAt?: string;
  author?: { name?: string | null };
  status?: string | null;
};

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
