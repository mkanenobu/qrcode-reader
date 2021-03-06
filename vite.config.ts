import { defineConfig } from "vite";
import { execSync } from "child_process";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "public",
  clearScreen: false,
  define: {
    __BUILD_ID: JSON.stringify(
      execSync("git rev-parse HEAD", {
        encoding: "utf8",
      })
    ),
  },
  plugins: [
    reactRefresh(),
    VitePWA({
      manifest: {
        name: "QRCode Reader",
        short_name: "QRCode Reader",
        theme_color: "#93bbda",
        background_color: "#279dfb",
        display: "standalone",
        orientation: "portrait",
        prefer_related_applications: true,
        scope: "https://mkanenobu.github.io/qrcode-reader/",
        start_url: "https://mkanenobu.github.io/qrcode-reader/index.html",
        icons: [
          {
            src: "/icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
