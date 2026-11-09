/**
 * Build-time design / preview safety flags.
 *
 * - Production default (no ATW_DESIGN_VARIANT): Option B look (formerly web2.atw.net)
 * - ATW_DESIGN_VARIANT=a|b → intentional redesign sandboxes (dist-preview-a/b), noindex
 * - Cloudflare Pages preview branches (CF_PAGES_BRANCH set and not main) →
 *   production look but noindex + write APIs disabled (PR auto-previews)
 */

export type DesignVariant = 'default' | 'a' | 'b';

function normalizeVariant(raw: string | undefined): DesignVariant {
  const value = (raw || '').trim().toLowerCase();
  if (value === 'a' || value === 'option-a' || value === 'bright') return 'a';
  if (value === 'b' || value === 'option-b' || value === 'dark') return 'b';
  // Unset / unknown → Option B is the live production presentation.
  return 'b';
}

function readEnv(name: string): string {
  try {
    const fromMeta = (import.meta.env as Record<string, string | undefined>)[name];
    if (typeof fromMeta === 'string') return fromMeta;
  } catch {
    // ignore
  }
  return '';
}

/** Explicit sandbox env only (empty string on production main builds). */
const explicitVariantEnv = readEnv('ATW_DESIGN_VARIANT').trim();

/** Resolved visual variant. Production builds default to Option B. */
export const designVariant: DesignVariant = normalizeVariant(
  explicitVariantEnv || 'b',
);

/**
 * True for Cloudflare Pages builds of any branch other than main.
 * Set via Vite define from CF_PAGES / CF_PAGES_BRANCH at build time.
 */
export const isCloudflarePreviewBranch = readEnv('ATW_CF_PAGES_PREVIEW') === '1';

/**
 * Intentional Option A / Option B sandbox builds (env explicitly set).
 * Production main builds leave this false even though the look is Option B.
 */
export const isDesignVariant =
  Boolean(explicitVariantEnv) &&
  (explicitVariantEnv.toLowerCase() === 'a' ||
    explicitVariantEnv.toLowerCase() === 'b' ||
    explicitVariantEnv.toLowerCase() === 'option-a' ||
    explicitVariantEnv.toLowerCase() === 'option-b' ||
    explicitVariantEnv.toLowerCase() === 'bright' ||
    explicitVariantEnv.toLowerCase() === 'dark');

/**
 * Any non-production marketing preview: explicit design sandboxes OR CF preview branch.
 * Production main builds leave this false (indexable, live worker, real forms).
 */
export const isDesignPreview = isDesignVariant || isCloudflarePreviewBranch;

export const designVariantLabel =
  designVariant === 'a'
    ? 'Option A · Bright Premium'
    : designVariant === 'b'
      ? 'Option B · Dark Editorial'
      : isCloudflarePreviewBranch
        ? 'Cloudflare branch preview'
        : '';

export const designVariantShort =
  designVariant === 'a' ? 'A' : designVariant === 'b' ? 'B' : isCloudflarePreviewBranch ? 'PR' : '';

export function outDirForVariant(variant: DesignVariant = designVariant): string {
  if (variant === 'a') return 'dist-preview-a';
  if (variant === 'b' && isDesignVariant) return 'dist-preview-b';
  return 'dist';
}
