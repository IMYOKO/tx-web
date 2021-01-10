import React, { useEffect } from 'react';
import copy from 'copy-to-clipboard';
import { Toast } from 'antd-mobile';
import { useDispatch, useSelector } from 'dva';
import { RootState } from '@/types/common';
import './index.less';

const Follow: React.FC = () => {
  const dispatch = useDispatch();

  const { publicQrCode } = useSelector((state: RootState) => state.COMMON);

  useEffect(() => {
    dispatch({
      type: 'COMMON/publicQrCode',
    });
  }, []);

  const handleClick = () => {
    copy('赚点钱官方微信');
    Toast.info('复制成功');
  };

  return (
    <div className="contact-us-page">
      <div className="contact-us-wrapper">
        <div className="kf-code-wrapper">
          <div className="kf-code-box">
            <div className="kf-code-img">{publicQrCode && <img src={publicQrCode} alt="" />}</div>
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

export default Follow;
