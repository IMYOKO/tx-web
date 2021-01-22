import OrderDetail, { OrderDetailProps } from '@/components/order-detail';
import useQuery from '@/hooks/useQuery';
import { useDispatch, useHistory, useSelector } from 'dva';
import React, { useState } from 'react';
import useTakerOrderDetail from '@/hooks/useTakerOrderDetail';
import ClosedModal, { ClosedModalProps } from './Closed';
import { ActivityIndicator, Toast } from 'antd-mobile';
import { RootState } from '@/types/common';
import './index.less';

export const ButtonWrapper: React.FC = ({ children }) => {
  return (
    <div className="bottom-button-wrapper">
      <div className="bottom-button-content">{children}</div>
    </div>
  );
};

const TakerTaskDetail: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const { orderId = '', subOrderId = '' } = useQuery();

  const data = useTakerOrderDetail({ orderId, subOrderId });
  const {
    loading: { effects },
  } = useSelector((state: RootState) => state);
  const loading = effects['TAKER/cancelSubOrder'] || false;

  const goSubmit = () => {
    if (!orderId || !subOrderId) {
      return;
    }
    history.push(`submit-task?subOrderId=${subOrderId}&orderId=${orderId}`);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const goSubDetail = () => {
    if (!orderId || !subOrderId) {
      return;
    }
    history.push(`task-taker-sub-detail?subOrderId=${subOrderId}`);
  };

  const orderDetailProps: Partial<OrderDetailProps> = {
    ...data,
  };

  const cancelSubOrder = async () => {
    if (!subOrderId) {
      Toast.info('订单不存在');
      return;
    }
    try {
      await dispatch({
        type: 'TAKER/cancelSubOrder',
        payload: {
          subOrderId: Number(subOrderId),
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
      cancelSubOrder();
    },
  };

  const renderButtonWrapper = () => {
    const { status } = data;
    if (!status) {
      return null;
    }
    if (status === '1') {
      return (
        <ButtonWrapper>
          <div className="button-box">
            <div className="button-item left-wrapper" onClick={showModal}>
              取消
            </div>
            <div className="button-item right-wrapper" onClick={goSubmit}>
              提交
            </div>
          </div>
        </ButtonWrapper>
      );
    }
    if (status === '2') {
      return (
        <ButtonWrapper>
          <div className="button-item" onClick={goSubDetail}>
            我的任务详情
          </div>
        </ButtonWrapper>
      );
    }
  };
  return (
    <div className="taker-task-detail-page">
      <OrderDetail {...orderDetailProps} />

      {renderButtonWrapper()}

      <ClosedModal {...modalProps} />

      <ActivityIndicator toast size="large" text="正在提交..." animating={loading} />
    </div>
  );
};

export default TakerTaskDetail;
