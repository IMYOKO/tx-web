import React from 'react';
import { UserInfoType } from '@/models/user';
import defaultAvatarUrl from '@/assets/images/user/my_profile_face@2x.png';
import './index.less';

export interface UserInfoProps {
  userInfo: Partial<UserInfoType>;
  handleClick: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ userInfo, handleClick }) => {
  const { avatarUrl = '', nickName = '' } = userInfo;
  return (
    <div className="user-info">
      <div className="avatar-wrapper" onClick={handleClick}>
        <div className="avatar-box">
          <img src={avatarUrl || defaultAvatarUrl} alt="" />
        </div>
      </div>
      <div className="user-info-wrapper" onClick={handleClick}>
        <div className="user-name">{nickName || '请设置昵称'}</div>
        <div className="user-info-box">
          <span>个人资料</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
