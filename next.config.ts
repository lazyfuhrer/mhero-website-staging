import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],
  },

  async rewrites() {
    return [
      {
        source: "/home",
        destination: "/static/index.html",
      },
      {
        source: "/home-ar",
        destination: "/static/ar.html",
      },
    ];
  },
};

export default nextConfig;