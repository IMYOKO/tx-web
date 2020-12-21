import { VERIFICATION_CODE_TYPE } from './emun';

export interface OrderListParam {
  pageNo: number;
  pageSize: number;
  param: any;
}
export interface OrderDetailParam {
  orderId: number;
}

export interface RegisterParam {
  phone: string;
  password: string;
  confirmPassword: string;
  code: string;
  captchaIdentity: string;
}

export interface LoginParam {
  phone: string;
  password: string;
  code: string;
  captchaIdentity: string;
}
export interface CaptchaParam {
  verificationCodeType: VERIFICATION_CODE_TYPE;
}
