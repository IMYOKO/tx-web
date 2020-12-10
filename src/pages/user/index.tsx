import React from 'react';
import UserInfo from './user-info';
import Wealth from './wealth';
import NavList from './nav-list';
import './index.less';

const User: React.FC = props => {
  return (
    <div className="user-page">
      <UserInfo />
      <Wealth />
      <NavList />
    </div>
  );
};

export default User;
