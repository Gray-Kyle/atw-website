import { BLOG_API_ORIGIN } from '../lib/site';

export type PublicPost = {
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  publishedAt?: string;
  author?: { name?: string | null };
};

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
