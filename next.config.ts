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
      // ✅ Home pages
      {
        source: "/en/home",
        destination: "/index.html",
      },
      {
        source: "/ar/home",
        destination: "/ar.html",
      },

      // ✅ Special cases (keep BEFORE generic)
      {
        source: "/:lang/contact-us",
        destination: "/:lang/contact.html",
      },
      {
        source: "/:lang/user-consent-policy",
        destination: "/:lang/user-consent-policy.html",
      },

      // ✅ Generic catch-all (MUST be last)
      {
        source: "/:lang/:page",
        destination: "/:lang/:page.html",
      },
    ];
  },
};

export default nextConfig;