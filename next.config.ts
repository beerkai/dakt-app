import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/vaka/*/sertifika": ["./src/assets/fonts/**/*.ttf"],
  },
};

export default nextConfig;
