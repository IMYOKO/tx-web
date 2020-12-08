import TaskList, { TaskListItemType } from '@/components/task-list';
import React from 'react';
import './index.less';

const Home: React.FC = () => {
  const data: TaskListItemType[] = [
    {
      id: 0,
      title: '简单填码赚5元',
      money: 4,
      name: '刘女士',
      avatar:
        'https://dev-res-cn.oss-cn-shenzhen.aliyuncs.com/next-maker/cms/9174d350-35fe-11eb-912f-c9d067017d00.jpg',
      tabs: ['初级任务'],
    },
    {
      id: 1,
      title: '简单填码赚5元',
      money: 4,
      name: '刘女士',
      avatar:
        'https://dev-res-cn.oss-cn-shenzhen.aliyuncs.com/next-maker/cms/9174d350-35fe-11eb-912f-c9d067017d00.jpg',
      tabs: ['初级任务'],
    },
    {
      id: 2,
      title: '简单填码赚5元',
      money: 4,
      name: '刘女士',
      avatar:
        'https://dev-res-cn.oss-cn-shenzhen.aliyuncs.com/next-maker/cms/9174d350-35fe-11eb-912f-c9d067017d00.jpg',
      tabs: ['初级任务'],
    },
    {
      id: 3,
      title: '简单填码赚5元',
      money: 4,
      name: '刘女士',
      avatar:
        'https://dev-res-cn.oss-cn-shenzhen.aliyuncs.com/next-maker/cms/9174d350-35fe-11eb-912f-c9d067017d00.jpg',
      tabs: ['初级任务'],
    },
    {
      id: 4,
      title: '简单填码赚5元',
      money: 4,
      name: '刘女士',
      avatar:
        'https://dev-res-cn.oss-cn-shenzhen.aliyuncs.com/next-maker/cms/9174d350-35fe-11eb-912f-c9d067017d00.jpg',
      tabs: ['初级任务'],
    },
    {
      id: 5,
      title: '简单填码赚5元',
      money: 4,
      name: '刘女士',
      avatar:
        'https://dev-res-cn.oss-cn-shenzhen.aliyuncs.com/next-maker/cms/9174d350-35fe-11eb-912f-c9d067017d00.jpg',
      tabs: ['初级任务'],
    },
  ];
  return (
    <div className="home-page">
      <div className="nav-wrapper">
        <div className="nav-list">
          <div className="nav-list-wrapper">
            <div className="nav-list-item active">全部</div>
            <div className="nav-list-item">最新</div>
          </div>
        </div>
        <div className="search"></div>
      </div>
      <TaskList data={data} />
    </div>
  );
};

export default Home;
