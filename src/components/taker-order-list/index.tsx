import { TakerOrderItemType } from '@/models/taker';
import { isEmpty } from 'lodash-es';
import React from 'react';
import './index.less';

export interface TakerOrderListProps {
  list: TakerOrderItemType[];
}

const TakerOrderList: React.FC<TakerOrderListProps> = props => {
  const { list } = props;
  if (isEmpty(list)) {
    return <div className="is-empty-data">暂无数据</div>;
  }
  return (
    <div className="task-order-list">
      <ul className="task-order-list-wrapper">
        {list.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            <div className="task-order-list-item">
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
                  <span className="text">佣金</span>
                  <span className="money-num">+{item.commissionAmount}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TakerOrderList;
