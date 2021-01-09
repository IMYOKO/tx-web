import React, { useEffect } from 'react';
import { connect } from 'dva';
import TaskList from '@/components/task-list';
import { OrderListItemType } from '@/pages/index/model';
import { PageActionBaseProps } from '@/types/common';
import './index.less';

interface TaskPageProps extends PageActionBaseProps {
  list: OrderListItemType[];
}

const Task: React.FC<TaskPageProps> = props => {
  const { dispatch, list } = props;

  const fetchData = () => {
    dispatch({
      type: 'TASK/fetch',
      payload: {
        pageNo: 1,
        pageSize: 1,
        param: {},
      },
    });
  };

  const clearData = () => {
    dispatch({
      type: 'TASK/save',
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
    <div className="task-page">
      <div className="nav-wrapper">
        <div className="nav-list">
          <div className="nav-list-wrapper">
            <div className="nav-list-body">
              <div className="nav-list-item active">全部</div>
            </div>
          </div>
        </div>
        <div className="search"></div>
      </div>
      <TaskList data={list} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const {
    TASK: { list },
  } = state;
  return { list };
};

export default connect(mapStateToProps)(Task);
