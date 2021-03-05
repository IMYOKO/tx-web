import Sms from '@/components/sms';
import { VERIFICATION_CODE_TYPE } from '@/request/emun';
import { Toast } from 'antd-mobile';
import { useDispatch, useHistory } from 'dva';
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

  const submit = async () => {
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
              onChange={idNoChange}
              autoComplete="off"
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
              maxLength={11}
              value={phone}
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
