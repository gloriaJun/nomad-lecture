import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { outputDir, resolve } from './webpack.util';

const config: webpack.Configuration = {
  mode: 'development',
  entry: [resolve('src/public/js/index.ts')],
  output: {
    path: outputDir,
    filename: 'public/js/index.bundle.js',
    publicPath: 'public',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['public/**/*'],
    }),
  ],
};

export default config;
