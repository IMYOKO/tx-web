import React, { FunctionComponent } from 'react';
import { Redirect } from 'umi';
import { connect } from 'dva';
import { CommonModelState } from '@/models/common';
import { LOGIN_STATUS } from '@/types/enum';

const AuthLayout: React.FC<CommonModelState> = props => {
  const { isLogin, children } = props;
  if (isLogin === LOGIN_STATUS.login) {
    return <>{children}</>;
  } else if (isLogin === LOGIN_STATUS.logout) {
    return <Redirect to="/login" />;
  } else {
    return null;
  }
};

const mapStateToProps = (state: any) => {
  const { COMMON } = state;
  const { isLogin } = COMMON;
  return { isLogin };
};

export default connect(mapStateToProps)(AuthLayout);
