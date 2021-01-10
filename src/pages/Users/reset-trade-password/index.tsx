import React, { useState } from 'react';
import { isEmpty } from 'lodash-es';
import { Toast } from 'antd-mobile';
import { isTradePassword } from '@/utils';
import './index.less';

const ResetPassWord: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const oldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const confirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const submit = () => {
    if (isEmpty(oldPassword)) {
      Toast.info('旧交易密码不能为空');
      return;
    }
    if (isEmpty(password)) {
      Toast.info('新交易密码不能为空');
      return;
    }
    if (isEmpty(confirmPassword)) {
      Toast.info('确认新交易密码不能为空');
      return;
    }
    if (password !== confirmPassword) {
      Toast.info('两次新交易密码不一致');
      return;
    }
    if (password.length !== 6 || !isTradePassword(password)) {
      Toast.info('交易密码为6位数字');
      return;
    }
    const payload = {
      oldPassword,
      password,
      confirmPassword,
    };
    console.log({ payload });
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
              maxLength={6}
              value={oldPassword}
              autoComplete="off"
              placeholder="请输入旧交易密码"
              onChange={oldPasswordChange}
            />
          </div>
        </div>
        <div className="from-item">
          <div className="from-label">新密码</div>
          <div className="from-content">
            <input
              type="password"
              name="password"
              maxLength={6}
              value={password}
              autoComplete="off"
              onChange={passwordChange}
              placeholder="请输入新交易密码"
            />
          </div>
        </div>
        <div className="from-item">
          <div className="from-label">确认新密码</div>
          <div className="from-content">
            <input
              type="password"
              name="password"
              maxLength={6}
              value={confirmPassword}
              autoComplete="off"
              onChange={confirmPasswordChange}
              placeholder="交易密码为6位数字"
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

export default ResetPassWord;
