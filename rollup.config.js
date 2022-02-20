import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/main.ts',
    output: {
        file: 'public/js/eschew-ferocity.js',
        format: 'iife'
    },
    plugins: [
        typescript(),
    ],
};