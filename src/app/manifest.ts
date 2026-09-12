import type { MetadataRoute } from "next";
import { SITE_NAME, SLOGAN } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "TOPIK",
    description: SLOGAN,
    start_url: "/en",
    display: "standalone",
    background_color: "#f4efe6",
    theme_color: "#13294b",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
