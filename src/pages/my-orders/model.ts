import { Reducer } from 'redux';
import { Effect } from 'dva';
import API from '@/request';
import { Pagination } from '@/types/common';

export interface MyOrderListItemType {
  id: number;
}

export interface MyOrdersPageModelState {
  list: MyOrderListItemType[];
  pagination: Pagination;
}

export interface ModelType {
  namespace: 'MY_ORDERS';
  state: MyOrdersPageModelState;
  reducers: {
    save: Reducer<MyOrdersPageModelState>;
  };
  effects: {
    fetch: Effect;
  };
}

const Model: ModelType = {
  namespace: 'MY_ORDERS',
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
        const res = yield call(API.myBillList, payload);
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
