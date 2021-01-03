import React from 'react';
import './index.less';

const ContactUs: React.FC = () => {
  return (
    <div className="contact-us-page">
      <div className="contact-us-wrapper">
        <div className="title">联系微信客服</div>
        <div className="kf-code-wrapper">
          <div className="kf-code-box">
            <img
              src="https://qr.api.cli.im/newqr/create?data=test&level=H&transparent=false&bgcolor=%23FFFFFF&forecolor=%23000000&blockpixel=12&marginblock=2&logourl=null&logoshape=no&size=447&bgimg=&text=&fontsize=30&fontcolor=%23000000&fontfamily=simsun.ttc&incolor=&outcolor=&qrcode_eyes=null&background=&wper=&hper=&tper=&lper=&eye_use_fore=1&qrpad=10&kid=cliim&key=6492b79a6484958bda3d2099728e07f8"
              alt=""
            />
          </div>
        </div>
        <div className="code-name">dsdsdsd</div>
        <div className="discription">长按图片保存二维码，使用微信扫一扫识别</div>
      </div>
    </div>
  );
};

export default ContactUs;
