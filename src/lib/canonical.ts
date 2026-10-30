import type { Metadata } from "next";

/**
 * Self-canonical helpers. `metadataBase` (https://dakt.app) is set in the root
 * layout, so relative paths resolve to absolute canonical URLs. Query strings
 * such as `?room=` are intentionally dropped from the canonical.
 */
export function canonical(path: string): Pick<Metadata, "alternates"> {
  return { alternates: { canonical: path } };
}

/** `generateMetadata` for a case tab page: `/vaka/<caseId>/<tab>`. */
export function caseTabCanonical(tab: string) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ caseId: string }>;
  }): Promise<Metadata> {
    const { caseId } = await params;
    return canonical(`/vaka/${encodeURIComponent(caseId)}/${tab}`);
  };
}
