import React, { useState } from 'react';
import './index.less';

const Withdraw: React.FC = () => {
  const [amount, setAmount] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const withdrawAll = () => {
    setAmount('111');
  };

  return (
    <div className="withdraw-page">
      <div className="from-wrapper">
        <div className="from-item">
          <div className="from-label">提现金额</div>
          <div className="from-content">
            <input
              type="number"
              name="money"
              maxLength={7}
              value={amount}
              autoComplete="off"
              placeholder="请输入金额"
              onChange={handleChange}
            />
            <span>元</span>
          </div>
        </div>
      </div>
      <div className="balance">
        可用 1000.00 元，<span onClick={withdrawAll}>全部提现</span>
      </div>
      <div className="from-wrapper">
        <div className="from-item">
          <div className="from-label">提现金额</div>
          <div className="from-content">
            <span className="text">123</span>
            <span>元</span>
          </div>
        </div>
        <div className="from-item">
          <div className="from-label">提现到微信</div>
          <div className="from-content">
            <span></span>
            <span>元</span>
          </div>
        </div>
        <div className="from-item">
          <div className="from-label">到账金额</div>
          <div className="from-content">
            <span className="text">123</span>
            <span>元</span>
          </div>
        </div>
      </div>

      <div className="withdraw-tips">
        <div className="title">温馨提示：</div>
        <div className="discription">
          <p>1.平台试运营阶段暂不收取手</p>
          <p>
            2.提现后2小时内，如未到账请联系工作人员；（遇银行维护等不可控因素将导致到账时间延长）
          </p>
        </div>
      </div>

      <div className="button-wrapper">
        <div className="button">确定</div>
      </div>
    </div>
  );
};

export default Withdraw;
