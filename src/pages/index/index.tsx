import TaskList from '@/components/task-list';
import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { HomeModelState } from '@/models/home';
import './index.less';

interface HomeProps extends HomeModelState {
  dispatch: Dispatch;
}

const Home: React.FC<HomeProps> = props => {
  const { dispatch, list } = props;

  useEffect(() => {
    dispatch({
      type: 'HOME/fetch',
      payload: {
        pageNo: 1,
        pageSize: 1,
        param: {},
      },
    });
  }, []);

  return (
    <div className="home-page">
      <div className="nav-wrapper">
        <div className="nav-list">
          <div className="nav-list-wrapper">
            <div className="nav-list-item active">全部</div>
            <div className="nav-list-item">最新</div>
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
