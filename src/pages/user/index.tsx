import React from 'react';
import UserInfo from './user-info';
import Wealth from './wealth';
import './index.less';

const User: React.FC = props => {
  return (
    <div className="user-page">
      <UserInfo />
      <Wealth />
    </div>
  );
};

export default User;
