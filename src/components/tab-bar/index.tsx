import React from 'react';
import { useHistory, useLocation } from 'dva';
import { LOGIN_STATUS, ROLE_STATUS } from '@/types/enum';
import { UserInfoType } from '@/models/user';
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

interface TabBarProps {
  userInfo: Partial<UserInfoType>;
}

const TabBar: React.FC<TabBarProps> = props => {
  const { userInfo } = props;
  const history = useHistory();
  const taskItem =
    userInfo.roleCode === ROLE_STATUS.dispatcher
      ? {
          key: 'task',
          title: '派单稿件',
          pathName: '/task-dispatcher',
          handClick: () => {
            history.replace('/task-dispatcher');
          },
        }
      : {
          key: 'task',
          title: '接单稿件',
          pathName: '/task-taker',
          handClick: () => {
            history.replace('/task-taker');
          },
        };
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
      taskItem,
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
