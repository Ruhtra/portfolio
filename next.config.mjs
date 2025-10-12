/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    localPatterns: [
      {
        pathname: "/**",
        search: "", // Permite qualquer query string
      },
    ],
    qualities: [75, 80, 85, 90, 95, 100],
  },
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
