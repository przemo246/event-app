import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    dangerouslyAllowLocalIP: isDev,
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      ...(isDev
        ? [{ protocol: "http" as const, hostname: "127.0.0.1", port: "54321" }]
        : []),
    ],
  },
};

export default nextConfig;
