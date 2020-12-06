import config from './.umirc';

export default {
  ...config,
  devtool: false,
  publicPath: '/',
  outputPath: 'build/prod',
};
