import React, { useEffect } from 'react';
import { connect, useHistory } from 'dva';
import TaskList from '@/components/task-list';
import { OrderListItemType } from '@/pages/Home/index/model';
import { PageActionBaseProps, RootState } from '@/types/common';
import Headers from '@/components/headers';
import { UserInfoType } from '@/models/user';
import './index.less';
import { ROLE_STATUS } from '@/types/enum';

interface DISPATCHERPageProps extends PageActionBaseProps {
  list: OrderListItemType[];
  userInfo: Partial<UserInfoType>;
}

const Dispatcher: React.FC<DISPATCHERPageProps> = props => {
  const {
    dispatch,
    list,
    userInfo: { roleCode },
  } = props;
  const history = useHistory();

  const fetchData = () => {
    dispatch({
      type: 'DISPATCHER/fetch',
      payload: {
        pageNo: 1,
        pageSize: 10,
        param: {},
      },
    });
  };

  const clearData = () => {
    dispatch({
      type: 'DISPATCHER/save',
      payload: { list: [] },
    });
  };

  useEffect(() => {
    fetchData();
    return () => {
      clearData();
    };
  }, []);

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

const mapStateToProps = (state: RootState) => {
  const {
    DISPATCHER: { list },
    USER: { userInfo },
  } = state;
  return { list, userInfo };
};

export default connect(mapStateToProps)(Dispatcher);
