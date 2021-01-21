import SubDetailFC, { SubDetailFCProps } from '@/components/sub-detail';
import useQuery from '@/hooks/useQuery';
import React from 'react';
import useSubOrderDetail from '../hooks/useSubOrderDetail';

const SubDetail: React.FC = () => {
  const { subOrderId } = useQuery();
  const subOrderDetail = useSubOrderDetail(subOrderId);
  console.log({ subOrderDetail });

  const subDetailFCProps: SubDetailFCProps = {
    data: { ...subOrderDetail },
  };

  return (
    <div className="sub-detail-page">
      <SubDetailFC {...subDetailFCProps} />
    </div>
  );
};

export default SubDetail;
