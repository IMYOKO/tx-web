import { useLocation } from 'dva';

interface QueryType {
  [key: string]: string;
}

export interface LocationType {
  hash: string;
  pathname: string;
  search: string;
  state: string | undefined;
  query?: Partial<QueryType>;
}

const useQuery = (): Partial<QueryType> => {
  const { query = {} }: LocationType = useLocation();
  return query;
};

export default useQuery;
