import React, { useState, useEffect } from 'react';
import UseUserInfo from '@/hooks/useUserInfo';
import { useDispatch, useHistory } from 'dva';
import { isEmpty } from 'lodash-es';
import { Toast } from 'antd-mobile';
import './index.less';

const Rename: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = UseUserInfo();
  const [nickName, setNickName] = useState<string>('');

  useEffect(() => {
    if (userInfo && userInfo.nickName) {
      setNickName(userInfo.nickName);
    }
  }, [userInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const submit = () => {
    if (isEmpty(nickName)) {
      Toast.info('请输入昵称');
      return;
    }
    const payload = {
      nickName,
    };
    dispatch({
      type: 'USER/complementInfo',
      payload,
      successCallback: () => {
        Toast.info('修改成功', 1, () => {
          history.replace('/user');
        });
      },
    });
  };

  return (
    <div className="rename-page">
      <div className="from-wrapper">
        <div className="from-item">
          <div className="from-label">昵称</div>
          <div className="from-content">
            <input
              type="text"
              name="nickname"
              maxLength={12}
              value={nickName}
              autoComplete="off"
              placeholder="请输入昵称"
              onChange={handleChange}
            />
          </div>
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

export default Rename;
