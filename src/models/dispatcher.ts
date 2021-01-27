import { Reducer } from 'redux';
import { Effect } from 'dva';
import API from '@/request';
import { Pagination } from '@/types/common';
import { Toast } from 'antd-mobile';

export interface DispatcherOrderItemType {
  id: number;
  commissionAmount: number;
  avatarUrl: string;
  nickName: string;
  title: string;
  tagList: string[];
  status: string;
  statusText: string;
}

export interface DispatcherOrderSubItemType {
  avatarUrl: string;
  commissionAmount: number;
  createTime: number;
  id: number;
  nickName: string;
  orderId: number;
  realAmount: number;
  status: string;
  statusText: string;
  title: string;
}

export interface DispatcherModelState {
  list: DispatcherOrderItemType[];
  subList: DispatcherOrderSubItemType[];
  pagination: Pagination;
  tagList: string[];
}

export interface ModelType {
  namespace: 'DISPATCHER';
  state: DispatcherModelState;
  reducers: {
    save: Reducer<DispatcherModelState>;
  };
  effects: {
    fetch: Effect;
    create: Effect;
    tagList: Effect;
    subList: Effect;
    subOrderAudit: Effect;
    cancelOrder: Effect;
  };
}

const Model: ModelType = {
  namespace: 'DISPATCHER',
  state: {
    list: [],
    subList: [],
    pagination: {
      pageNo: 0,
      pageSize: 0,
      totalCount: 0,
      totalPage: 0,
    },
    tagList: [],
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
    *fetch({ payload }, { call, put, select }) {
      try {
        const {
          DISPATCHER: { list },
        } = yield select();
        const res = yield call(API.myOrderList, payload);
        const { dataList, ...pagination } = res;
        yield put({
          type: 'save',
          payload: {
            list: [...list, ...dataList],
            pagination,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    *tagList(_, { call, put }) {
      try {
        const tagList = yield call(API.orderTagList);
        yield put({
          type: 'save',
          payload: {
            tagList,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    *subList({ payload }, { call, put, select }) {
      try {
        const {
          DISPATCHER: { subList },
        } = yield select();
        const res = yield call(API.myOrderSubList, payload);
        const { dataList, ...pagination } = res;
        yield put({
          type: 'save',
          payload: {
            subList: [...subList, ...dataList],
            pagination,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    *create({ payload, successCallback }, { call }) {
      try {
        console.log({ payload });
        yield call(API.orderCreate, payload);
        Toast.info('发布成功', 0.6, () => {
          successCallback && successCallback();
        });
      } catch (err) {
        console.log(err);
        Toast.info('发布失败');
      }
    },
    *subOrderAudit({ payload }, { call }) {
      try {
        const res = yield call(API.subOrderAudit, payload);
        return Promise.resolve(res);
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *cancelOrder({ payload }, { call }) {
      try {
        const res = yield call(API.cancelOrder, payload);
        return Promise.resolve(res);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
};

export default Model;
