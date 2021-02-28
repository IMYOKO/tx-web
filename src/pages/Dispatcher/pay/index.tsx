import useQuery from '@/hooks/useQuery';
import useSubOrderDetail from '@/hooks/useSubOrderDetail';
import { PAY_TYPE } from '@/types/enum';
import React, { useState } from 'react';
import { PAY_TYPE_CONFIG } from './data';
import './index.less';

const Pay: React.FC = () => {
  const { id } = useQuery();
  const { realAmount = 0, status } = useSubOrderDetail(id);
  const [curPayType, setCurPayType] = useState<PAY_TYPE>(PAY_TYPE.wechat);

  const pay = () => {
    console.log('pay');
    // window.location.href =
    //   'https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx2016121516420242444321ca0631331346&package=1405458241';
  };

  const selectPay = (p: PAY_TYPE) => {
    setCurPayType(p);
  };

  const renderSelectPay = (payType: PAY_TYPE) => {
    if (curPayType === payType) {
      return <div className="icon-right to-pay-selected"></div>;
    }
    return <div className="icon-right to-pay"></div>;
  };

  const renderPayButton = () => {
    if (!status) {
      return;
    }
    if (status === '1') {
      return <div className="button disabled">进行中</div>;
    }
    if (status === '2') {
      return <div className="button disabled">审核中</div>;
    }
    if (status === '3') {
      return <div className="button disabled">审核失败</div>;
    }
    if (status === '4') {
      return (
        <div className="button" onClick={pay}>
          去付款
        </div>
      );
    }
    if (status === '5') {
      return <div className="button disabled">已完成</div>;
    }
    if (status === '6') {
      return <div className="button disabled">已取消</div>;
    }
  };

  return (
    <div className="pay-page">
      <div className="pay-number-wrapper">
        <h4>支付金额</h4>
        <h1>
          ¥<span>{realAmount}</span>
        </h1>
      </div>
      <div className="pay-type">请选择支付方式</div>
      <ul className="pay-list">
        {PAY_TYPE_CONFIG.map((pay, index) => (
          <li key={index}>
            <div className="pay-list-item" onClick={() => selectPay(pay.type)}>
              <div className="item-box">
                <div className="icon-left">
                  <img src={pay.img} alt="" />
                </div>
                <div className="title">{pay.title}</div>
              </div>
              <div className="item-box">{renderSelectPay(pay.type)}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="button-wrapper">{renderPayButton()}</div>
    </div>
  );
};

export default Pay;
