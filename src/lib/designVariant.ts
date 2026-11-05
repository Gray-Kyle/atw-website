/**
 * Build-time design / preview safety flags.
 *
 * - ATW_DESIGN_VARIANT=a|b → intentional redesign sandboxes (dist-preview-a/b)
 * - Cloudflare Pages preview branches (CF_PAGES_BRANCH set and not main) →
 *   default look but noindex + write APIs disabled (PR auto-previews)
 * - main / local default build → production presentation unchanged
 */

export type DesignVariant = 'default' | 'a' | 'b';

function normalizeVariant(raw: string | undefined): DesignVariant {
  const value = (raw || '').trim().toLowerCase();
  if (value === 'a' || value === 'option-a' || value === 'bright') return 'a';
  if (value === 'b' || value === 'option-b' || value === 'dark') return 'b';
  return 'default';
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

/** Resolved at build time via Vite define. */
export const designVariant: DesignVariant = normalizeVariant(readEnv('ATW_DESIGN_VARIANT'));

/**
 * True for Cloudflare Pages builds of any branch other than main.
 * Set via Vite define from CF_PAGES / CF_PAGES_BRANCH at build time.
 */
export const isCloudflarePreviewBranch = readEnv('ATW_CF_PAGES_PREVIEW') === '1';

/** Intentional Option A / Option B redesign builds. */
export const isDesignVariant = designVariant === 'a' || designVariant === 'b';

/**
 * Any non-production marketing preview: design variants OR CF preview branch.
 * Production main builds leave this false.
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
  if (variant === 'b') return 'dist-preview-b';
  return 'dist';
}
