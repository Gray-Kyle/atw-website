import { isExcludedBlogSitemapUrl } from './blog';

/**
 * Keep the sitemap limited to real, indexable, canonical HTML URLs.
 * Excludes redirect shells, well-known files, 404, and likely test blog posts.
 */
export function shouldIncludeInSitemap(pageUrl: string): boolean {
  let pathname = pageUrl;
  try {
    pathname = new URL(pageUrl).pathname;
  } catch {
    // keep as-is
  }

  if (pathname.includes('/404')) return false;
  if (pathname.includes('/.well-known/')) return false;
  if (pathname.endsWith('/gpc.json') || pathname.endsWith('gpc.json')) return false;
  if (pathname === '/signup' || pathname === '/signup/') return false;
  if (pathname === '/trial' || pathname === '/trial/') return false;
  if (pathname.endsWith('.txt') || pathname.endsWith('.md') || pathname.endsWith('.json')) {
    return false;
  }
  if (isExcludedBlogSitemapUrl(pageUrl)) return false;
  return true;
}
