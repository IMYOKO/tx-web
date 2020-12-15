import ApiRequest from './request';
import { AxiosPromise } from 'axios';
import { baseURL } from './config';
import { OrderListParam, OrderDetailParam } from './type';

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

export default {
  orderList,
  myOrderList,
  orderDetail,
  userInfo,
};
