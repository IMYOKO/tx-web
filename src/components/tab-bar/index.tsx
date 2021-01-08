import React from 'react';
import { useHistory, useLocation } from 'dva';
import './index.less';

interface TabBarListItem {
  key: string;
  title: string;
  pathName: string;
  handClick?: () => void;
}

interface TabBarListProps {
  data: TabBarListItem[];
}

const TabBarList: React.FC<TabBarListProps> = ({ data }) => {
  const { pathname } = useLocation();
  return (
    <ul className="tab-bar-list">
      {data.map(({ key, title, pathName, handClick }: TabBarListItem, index: number) => (
        <li key={index} onClick={handClick}>
          <div
            className={`tab-bar-list-item ${
              pathname === pathName ? 'tab-bar-list-item-active' : ''
            }`}
          >
            <div className={`img-box ${key}`}></div>
            <div className="title">{title}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

const TabBar: React.FC = () => {
  const history = useHistory();
  const tabBarListProps: TabBarListProps = {
    data: [
      {
        key: 'home',
        title: '首页',
        pathName: '/',
        handClick: () => {
          history.replace('/');
        },
      },
      {
        key: 'task',
        title: '稿件',
        pathName: '/task',
        handClick: () => {
          history.replace('/task');
        },
      },
      {
        key: 'user',
        title: '我的',
        pathName: '/user',
        handClick: () => {
          history.replace('/user');
        },
      },
    ],
  };

  return (
    <div className="tab-bar">
      <div className="tab-bar-wrapper">
        <TabBarList {...tabBarListProps} />
      </div>
    </div>
  );
};

export default TabBar;
