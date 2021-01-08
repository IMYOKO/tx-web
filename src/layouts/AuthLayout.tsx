import React, { FunctionComponent } from 'react';
import { Redirect } from 'umi';
import { connect } from 'dva';
import { CommonModelState } from '@/models/common';
import { RootState } from '@/types/common';

const AuthLayout: React.FC<CommonModelState> = props => {
  const { token, children } = props;
  if (token) {
    return <>{children}</>;
  } else {
    return <Redirect to="/login" />;
  }
};

const mapStateToProps = (state: RootState) => {
  const { COMMON } = state;
  const { token } = COMMON;
  return { token };
};

export default connect(mapStateToProps)(AuthLayout);
