import React, { useState } from 'react';
import NavList, { NavListItem, NavListProps } from '@/components/nav-list';
import LogoutModal, { LogoutModalProps } from './LogoutModal';
import { connect, useHistory } from 'dva';
import { Toast } from 'antd-mobile';
import { UserInfoType } from '@/models/user';
import { PageActionBaseProps, RootState } from '@/types/common';
import defaultAvatarUrl from '@/assets/images/user/my_profile_face@2x.png';
import { LOGIN_STATUS } from '@/types/enum';
import './index.less';

interface SettingPrpos extends PageActionBaseProps {
  userInfo: Partial<UserInfoType>;
}

const Setting: React.FC<SettingPrpos> = props => {
  const { userInfo, dispatch } = props;
  const { nickName = '', avatarUrl = '' } = userInfo;
  const [visible, setVisible] = useState<boolean>(false);
  const history = useHistory();

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
        tips: '',
        hideMoreIcon: true,
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
    Toast.info('退出登录成功', 0.6, () => {
      dispatch({
        type: 'USER/save',
        payload: {
          userInfo: {},
        },
      });
      dispatch({
        type: 'COMMON/save',
        payload: {
          token: '',
          loginStatus: LOGIN_STATUS.unknown,
        },
      });
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

const mapStateToProps = (state: RootState) => {
  const {
    USER: { userInfo },
  } = state;
  return { userInfo };
};

export default connect(mapStateToProps)(Setting);
