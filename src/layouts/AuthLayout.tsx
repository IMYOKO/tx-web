import React from 'react';
import { Redirect } from 'umi';

const isLogin = false;

const AuthLayout: React.FC = props => {
  console.log(isLogin);
  if (isLogin) {
    return <>{props.children}</>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default AuthLayout;
