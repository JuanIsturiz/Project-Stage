/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com", "www.kindpng.com"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
