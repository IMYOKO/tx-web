import { Effect } from 'dva';
import API from '@/request';
import { Reducer } from 'redux';
import { Toast } from 'antd-mobile';

export interface AddOrderModelState {
  tagList: string[];
}

export interface ModelType {
  namespace: 'ADD_ORDER';
  state: AddOrderModelState;
  reducers: {
    save: Reducer<AddOrderModelState>;
  };
  effects: {
    create: Effect;
    tagList: Effect;
  };
}

const Model: ModelType = {
  namespace: 'ADD_ORDER',
  state: {
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
    *create({ payload, successCallback }, { call }) {
      try {
        console.log({ payload });
        yield call(API.orderCreate, payload);
        Toast.info('发布成功', 1, () => {
          successCallback && successCallback();
        });
      } catch (err) {
        console.log(err);
        Toast.info('发布失败');
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
  },
};

export default Model;
