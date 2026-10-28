/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: deployable on GitHub Pages / Vercel / Netlify with no server.
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
