import { PageActionBaseProps } from '@/types/common';
import { connect } from 'dva';
import React, { useEffect, useRef } from 'react';
import { VERIFICATION_CODE_TYPE } from '@/request/emun';
import { CaptchaDataType } from '@/models/common';
import './index.less';

interface RegisterPageProps extends PageActionBaseProps {
  captchaData: Partial<CaptchaDataType>;
}

const Register: React.FC<RegisterPageProps> = props => {
  const {
    dispatch,
    captchaData: { captchaIdentity, image },
  } = props;

  const codeRef = useRef<any>(null);

  const fetchCaptcha = () => {
    dispatch({
      type: 'COMMON/fetchCaptcha',
      payload: {
        verificationCodeType: VERIFICATION_CODE_TYPE.register,
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

  const register = () => {
    const code = codeRef.current.value;
    const payload = {
      phone: '13049492162',
      password: '123456',
      confirmPassword: '123456',
      code,
      captchaIdentity,
    };
    console.log({ payload });
    dispatch({
      type: 'COMMON/register',
      payload,
    });
  };

  return (
    <div className="login">
      <div>
        <input type="text" name="" placeholder="手机号" />
      </div>
      <div>
        <input type="text" name="" placeholder="验证码" ref={codeRef} />
        {image && <img src={image} onClick={fetchCaptcha} alt="" />}
      </div>
      <div>
        <input type="password" name="" placeholder="密码" />
      </div>
      <div>
        <input type="password" name="" placeholder="再次输入密码" />
      </div>
      <div>
        <button onClick={register}>注册</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const {
    COMMON: { captchaData },
  } = state;
  return { captchaData };
};

export default connect(mapStateToProps)(Register);
