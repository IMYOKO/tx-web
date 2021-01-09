import React, { useState, useEffect } from 'react';
import UserInfo, { UserInfoProps } from './user-info';
import Wealth from './wealth';
import NavList, { NavListItem, NavListProps } from '@/components/nav-list';
import { PageActionBaseProps } from '@/types/common';
import { UserInfoType } from '@/models/user';
import { connect, useHistory } from 'dva';
import RoleModal, { RoleModalProps } from './RoleModal';
import { Toast } from 'antd-mobile';
import './index.less';
import { ROLE_STATUS } from '@/types/enum';

interface UserPrpos extends PageActionBaseProps {
  userInfo: Partial<UserInfoType>;
}

const User: React.FC<UserPrpos> = props => {
  const { userInfo, dispatch } = props;
  const { roleCode } = userInfo;
  const [visible, setVisible] = useState<boolean>(false);
  const history = useHistory();

  const fetchData = () => {
    dispatch({
      type: 'USER/fetch',
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goPage = (path: string) => {
    history.push(path);
  };

  const renderRole = () => {
    let role = '';
    if (roleCode === ROLE_STATUS.orders) {
      role = '接单者';
    }
    if (roleCode === ROLE_STATUS.dispatcher) {
      role = '派单者';
    }
    return role;
  };

  const navList: NavListItem[][] = [
    [
      {
        iconClass: 'icon-bill',
        title: '我的账单',
        tips: '可提现',
        handleClick: () => {
          goPage('/my-bill');
        },
      },
      {
        iconClass: 'icon-bank-card',
        title: '我的银行卡',
        handleClick: () => {
          goPage('/banks');
        },
      },
    ],
    [
      {
        iconClass: 'icon-connect-us',
        title: '联系客服',
        handleClick: () => {
          goPage('/contact-us');
        },
      },
      {
        iconClass: 'icon-feedback',
        title: '意见反馈',
        handleClick: () => {
          goPage('/feedback');
        },
      },
    ],
    [
      {
        iconClass: 'icon-role',
        title: '角色切换',
        tips: renderRole(),
        handleClick: () => {
          showModal();
        },
      },
    ],
  ];

  const navListProps: NavListProps = {
    navList,
  };

  const userInfoProps: UserInfoProps = {
    userInfo,
    handleClick: () => {
      history.push('/setting');
    },
  };

  const hideModal = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const switchRole = () => {
    let role = '';
    if (roleCode === ROLE_STATUS.orders) {
      role = ROLE_STATUS.dispatcher;
    }
    if (roleCode === ROLE_STATUS.dispatcher) {
      role = ROLE_STATUS.orders;
    }
    if (!role) {
      Toast.info('角色获取失败');
      return;
    }
    dispatch({
      type: 'USER/switchRole',
      payload: {
        roleCode: role,
      },
      successCallback: () => {
        Toast.info('切换成功', 1, () => {
          hideModal();
        });
      },
      errCallback: hideModal,
    });
  };

  const roleModalProps: RoleModalProps = {
    visible,
    roleCode,
    hide: hideModal,
    onOk: () => {
      switchRole();
    },
  };

  return (
    <div className="user-page">
      <UserInfo {...userInfoProps} />
      <Wealth {...userInfo} />
      <NavList {...navListProps} />
      <RoleModal {...roleModalProps} />
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
