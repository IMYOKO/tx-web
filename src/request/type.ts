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

export interface SubOrderCatchParam {
  orderId: number;
}

export interface SubOrderListParam extends OrderListParam {}

export interface SubOrderDetailParam {
  subOrderId: number;
}

export interface SubOrderSubmitParam {
  subOrderId: number;
  submitContent: string;
  submitFileList: string[];
}

export interface SubOrderAuditParam {
  subOrderId: number;
  amount: number;
  remark: string;
  status: string;
}

export interface OrderCreateParam {
  title: string;
  commissionAmount: number;
  count: number;
  principalAmount: number;
  description: string;
  descriptionFileList: any[];
  tagList: string[];
  taskClaim: string;
  taskClaimFileList: any[];
}

export interface FeedbackParam {
  content: string;
}

export interface SwitchRoleParam {
  roleCode: string;
}

export interface ComplementInfoParam {
  nickName: string;
  avatar: AvatarType;
}

export interface AvatarType {
  base64String: string;
  suffix: string;
}
