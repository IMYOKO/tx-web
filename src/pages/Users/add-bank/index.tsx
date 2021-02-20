import React from 'react';
import './index.less';

const AddBank: React.FC = () => {
  const submit = () => {};
  return (
    <div className="add-bank">
      <div className="from-wrapper">
        <div className="from-item">
          <div className="from-label">姓名</div>
          <div className="from-content">
            <input type="text" name="rename" autoComplete="off" placeholder="请输入姓名" />
          </div>
        </div>
        <div className="from-item">
          <div className="from-label">开户银行</div>
          <div className="from-content">
            <input type="text" name="bank" autoComplete="off" placeholder="请输入开户银行" />
          </div>
        </div>
        <div className="from-item">
          <div className="from-label">银行卡号</div>
          <div className="from-content">
            <input
              type="number"
              name="bankNumber"
              autoComplete="off"
              placeholder="请输入银行卡号"
            />
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
