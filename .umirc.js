// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  // routes: [{ path: '/', component: './index' }, { path: '/nodes', component: './nodes/index' }],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'umiDemo',
        dll: true,
        locale: {
          enable: true,
          default: 'en-US',
        },
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
  proxy: {
    '/HpbScan': {
      target: 'https://hpbscan.org/',
      changeOrigin: true,
    },
  },
};
