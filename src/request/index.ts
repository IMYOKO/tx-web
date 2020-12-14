import ApiRequest from './request';
import { AxiosPromise } from 'axios';
import { baseURL } from './config';
import { ListType } from './type';

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
 * 获取
 */
const orderList = (data: ListType): AxiosPromise => {
  return apiRequest.post(`${baseURL}/order/list`, data);
};

export default {
  orderList,
};
