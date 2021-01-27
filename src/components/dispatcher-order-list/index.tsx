import Paginations, { PaginationsProps } from '@/components/paginations';
import { DispatcherOrderItemType } from '@/models/dispatcher';
import NoData from '@/components/no-data';
import { isEmpty } from 'lodash-es';
import React from 'react';
import './index.less';

export interface DispatcherOrderListProps extends PaginationsProps {
  list: DispatcherOrderItemType[];
  handleClick: (id: number) => void;
}

const DispatcherOrderList: React.FC<DispatcherOrderListProps> = props => {
  const { list, handleClick, ...paginationsProps } = props;
  if (isEmpty(list)) {
    return <NoData />;
  }
  return (
    <div className="dispatcher-order-list">
      <ul className="dispatcher-order-list-wrapper">
        {list.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            <div className="dispatcher-order-list-item" onClick={() => handleClick(item.id)}>
              <div className="list-item top-item">
                <div className="left title">{item.title}</div>
                <div className="right status">{item.statusText}</div>
              </div>
              <div className="list-item bottom-item">
                <div className="left name">
                  <img src={item.avatarUrl} width={16} alt="" />
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

export default DispatcherOrderList;
