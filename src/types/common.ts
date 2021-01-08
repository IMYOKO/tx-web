import { Dispatch } from 'redux';
import { CommonModelState } from '@/models/common';
import { UserPageModelState } from '@/models/user';

export interface RootState {
  USER: UserPageModelState;
  COMMON: CommonModelState;
}
export interface Pagination {
  pageNo: number;
  pageSize: number;
  totalCount: number;
  totalPage: number;
}

export interface PageActionBaseProps {
  dispatch: Dispatch;
}

export interface AvatarDataType {
  base64String: string;
  suffix: string;
}
