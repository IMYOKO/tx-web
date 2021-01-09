import React, { useEffect } from 'react';
import { Redirect } from 'umi';
import { connect, useLocation } from 'dva';
import { CommonModelState } from '@/models/common';
import { RootState } from '@/types/common';
import { LOGIN_STATUS } from '@/types/enum';
import { Toast } from 'antd-mobile';

const AuthLayout: React.FC<CommonModelState> = props => {
  const { token, loginStatus, children } = props;
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/login') {
      if (loginStatus === LOGIN_STATUS.yes) {
        Toast.info('您已登录');
      }
    } else if (token) {
      if (loginStatus === LOGIN_STATUS.no) {
        Toast.info('获取用户信息失败，请重新登录');
      }
    } else {
      Toast.info('请先登录');
    }
  }, [children, token, loginStatus, pathname]);

  if (pathname === '/login') {
    if (loginStatus === LOGIN_STATUS.yes) {
      return <Redirect to="/user" />;
    } else {
      return <>{children}</>;
    }
  }
  if (token) {
    if (loginStatus === LOGIN_STATUS.yes) {
      return <>{children}</>;
    } else if (loginStatus === LOGIN_STATUS.no) {
      return <Redirect to="/login" />;
    } else {
      return null;
    }
  } else {
    return <Redirect to="/login" />;
  }
};

const mapStateToProps = (state: RootState) => {
  const { COMMON } = state;
  const { loginStatus, token } = COMMON;
  return { loginStatus, token };
};

export default connect(mapStateToProps)(AuthLayout);
