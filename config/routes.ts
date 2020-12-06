import { IRoute } from 'umi-types';

const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      {
        path: '/',
        title: 'home',
        exact: true,
        component: '../pages/index',
        Routes: ['src/layouts/TabBarLayout'],
      },
      {
        path: '/task',
        title: 'task',
        exact: true,
        component: '../pages/task',
        Routes: ['src/layouts/TabBarLayout'],
      },
      {
        path: '/info',
        title: 'info',
        exact: true,
        component: '../pages/info',
        Routes: ['src/layouts/TabBarLayout'],
      },
      { path: '/login', title: 'login', exact: true, component: '../pages/login' },
      {
        path: '/user',
        title: 'user',
        exact: true,
        component: '../pages/user',
        Routes: ['src/layouts/AuthLayout'],
      },
    ],
  },
];

export default routes;
