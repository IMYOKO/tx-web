import { Reducer } from 'redux';
import { Effect, Subscription } from 'dva';
import API from '@/request';
import { Toast } from 'antd-mobile';
import { LOGIN_STATUS } from '@/types/enum';

export interface CaptchaDataType {
  captchaIdentity: string;
  image: string;
}
export interface CommonModelState {
  token: string;
  loginStatus: LOGIN_STATUS;
  publicQrCode: string;
  captchaData: Partial<CaptchaDataType>;
}

export interface ModelType {
  namespace: 'COMMON';
  state: CommonModelState;
  effects: {
    fetchCaptcha: Effect;
    login: Effect;
    register: Effect;
    feedback: Effect;
    publicQrCode: Effect;
    getSMSCode: Effect;
  };
  reducers: {
    save: Reducer<CommonModelState>;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const token = localStorage.getItem('token') || '';

const Common: ModelType = {
  namespace: 'COMMON',
  state: {
    token,
    captchaData: {},
    publicQrCode: '',
    loginStatus: LOGIN_STATUS.unknown,
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchCaptcha({ payload }, { call, put }) {
      try {
        const captchaData = yield call(API.captcha, payload);
        yield put({
          type: 'save',
          payload: {
            captchaData,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    *login({ payload }, { call, put }) {
      try {
        const res = yield call(API.login, payload);
        const { token, userVO } = res;
        console.log('登录成功', token);
        yield put({
          type: 'save',
          payload: {
            token,
            loginStatus: LOGIN_STATUS.yes,
          },
        });
        yield put({
          type: 'USER/save',
          payload: {
            userInfo: userVO,
          },
        });
        localStorage.setItem('token', token);
        return Promise.resolve(res);
      } catch (err) {
        console.log(err);
        yield put({
          type: 'save',
          payload: {
            token,
            loginStatus: LOGIN_STATUS.no,
          },
        });
        return Promise.reject(err);
      }
    },
    *register({ payload }, { call, put }) {
      try {
        const res = yield call(API.register, payload);
        const { token, userVO } = res;
        console.log('注册成功', token);
        yield put({
          type: 'save',
          payload: {
            token,
            loginStatus: LOGIN_STATUS.yes,
          },
        });
        yield put({
          type: 'USER/save',
          payload: {
            userInfo: userVO,
          },
        });
        localStorage.setItem('token', token);
        return Promise.resolve(res);
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    },
    *feedback({ payload, success }, { call }) {
      try {
        yield call(API.feedback, payload);
        success && success();
      } catch (e) {
        console.log(e);
        Toast.info('提交失败');
      }
    },
    *publicQrCode(_, { call, put }) {
      try {
        const publicQrCode = yield call(API.publicQrCode);
        yield put({
          type: 'save',
          payload: {
            publicQrCode,
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    *getSMSCode({ payload }, { call, put }) {
      try {
        yield call(API.getSMSCode, payload);
        return Promise.resolve({});
      } catch (e) {
        console.log(e);
        return Promise.reject(e);
      }
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      if (token) {
        dispatch({
          type: 'USER/fetch',
        });
      }
    },
  },
};

export default Common;
