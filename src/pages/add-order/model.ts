import { Effect } from 'dva';
import API from '@/request';
import { Toast } from 'antd-mobile';

export interface ModelType {
  namespace: 'ADD_ORDER';
  state: any;
  effects: {
    create: Effect;
  };
}

const Model: ModelType = {
  namespace: 'ADD_ORDER',
  state: {},
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
  },
};

export default Model;
