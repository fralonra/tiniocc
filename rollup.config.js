import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/tiniocc.ts',
  output: {
    file: 'dist/tiniocc.cjs.js',
    format: 'cjs'
  },
  plugins: [typescript()]
}
