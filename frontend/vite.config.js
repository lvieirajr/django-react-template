/// <reference types="vitest" />
import * as path from "path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
    plugins: [
        VitePWA({
            includeAssets: ["favicon.ico", "robots.txt"],
            manifest: {
                name: "Django React Template",
                theme_color: "#012D3D",
                icons: [
                    {
                        src: "logo.png",
                        sizes: "128x128",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                ],
            },
            registerType: "autoUpdate",
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
            },
        }),
        react(),
        tsconfigPaths(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src/"),
        },
    },
    server: {
        host: "0.0.0.0",
        port: 3000,
    },
});
