/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        // MinIO локально
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9000',
        pathname: '/**',
      },
      {
        // MinIO в docker-сети (между контейнерами)
        protocol: 'http',
        hostname: 'minio',
        port: '9000',
        pathname: '/**',
      },
      {
        // MinIO / S3-совместимый хост в продакшене (задаётся через NEXT_PUBLIC_S3_PUBLIC_URL)
        protocol: 'https',
        hostname: '**.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};
export default nextConfig;
