import React from 'react';
import copy from 'copy-to-clipboard';
import { Toast } from 'antd-mobile';
import './index.less';

const ContactUs: React.FC = () => {
  const handleClick = () => {
    copy('赚点钱官方微信');
    Toast.info('复制成功');
  };
  return (
    <div className="contact-us-page">
      <div className="contact-us-wrapper">
        <div className="kf-code-wrapper">
          <div className="kf-code-box">
            <div className="kf-code-img">
              <img
                src="https://qr.api.cli.im/newqr/create?data=test&level=H&transparent=false&bgcolor=%23FFFFFF&forecolor=%23000000&blockpixel=12&marginblock=2&logourl=null&logoshape=no&size=447&bgimg=&text=&fontsize=30&fontcolor=%23000000&fontfamily=simsun.ttc&incolor=&outcolor=&qrcode_eyes=null&background=&wper=&hper=&tper=&lper=&eye_use_fore=1&qrpad=10&kid=cliim&key=6492b79a6484958bda3d2099728e07f8"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="code-name">
          赚点钱官方微信 <span onClick={handleClick}>复制</span>
        </div>
        <div className="discription">长按图片保存二维码，使用微信扫一扫识别</div>
      </div>
    </div>
  );
};

export default ContactUs;
