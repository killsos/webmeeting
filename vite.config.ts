import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

const pathResolve = (dir: string) => resolve(__dirname, dir)

// 配置项
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        }),
        createSvgIconsPlugin({
            iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
            symbolId: 'icon-[dir]-[name]',
            inject: 'body-last',
            customDomId: '__svg__icons__dom__'
        }),
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz'
        })
    ],
    resolve: {
        alias: {
            '@': pathResolve('src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/style/theme.scss";'
            }
        }
    },
    server: {
        hmr: { overlay: false },
        // hmr: {
        //     protocol: 'ws',
        //     host: 'localhost',
        //     overlay: false
        // },
        https: false,
        host: true,
        port: 4000,
        open: true,
        cors: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        target: 'es2015',
        outDir: 'dist',
        terserOptions: {
            compress: {
                keep_infinity: true,
                drop_console: true,
                drop_debugger: true
            }
        },
        brotliSize: false,
        chunkSizeWarningLimit: 1500
    }
})
