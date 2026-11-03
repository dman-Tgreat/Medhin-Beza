import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Medhin Beza Hospital | Compassionate Care & Advanced Medicine",
    short_name: "Medhin Beza",
    description:
      "Leading specialized tertiary hospital in Adama, Ethiopia providing 24/7 emergency response.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1e40af",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo-256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
