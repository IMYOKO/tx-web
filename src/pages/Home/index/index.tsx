import React, { useEffect } from 'react';
import { connect } from 'dva';
import TaskList from '@/components/task-list';
import { PageActionBaseProps, Pagination, RootState } from '@/types/common';
import { OrderListItemType } from '@/models/order';
import './index.less';

interface HomeProps extends PageActionBaseProps {
  list: OrderListItemType[];
  pagination: Pagination;
}

const Home: React.FC<HomeProps> = props => {
  const { dispatch, list, pagination } = props;

  const fetchData = () => {
    dispatch({
      type: 'ORDER/list',
      payload: {
        pageNo: 1,
        pageSize: 10,
      },
    });
  };

  const clearData = () => {
    dispatch({
      type: 'ORDER/save',
      payload: {
        list: [],
        pagination: {
          pageNo: 0,
          pageSize: 0,
          totalCount: 0,
          totalPage: 0,
        },
      },
    });
  };

  useEffect(() => {
    fetchData();
    return () => {
      clearData();
    };
  }, []);

  const pageNoChange = () => {
    const { pageNo, pageSize } = pagination;
    dispatch({
      type: 'ORDER/list',
      payload: {
        pageNo: pageNo + 1,
        pageSize,
      },
    });
  };

  return (
    <div className="home-page">
      <div className="nav-wrapper">
        <div className="nav-list">
          <div className="nav-list-wrapper">
            <div className="nav-list-item active">全部</div>
          </div>
        </div>
        <div className="search" />
      </div>
      <TaskList data={list} pageNoChange={pageNoChange} pagination={pagination} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const {
    ORDER: { list, pagination },
  } = state;
  return { list, pagination };
};

export default connect(mapStateToProps)(Home);
