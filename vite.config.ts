import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    remix({
      // Cloudflare Pages / Workers 向けのプリセットや設定を追加する場合に記述します
    }),
    tsconfigPaths(),
  ],
});