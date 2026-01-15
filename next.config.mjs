/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fra.cloud.appwrite.io",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "readymadeui.com",
      },
    ],
  },
  compiler: {
    // removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
