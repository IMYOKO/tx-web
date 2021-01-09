import React, { useEffect } from 'react';
import { connect, useHistory } from 'dva';
import TaskList from '@/components/task-list';
import { OrderListItemType } from '@/pages/index/model';
import { PageActionBaseProps } from '@/types/common';
import Headers from '@/components/headers';
import { UserInfoType } from '@/models/user';
import './index.less';
import { ROLE_STATUS } from '@/types/enum';

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

  // useEffect(() => {
  //   fetchData();
  //   return () => {
  //     clearData();
  //   };
  // }, []);

  const goAddOrder = () => {
    history.push('/add-order');
  };

  return (
    <div className="task-page">
      {roleCode === ROLE_STATUS.dispatcher && (
        <Headers>
          <div className="add-order-btn" onClick={goAddOrder}></div>
        </Headers>
      )}
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
    USER: { userInfo },
  } = state;
  return { list, userInfo };
};

export default connect(mapStateToProps)(Task);
