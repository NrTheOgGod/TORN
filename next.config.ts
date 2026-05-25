// next.config.ts — Next.js configuration
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images served from the local public folder (default) and any
    // external domains if chapter pages are stored as full URLs in the DB.
    // Add remote patterns here if your pages[] array contains external URLs.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
