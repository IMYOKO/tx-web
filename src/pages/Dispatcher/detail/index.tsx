import OrderDetail, { OrderDetailProps } from '@/components/order-detail';
import useOrderDetail from '@/hooks/useOrderDetail';
import useQuery from '@/hooks/useQuery';
import { useHistory } from 'dva';
import React from 'react';
import './index.less';

const NPCTaskDetail: React.FC = () => {
  const { id = '' } = useQuery();
  const orderDetail = useOrderDetail(id);
  const history = useHistory();

  const orderDetailProps: Partial<OrderDetailProps> = {
    ...orderDetail,
  };

  const goSubList = () => {
    history.push(`npc-sub-list?id=${id}`);
  };

  return (
    <div className="npc-task-detail-page">
      <OrderDetail {...orderDetailProps} />
      <div className="npc-bottom-wrapper">
        <div className="npc-bottom-content">
          <div className="npc-bottom-box">
            <div className="npc-bottom-box-item">
              <span onClick={goSubList}>名额审核</span>
            </div>
            <div className="npc-bottom-box-item">
              <span className="last">关闭任务</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NPCTaskDetail;
