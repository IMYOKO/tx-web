import { Reducer } from 'redux';
import { Effect } from 'dva';
import API from '@/request';
import { Toast } from 'antd-mobile';
import { Pagination } from '@/types/common';

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
export interface OrderListItemType {
  id: number;
  commissionAmount: number;
  avatarUrl: string;
  nickName: string;
  tagList: string[];
  title: string;
}

export interface SubOrderDetailType {
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

export interface OrderModelState {
  item: Partial<DetailItemType>;
  subItem: Partial<SubOrderDetailType>;
  list: OrderListItemType[];
  pagination: Pagination;
}

export interface ModelType {
  namespace: 'ORDER';
  state: OrderModelState;
  reducers: {
    save: Reducer<OrderModelState>;
  };
  effects: {
    fetch: Effect;
    list: Effect;
    subItem: Effect;
  };
}

const Model: ModelType = {
  namespace: 'ORDER',
  state: {
    item: {},
    subItem: {},
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
    *list({ payload }, { call, put, select }) {
      try {
        const {
          ORDER: { list },
        } = yield select();
        const res = yield call(API.orderList, payload);
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
    *subItem({ payload }, { call, put }) {
      try {
        const subItem = yield call(API.subOrderDetail, payload);
        yield put({
          type: 'save',
          payload: { subItem },
        });
        return Promise.resolve(subItem);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
};

export default Model;
