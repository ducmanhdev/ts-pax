import {defineConfig} from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    splitting: false,
    clean: true,
    format: ['cjs', 'esm', 'iife'],
    platform: 'neutral',
    dts: true,
    minify: false,
    sourcemap: true,
})