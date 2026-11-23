/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
  experimental: {
    // optimize package imports for lucide-react and three
    optimizePackageImports: ['lucide-react', 'three', '@react-three/fiber', '@react-three/drei'],
  },
};

export default nextConfig;
