/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: () => [
    {
      source: "/api/:path*",
      destination: "http://localhost:8000/:path*", // Proxy to Backend
    },
  ],
};

export default nextConfig;
