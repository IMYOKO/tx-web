import React from 'react';
import './index.less';

const NavList: React.FC = () => {
  return (
    <>
      <div className="user-nav-list">
        <div className="user-nav-list-item">
          <div className="user-nav-list-item-box">
            <div className="icon-box icon-bill"></div>
            <div className="title">我的账单</div>
          </div>
          <div className="user-nav-list-item-box">
            <div className="tips">可提现</div>
            <div className="more"></div>
          </div>
        </div>
        <div className="user-nav-list-item">
          <div className="user-nav-list-item-box">
            <div className="icon-box icon-bank-card"></div>
            <div className="title">我的银行卡</div>
          </div>
          <div className="user-nav-list-item-box">
            <div className="more"></div>
          </div>
        </div>
      </div>

      <div className="user-nav-list">
        <div className="user-nav-list-item">
          <div className="user-nav-list-item-box">
            <div className="icon-box icon-connect-us"></div>
            <div className="title">联系客服</div>
          </div>
          <div className="user-nav-list-item-box">
            <div className="more"></div>
          </div>
        </div>
        <div className="user-nav-list-item">
          <div className="user-nav-list-item-box">
            <div className="icon-box icon-feedback"></div>
            <div className="title">意见反馈</div>
          </div>
          <div className="user-nav-list-item-box">
            <div className="more"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavList;
