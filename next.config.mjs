/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.bamaha.my.id',
        port: '',
        pathname: '/example-image/**',
      },
      {
        protocol: 'https',
        hostname: 'rentifyai.app',
        port: '',
        pathname: '/**',
      },
    ]
  }
};

export default nextConfig;
