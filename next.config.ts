import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // statikus export az out/ mappába
  images: { unoptimized: true },
  trailingSlash: true        // opcionális, de statikus útvonalakhoz jó
};

export default nextConfig;
