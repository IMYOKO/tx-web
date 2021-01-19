import React, { useEffect } from 'react';
import { connect } from 'dva';
import { RootState } from '@/types/common';
import { LOGIN_STATUS, ROLE_STATUS } from '@/types/enum';
import { UserInfoType } from '@/models/user';
import { IRoute } from 'umi-types';
import { Toast } from 'antd-mobile';
import { Redirect } from 'umi';

interface RoleLayoutProps extends IRoute {
  loginStatus: LOGIN_STATUS;
  userInfo: Partial<UserInfoType>;
}

const RoleLayout: React.FC<RoleLayoutProps> = props => {
  const {
    loginStatus,
    children,
    route,
    route: { roleStatus },
    userInfo: { roleCode },
  } = props;

  useEffect(() => {
    if (loginStatus === LOGIN_STATUS.yes && roleCode !== roleStatus) {
      if (roleCode === ROLE_STATUS.taker) {
        Toast.info('当前角色为玩家');
      }
      if (roleCode === ROLE_STATUS.dispatcher) {
        Toast.info('当前角色为NPC');
      }
    }
  }, [loginStatus, roleStatus, roleCode, children]);

  if (loginStatus === LOGIN_STATUS.yes) {
    if (roleCode === roleStatus) {
      return <>{children}</>;
    } else {
      return <Redirect to="/user" />;
    }
  }
  return null;
};

const mapStateToProps = (state: RootState) => {
  const { COMMON, USER } = state;
  const { loginStatus } = COMMON;
  const { userInfo } = USER;
  return { loginStatus, userInfo };
};
export default connect(mapStateToProps)(RoleLayout);
