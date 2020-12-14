import { Reducer } from 'redux';
import { LOGIN_STATUS } from '@/types/enum';

export interface CommonModelState {
  isLogin: LOGIN_STATUS
}

export interface ModelType {
    namespace: 'COMMON';
    state: CommonModelState;
    reducers: {
      save: Reducer<CommonModelState>;
    };
  }

const Common: ModelType = {
    namespace: 'COMMON',
    state: {
      isLogin: LOGIN_STATUS.login
    },
    reducers: {
        save(state, { payload }) {
            return {
              ...state,
              ...payload,
            };
          },
    }
}

export default Common;