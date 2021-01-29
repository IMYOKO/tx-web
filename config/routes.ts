import { IRoute } from 'umi-types';

const Taker = '1';
const Dispatcher = '2';

const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      {
        path: '/',
        title: '首页',
        exact: true,
        hideBackIcon: true,
        component: '../pages/Home/index',
        Routes: ['src/layouts/AuthLayout', 'src/layouts/TabBar'],
      },
      {
        path: '/detail',
        title: '详情',
        exact: true,
        component: '../pages/Home/detail',
        Routes: ['src/layouts/AuthLayout'],
      },
      /********************** 玩家order ************************/
      {
        path: '/task-taker',
        title: '玩家任务',
        exact: true,
        roleStatus: Taker,
        hideBackIcon: true,
        component: '../pages/Taker/index',
        Routes: ['src/layouts/AuthLayout', 'src/layouts/TabBar', 'src/layouts/RoleLayout'],
      },
      {
        path: '/task-taker-detail',
        title: '玩家任务详情',
        exact: true,
        roleStatus: Taker,
        component: '../pages/Taker/detail',
        Routes: ['src/layouts/AuthLayout', 'src/layouts/RoleLayout'],
      },
      {
        path: '/task-taker-sub-detail',
        title: '玩家任务详情',
        exact: true,
        roleStatus: Taker,
        component: '../pages/Taker/sub-detail',
        Routes: ['src/layouts/AuthLayout', 'src/layouts/RoleLayout'],
      },
      {
        path: '/submit-task',
        title: '提交任务',
        exact: true,
        roleStatus: Taker,
        component: '../pages/Taker/submit-task',
        Routes: ['src/layouts/AuthLayout', 'src/layouts/RoleLayout'],
      },
      /********************** NPC order ************************/
      {
        path: '/task-dispatcher',
        title: 'NPC任务',
        exact: true,
        roleStatus: Dispatcher,
        hideBackIcon: true,
        component: '../pages/Dispatcher/index',
        Routes: ['src/layouts/AuthLayout', 'src/layouts/TabBar', 'src/layouts/RoleLayout'],
      },
      {
        path: '/task-npc-detail',
        title: 'NPC任务详情',
        exact: true,
        roleStatus: Dispatcher,
        component: '../pages/Dispatcher/detail',
        Routes: ['src/layouts/AuthLayout', 'src/layouts/RoleLayout'],
      },
      {
        path: '/npc-sub-list',
        title: '名额审核',
        exact: true,
        roleStatus: Dispatcher,
        component: '../pages/Dispatcher/sub-list',
        Routes: ['src/layouts/AuthLayout', 'src/layouts/RoleLayout'],
      },
      {
        path: '/npc-sub-detail',
        title: '审核',
        exact: true,
        roleStatus: Dispatcher,
        component: '../pages/Dispatcher/sub-detail',
        Routes: ['src/layouts/AuthLayout', 'src/layouts/RoleLayout'],
      },
      {
        path: '/check-task',
        title: '提交审核',
        exact: true,
        roleStatus: Dispatcher,
        component: '../pages/Dispatcher/check-task',
        Routes: ['src/layouts/AuthLayout', 'src/layouts/RoleLayout'],
      },
      {
        path: '/add-order',
        title: '发布任务',
        exact: true,
        roleStatus: Dispatcher,
        component: '../pages/Dispatcher/add-order',
        Routes: ['src/layouts/AuthLayout', 'src/layouts/RoleLayout'],
      },
      /********************** 登录 ************************/
      {
        path: '/login',
        title: '登录',
        exact: true,
        component: '../pages/login',
        hideBackIcon: true,
        Routes: ['src/layouts/AuthLayout'],
      },
      /********************** 注册 ************************/
      {
        path: '/register',
        title: '注册',
        exact: true,
        hideBackIcon: true,
        component: '../pages/register',
      },
      /********************** 用户 ************************/
      {
        path: '/user',
        title: '我的',
        exact: true,
        component: '../pages/Users/user',
        hideBackIcon: true,
        Routes: ['src/layouts/AuthLayout', 'src/layouts/TabBar'],
      },
      {
        path: '/my-bill',
        title: '我的账单',
        exact: true,
        component: '../pages/Users/my-bill',
        Routes: ['src/layouts/AuthLayout'],
      },
      {
        path: '/withdraw',
        title: '提现',
        exact: true,
        component: '../pages/Users/withdraw',
        Routes: ['src/layouts/AuthLayout'],
      },
      {
        path: '/feedback',
        title: '意见反馈',
        exact: true,
        component: '../pages/Users/feedback',
        Routes: ['src/layouts/AuthLayout'],
      },
      {
        path: '/setting',
        title: '设置',
        exact: true,
        component: '../pages/Users/setting',
        Routes: ['src/layouts/AuthLayout'],
      },
      {
        path: '/contact-us',
        title: '联系客服',
        exact: true,
        component: '../pages/Users/contact',
        Routes: ['src/layouts/AuthLayout'],
      },
      {
        path: '/follow-us',
        title: '关注公众号',
        exact: true,
        component: '../pages/Users/follow',
        Routes: ['src/layouts/AuthLayout'],
      },
      {
        path: '/reset-password',
        title: '重置登录密码',
        exact: true,
        component: '../pages/Users/reset-password',
        Routes: ['src/layouts/AuthLayout'],
      },
      {
        path: '/rename',
        title: '修改昵称',
        exact: true,
        component: '../pages/Users/rename',
        Routes: ['src/layouts/AuthLayout'],
      },
      {
        path: '/avatar',
        title: '修改头像',
        exact: true,
        component: '../pages/Users/avatar',
        Routes: ['src/layouts/AuthLayout'],
      },
      {
        path: '/banks',
        title: '我的银行卡',
        exact: true,
        component: '../pages/Users/banks',
        Routes: ['src/layouts/AuthLayout'],
      },
      {
        path: '/add-bank',
        title: '添加银行卡',
        exact: true,
        component: '../pages/Users/add-bank',
        Routes: ['src/layouts/AuthLayout'],
      },
      // {
      //   path: '/reset-trade-password',
      //   title: '重置交易密码',
      //   exact: true,
      //   component: '../pages/Users/reset-trade-password',
      //   Routes: ['src/layouts/AuthLayout'],
      // },
      {
        path: '/404',
        title: '404',
        hideBackIcon: true,
        component: '../pages/404',
      },
    ],
  },
];

export default routes;
