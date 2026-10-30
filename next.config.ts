import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/** Supabase project (REST/Auth/Storage over https, Realtime over wss). */
const SUPABASE_HTTPS = "https://qmhsyvewhlnoqamztskr.supabase.co";
const SUPABASE_WSS = "wss://qmhsyvewhlnoqamztskr.supabase.co";

/**
 * Content-Security-Policy — shipped as **Report-Only** first so violations
 * show up in the browser console without breaking anything. Inline scripts
 * are still needed (age-gate boot script, Next.js RSC payload), hence
 * 'unsafe-inline' until a nonce-based policy is introduced.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' blob: data: ${SUPABASE_HTTPS}`,
  "font-src 'self' data:",
  `connect-src 'self' ${SUPABASE_HTTPS} ${SUPABASE_WSS}`,
  "media-src 'self' blob: data:",
  "worker-src 'self'",
  "manifest-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  `form-action 'self' ${SUPABASE_HTTPS}`,
  "frame-ancestors 'none'",
  // upgrade-insecure-requests is ignored in Report-Only; add it when enforcing.
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy-Report-Only", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/vaka/*/sertifika": ["./src/assets/fonts/**/*.ttf"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
