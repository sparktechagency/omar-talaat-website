/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.pixabay.com", "images.unsplash.com"],
  },
  safelist: ["lg:grid-cols-3", "lg:grid-cols-4"],
};

export default nextConfig;
