import React from 'react';
import { UserInfoType } from '../model';
import './index.less';

const UserInfo: React.FC<Partial<UserInfoType>> = props => {
  const { avatarUrl = '', nickName = '' } = props;
  return (
    <div className="user-info">
      <div className="avatar-wrapper">
        <div className="avatar-box">{avatarUrl && <img src={avatarUrl} alt="" />}</div>
      </div>
      <div className="user-info-wrapper">
        <div className="user-name">{nickName}</div>
        <div className="user-info-box">
          <span>个人资料</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
