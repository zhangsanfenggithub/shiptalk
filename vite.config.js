import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
const root = process.cwd();
const pathResolve = (pathname) => resolve(root, '.', pathname);
export default defineConfig({
    plugins: [vue()],
    server: {
        allowedHosts: ['fwk3216.yunmv.cn', 'localhost', '127.0.0.1']
    },
    resolve: {
        alias: {
            '/@/': pathResolve('src') + '/',
            '/#/': pathResolve('types') + '/',
        },
    },
});
