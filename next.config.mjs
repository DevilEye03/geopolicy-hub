/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Required since Capacitor loads the static export from file:// which means we can't use Next.js Image Optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
