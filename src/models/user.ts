import { Reducer } from 'redux';
import { Effect } from 'dva';
import API from '@/request';
import { Toast } from 'antd-mobile';

export interface UserInfoType {
  userId: number;
  nickName: string;
  avatarUrl: string;
  balance: number;
  hasCommissionAmount: number;
  todayIncome: number;
}

export interface UserPageModelState {
  userInfo: Partial<UserInfoType>;
}

export interface ModelType {
  namespace: 'USER';
  state: UserPageModelState;
  reducers: {
    save: Reducer<UserPageModelState>;
  };
  effects: {
    fetch: Effect;
    switchRole: Effect;
  };
}

const Model: ModelType = {
  namespace: 'USER',
  state: {
    userInfo: {},
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
    *fetch({ payload }, { call, put }) {
      try {
        const userInfo = yield call(API.userInfo, payload);
        yield put({
          type: 'save',
          payload: {
            userInfo,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    *switchRole({ payload, successCallback }, { call }) {
      try {
        yield call(API.userInfo, payload);
        successCallback && successCallback();
      } catch (err) {
        console.log(err);
        Toast.info('切换失败');
      }
    },
  },
};

export default Model;
