import { VERIFICATION_CODE_TYPE } from '@/request/emun';
import { isPhone } from '@/utils';
import { Toast } from 'antd-mobile';
import { useDispatch } from 'dva';
import { isEmpty } from 'lodash-es';
import React, { useState, useEffect } from 'react';

interface SmsProps {
  className?: string;
  phone: string;
}

let timer: number;
let count: number = 30;
let isSendMsg: boolean = false;
const initCodeText: string = '获取验证码';

const Sms = ({ className = '', phone }: SmsProps) => {
  const [codeText, setCodeText] = useState<string>(initCodeText);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  const clearTimer = () => {
    count = 30;
    isSendMsg = false;
    clearInterval(timer);
    setCodeText(initCodeText);
  };

  const countdown = () => {
    timer = window.setInterval(() => {
      count--;
      setCodeText(`${count} S`);
      if (count === 0) {
        clearTimer();
      }
    }, 1000);
  };
  const getSMSCode = async () => {
    if (isSendMsg) {
      return;
    }

    if (isEmpty(phone)) {
      Toast.info('手机号码不能为空');
      return;
    }

    if (!isPhone(phone)) {
      Toast.info('请输入正确的手机号码');
      return;
    }

    const payload = {
      mobile: phone,
      verificationCodeType: VERIFICATION_CODE_TYPE.register,
    };
    isSendMsg = true;
    countdown();
    return;
    try {
      await dispatch({
        type: 'COMMON/getSMSCode',
        payload,
      });
    } catch (error) {
      if (error && error.message) {
        Toast.info(error.message);
      }
    }
  };
  return (
    <span className={className} onClick={getSMSCode}>
      {codeText}
    </span>
  );
};

export default Sms;
