import { Reducer } from 'redux';
import { Effect } from 'dva';
import API from '@/request';

export interface DispatcherModelState {}

export interface ModelType {
  namespace: 'DISPATCHER';
  state: {};
  reducers: {
    save: Reducer<DispatcherModelState>;
  };
  effects: {};
}

const Model: ModelType = {
  namespace: 'DISPATCHER',
  state: {},
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {},
};

export default Model;
