import ApiRequest from './request';
import { AxiosPromise } from 'axios';
import { baseURL } from './config';
import {
  OrderListParam,
  OrderDetailParam,
  RegisterParam,
  LoginParam,
  CaptchaParam,
  SubOrderCatchParam,
  SubOrderListParam,
  SubOrderDetailParam,
  SubOrderSubmitParam,
  SubOrderAuditParam,
  OrderCreateParam,
  FeedbackParam,
  SwitchRoleParam,
  ComplementInfoParam,
  OrderSubListParam,
  CancelOrderParam,
  CancelSubOrderParam,
} from './type';

const apiRequest = new ApiRequest();

apiRequest.axios.interceptors.request.use(
  config => {
    return Promise.resolve(config);
  },
  error => {
    return Promise.reject(error);
  },
);

apiRequest.axios.interceptors.response.use(
  data => {
    return Promise.resolve(data);
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

/**
 * 新增订单
 */
const orderCreate = (data: OrderCreateParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/order/create`, data);
};

/**
 * 订单列表
 */
const orderList = (data: OrderListParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/order/list`, data);
};

/**
 * 订单详情
 */
const orderDetail = (data: OrderDetailParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/order/detail`, data);
};

/**
 * 获取标签
 */
const orderTagList = (): AxiosPromise => {
  return apiRequest.post(`${baseURL}/order/tag-list`);
};

/**
 * 用户信息
 */
const userInfo = (): AxiosPromise => {
  return apiRequest.post(`${baseURL}/user/info`);
};

/**
 * 完善用户信息
 */
const complementInfo = (data: Partial<ComplementInfoParam>): AxiosPromise => {
  return apiRequest.post(`${baseURL}/user/complementInfo`, data);
};

/**
 * 意见反馈
 */
const feedback = (data: FeedbackParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/user/feedback`, data);
};

/**
 * 我的账单列表
 */
const myBillList = (): AxiosPromise => {
  return apiRequest.post(`${baseURL}/user/my_bill_list`);
};

/**
 * 注册
 */
const register = (data: RegisterParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/register`, data);
};

/**
 * 登录
 */
const login = (data: LoginParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/login`, data);
};

/**
 * 获取验证码
 */
const captcha = (data: CaptchaParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/captcha`, data);
};

/**
 * 抢单
 */
const subOrderCatch = (data: SubOrderCatchParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/sub-order/catch`, data);
};

/**
 * 子订单列表
 */
const subOrderList = (data: SubOrderListParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/sub-order/list`, data);
};

/**
 * 子订单详情
 */
const subOrderDetail = (data: SubOrderDetailParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/sub-order/detail`, data);
};

/**
 * 子订单提交
 */
const subOrderSubmit = (data: SubOrderSubmitParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/sub-order/submit`, data);
};

/**
 * 子订单审核
 */
const subOrderAudit = (data: SubOrderAuditParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/sub-order/audit`, data);
};

/**
 * 角色切换
 */
const switchRole = (data: SwitchRoleParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/user/switch_role`, data);
};

/**
 * 获取公众号二维码
 */
const publicQrCode = (): AxiosPromise => {
  return apiRequest.post(`${baseURL}/public-qr-code`);
};

/********************** NPC start ************************/

/**
 * 我的订单列表
 */
const myOrderList = (data: OrderListParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/user/my-order-list`, data);
};

/**
 * 我的子订单列表
 */
const myOrderSubList = (data: OrderSubListParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/user/my-order-sub-list`, data);
};

/**
 * 关闭任务
 */
const cancelOrder = (data: CancelOrderParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/user/cancel-order`, data);
};

/********************** NPC end ************************/

/********************** 玩家 start ************************/

/**
 * 我的订单列表
 */
const myOrderListByTaker = (data: OrderListParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/user/my-suborder-list`, data);
};

/**
 * 取消订单
 */
const cancelSubOrder = (data: CancelSubOrderParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/user/cancel-sub-order`, data);
};

/********************** 玩家 end ************************/

export default {
  orderCreate,
  orderList,
  myOrderList,
  orderDetail,
  orderTagList,
  userInfo,
  complementInfo,
  feedback,
  myBillList,
  register,
  login,
  captcha,
  subOrderCatch,
  subOrderList,
  subOrderDetail,
  subOrderSubmit,
  subOrderAudit,
  switchRole,
  publicQrCode,
  myOrderListByTaker,
  myOrderSubList,
  cancelOrder,
  cancelSubOrder,
};
