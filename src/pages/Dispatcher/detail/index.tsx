import OrderDetail, { OrderDetailProps } from '@/components/order-detail';
import useOrderDetail from '@/hooks/useOrderDetail';
import useQuery from '@/hooks/useQuery';
import { RootState } from '@/types/common';
import { ActivityIndicator, Toast } from 'antd-mobile';
import { useDispatch, useHistory, useSelector } from 'dva';
import React, { useState } from 'react';
import ClosedModal, { ClosedModalProps } from './Closed';
import './index.less';

const NPCTaskDetail: React.FC = () => {
  const { id = '' } = useQuery();
  const orderDetail = useOrderDetail(id);
  const history = useHistory();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const {
    loading: { effects },
  } = useSelector((state: RootState) => state);
  const loading = effects['DISPATCHER/cancelOrder'] || false;

  const orderDetailProps: Partial<OrderDetailProps> = {
    ...orderDetail,
  };

  const hideModal = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const goSubList = () => {
    history.push(`npc-sub-list?id=${id}`);
  };

  const cancelOrder = async () => {
    if (!id) {
      Toast.info('订单不存在');
      return;
    }
    try {
      await dispatch({
        type: 'DISPATCHER/cancelOrder',
        payload: {
          orderId: Number(id),
        },
      });
      Toast.info('操作成功');
    } catch (error) {
      console.log(error);
      Toast.info('操作失败');
    }
  };

  const modalProps: ClosedModalProps = {
    visible,
    hide: hideModal,
    onOk: () => {
      hideModal();
      cancelOrder();
    },
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
              <span className="last" onClick={showModal}>
                关闭任务
              </span>
            </div>
          </div>
        </div>
      </div>

      <ClosedModal {...modalProps} />
      <ActivityIndicator toast size="large" text="正在提交..." animating={loading} />
    </div>
  );
};

export default NPCTaskDetail;
