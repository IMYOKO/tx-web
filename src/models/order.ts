import { Reducer } from 'redux';
import { Effect } from 'dva';
import API from '@/request';
import { Toast } from 'antd-mobile';

export interface DetailItemType {
  id: number;
  commissionAmount: number;
  avatarUrl: string;
  nickName: string;
  tagList: string[];
  title: string;
  count: number;
  createTime: number;
  description: string;
  descriptionUrlList: string[];
  principalAmount: number;
  remainingCount: number;
  status: string;
  statusText: string;
  taskClaim: string;
  taskClaimUrlList: string[];
}

export interface OrderModelState {
  item: Partial<DetailItemType>;
}

export interface ModelType {
  namespace: 'ORDER';
  state: OrderModelState;
  reducers: {
    save: Reducer<OrderModelState>;
  };
  effects: {
    fetch: Effect;
  };
}

const Model: ModelType = {
  namespace: 'ORDER',
  state: {
    item: {},
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
        const item = yield call(API.orderDetail, payload);
        yield put({
          type: 'save',
          payload: {
            item,
          },
        });
        return Promise.resolve(item);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
};

export default Model;
