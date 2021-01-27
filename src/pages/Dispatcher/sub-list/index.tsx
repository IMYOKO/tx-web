import useQuery from '@/hooks/useQuery';
import defaultAvatarUrl from '@/assets/images/user/my_profile_face@2x.png';
import { DispatcherOrderSubItemType } from '@/models/dispatcher';
import { PageActionBaseProps, Pagination, RootState } from '@/types/common';
import { connect, useHistory } from 'dva';
import React, { useEffect } from 'react';
import { format } from 'date-fns';
import './index.less';
import { isEmpty } from 'lodash-es';
import NoData from '@/components/no-data';
import Paginations, { PaginationsProps } from '@/components/paginations';

interface NPCSubTaskListPageProps extends PageActionBaseProps {
  subList: DispatcherOrderSubItemType[];
  pagination: Pagination;
}

const NPCSubTaskList: React.FC<NPCSubTaskListPageProps> = props => {
  const { subList, pagination, dispatch } = props;
  const { id = '' } = useQuery();
  const history = useHistory();

  console.log(subList);

  const fetchData = () => {
    dispatch({
      type: 'DISPATCHER/subList',
      payload: {
        orderId: Number(id),
        pageNo: 1,
        pageSize: 10,
      },
    });
  };

  const clearData = () => {
    dispatch({
      type: 'DISPATCHER/save',
      payload: {
        subList: [],
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
    if (id) {
      fetchData();
      return () => {
        clearData();
      };
    }
  }, [id]);

  const goSubDetail = (id: number) => {
    history.push(`/npc-sub-detail?id=${id}`);
  };

  const pageNoChange = () => {
    const { pageNo, pageSize } = pagination;
    dispatch({
      type: 'DISPATCHER/subList',
      payload: {
        orderId: Number(id),
        pageNo: pageNo + 1,
        pageSize,
      },
    });
  };

  const paginationsProps: PaginationsProps = {
    pageNoChange,
    pagination,
  };

  const renderList = () => {
    if (isEmpty(subList)) {
      return <NoData />;
    }
    return (
      <>
        <ul className="npc-task-detail-list">
          {subList.map(item => (
            <li key={item.id}>
              <div className="npc-task-detail-list-item" onClick={() => goSubDetail(item.id)}>
                <div className="avatar">
                  <img src={item.avatarUrl || defaultAvatarUrl} alt="" />
                </div>
                <div className="npc-user-info">
                  <div className="nickname">{item.nickName}</div>
                  <div className="times">{format(item.createTime * 1000, 'yyyy-MM-dd HH:mm')}</div>
                </div>
                <div className="status">
                  <span>{item.statusText}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Paginations {...paginationsProps} />
      </>
    );
  };

  return <div className="npc-task-detail-page">{renderList()}</div>;
};

const mapStateToProps = (state: RootState) => {
  const {
    DISPATCHER: { subList, pagination },
  } = state;
  return { subList, pagination };
};

export default connect(mapStateToProps)(NPCSubTaskList);
