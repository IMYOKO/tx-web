import { PAY_TYPE } from '@/types/enum';
import wxPayImg from '@/assets/images/common/pay_wx.png';

interface PayDataItem {
  img: string;
  title: string;
  type: PAY_TYPE;
}

export const PAY_TYPE_CONFIG: PayDataItem[] = [
  {
    title: '微信支付',
    img: wxPayImg,
    type: PAY_TYPE.wechat,
  },
];
