import React from 'react';
import routes from '../../../config/routes';

export interface HeaderConfigType {
  path?: string;
  title?: string;
  historyBack?: boolean;
  rightWrapper?: React.ReactNode;
}

const routesConfig: HeaderConfigType[] =
  routes[0].routes?.map(({ path, title }) => {
    return {
      path,
      title,
    };
  }) || [];

// 忽略返回
const backignoreMap: HeaderConfigType[] = [
  {
    path: '/',
  },
  {
    path: '/404',
  },
  {
    path: '/task',
  },
  {
    path: '/user',
  },
  {
    path: '/login',
  },
  {
    path: '/register',
  },
];

// 右边操作
const actionHeaders: HeaderConfigType[] = [
  {
    path: '/withdraw',
    rightWrapper: <span>dsds</span>,
  },
];

const HeaderConfig: HeaderConfigType[] = routesConfig.map(route => {
  const historyBack = !backignoreMap.some(b => b.path === route.path);
  const rightWrapper = actionHeaders.find(a => a.path === route.path)?.rightWrapper;
  return {
    ...route,
    historyBack,
    rightWrapper,
  };
});

export default HeaderConfig;
