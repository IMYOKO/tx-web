import { Dispatch } from 'redux';
import { CommonModelState } from '@/models/common';
import { UserModelState } from '@/models/user';
import { DispatcherModelState } from '@/models/dispatcher';
import { OrderModelState } from '@/models/order';
import { TakerModelState } from '@/models/taker';

interface ModelsLoadingType {
  global: boolean;
  effects: { [key: string]: boolean };
  models: { [key: string]: boolean };
}

export interface RootState {
  USER: UserModelState;
  COMMON: CommonModelState;
  ORDER: OrderModelState;
  TAKER: TakerModelState;
  DISPATCHER: DispatcherModelState;
  loading: ModelsLoadingType;
}
export interface Pagination {
  pageNo: number;
  pageSize: number;
  totalCount: number;
  totalPage: number;
}

export interface PageActionBaseProps {
  dispatch: Dispatch;
  loading?: boolean;
}

export interface FileDataType {
  base64String: string;
  suffix: string;
}
