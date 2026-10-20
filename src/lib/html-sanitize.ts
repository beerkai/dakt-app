/**
 * Vaka içeriği elle yazılmış HTML parçalarıdır. Yine de render öncesi
 * izinli etiket/öznitelik listesinden geçirilir: yazım hatası ya da
 * kopyala-yapıştır ile gelen script, olay öznitelikleri ve dış URL'ler düşer.
 */

const ALLOWED_TAGS = new Set([
  "b",
  "blockquote",
  "br",
  "code",
  "dd",
  "div",
  "dl",
  "dt",
  "em",
  "h2",
  "h3",
  "h4",
  "hr",
  "i",
  "li",
  "ol",
  "p",
  "pre",
  "s",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
]);

const VOID_TAGS = new Set(["br", "hr"]);

/** İçeriğiyle birlikte tamamen atılan etiketler. */
const DROP_WITH_CONTENT = /<(script|style|iframe|object|embed|template|noscript|svg|math)\b[\s\S]*?<\/\1\s*>/gi;

const ALLOWED_ATTRS = new Set(["class", "style", "colspan", "rowspan", "title"]);

const UNSAFE_STYLE = /url\s*\(|expression\s*\(|javascript:|@import|behavior\s*:/i;

const TAG_RE = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g;
const ATTR_RE = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;

function escapeAttr(v: string): string {
  return v.replace(/&(?![a-zA-Z#0-9]+;)/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function sanitizeAttrs(raw: string): string {
  let out = "";
  for (const m of raw.matchAll(ATTR_RE)) {
    const name = m[1]!.toLowerCase();
    const value = m[2] ?? m[3] ?? m[4] ?? "";
    if (!ALLOWED_ATTRS.has(name)) continue;
    if (name === "style" && UNSAFE_STYLE.test(value)) continue;
    if ((name === "colspan" || name === "rowspan") && !/^\d{1,2}$/.test(value)) continue;
    out += ` ${name}="${escapeAttr(value)}"`;
  }
  return out;
}

const cache = new Map<string, string>();
const CACHE_LIMIT = 2000;

export function sanitizeCaseHtml(html: string): string {
  const hit = cache.get(html);
  if (hit !== undefined) return hit;

  const result = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(DROP_WITH_CONTENT, "")
    .replace(TAG_RE, (_full, slash: string, tagName: string, attrs: string) => {
      const tag = tagName.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) return "";
      if (slash) return VOID_TAGS.has(tag) ? "" : `</${tag}>`;
      return `<${tag}${sanitizeAttrs(attrs)}>`;
    });

  if (cache.size >= CACHE_LIMIT) cache.clear();
  cache.set(html, result);
  return result;
}

export function safeHtml(html: string | null | undefined): { __html: string } {
  return { __html: sanitizeCaseHtml(html ?? "") };
}

export function testimonialParagraphHtml(s: string): { __html: string } {
  if (/<[a-z][\s\S]*>/i.test(s)) {
    return safeHtml(s);
  }
  const parts = s.split(/\*\*(.+?)\*\*/g);
  if (parts.length === 1) {
    return { __html: escapeHtml(s) };
  }
  const out: string[] = [];
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      out.push(escapeHtml(parts[i] ?? ""));
    } else {
      out.push(`<strong>${escapeHtml(parts[i] ?? "")}</strong>`);
    }
  }
  return { __html: out.join("") };
}

function escapeHtml(t: string): string {
  return t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
