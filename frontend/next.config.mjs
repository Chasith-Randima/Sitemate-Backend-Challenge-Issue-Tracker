
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "m.media-amazon.com",
        },
        {
          protocol: "http",
          hostname: "127.0.0.1",
        }
      ],
    },
  };
  
//   module.exports = nextConfig;

export default nextConfig