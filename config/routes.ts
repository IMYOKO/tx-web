import { IRoute } from 'umi-types';

const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      {
        path: '/',
        title: '首页',
        exact: true,
        component: '../pages/index',
        Routes: ['src/layouts/TabBarLayout', 'src/layouts/AuthLayout'],
      },
      {
        path: '/detail',
        title: '详情',
        exact: true,
        component: '../pages/detail',
        Routes: ['src/layouts/AuthLayout'],
      },
      {
        path: '/task',
        title: '稿件',
        exact: true,
        component: '../pages/task',
        Routes: ['src/layouts/TabBarLayout', 'src/layouts/AuthLayout'],
      },
      { path: '/login', title: '登录', exact: true, component: '../pages/login' },
      { path: '/register', title: '注册', exact: true, component: '../pages/register' },
      {
        path: '/user',
        title: '我的',
        exact: true,
        component: '../pages/user',
        Routes: ['src/layouts/TabBarLayout', 'src/layouts/AuthLayout'],
      },
      {
        path: '/add-order',
        title: '发布稿件',
        exact: true,
        component: '../pages/add-order',
        Routes: ['src/layouts/AuthLayout'],
      },
      {
        path: '/my-bill',
        title: '我的账单',
        exact: true,
        component: '../pages/my-bill',
        Routes: ['src/layouts/AuthLayout'],
      },
      {
        path: '/withdraw',
        title: '提现',
        exact: true,
        component: '../pages/withdraw',
        Routes: ['src/layouts/AuthLayout'],
      },
      {
        path: '/feedback',
        title: '意见反馈',
        exact: true,
        component: '../pages/feedback',
        Routes: ['src/layouts/AuthLayout'],
      },
      {
        path: '/setting',
        title: '设置',
        exact: true,
        component: '../pages/setting',
        Routes: ['src/layouts/AuthLayout'],
      },
      {
        path: '/contact-us',
        title: '联系客服',
        exact: true,
        component: '../pages/contact',
        Routes: ['src/layouts/AuthLayout'],
      },
      {
        path: '/reset-password',
        title: '重置登录密码',
        exact: true,
        component: '../pages/reset-password',
        Routes: ['src/layouts/AuthLayout'],
      },
      // {
      //   path: '/reset-trade-password',
      //   title: '重置交易密码',
      //   exact: true,
      //   component: '../pages/reset-trade-password',
      //   Routes: ['src/layouts/AuthLayout'],
      // },
      {
        path: '/404',
        title: '404',
        component: '../pages/404',
      },
    ],
  },
];

export default routes;
