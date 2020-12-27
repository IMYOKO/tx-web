import axios, { AxiosInstance, AxiosPromise } from 'axios';

class ApiRequest {
  /**
   * axios 实例
   */
  public axios: AxiosInstance;

  /**
   * 构造函数
   */
  constructor() {
    this.axios = axios.create({
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      transformRequest: [
        data => {
          return JSON.stringify(data);
        },
      ],
      transformResponse: [
        data => {
          return JSON.parse(data);
        },
      ],
    });
    this.interceptors();
  }

  /**
   * 默认拦截器
   */
  private interceptors() {
    // 请求拦截器
    this.axios.interceptors.request.use(
      config => {
        if (localStorage.getItem('token')) {
          config.headers.common['token'] = localStorage.getItem('token');
        }
        return Promise.resolve(config);
      },
      error => {
        return Promise.reject(error);
      },
    );

    // 响应拦截器
    this.axios.interceptors.response.use(
      response => {
        const { status, data } = response;
        // console.log(data.data);
        if (status === 200 && data.code === 0) {
          return Promise.resolve(data.data);
        }
        return Promise.reject(data);
      },
      error => {
        return Promise.reject(error);
      },
    );
  }

  get(url: string, params: Record<string, any>): AxiosPromise {
    return this.axios.get(url, { params: { ...params } });
  }

  post(url: string, data?: Record<string, any>): AxiosPromise {
    return this.axios.post(url, data);
  }

  put(url: string, data: Record<string, any>): AxiosPromise {
    return this.axios.put(url, data);
  }

  patch(url: string, data: Record<string, any>): AxiosPromise {
    return this.axios.patch(url, data);
  }

  delete(url: string): AxiosPromise {
    return this.axios.delete(url);
  }
}

export default ApiRequest;
