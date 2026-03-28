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
        source: "/:lang/:path*.html",
        destination: "/:lang/:path*",
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
      // Thank-you after contact form (URL is /{lang}/contact-us/thankyou; file is /{lang}/thankyou.html)
      {
        source: "/:lang/contact-us/thankyou",
        destination: "/:lang/thankyou.html",
      },

      // 🔥 Nested routes (any depth)
      {
        source: "/:lang/:path*",
        destination: "/:lang/:path*.html",
      },
    ];
  },
};

export default nextConfig;