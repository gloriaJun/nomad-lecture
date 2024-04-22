import path from 'path';

export const resolve = (file: string) => path.resolve(process.cwd(), file);

export const outputDir = resolve('dist');

export const configDefault = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '~/*': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
};
