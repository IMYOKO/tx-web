import React from 'react';
import { connect } from 'dva';
import TabBar from '@/components/tab-bar';
import { RootState } from '@/types/common';
import { LOGIN_STATUS } from '@/types/enum';
import { UserInfoType } from '@/models/user';
import './index.less';

interface TabBarLayoutProps {
  loginStatus: LOGIN_STATUS;
  userInfo: Partial<UserInfoType>;
}

const TabBarLayout: React.FC<TabBarLayoutProps> = props => {
  const { loginStatus } = props;
  if (loginStatus === LOGIN_STATUS.yes) {
    return (
      <div className="has-tab-bar">
        {props.children}
        <TabBar {...props} />
      </div>
    );
  }
  return null;
};

const mapStateToProps = (state: RootState) => {
  const { COMMON, USER } = state;
  const { loginStatus } = COMMON;
  const { userInfo } = USER;
  return { loginStatus, userInfo };
};
export default connect(mapStateToProps)(TabBarLayout);
