import React from 'react';
import './index.less';

export interface TaskListItemType {
  id: number;
  title: string;
  money: number;
  name: string;
  avatar: string;
  tabs: string[];
}

export interface TaskListProps {
  data: TaskListItemType[];
}

const TaskListItem: React.FC<TaskListItemType> = ({ title, tabs, avatar, name, money }) => {
  return (
    <div className="task-list-item">
      <div className="task-title">{title}</div>
      <ul className="task-tabs-list">
        {tabs.map((tab, index) => (
          <li key={index}>
            <span>{tab}</span>
          </li>
        ))}
      </ul>
      <div className="avatar-wrapper">
        <img src={avatar} width={16} height={16} alt="" />
        <span>{name}</span>
      </div>
      <div className="money-wrapper">
        <div className="jinbi-wrapper">
          <div className="jinbi"></div>
          <div className="yongjin">佣金</div>
        </div>
        <div className="money">+{money}</div>
      </div>
    </div>
  );
};

const TaskList: React.FC<TaskListProps> = ({ data }) => {
  return (
    <ul className="task-list">
      {data.map((item: TaskListItemType, index: number) => (
        <li key={index}>
          <TaskListItem {...item} key={index} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
