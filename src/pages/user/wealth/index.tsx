import React from 'react';
import './index.less';

const Wealth: React.FC = () => {
  return (
    <div className="wealth-wrapper">
      <div className="wealth-item">
        <div className="wealth-box frist">¥10.00</div>
        <div className="wealth-title">我的余额</div>
      </div>
      <div className="wealth-item">
        <div className="wealth-box">¥10.00</div>
        <div className="wealth-title">我的余额</div>
      </div>
      <div className="wealth-item">
        <div className="wealth-box">¥10.00</div>
        <div className="wealth-title">我的余额</div>
      </div>
    </div>
  );
};

export default Wealth;
