import { IConfig } from 'umi-types';
import routes from './config/routes';

// ref: https://umijs.org/config/
const config: IConfig = {
  history: 'hash',
  treeShaking: true,
  publicPath: '/web/',
  routes,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'tx-web',
        dll: false,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  define: {
    'process.env.UMI_ENV': process.env.UMI_ENV,
  },
  disableCSSModules: true,
};

export default config;
