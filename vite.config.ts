import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    remix({
      // Cloudflare Pages/Workers 向けのターゲットプリセットを指定
      presets: [
        // Remix v2 の Vite 統合で Cloudflare 用の出力を有効にする
      ],
    }),
    tsconfigPaths(),
  ],
  // Cloudflare Pages ではビルドターゲットにworkerd環境を意識させることが重要です
});