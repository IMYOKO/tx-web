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
    ],
  },
];

export default routes;
