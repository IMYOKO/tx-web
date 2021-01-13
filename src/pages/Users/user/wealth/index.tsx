import { UserInfoType } from '@/models/user';
import { ROLE_STATUS } from '@/types/enum';
import React from 'react';
import './index.less';

interface RoleData {
  title: string;
  num: number;
}

const Wealth: React.FC<Partial<UserInfoType>> = props => {
  const { balance = 0, hasCommissionAmount = 0, todayIncome = 0, roleCode } = props;
  const renderContent = (takerData: RoleData, dispatcherData: RoleData) => {
    if (!roleCode) {
      return null;
    }
    if (roleCode === ROLE_STATUS.taker) {
      return (
        <>
          <div className="wealth-box">¥{takerData.num}</div>
          <div className="wealth-title">{takerData.title}</div>
        </>
      );
    }
    if (roleCode === ROLE_STATUS.dispatcher) {
      return (
        <>
          <div className="wealth-box">{dispatcherData.num}个</div>
          <div className="wealth-title">{dispatcherData.title}</div>
        </>
      );
    }
  };
  return (
    <div className="wealth-wrapper">
      <div className="wealth-item">
        <div className="wealth-box frist">¥{balance}</div>
        <div className="wealth-title">我的余额</div>
      </div>
      <div className="wealth-item">
        {renderContent(
          { title: '今日收入', num: todayIncome },
          { title: '今日完稿', num: todayIncome },
        )}
      </div>
      <div className="wealth-item">
        {renderContent(
          { title: '已赚佣金', num: hasCommissionAmount },
          { title: '累计完稿', num: todayIncome },
        )}
      </div>
    </div>
  );
};

export default Wealth;
