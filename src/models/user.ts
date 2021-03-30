import { Reducer } from 'redux';
import { Effect } from 'dva';
import API from '@/request';
import { Toast } from 'antd-mobile';
import { Pagination } from '@/types/common';
import { LOGIN_STATUS, PUBLIC_STATUS, ROLE_STATUS, VERIFY_STATUS } from '@/types/enum';

export interface UserInfoType {
  userId: number;
  nickName: string;
  avatarUrl: string;
  balance: number;
  mobile: number;
  hasCommissionAmount: number;
  todayFinishOrderCount: number;
  totalFinishOrderCount: number;
  todayIncome: number;
  publicStatus: PUBLIC_STATUS;
  verifyStatus: VERIFY_STATUS;
  roleCode: ROLE_STATUS;
}

export interface BillItem {
  amount: number;
  billNo: string;
  billType: string;
  billTypeText: string;
  createTime: number;
}

export interface UserModelState {
  userInfo: Partial<UserInfoType>;
  bankList: any[];
  billList: BillItem[];
  pagination: Pagination;
}

export interface ModelType {
  namespace: 'USER';
  state: UserModelState;
  reducers: {
    save: Reducer<UserModelState>;
  };
  effects: {
    fetch: Effect;
    switchRole: Effect;
    complementInfo: Effect;
    resetPassword: Effect;
    addBank: Effect;
    getBankList: Effect;
    getBillList: Effect;
  };
}

const Model: ModelType = {
  namespace: 'USER',
  state: {
    userInfo: {},
    bankList: [
      // {
      //   id: 0,
      //   name: '农业银行',
      //   type: '储蓄卡',
      //   number: '6237 79380 0000 5934 762',
      // },
    ],
    billList: [],
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
    *fetch(_, { call, put }) {
      try {
        const userInfo = yield call(API.userInfo);
        yield put({
          type: 'save',
          payload: {
            userInfo: { nickName: '', ...userInfo },
          },
        });
        yield put({
          type: 'COMMON/save',
          payload: {
            loginStatus: LOGIN_STATUS.yes,
          },
        });
      } catch (err) {
        console.log(err);
        if (err.code === 999) {
          localStorage.removeItem('token');
          Toast.info('登录失效, 请重新登录', 0.6, () => {
            const pathname = window.location.pathname;
            if (pathname !== '/login') {
              window.location.replace('/login');
            }
          });
        } else {
          yield put({
            type: 'COMMON/save',
            payload: {
              loginStatus: LOGIN_STATUS.no,
            },
          });
          Toast.info('获取用户信息失败，请重新登录');
        }
      }
    },
    *switchRole({ payload }, { call, put }) {
      try {
        yield call(API.switchRole, payload);
        yield put({ type: 'fetch' });
        return Promise.resolve();
      } catch (err) {
        console.log(err);
        Toast.info('切换失败');
        return Promise.reject(err);
      }
    },
    *complementInfo({ payload, successCallback }, { call }) {
      try {
        yield call(API.complementInfo, payload);
        successCallback && successCallback();
      } catch (err) {
        console.log(err);
        Toast.info('修改失败');
      }
    },
    *resetPassword({ payload }, { call }) {
      try {
        yield call(API.resetPassword, payload);
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *addBank({ payload }, { call }) {
      try {
        yield call(API.addBank, payload);
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *getBankList({ payload }, { call, put }) {
      try {
        const { dataList: bankList } = yield call(API.myBankList, payload);
        yield put({
          type: 'save',
          payload: {
            bankList,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    *getBillList({ payload }, { call, put }) {
      try {
        const { dataList: billList, ...pagination } = yield call(API.myBillList, payload);
        yield put({
          type: 'save',
          payload: {
            billList,
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
