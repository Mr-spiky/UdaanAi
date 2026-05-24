import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // pdf-parse is server-only — prevents client-side bundling
  serverExternalPackages: ["pdf-parse"],

  // Prevent Next.js output file tracing from scanning Windows junction-point dirs
  outputFileTracingExcludes: {
    "*": [
      "C:\\Users\\**\\Application Data",
      "C:\\Users\\**\\Local Settings",
    ],
  },
};

export default nextConfig;
