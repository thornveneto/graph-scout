import typescript from '@rollup/plugin-typescript';

export default [
  // Common js and ES module builds
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      format: 'cjs'
    },
    plugins: [typescript()]
  }
]