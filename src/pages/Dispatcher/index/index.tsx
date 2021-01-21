import React, { useEffect } from 'react';
import { connect, useHistory } from 'dva';
import { PageActionBaseProps, RootState } from '@/types/common';
import Headers from '@/components/headers';
import { UserInfoType } from '@/models/user';
import './index.less';
import { ROLE_STATUS } from '@/types/enum';
import DispatcherOrderList from '@/components/dispatcher-order-list';
import { DispatcherOrderItemType } from '@/models/dispatcher';

interface DISPATCHERPageProps extends PageActionBaseProps {
  list: DispatcherOrderItemType[];
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

  const goTakerDetail = (id: number) => {
    history.push(`task-npc-detail?id=${id}`);
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
      <DispatcherOrderList list={list} handleClick={goTakerDetail} />
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
