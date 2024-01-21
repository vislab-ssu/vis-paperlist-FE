import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  let config = {
    plugins: [react()],
  };
  if (env.NODE_ENV == "development") {
    config["server"] = {
      proxy: {
        "/api": {
          target: "http://" + env.API_SRC + ":" + env.API_PORT,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          secure: false,
          ws: true,
        },
      },
    };
  }
  console.log(config);
  return config;
});
