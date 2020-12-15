import { Reducer } from 'redux';
import { Effect } from 'dva';
import API from '@/request';

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

export interface DetailModelState {
  item: Partial<DetailItemType>;
}

export interface ModelType {
  namespace: 'ORDER_DETAIL';
  state: DetailModelState;
  reducers: {
    save: Reducer<DetailModelState>;
  };
  effects: {
    fetch: Effect;
  };
}

const Model: ModelType = {
  namespace: 'ORDER_DETAIL',
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
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default Model;
