/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Satisfy hosts that still look for a post-build `dist` directory (legacy Vite setting).
  distDir: 'dist',
  experimental: {
    serverComponentsExternalPackages: ['@electric-sql/pglite', 'pg']
  }
};

export default nextConfig;
