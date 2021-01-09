import { UserInfoType } from '@/models/user';
import React from 'react';
import './index.less';

const Wealth: React.FC<Partial<UserInfoType>> = props => {
  const { balance = 0, hasCommissionAmount = 0, todayIncome = 0 } = props;
  return (
    <div className="wealth-wrapper">
      <div className="wealth-item">
        <div className="wealth-box frist">¥{balance}</div>
        <div className="wealth-title">我的余额</div>
      </div>
      {/* <div className="wealth-item">
        <div className="wealth-box">¥{todayIncome}</div>
        <div className="wealth-title">今日收入</div>
      </div>
      <div className="wealth-item">
        <div className="wealth-box">¥{hasCommissionAmount}</div>
        <div className="wealth-title">已赚佣金</div>
      </div> */}
      <div className="wealth-item">
        <div className="wealth-box">{todayIncome}个</div>
        <div className="wealth-title">今日完稿</div>
      </div>
      <div className="wealth-item">
        <div className="wealth-box">{hasCommissionAmount}个</div>
        <div className="wealth-title">累计完稿</div>
      </div>
    </div>
  );
};

export default Wealth;
