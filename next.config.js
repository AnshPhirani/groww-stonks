/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["api-ninjas-data.s3.us-west-2.amazonaws.com", "api.polygon.io"],
  },
};

module.exports = nextConfig;
