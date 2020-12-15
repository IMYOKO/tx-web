import { Dispatch } from 'redux';
export interface Pagination {
  pageNo: number;
  pageSize: number;
  totalCount: number;
  totalPage: number;
}

export interface PageActionBaseProps {
  dispatch: Dispatch;
}
