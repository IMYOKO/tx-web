import React from 'react';
import NoDataImg from '@/assets/images/common/no_data@2x.png';
import './index.less';

const NoData: React.FC = () => {
  return (
    <div className="is-empty-data">
      <div className="is-empty-data-img">
        <img src={NoDataImg} alt="" />
      </div>
      <div className="is-empty-data-text">暂无数据</div>
    </div>
  );
};

export default NoData;
