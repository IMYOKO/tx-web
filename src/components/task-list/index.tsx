import { OrderListItemType } from '@/models/order';
import { useHistory } from 'dva';
import { isEmpty } from 'lodash-es';
import React from 'react';
import NoData from '@/components/no-data';
import Paginations, { PaginationsProps } from '@/components/paginations';
import defaultAvatarUrl from '@/assets/images/user/my_profile_face@2x.png';
import './index.less';
export interface TaskListProps extends PaginationsProps {
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
    <div
      className="task-list-item"
      onClick={() => {
        history.push(`/detail?id=${id}`);
      }}
    >
      <div className="task-title">{title}</div>
      <ul className="task-tabs-list">
        {tagList.map((tab: string, index: number) => (
          <li key={index}>
            <span>{tab}</span>
          </li>
        ))}
      </ul>
      <div className="avatar-wrapper">
        <img src={defaultAvatarUrl || avatarUrl} width={16} height={16} alt="" />
        <span>{nickName}</span>
      </div>
      <div className="money-wrapper">
        <div className="jinbi-wrapper">
          <div className="jinbi"></div>
          <div className="yongjin">赏金</div>
        </div>
        <div className="money">+{commissionAmount}</div>
      </div>
    </div>
  );
};

const TaskList: React.FC<TaskListProps> = ({ data, ...paginationsProps }) => {
  if (isEmpty(data)) {
    return <NoData />;
  }
  return (
    <>
      <ul className="task-list">
        {data.map((item: OrderListItemType, index: number) => (
          <li key={index}>
            <TaskListItem {...item} key={index} />
          </li>
        ))}
      </ul>
      <Paginations {...paginationsProps} />
    </>
  );
};

export default TaskList;
