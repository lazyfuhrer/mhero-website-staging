import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],
  },

  async redirects() {
    return [
      // ✅ Default landing
      {
        source: "/",
        destination: "/en/home",
        permanent: true,
      },

      // 🔥 Enforce clean URLs (remove .html)
      {
        source: "/:lang/:page.html",
        destination: "/:lang/:page",
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

      // ✅ Special aliases (MUST be before generic)
      {
        source: "/:lang/contact-us",
        destination: "/:lang/contact.html",
      },
      {
        source: "/:lang/user-consent-policy",
        destination: "/:lang/user-consent-policy.html",
      },

      // ✅ Generic mapping (clean → .html internally)
      {
        source: "/:lang/:page",
        destination: "/:lang/:page.html",
      },
    ];
  },
};

export default nextConfig;