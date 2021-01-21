import OrderDetail, { OrderDetailProps } from '@/components/order-detail';
import useQuery from '@/hooks/useQuery';
import { useHistory } from 'dva';
import React from 'react';
import useTakerOrderDetail from '../hooks/useTakerOrderDetail';

const ButtonWrapper: React.FC = ({ children }) => {
  return (
    <div className="bottom-button-wrapper">
      <div className="bottom-button-content">{children}</div>
    </div>
  );
};

const TakerTaskDetail: React.FC = () => {
  const history = useHistory();
  const { orderId = '', subOrderId = '' } = useQuery();

  const data = useTakerOrderDetail({ orderId, subOrderId });

  const goSubmit = () => {
    if (!orderId || !subOrderId) {
      return;
    }
    history.push(`submit-task?subOrderId=${subOrderId}&orderId=${orderId}`);
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

  const renderButtonWrapper = () => {
    const { status } = data;
    if (!status) {
      return null;
    }
    if (status === '1') {
      return (
        <ButtonWrapper>
          <div className="button-box">
            <div className="button-item left-wrapper">取消</div>
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
    </div>
  );
};

export default TakerTaskDetail;
