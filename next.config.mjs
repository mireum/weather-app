/** @type {import('next').NextConfig} */
// 중복요청방지
const nextConfig = {
  reactStrictMode: false,
  assetPrefix: '.',
  headers : [
    {
      key: 'Access-Control-Allow-Origin',
      value: process.env.NEXT_PUBLIC_APP_URL,
    },
],
  // output: 'export',
};

export default nextConfig;
