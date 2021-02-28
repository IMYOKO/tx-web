import Paginations, { PaginationsProps } from '@/components/paginations';
import { TakerOrderItemType } from '@/models/taker';
import defaultAvatarUrl from '@/assets/images/user/my_profile_face@2x.png';
import NoData from '@/components/no-data';
import { isEmpty } from 'lodash-es';
import React from 'react';
import './index.less';

export interface TakerOrderListProps extends PaginationsProps {
  list: TakerOrderItemType[];
  handleClick: (subOrderId: number, orderId: number) => void;
}

const TakerOrderList: React.FC<TakerOrderListProps> = props => {
  const { list, handleClick, ...paginationsProps } = props;
  if (isEmpty(list)) {
    return <NoData />;
  }
  return (
    <div className="task-order-list">
      <ul className="task-order-list-wrapper">
        {list.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            <div
              className="task-order-list-item"
              onClick={() => handleClick(item.id, item.orderId)}
            >
              <div className="list-item top-item">
                <div className="left title">{item.title}</div>
                <div className="right status">{item.statusText}</div>
              </div>
              <div className="list-item bottom-item">
                <div className="left name">
                  <img src={defaultAvatarUrl || item.avatarUrl} width={16} alt="" />
                  <span>{item.nickName}</span>
                </div>
                <div className="right money">
                  <span className="jinbi"></span>
                  <span className="text">赏金</span>
                  <span className="money-num">+{item.commissionAmount}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Paginations {...paginationsProps} />
    </div>
  );
};

export default TakerOrderList;
