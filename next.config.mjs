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
      {
        // MinIO на прод-сервере по IP
        protocol: 'http',
        hostname: '185.225.34.60',
        port: '9000',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        // Длинный кеш для статики /public/: имена файлов стабильны, при перезаливке меняется хеш в URL Next.js
        source: '/:path*\\.(webp|jpg|jpeg|png|svg|ico|woff2|woff|ttf|mp4|webm)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};
export default nextConfig;
