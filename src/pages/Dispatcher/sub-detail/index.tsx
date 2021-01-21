import SubDetailFC, { SubDetailFCProps } from '@/components/sub-detail';
import useQuery from '@/hooks/useQuery';
import useSubOrderDetail from '@/hooks/useSubOrderDetail';
import { ButtonWrapper } from '@/pages/Taker/detail';
import { useHistory } from 'dva';
import React from 'react';

const SubDetail: React.FC = () => {
  const { id } = useQuery();
  const history = useHistory();
  const data = useSubOrderDetail(id);

  const subDetailFCProps: SubDetailFCProps = {
    data: { ...data },
  };

  const goCheckTask = () => {
    if (id) {
      history.push(`/check-task?id=${id}`);
    }
  };

  const renderButtonWrapper = () => {
    const { status } = data;
    if (!status) {
      return null;
    }
    if (status === '2') {
      return (
        <ButtonWrapper>
          <div className="button-item" onClick={goCheckTask}>
            审核
          </div>
        </ButtonWrapper>
      );
    }
  };

  return (
    <div className="sub-detail-page padding-bottom-55">
      <SubDetailFC {...subDetailFCProps} />

      {renderButtonWrapper()}
    </div>
  );
};

export default SubDetail;
