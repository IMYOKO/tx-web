import React, { useState } from 'react';
import { FileDataType } from '@/types/common';
import UseUserInfo from '@/hooks/useUserInfo';
import { useDispatch, useHistory } from 'dva';
import { isEmpty } from 'lodash-es';
import { Toast } from 'antd-mobile';
import { fileByBase64 } from '@/utils';
import './index.less';

const Avatar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = UseUserInfo();
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
        Toast.info('修改成功', 1, () => {
          history.replace('/user');
        });
      },
    });
  };

  return (
    <div className="avatar-page">
      <div className="avatar-page-wrapper">
        <div className="avatar-page-box">
          <input type="file" key={new Date().getTime()} onChange={fileChange} accept="image/*" />
          {!isEmpty(avatar) && <img className="avatar" src={avatar.base64String} alt="" />}
          {avatarUrl && isEmpty(avatar) && <img className="old-avatar" src={avatarUrl} alt="" />}
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

export default Avatar;
