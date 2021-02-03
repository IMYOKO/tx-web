import { Reducer } from 'redux';
import { Effect } from 'dva';
import API from '@/request';
import { Toast } from 'antd-mobile';
import { LOGIN_STATUS, PUBLIC_STATUS, ROLE_STATUS, VERIFY_STATUS } from '@/types/enum';

export interface UserInfoType {
  userId: number;
  nickName: string;
  avatarUrl: string;
  balance: number;
  hasCommissionAmount: number;
  todayFinishOrderCount: number;
  totalFinishOrderCount: number;
  todayIncome: number;
  publicStatus: PUBLIC_STATUS;
  verifyStatus: VERIFY_STATUS;
  roleCode: ROLE_STATUS;
}

export interface UserModelState {
  userInfo: Partial<UserInfoType>;
  bankList: any[];
}

export interface ModelType {
  namespace: 'USER';
  state: UserModelState;
  reducers: {
    save: Reducer<UserModelState>;
  };
  effects: {
    fetch: Effect;
    switchRole: Effect;
    complementInfo: Effect;
  };
}

const Model: ModelType = {
  namespace: 'USER',
  state: {
    userInfo: {},
    bankList: [
      // {
      //   id: 0,
      //   name: '农业银行',
      //   type: '储蓄卡',
      //   number: '6237 79380 0000 5934 762',
      // },
    ],
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
    *fetch(_, { call, put }) {
      try {
        const userInfo = yield call(API.userInfo);
        yield put({
          type: 'save',
          payload: {
            userInfo: { nickName: '', ...userInfo },
          },
        });
        yield put({
          type: 'COMMON/save',
          payload: {
            loginStatus: LOGIN_STATUS.yes,
          },
        });
      } catch (err) {
        console.log(err);
        if (err.code === 999) {
          localStorage.removeItem('token');
          Toast.info('登录失效, 请重新登录', 0.6, () => {
            const pathname = window.location.pathname;
            if (pathname !== '/login') {
              window.location.replace('/login');
            }
          });
        } else {
          yield put({
            type: 'COMMON/save',
            payload: {
              loginStatus: LOGIN_STATUS.no,
            },
          });
          Toast.info('获取用户信息失败，请重新登录');
        }
      }
    },
    *switchRole({ payload }, { call, put }) {
      try {
        yield call(API.switchRole, payload);
        yield put({ type: 'fetch' });
        return Promise.resolve();
      } catch (err) {
        console.log(err);
        Toast.info('切换失败');
        return Promise.reject(err);
      }
    },
    *complementInfo({ payload, successCallback }, { call, put }) {
      try {
        yield call(API.complementInfo, payload);
        successCallback && successCallback();
      } catch (err) {
        console.log(err);
        Toast.info('修改失败');
      }
    },
  },
};

export default Model;
