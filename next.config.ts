import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.topikcampus.com" }],
        destination: "https://topikcampus.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
