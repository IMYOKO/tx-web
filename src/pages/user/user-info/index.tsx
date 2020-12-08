import React from 'react';
import './index.less';

const UserInfo: React.FC = () => {
  return (
    <div className="user-info">
      <div className="avatar-wrapper">
        <div className="avatar-box">
          <img
            src="https://dev-res-cn.oss-cn-shenzhen.aliyuncs.com/next-maker/cms/9174d350-35fe-11eb-912f-c9d067017d00.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="user-info-wrapper">
        <div className="user-name">Catherine胡慧源</div>
        <div className="user-info-box">
          <span>个人资料</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
