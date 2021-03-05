import { PageActionBaseProps, RootState } from '@/types/common';
import { connect, useHistory } from 'dva';
import React, { useState, useEffect, useRef } from 'react';
import { VERIFICATION_CODE_TYPE } from '@/request/emun';
import { CaptchaDataType } from '@/models/common';
import { Toast } from 'antd-mobile';
import { isEmpty } from 'lodash-es';
import { isPhone, isPassword } from '@/utils/index';
import CheckboxEnabledImg from '@/assets/images/common/checkbox_btn_enabled@2x.png';
import CheckboxSelectedImg from '@/assets/images/common/checkbox_btn_selected@2x.png';
import './index.less';
import Sms from '@/components/sms';

interface RegisterPageProps extends PageActionBaseProps {
  captchaData: Partial<CaptchaDataType>;
}

const Register: React.FC<RegisterPageProps> = props => {
  const {
    dispatch,
    captchaData: { captchaIdentity },
  } = props;
  const [agree, setAgree] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('');
  const history = useHistory();

  const codeRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const confirmPasswordRef = useRef<any>(null);

  const phoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const register = async () => {
    const code = codeRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (isEmpty(phone)) {
      Toast.info('手机号码不能为空');
      return;
    }
    if (isEmpty(code)) {
      Toast.info('验证码不能为空');
      return;
    }
    if (isEmpty(password)) {
      Toast.info('密码不能为空');
      return;
    }
    if (isEmpty(confirmPassword)) {
      Toast.info('确认密码不能为空');
      return;
    }
    if (!isPhone(phone)) {
      Toast.info('请输入正确的手机号码');
      return;
    }
    if (password !== confirmPassword) {
      Toast.info('两次密码不一致');
      return;
    }
    if (password.length < 6 || password.length > 18 || !isPassword(password)) {
      Toast.info('密码长度为6-18位数字字母下划线');
      return;
    }
    if (!agree) {
      Toast.info('请先阅读并同意平台服务协议');
      return;
    }
    const payload = {
      phone,
      code,
      password,
      confirmPassword,
      captchaIdentity,
    };
    console.log({ payload });
    try {
      await dispatch({
        type: 'COMMON/register',
        payload,
      });
      Toast.info('注册成功');
      history.replace('/');
    } catch (error) {
      const msg = error.message;
      if (msg) {
        Toast.info(msg);
      } else {
        Toast.info('注册失败');
      }
    }
  };

  const gologin = () => {
    history.push('/login');
  };

  const checkAgree = () => {
    setAgree(!agree);
  };

  return (
    <div className="register">
      <div className="from-wrapper">
        <div className="from-item">
          <div className="from-label">手机号码</div>
          <div className="from-content">
            <input
              type="text"
              name="phone"
              maxLength={11}
              value={phone}
              onChange={phoneChange}
              autoComplete="off"
              placeholder="请输入手机号码"
            />
          </div>
        </div>
        <div className="from-item from-item-code">
          <div className="from-label">验证码</div>
          <div className="from-content">
            <input
              type="text"
              name="code"
              className="code-text"
              maxLength={8}
              ref={codeRef}
              autoComplete="off"
              placeholder="请输入验证码"
            />
            <div className="code-img">
              <Sms
                phone={phone}
                className="sms-code"
                verificationCodeType={VERIFICATION_CODE_TYPE.register}
              />
            </div>
          </div>
        </div>
        <div className="from-item">
          <div className="from-label">密码</div>
          <div className="from-content">
            <input
              type="password"
              name="password"
              maxLength={18}
              ref={passwordRef}
              autoComplete="off"
              placeholder="请输入密码"
            />
          </div>
        </div>
        <div className="from-item">
          <div className="from-label">确认密码</div>
          <div className="from-content">
            <input
              type="password"
              name="password"
              maxLength={18}
              ref={confirmPasswordRef}
              autoComplete="off"
              placeholder="6-18位数字字母下划线"
            />
          </div>
        </div>
        <div className="from-item no-boder-bottom">
          <div className="text-wrapper">
            <img
              src={agree ? CheckboxSelectedImg : CheckboxEnabledImg}
              onClick={checkAgree}
              width={16}
              alt=""
            />
            <em onClick={checkAgree}>注册即同意</em>
            <span>《平台服务协议》</span>
          </div>
        </div>
        <div className="from-item">
          <div className="button-wrapper">
            <button className="button" onClick={register}>
              注册
            </button>
          </div>
        </div>
      </div>
      <div className="register-footer-wrapper">
        <span onClick={gologin}>立即登录</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const {
    COMMON: { captchaData },
  } = state;
  return { captchaData };
};

export default connect(mapStateToProps)(Register);
