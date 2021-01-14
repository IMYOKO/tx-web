import React, { useEffect } from 'react';
import { connect, useHistory } from 'dva';
import { PageActionBaseProps, RootState } from '@/types/common';
import { UserInfoType } from '@/models/user';
import { TakerOrderItemType } from '@/models/taker';
import TakerOrderList from '@/components/taker-order-list';
import './index.less';

interface TaskPageProps extends PageActionBaseProps {
  list: TakerOrderItemType[];
  userInfo: Partial<UserInfoType>;
}

const Task: React.FC<TaskPageProps> = props => {
  const {
    dispatch,
    list,
    userInfo: { roleCode },
  } = props;
  const history = useHistory();
  console.log(list);

  const fetchData = () => {
    dispatch({
      type: 'TAKER/list',
      payload: {
        pageNo: 1,
        pageSize: 10,
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
      <TakerOrderList list={list} />
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
