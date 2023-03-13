const removeImports = require("next-remove-imports")();

/** @type {import('next').NextConfig} */
const nextConfig = removeImports({
  reactStrictMode: true,
  experimental: { esmExternals: true },
  redirects: async () => [
    {
      source: "/",
      destination: "/research",
      permanent: true,
    },
  ],
});

module.exports = nextConfig;
