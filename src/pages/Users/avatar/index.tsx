import React, { useState } from 'react';
import { FileDataType, PageActionBaseProps, RootState } from '@/types/common';
import { connect, useDispatch, useHistory } from 'dva';
import { isEmpty } from 'lodash-es';
import { ActivityIndicator, Toast } from 'antd-mobile';
import { fileByBase64 } from '@/utils';
import defaultAvatarUrl from '@/assets/images/user/my_profile_face@2x.png';
import { UserInfoType } from '@/models/user';
import './index.less';

interface AvatarPagePrpos extends PageActionBaseProps {
  userInfo: Partial<UserInfoType>;
}

const Avatar: React.FC<AvatarPagePrpos> = ({ userInfo, loading = false }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { avatarUrl = '' } = userInfo;
  const [avatar, setAvatar] = useState<Partial<FileDataType>>({});

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      fileByBase64(files[0], setAvatar);
    }
  };

  const submit = () => {
    if (isEmpty(avatar)) {
      Toast.info('请先选择图片');
      return;
    }
    dispatch({
      type: 'USER/complementInfo',
      payload: { avatar },
      successCallback: () => {
        Toast.info('修改成功', 0.6, () => {
          history.replace('/user');
        });
      },
    });
  };

  const renderAvatarImg = () => {
    if (isEmpty(avatar)) {
      return <img className="old-avatar" src={avatarUrl || defaultAvatarUrl} alt="" />;
    }
    return <img className="avatar" src={avatar.base64String} alt="" />;
  };

  return (
    <div className="avatar-page">
      <ActivityIndicator toast size="large" text="正在修改..." animating={loading} />
      <div className="avatar-page-wrapper">
        <div className="avatar-page-box">
          <input type="file" key={new Date().getTime()} onChange={fileChange} accept="image/*" />
          {renderAvatarImg()}
        </div>
      </div>
      <div className="button-wrapper">
        <div className="button" onClick={submit}>
          确认修改
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const {
    USER: { userInfo },
    loading,
  } = state;
  return { userInfo, loading: loading.effects['USER/complementInfo'] };
};

export default connect(mapStateToProps)(Avatar);
