import typescript from '@rollup/plugin-typescript';

export default [
  // Common js and ES module builds
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/graph-scout.js',
      format: 'umd',
      name: "graphScout"
    },
    plugins: [typescript()]
  }
]