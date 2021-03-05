import React, { useState } from 'react';
import { isEmpty } from 'lodash-es';
import { Toast } from 'antd-mobile';
import { isPassword, isPhone } from '@/utils';
import { useDispatch, useHistory } from 'dva';
import './index.less';
import { LOGIN_STATUS } from '@/types/enum';
import Sms from '@/components/sms';
import { VERIFICATION_CODE_TYPE } from '@/request/emun';

const ResetPassWord: React.FC = () => {
  const [phone, setPhone] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const dispatch = useDispatch();
  const history = useHistory();

  const phoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const codeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const confirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const submit = async () => {
    if (isEmpty(phone)) {
      Toast.info('手机号码不能为空');
      return;
    }
    if (!isPhone(phone)) {
      Toast.info('请输入正确的手机号码');
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
      code,
      phone,
      password,
      confirmPassword,
    };
    console.log({ payload });
    try {
      await dispatch({
        type: 'USER/resetPassword',
        payload,
      });
      Toast.info('修改成功，请重新登录', 0.6, () => {
        localStorage.clear();
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
      if (error && error.message) {
        Toast.info(error.message);
      }
    }
  };

  return (
    <div className="reset-password">
      <div className="from-wrapper">
        <div className="from-item">
          <div className="from-label">手机号码</div>
          <div className="from-content">
            <input
              type="text"
              name="phone"
              maxLength={11}
              value={phone}
              autoComplete="off"
              placeholder="请输入手机号码"
              onChange={phoneChange}
            />
          </div>
        </div>
        <div className="from-item">
          <div className="from-label">验证码</div>
          <div className="from-content">
            <input
              type="text"
              name="code"
              maxLength={8}
              value={code}
              autoComplete="off"
              placeholder="请输入验证码"
              onChange={codeChange}
            />
            <div className="send-code">
              <Sms phone={phone} verificationCodeType={VERIFICATION_CODE_TYPE.resetPassword} />
            </div>
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
              name="confirmPassword"
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
