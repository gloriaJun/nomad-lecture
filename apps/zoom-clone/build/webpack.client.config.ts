import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { configDefault, outputDir, resolve } from './webpack.util';

const config: webpack.Configuration = {
  mode: 'development',
  entry: [resolve('src/public/js/index.ts')],
  output: {
    path: outputDir,
    filename: 'public/js/index.bundle.js',
    publicPath: 'public',
  },
  resolve: configDefault.resolve,
  module: { ...configDefault.module },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['public/**/*'],
    }),
  ],
};

export default config;
