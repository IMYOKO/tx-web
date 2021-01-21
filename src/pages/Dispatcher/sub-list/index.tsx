import useQuery from '@/hooks/useQuery';
import defaultAvatarUrl from '@/assets/images/user/my_profile_face@2x.png';
import { DispatcherOrderSubItemType } from '@/models/dispatcher';
import { PageActionBaseProps, RootState } from '@/types/common';
import { connect, useHistory } from 'dva';
import React, { useEffect } from 'react';
import { format } from 'date-fns';
import './index.less';

interface NPCSubTaskListPageProps extends PageActionBaseProps {
  subList: DispatcherOrderSubItemType[];
}

const NPCSubTaskList: React.FC<NPCSubTaskListPageProps> = props => {
  const { subList, dispatch } = props;
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

  return (
    <div className="npc-task-detail-page">
      <ul className="npc-task-detail-list">
        {subList.map(item => (
          <li key={item.id}>
            <div className="npc-task-detail-list-item" onClick={() => goSubDetail(item.id)}>
              <div className="avatar">
                <img src={item.avatarUrl || defaultAvatarUrl} alt="" />
              </div>
              <div className="user-info">
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
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const {
    DISPATCHER: { subList },
  } = state;
  return { subList };
};

export default connect(mapStateToProps)(NPCSubTaskList);
