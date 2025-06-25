import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
const root = process.cwd();
const pathResolve = (pathname) => resolve(root, ".", pathname);
export default defineConfig({
    base: "/shiptalk/",
    plugins: [vue()],
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
