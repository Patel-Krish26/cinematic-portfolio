/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict output for clean Netlify / Vercel deploys
  reactStrictMode: false, // OFF — prevents double render that causes hydration diffs
  
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github-readme-stats.vercel.app" },
      { protocol: "https", hostname: "leetcard.jacoblin.com" },
    ],
    // Unoptimized on Netlify static export (comment out if using Next.js server)
    // unoptimized: true,
  },

  // Allow Three.js to be bundled correctly
  transpilePackages: ["three"],

  // Compress output for faster delivery
  compress: true,

  // Disable powered-by header
  poweredByHeader: false,

  // Webpack — handle canvas for Three.js SSR
  webpack: (config, { isServer }) => {
    if (isServer) {
      // canvas is browser-only — ignore it on server
      config.externals = [...(config.externals || []), "canvas"];
    }
    return config;
  },
};

module.exports = nextConfig;
