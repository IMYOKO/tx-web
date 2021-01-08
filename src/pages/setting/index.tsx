import React, { useState, useEffect } from 'react';
import NavList, { NavListItem, NavListProps } from '@/components/nav-list';
import LogoutModal, { LogoutModalProps } from './LogoutModal';
import { connect, useHistory } from 'dva';
import { Toast } from 'antd-mobile';
import { UserInfoType } from '@/models/user';
import { PageActionBaseProps } from '@/types/common';
import defaultAvatarUrl from '@/assets/images/user/my_profile_face@2x.png';
import './index.less';

interface SettingPrpos extends PageActionBaseProps {
  userInfo: Partial<UserInfoType>;
}

const Setting: React.FC<SettingPrpos> = props => {
  const { userInfo, dispatch } = props;
  const { nickName = '', avatarUrl = '' } = userInfo;
  const [visible, setVisible] = useState<boolean>(false);
  const history = useHistory();

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

  const navList: NavListItem[][] = [
    [
      {
        title: '头像',
        tips: (
          <div className="avatar">
            <img src={avatarUrl || defaultAvatarUrl} alt="" />
          </div>
        ),
        handleClick: () => {
          history.push('/avatar');
        },
      },
      {
        title: '昵称',
        tips: nickName,
        handleClick: () => {
          history.push('/rename');
        },
      },
      {
        title: '手机号码',
        tips: '13049492162',
      },
    ],
    [
      // {
      //   title: '重置交易密码',
      //   handleClick: () => {
      //     history.push('/reset-trade-password');
      //   },
      // },
      {
        title: '重置登录密码',
        handleClick: () => {
          history.push('/reset-password');
        },
      },
    ],
  ];

  const showLogoutModal = () => {
    setVisible(true);
  };

  const hideLogoutModal = () => {
    setVisible(false);
  };

  const navListProps: NavListProps = {
    navList,
  };

  const logout = () => {
    localStorage.removeItem('token');
    Toast.info('退出登录成功', 1, () => {
      hideLogoutModal();
      history.replace('/login');
    });
  };

  const logoutModalProps: LogoutModalProps = {
    visible,
    hide: hideLogoutModal,
    onOk: logout,
  };

  return (
    <div className="setting-page">
      <NavList {...navListProps} />
      <div className="logout" onClick={showLogoutModal}>
        退出登录
      </div>
      <LogoutModal {...logoutModalProps} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const {
    USER: { userInfo },
  } = state;
  return { userInfo };
};

export default connect(mapStateToProps)(Setting);
