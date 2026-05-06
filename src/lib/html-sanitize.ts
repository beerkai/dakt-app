/** Vaka içeriği kontrollü HTML olarak verilir; sadece wrapper fragment’ı için. */

export function testimonialParagraphHtml(s: string): { __html: string } {
  if (/<[a-z][\s\S]*>/i.test(s)) {
    return { __html: s };
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
