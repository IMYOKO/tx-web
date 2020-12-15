import React, { useEffect } from 'react';
import UserInfo from './user-info';
import Wealth from './wealth';
import NavList from './nav-list';
import { PageActionBaseProps } from '@/types/common';
import { UserInfoType } from './model';
import { connect } from 'dva';
import './index.less';

interface UserPrpos extends PageActionBaseProps {
  userInfo: Partial<UserInfoType>;
}

const User: React.FC<UserPrpos> = props => {
  const { userInfo, dispatch } = props;

  const fetchData = () => {
    dispatch({
      type: 'USER/fetch',
    });
  };

  const clearData = () => {
    dispatch({
      type: 'USER/save',
      payload: { userInfo: {} },
    });
  };

  useEffect(() => {
    fetchData();
    return () => {
      clearData();
    };
  }, []);

  return (
    <div className="user-page">
      <UserInfo {...userInfo} />
      <Wealth {...userInfo} />
      <NavList />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const {
    USER: { userInfo },
  } = state;
  return { userInfo };
};

export default connect(mapStateToProps)(User);
