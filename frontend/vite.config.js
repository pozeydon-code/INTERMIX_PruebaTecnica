import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isBackend =
    String(env.VITE_API_MODE ?? "mock").toLowerCase() === "backend";
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@cartHook": path.resolve(
          __dirname,
          isBackend ? "src/hooks/useCart.js" : "src/hooks/useCartLocal.js",
        ),
      },
    },
  };
});
