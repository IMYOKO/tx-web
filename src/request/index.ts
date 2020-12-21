import ApiRequest from './request';
import { AxiosPromise } from 'axios';
import { baseURL } from './config';
import { OrderListParam, OrderDetailParam, RegisterParam, LoginParam, CaptchaParam } from './type';

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
 * 我的订单列表
 */
const myOrderList = (data: OrderListParam): AxiosPromise => {
  return apiRequest.post(`${baseURL}/user/my_order_list`, data);
};

/**
 * 用户信息
 */
const userInfo = (): AxiosPromise => {
  return apiRequest.post(`${baseURL}/user/info`, {});
};

/**
 * 我的账单列表
 */
const myBillList = (): AxiosPromise => {
  return apiRequest.post(`${baseURL}/user/my_bill_list`, {});
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

export default {
  orderList,
  myOrderList,
  orderDetail,
  userInfo,
  myBillList,
  register,
  login,
  captcha,
};
