import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

const root = process.cwd();
const pathResolve = (pathname: string) => resolve(root, ".", pathname);
// https://vite.dev/config/
export default defineConfig({
  base: "/shiptalk/",
  plugins: [vue()],
  // 添加允许访问的主机配置
  // server: {
  //   allowedHosts: ["fwk3216.yunmv.cn", "localhost", "127.0.0.1"],
  // },
  resolve: {
    alias: {
      "/@/": pathResolve("src") + "/",
      "/#/": pathResolve("types") + "/",
    },
  },
  build: {
    outDir: "docs"
  }
});
