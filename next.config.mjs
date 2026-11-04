/** @type {import('next').NextConfig} */
const nextConfig = {
  // Marketing page with no server needs, so it builds to plain static files in out/.
  output: "export",
  images: { unoptimized: true },
  // GitHub Pages serves the site from /<repo-name>/. Empty for local builds.
  basePath: process.env.BASE_PATH || "",
};

export default nextConfig;
