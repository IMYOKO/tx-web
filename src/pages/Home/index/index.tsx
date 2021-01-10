import React, { useEffect } from 'react';
import { connect } from 'dva';
import TaskList from '@/components/task-list';
import { OrderListItemType } from '@/pages/Home/index/model';
import { PageActionBaseProps } from '@/types/common';
import './index.less';

interface HomeProps extends PageActionBaseProps {
  list: OrderListItemType[];
}

const Home: React.FC<HomeProps> = props => {
  const { dispatch, list } = props;

  const fetchData = () => {
    dispatch({
      type: 'HOME/fetch',
      payload: {
        pageNo: 1,
        pageSize: 1,
        param: {},
      },
    });
  };

  const clearData = () => {
    dispatch({
      type: 'HOME/save',
      payload: { list: [] },
    });
  };

  useEffect(() => {
    fetchData();
    return () => {
      clearData();
    };
  }, []);

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
      <TaskList data={list} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const {
    HOME: { list },
  } = state;
  return { list };
};

export default connect(mapStateToProps)(Home);
