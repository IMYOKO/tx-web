import { Reducer } from 'redux';

export interface DetailModelState {
  aaa: string;
}

export interface ModelType {
  namespace: 'DETAIL';
  state: DetailModelState;
  reducers: {
    save: Reducer<DetailModelState>;
  };
}

const Model: ModelType = {
  namespace: 'DETAIL',
  state: {
    aaa: 'dsdsd',
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
