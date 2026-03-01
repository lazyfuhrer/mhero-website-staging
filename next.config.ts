import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/en/home",
        destination: "/index.html",
      },
      {
        source: "/ar/home",
        destination: "/ar.html",
      }
    ];
  },
};

export default nextConfig;