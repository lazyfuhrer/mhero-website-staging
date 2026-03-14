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
      // Home pages
      {
        source: "/en/home",
        destination: "/index.html",
      },
      {
        source: "/ar/home",
        destination: "/ar.html",
      },

      // Dynamic pages like /en/about, /en/contact, etc.
      {
        source: "/en/:page",
        destination: "/en/:page.html",
      },
      {
        source: "/ar/:page",
        destination: "/ar/:page.html",
      },
      {
        source: "/en/specifications",
        destination: "/en/specifications.html",
      },
      {
        source: "/ar/specifications",
        destination: "/ar/specifications.html",
      },
      {
        source: "/en/privacy-policy",
        destination: "/en/privacy-policy.html",
      },
      {
        source: "/ar/privacy-policy",
        destination: "/ar/privacy-policy.html",
      },
      {
        source: "/en/cookie-policy",
        destination: "/en/cookie-policy.html",
      },
      {
        source: "/ar/cookie-policy",
        destination: "/ar/cookie-policy.html",
      },
      {
        source: "/en/user-consent-policy",
        destination: "/en/cookie-policy.html",
      },
      {
        source: "/ar/user-consent-policy",
        destination: "/ar/user-consent-policy.html",
      },
    ];
  },
};

export default nextConfig;