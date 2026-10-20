import type { MetadataRoute } from "next";

const SITE = "https://dakt.app";

const PUBLIC_PATHS: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/davalar", priority: 0.9 },
  { path: "/nasil-oynanir", priority: 0.7 },
  { path: "/yasal/kullanim-kosullari", priority: 0.2 },
  { path: "/yasal/aydinlatma-metni", priority: 0.2 },
  { path: "/yasal/cerez-politikasi", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PATHS.map(({ path, priority }) => ({
    url: `${SITE}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
