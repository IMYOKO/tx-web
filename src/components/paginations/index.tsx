import { Pagination } from '@/types/common';
import React from 'react';
import './index.less';

export interface PaginationsProps {
  pagination: Pagination;
  pageNoChange: () => void;
}

const Paginations: React.FC<PaginationsProps> = props => {
  const { pagination, pageNoChange } = props;
  const { pageNo, totalPage } = pagination;
  const renderContent = () => {
    if (totalPage <= 0) {
      return null;
    }
    if (pageNo < totalPage) {
      return (
        <span onClick={pageNoChange} className="check-more">
          查看更多
        </span>
      );
    }
    return <span>没有更多</span>;
  };
  return <div className="paginations">{renderContent()}</div>;
};

export default Paginations;
