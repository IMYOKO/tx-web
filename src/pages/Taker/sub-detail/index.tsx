import SubDetailFC, { SubDetailFCProps } from '@/components/sub-detail';
import useQuery from '@/hooks/useQuery';
import useSubOrderDetail from '@/hooks/useSubOrderDetail';
import { ButtonWrapper } from '@/pages/Taker/detail';
import { useHistory } from 'dva';
import React from 'react';

const SubDetail: React.FC = () => {
  const { subOrderId } = useQuery();
  const history = useHistory();
  const data = useSubOrderDetail(subOrderId);

  const subDetailFCProps: SubDetailFCProps = {
    data: { ...data },
  };

  const goSubmit = () => {
    const { orderId, id } = data;
    if (!orderId || !id) {
      return;
    }
    history.push(`submit-task?subOrderId=${id}&orderId=${orderId}`);
  };

  const renderButtonWrapper = () => {
    const { status } = data;
    if (!status) {
      return null;
    }
    if (status === '3') {
      return (
        <ButtonWrapper>
          <div className="button-item" onClick={goSubmit}>
            重新提交s
          </div>
        </ButtonWrapper>
      );
    }
  };

  return (
    <div className="sub-detail-page">
      <SubDetailFC {...subDetailFCProps} />

      {renderButtonWrapper()}
    </div>
  );
};

export default SubDetail;
