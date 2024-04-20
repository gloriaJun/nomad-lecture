import type webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { outputDir, resolve } from './webpack.util';

const config: webpack.Configuration = {
  target: 'node',
  externals: [nodeExternals()],
  mode: 'development',
  entry: {
    'server/index': resolve('src/server/index.ts'),
  },
  output: {
    path: outputDir,
    filename: '[name].js',
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
    new CopyWebpackPlugin({
      patterns: [{ from: resolve('src/views'), to: 'views' }],
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['server/**/*'],
    }),
  ],
};

export default config;
