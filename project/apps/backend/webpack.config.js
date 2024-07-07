const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

const NxAppWebpackPluginConfig = {
  target: 'node',
  compiler: 'tsc',
  tsConfig: './tsconfig.app.json',
  assets: ['./src/assets'],
  optimization: false,
  outputHashing: 'none',
};

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/backend'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      ...NxAppWebpackPluginConfig,
      main: './src/main.ts',
    }),
    new NxAppWebpackPlugin({
      ...NxAppWebpackPluginConfig,
      main: './src/seeder.ts',
      outputFileName: 'seeder.js',
    }),
  ],
};
