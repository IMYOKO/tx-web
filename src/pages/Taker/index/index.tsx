import React, { useEffect } from 'react';
import { connect, useHistory } from 'dva';
import TaskList from '@/components/task-list';
import { OrderListItemType } from '@/pages/Home/index/model';
import { PageActionBaseProps, RootState } from '@/types/common';
import { UserInfoType } from '@/models/user';
import './index.less';

interface TaskPageProps extends PageActionBaseProps {
  list: OrderListItemType[];
  userInfo: Partial<UserInfoType>;
}

const Task: React.FC<TaskPageProps> = props => {
  const {
    dispatch,
    list,
    userInfo: { roleCode },
  } = props;
  const history = useHistory();

  const fetchData = () => {
    dispatch({
      type: 'TAKER/list',
      payload: {
        pageNo: 1,
        pageSize: 10,
        param: {},
      },
    });
  };

  const clearData = () => {
    dispatch({
      type: 'TAKER/save',
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

const mapStateToProps = (state: RootState) => {
  const {
    TAKER: { list },
    USER: { userInfo },
  } = state;
  return { list, userInfo };
};

export default connect(mapStateToProps)(Task);
