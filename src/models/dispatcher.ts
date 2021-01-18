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

export interface DispatcherModelState {
  list: DispatcherOrderItemType[];
  pagination: Pagination;
  tagList: string[];
}

export interface ModelType {
  namespace: 'DISPATCHER';
  state: {};
  reducers: {
    save: Reducer<DispatcherModelState>;
  };
  effects: {
    fetch: Effect;
    create: Effect;
    tagList: Effect;
  };
}

const Model: ModelType = {
  namespace: 'DISPATCHER',
  state: {
    list: [],
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
    *fetch({ payload }, { call, put }) {
      try {
        const res = yield call(API.myOrderList, payload);
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
  },
};

export default Model;
