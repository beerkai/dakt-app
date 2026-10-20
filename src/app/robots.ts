import type { MetadataRoute } from "next";

const SITE = "https://dakt.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/yonetim", "/gm", "/profil", "/oda", "/vaka", "/giris"],
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
