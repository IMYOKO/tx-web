import React, { useState } from 'react';
import { isEmpty } from 'lodash-es';
import { Toast } from 'antd-mobile';
import { isPassword } from '@/utils';
import { useDispatch, useHistory } from 'dva';
import './index.less';
import { LOGIN_STATUS } from '@/types/enum';

const ResetPassWord: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const dispatch = useDispatch();
  const history = useHistory();

  const oldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const confirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const submit = async () => {
    if (isEmpty(oldPassword)) {
      Toast.info('旧登录密码不能为空');
      return;
    }
    if (isEmpty(password)) {
      Toast.info('新登录密码不能为空');
      return;
    }
    if (isEmpty(confirmPassword)) {
      Toast.info('确认新登录密码不能为空');
      return;
    }
    if (password !== confirmPassword) {
      Toast.info('两次新登录密码不一致');
      return;
    }
    if (password.length < 6 || password.length > 18 || !isPassword(password)) {
      Toast.info('密码长度为6-18位数字字母下划线');
      return;
    }
    const payload = {
      oldPassword,
      password,
      confirmPassword,
    };
    console.log({ payload });
    try {
      await dispatch({
        type: 'user/resetPassword',
        payload,
      });
      Toast.info('修改成功，请重新登录', 0.6, () => {
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
        history.replace('/login');
      });
    } catch (error) {
      Toast.info('修改失败');
    }
  };

  return (
    <div className="reset-password">
      <div className="from-wrapper">
        <div className="from-item">
          <div className="from-label">旧密码</div>
          <div className="from-content">
            <input
              type="password"
              name="password"
              maxLength={18}
              value={oldPassword}
              autoComplete="off"
              placeholder="请输入旧登录密码"
              onChange={oldPasswordChange}
            />
          </div>
        </div>
      </div>
      <div className="from-wrapper">
        <div className="from-item">
          <div className="from-label">新密码</div>
          <div className="from-content">
            <input
              type="password"
              name="password"
              maxLength={18}
              value={password}
              autoComplete="off"
              onChange={passwordChange}
              placeholder="请输入新登录密码"
            />
          </div>
        </div>
        <div className="from-item">
          <div className="from-label">确认新密码</div>
          <div className="from-content">
            <input
              type="password"
              name="password"
              maxLength={18}
              value={confirmPassword}
              autoComplete="off"
              onChange={confirmPasswordChange}
              placeholder="6-18位数字字母下划线"
            />
          </div>
        </div>
      </div>
      <div className="button-wrapper">
        <div className="button" onClick={submit}>
          确认提交
        </div>
      </div>
    </div>
  );
};

export default ResetPassWord;
