import path from 'path';

export const resolve = (file: string) => path.resolve(process.cwd(), file);

export const outputDir = resolve('dist');
