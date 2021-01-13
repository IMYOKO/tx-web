import { OrderListItemType } from '@/pages/Home/index/model';
import { useHistory } from 'dva';
import { isEmpty } from 'lodash-es';
import React from 'react';
import './index.less';
export interface TaskListProps {
  data: OrderListItemType[];
}

const TaskListItem: React.FC<OrderListItemType> = ({
  id,
  title,
  tagList,
  avatarUrl,
  nickName,
  commissionAmount,
}) => {
  const history = useHistory();
  return (
    <div className="task-list-item">
      <div
        className="task-title"
        onClick={() => {
          history.push(`/detail?id=${id}`);
        }}
      >
        {title}
      </div>
      <ul className="task-tabs-list">
        {tagList.map((tab: string, index: number) => (
          <li key={index}>
            <span>{tab}</span>
          </li>
        ))}
      </ul>
      <div className="avatar-wrapper">
        <img src={avatarUrl} width={16} height={16} alt="" />
        <span>{nickName}</span>
      </div>
      <div className="money-wrapper">
        <div className="jinbi-wrapper">
          <div className="jinbi"></div>
          <div className="yongjin">佣金</div>
        </div>
        <div className="money">+{commissionAmount}</div>
      </div>
    </div>
  );
};

const TaskList: React.FC<TaskListProps> = ({ data }) => {
  if (isEmpty(data)) {
    return <div className="is-empty-data">暂无数据</div>;
  }
  return (
    <ul className="task-list">
      {data.map((item: OrderListItemType, index: number) => (
        <li key={index}>
          <TaskListItem {...item} key={index} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
