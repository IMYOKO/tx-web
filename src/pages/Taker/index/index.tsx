import React, { useEffect } from 'react';
import { connect, useHistory } from 'dva';
import { PageActionBaseProps, RootState } from '@/types/common';
import { UserInfoType } from '@/models/user';
import { TakerOrderItemType } from '@/models/taker';
import TakerOrderList from '@/components/taker-order-list';
import './index.less';

interface TaskPageProps extends PageActionBaseProps {
  list: TakerOrderItemType[];
}

const Task: React.FC<TaskPageProps> = props => {
  const { dispatch, list } = props;
  const history = useHistory();

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

  const goTakerDetail = (subOrderId: number, orderId: number) => {
    history.push(`task-taker-detail?subOrderId=${subOrderId}&orderId=${orderId}`);
  };

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
      <TakerOrderList list={list} handleClick={goTakerDetail} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const {
    TAKER: { list },
  } = state;
  return { list };
};

export default connect(mapStateToProps)(Task);
