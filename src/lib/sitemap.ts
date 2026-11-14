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
  // Redirect shells (see public/_redirects); never list as canonical URLs.
  if (pathname === '/hosting' || pathname === '/hosting/') return false;
  if (pathname === '/credits' || pathname === '/credits/') return false;
  if (pathname === '/privacy' || pathname === '/privacy/') return false;
  if (pathname === '/directory' || pathname === '/directory/') return false;
  if (pathname === '/workspace' || pathname === '/workspace/') return false;
  if (pathname === '/worksuite' || pathname === '/worksuite/') return false;
  if (pathname === '/agents' || pathname === '/agents/') return false;
  if (pathname === '/solutions/ai-use-cases' || pathname === '/solutions/ai-use-cases/') return false;
  // /orbit without trailing slash is a redirect shell; /orbit/ is the canonical page.
  if (pathname === '/orbit') return false;
  if (pathname === '/blog/rss.xml') return false;
  if (pathname.endsWith('.txt') || pathname.endsWith('.md') || pathname.endsWith('.json')) {
    return false;
  }
  if (isExcludedBlogSitemapUrl(pageUrl)) return false;
  return true;
}
