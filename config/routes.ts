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
        title: '任务',
        exact: true,
        component: '../pages/task',
        Routes: ['src/layouts/TabBarLayout'],
      },
      {
        path: '/info',
        title: '信息',
        exact: true,
        component: '../pages/info',
        Routes: ['src/layouts/TabBarLayout'],
      },
      { path: '/login', title: '登录', exact: true, component: '../pages/login' },
      { path: '/register', title: '注册', exact: true, component: '../pages/register' },
      {
        path: '/user',
        title: '我的',
        exact: true,
        component: '../pages/user',
        Routes: ['src/layouts/TabBarLayout'],
        // Routes: ['src/layouts/AuthLayout'],
      },
    ],
  },
];

export default routes;
