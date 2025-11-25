import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance (2025 features)
  experimental: {
    optimizePackageImports: ["@radix-ui/react-avatar", "@radix-ui/react-dropdown-menu", "@radix-ui/react-select"],
    // Modern bundling features
    optimizeCss: true,
    scrollRestoration: true,
  },


  // Image optimization settings with modern formats
  images: {
    formats: ["image/webp", "image/avif"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Modern image optimization
    minimumCacheTTL: 31536000, // 1 year
  },

  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  // Modern output settings
  output: "standalone",

  // Security headers for 2025 standards
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Turbopack config to acknowledge webpack config usage
  turbopack: {},

  // Modern webpack optimizations
  webpack: (config, { isServer }) => {
    // Optimize bundle splitting
    if (!isServer) {
      config.optimization.splitChunks.chunks = 'all';
    }

    return config;
  },
};

export default nextConfig;
