import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: { ignoreBuildErrors: true },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables all ESLint checks on build
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets-us-01.kc-usercontent.com",
        port: "", // leave empty if no custom port
        pathname: "/**",
      },
    ],
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
