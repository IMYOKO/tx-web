import { PageActionBaseProps, RootState } from '@/types/common';
import { connect, useHistory } from 'dva';
import React, { useEffect, useRef } from 'react';
import { VERIFICATION_CODE_TYPE } from '@/request/emun';
import { CaptchaDataType } from '@/models/common';
import { Toast } from 'antd-mobile';
import { isEmpty } from 'lodash-es';
import { isPhone, isPassword } from '@/utils/index';
import { LOGIN_STATUS } from '@/types/enum';
import './index.less';

interface LoginPageProps extends PageActionBaseProps {
  captchaData: Partial<CaptchaDataType>;
}

const Login: React.FC<LoginPageProps> = props => {
  const {
    dispatch,
    captchaData: { captchaIdentity, image },
  } = props;
  const history = useHistory();

  const phoneRef = useRef<any>(null);
  const codeRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const fetchCaptcha = () => {
    dispatch({
      type: 'COMMON/fetchCaptcha',
      payload: {
        verificationCodeType: VERIFICATION_CODE_TYPE.login,
      },
    });
  };

  const clearCaptcha = () => {
    dispatch({
      type: 'COMMON/save',
      payload: {
        captchaData: {},
      },
    });
  };

  useEffect(() => {
    fetchCaptcha();
    return () => {
      clearCaptcha();
    };
  }, []);

  const login = async () => {
    const phone = phoneRef.current.value;
    const password = passwordRef.current.value;
    const code = codeRef.current.value;
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
    if (!isPhone(phone)) {
      Toast.info('请输入正确的手机号码');
      return;
    }
    if (password.length < 6 || password.length > 18 || !isPassword(password)) {
      Toast.info('密码长度为6-18位数字字母下划线');
      return;
    }
    const payload = {
      phone,
      password,
      code,
      captchaIdentity,
    };
    console.log({ payload });
    try {
      await dispatch({
        type: 'COMMON/login',
        payload,
      });
      Toast.info('登录成功');
      history.replace('/');
    } catch (error) {
      const msg = error.message;
      if (msg) {
        Toast.info(msg);
      } else {
        Toast.info('登录失败');
      }
      fetchCaptcha();
    }
  };

  const goRegister = () => {
    history.push('/register');
  };

  const goResetPassword = () => {
    history.push('/reset-password');
  };

  return (
    <div className="login">
      <div className="from-wrapper">
        <div className="from-item">
          <div className="from-label">手机号码</div>
          <div className="from-content">
            <input
              type="text"
              name="phone"
              maxLength={11}
              ref={phoneRef}
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
              maxLength={10}
              ref={codeRef}
              autoComplete="off"
              placeholder="请输入验证码"
            />
            <div className="code-img">
              {image && <img src={image} onClick={fetchCaptcha} alt="" />}
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
        <div className="from-item no-boder-bottom">
          <div className="text-wrapper">
            <span onClick={goResetPassword}>忘记密码</span>
          </div>
        </div>
        <div className="from-item">
          <div className="button-wrapper">
            <button className="button" onClick={login}>
              登录
            </button>
          </div>
        </div>
      </div>
      <div className="login-footer-wrapper">
        <span onClick={goRegister}>立即注册</span>
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

export default connect(mapStateToProps)(Login);
