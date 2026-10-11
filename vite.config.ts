import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { cloudflareDevProxyVitePlugin } from "@remix-run/dev"; // 必要に応じて開発プロキシ等も活用可能

export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [
    tailwindcss(),
    remix({
      // Cloudflare Pages/Workers 向けの SSR ビルドを有効化
      ssr: true,
      future: {
        v3_fetcherPersist: true,
        v3_lazyRouteDiscovery: true,
        v3_relativeSplatPath: true,
        v3_singleFetch: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    // Cloudflare Pages の出力要件に最適化
    target: "esnext",
  },
});