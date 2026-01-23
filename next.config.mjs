/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wubflow-shield.NOCODEXPORT.DEV',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.u2travels.com.my',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
