import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  outputFileTracingIncludes: {
    "/vaka/*/sertifika": ["./src/assets/fonts/**/*.ttf"],
  },
};

export default nextConfig;
