import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const docsDirectory = path.join(process.cwd(), 'content/docs');

export type DocMeta = {
  slug: string;
  title: string;
  excerpt?: string;
};

export function getDocSlugs(): string[] {
  if (!fs.existsSync(docsDirectory)) return [];
  return fs
    .readdirSync(docsDirectory)
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
    .map((name) => name.replace(/\.mdx?$/, ''));
}

export function getDocBySlug(slug: string): { meta: DocMeta; content: string } | null {
  const mdxPath = path.join(docsDirectory, `${slug}.mdx`);
  const mdPath = path.join(docsDirectory, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!fullPath) return null;
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: (data.title as string) || slug,
      excerpt: data.excerpt as string | undefined,
    },
    content,
  };
}

export function getAllDocs(): DocMeta[] {
  return getDocSlugs().map((slug) => {
    const doc = getDocBySlug(slug);
    return doc?.meta ?? { slug, title: slug };
  });
}
