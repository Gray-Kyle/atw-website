import type { APIRoute } from 'astro';
import {
  fetchIndexablePosts,
  stripEmDashes,
} from '../../lib/blog';
import { SITE_ORIGIN, absoluteUrl } from '../../lib/seo';

export const prerender = true;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const posts = await fetchIndexablePosts(100);
  const items = posts
    .map((post) => {
      const link = absoluteUrl(`/blog/${post.slug}/`);
      const title = escapeXml(stripEmDashes(post.title));
      const description = escapeXml(
        stripEmDashes((post.seoDescription || post.excerpt || post.title).trim()),
      );
      const pubDate = post.publishedAt
        ? new Date(post.publishedAt).toUTCString()
        : new Date().toUTCString();
      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ATW.Net Blog</title>
    <link>${SITE_ORIGIN}/blog/</link>
    <description>Guides and updates on ATW One, Orbit, Hub, Workforce, Directory, ATW AI, and business operations.</description>
    <language>en-us</language>
    <atom:link href="${SITE_ORIGIN}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
