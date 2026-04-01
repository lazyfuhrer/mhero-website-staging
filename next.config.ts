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

      // ✅ Offers → Home (handles both /offers and /offers.html)
      {
        source: "/en/offers:ext(.html)?",
        destination: "/en/home",
        permanent: true,
      },
      {
        source: "/ar/offers:ext(.html)?",
        destination: "/ar/home",
        permanent: true,
      },

      // ✅ Remove .html globally
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

      // ✅ Specific routes (before generic)
      {
        source: "/:lang/contact-us",
        destination: "/:lang/contact.html",
      },
      {
        source: "/:lang/contact-us/thankyou",
        destination: "/:lang/thankyou.html",
      },
      {
        source: "/:lang/user-consent-policy",
        destination: "/:lang/user-consent-policy.html",
      },

      // ✅ Catch-all (must be last)
      {
        source: "/:lang/:path*",
        destination: "/:lang/:path*.html",
      },
    ];
  },
};

export default nextConfig;