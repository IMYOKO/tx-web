import Sms from '@/components/sms';
import { VERIFICATION_CODE_TYPE } from '@/request/emun';
import { isBankCard, isIDCard, isPhone } from '@/utils';
import { Toast } from 'antd-mobile';
import { useDispatch, useHistory } from 'dva';
import { isEmpty } from 'lodash-es';
import React, { useState } from 'react';
import './index.less';

const AddBank: React.FC = () => {
  const [realName, setRealName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [bankNo, setBankNo] = useState<string>('');
  const [idNo, setIdNo] = useState<string>('');

  const dispatch = useDispatch();
  const history = useHistory();

  const realNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRealName(e.target.value);
  };

  const phoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const codeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const bankNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankNo(e.target.value);
  };

  const idNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdNo(e.target.value);
  };

  const inputNumberLimit = (e: React.ChangeEvent<HTMLInputElement>, maxLength: number) => {
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
  };

  const submit = async () => {
    if (isEmpty(realName)) {
      Toast.info('姓名不能为空');
      return;
    }
    if (isEmpty(bankNo)) {
      Toast.info('银行卡号不能为空');
      return;
    }
    if (!isBankCard(bankNo)) {
      Toast.info('请输入正确银行卡号');
      return;
    }
    if (isEmpty(idNo)) {
      Toast.info('身份证号不能为空');
      return;
    }
    if (!isIDCard(idNo)) {
      Toast.info('请输入正确身份证号');
      return;
    }
    if (isEmpty(phone)) {
      Toast.info('预留手机号不能为空');
      return;
    }
    if (isEmpty(phone)) {
      Toast.info('预留手机号不能为空');
      return;
    }
    if (!isPhone(phone)) {
      Toast.info('请输入正确的手机号码');
      return;
    }
    if (isEmpty(code)) {
      Toast.info('验证码不能为空');
      return;
    }
    const payload = {
      bankNo,
      idNo,
      realName,
      mobile: phone,
      verificationCode: code,
    };
    console.log({ payload });
    try {
      await dispatch({
        type: 'USER/addBank',
        payload,
      });
      Toast.info('添加成功', 0.3, () => {
        history.replace('/banks');
      });
    } catch (error) {
      console.log(error);
      if (error && error.message) {
        Toast.info(error.message);
      }
    }
  };
  return (
    <div className="add-bank">
      <div className="from-wrapper">
        <div className="from-item">
          <div className="from-label">开户姓名</div>
          <div className="from-content">
            <input
              type="text"
              name="rename"
              value={realName}
              onChange={realNameChange}
              autoComplete="off"
              placeholder="请输入姓名"
            />
          </div>
        </div>
        <div className="from-item">
          <div className="from-label">银行卡号</div>
          <div className="from-content">
            <input
              type="number"
              name="bankNumber"
              value={bankNo}
              onChange={bankNoChange}
              autoComplete="off"
              maxLength={19}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => inputNumberLimit(e, 19)}
              placeholder="请输入银行卡号"
            />
          </div>
        </div>
        <div className="from-item">
          <div className="from-label">身份证号</div>
          <div className="from-content">
            <input
              type="number"
              name="rnNumber"
              value={idNo}
              maxLength={18}
              onChange={idNoChange}
              autoComplete="off"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => inputNumberLimit(e, 18)}
              placeholder="请输入身份证号"
            />
          </div>
        </div>
        <div className="from-item">
          <div className="from-label">预留手机号</div>
          <div className="from-content">
            <input
              type="number"
              name="phone"
              autoComplete="off"
              value={phone}
              maxLength={11}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => inputNumberLimit(e, 11)}
              onChange={phoneChange}
              placeholder="银行预留手机号"
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
              <Sms phone={phone} verificationCodeType={VERIFICATION_CODE_TYPE.bandBankCard} />
            </div>
          </div>
        </div>
      </div>
      <div className="button-wrapper">
        <div className="button" onClick={submit}>
          确认添加
        </div>
      </div>
    </div>
  );
};

export default AddBank;
