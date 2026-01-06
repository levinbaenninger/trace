import type { NextConfig } from "next";
import "./src/env";

const nextConfig: NextConfig = {
  reactCompiler: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/overview",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
