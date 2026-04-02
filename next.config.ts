import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/categories", destination: "/problems", permanent: true },
      { source: "/categories/:slug", destination: "/problems/:slug", permanent: true },
      { source: "/skills", destination: "/solutions", permanent: true },
      { source: "/skills/:slug", destination: "/solutions/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
