import { Reducer } from 'redux';
import { Effect } from 'dva';
import API from '@/request';

export interface CaptchaDataType {
  captchaIdentity: string;
  image: string;
}
export interface CommonModelState {
  token: string;
  captchaData: Partial<CaptchaDataType>;
}

export interface ModelType {
  namespace: 'COMMON';
  state: CommonModelState;
  effects: {
    fetchCaptcha: Effect;
    login: Effect;
    register: Effect;
  };
  reducers: {
    save: Reducer<CommonModelState>;
  };
}

const Common: ModelType = {
  namespace: 'COMMON',
  state: {
    token: localStorage.getItem('token') || '',
    captchaData: {},
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
        const { token } = yield call(API.login, payload);
        console.log('登录成功', token);
        yield put({
          type: 'save',
          payload: {
            token,
          },
        });
        localStorage.setItem('token', token);
        window.location.replace('/');
      } catch (err) {
        console.log(err);
      }
    },
    *register({ payload }, { call, put }) {
      try {
        const { token } = yield call(API.register, payload);
        console.log('注册成功', token);
        yield put({
          type: 'save',
          payload: {
            token,
          },
        });
        localStorage.setItem('token', token);
        window.location.replace('/');
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default Common;
