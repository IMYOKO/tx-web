import { Reducer } from 'redux';
import { Effect } from 'dva';
import API from '@/request';
import { Toast } from 'antd-mobile';
import { Pagination } from '@/types/common';

export interface TakerOrderItemType {
  id: number;
  orderId: number;
  commissionAmount: number;
  avatarUrl: string;
  nickName: string;
  title: string;
  createTime: number;
  realAmount: number;
  status: string;
  statusText: string;
}

export interface TakerOrderDetailType {
  id: number;
  orderId: number;
  commissionAmount: number;
  avatarUrl: string;
  nickName: string;
  title: string;
  createTime: number;
  realAmount: number;
  status: string;
  statusText: string;
  submitContent: string;
  submitTime: number;
  submitUrlList: string[];
}

export interface TakerModelState {
  item: Partial<TakerOrderDetailType>;
  list: TakerOrderItemType[];
  pagination: Pagination;
}

export interface ModelType {
  namespace: 'TAKER';
  state: TakerModelState;
  reducers: {
    save: Reducer<TakerModelState>;
  };
  effects: {
    list: Effect;
    item: Effect;
    submit: Effect;
    catchOrder: Effect;
  };
}

const Model: ModelType = {
  namespace: 'TAKER',
  state: {
    item: {},
    list: [],
    pagination: {
      pageNo: 0,
      pageSize: 0,
      totalCount: 0,
      totalPage: 0,
    },
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
    *list({ payload }, { call, put }) {
      try {
        const res = yield call(API.myOrderListByTaker, payload);
        const { dataList: list, ...pagination } = res;
        yield put({
          type: 'save',
          payload: {
            list,
            pagination,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    *item({ payload }, { call, put }) {
      try {
        const item = yield call(API.subOrderDetail, payload);
        yield put({
          type: 'save',
          payload: { item },
        });
        return Promise.resolve(item);
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    },
    *submit({ payload }, { call, put }) {
      try {
        const res = yield call(API.subOrderSubmit, payload);
        return Promise.resolve(res);
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    },
    *catchOrder({ payload }, { call, put }) {
      try {
        const res = yield call(API.subOrderCatch, payload);
        Toast.info('操作成功');
        return Promise.resolve(res);
      } catch (err) {
        console.log(err);
        Toast.info('操作失败');
        return Promise.reject(err);
      }
    },
  },
};

export default Model;
