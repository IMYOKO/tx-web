import NoData from '@/components/no-data';
import Paginations, { PaginationsProps } from '@/components/paginations';
import { BillItem } from '@/models/user';
import { isEmpty } from 'lodash-es';
import React from 'react';

export interface BillListProps extends PaginationsProps {
  data: BillItem[];
}

const BillList: React.FC<BillListProps> = ({ data, ...paginationsProps }) => {
  if (isEmpty(data)) {
    return <NoData />;
  }
  return (
    <>
      <ul className="my-bill-list-wrapper">
        {data.map(({ billNo, createTime, amount, billTypeText }: BillItem) => (
          <li key={billNo}>
            <div className="my-bill-item">
              <div className="my-bill-item-box time">
                <span>任务号：{billNo}</span>
                <span>{createTime}</span>
              </div>
              <div className="my-bill-item-box money">
                <span>{billTypeText}</span>
                <span>+{amount}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Paginations {...paginationsProps} />
    </>
  );
};

export default BillList;
