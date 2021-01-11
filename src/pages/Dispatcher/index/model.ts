import { Reducer } from 'redux';
import { Effect } from 'dva';
import API from '@/request';
import { OrderListItemType } from '@/pages/Home/index/model';
import { Pagination } from '@/types/common';

export interface TaskPageModelState {
  list: OrderListItemType[];
  pagination: Pagination;
}

export interface ModelType {
  namespace: 'TASK';
  state: TaskPageModelState;
  reducers: {
    save: Reducer<TaskPageModelState>;
  };
  effects: {
    fetch: Effect;
  };
}

const Model: ModelType = {
  namespace: 'TASK',
  state: {
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
  },
};

export default Model;
