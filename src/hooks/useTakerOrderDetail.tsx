import useOrderDetail from '@/hooks/useOrderDetail';
import { DetailItemType } from '@/models/order';
import { useLocation } from 'dva';
import { isEmpty } from 'lodash-es';
import { useState, useEffect } from 'react';
import useSubOrderDetail from '@/hooks/useSubOrderDetail';

interface UseTakerOrderDetailProps {
  orderId: number | string;
  subOrderId: number | string;
}

const useTakerOrderDetail = ({
  orderId = '',
  subOrderId = '',
}: UseTakerOrderDetailProps): Partial<DetailItemType> => {
  const { pathname } = useLocation();
  const [itemData, setItemData] = useState<Partial<DetailItemType>>({});

  const orderDetail = useOrderDetail(orderId);
  const subOrderDetail = useSubOrderDetail(subOrderId);

  useEffect(() => {
    if (subOrderId && orderId && !isEmpty(orderDetail) && !isEmpty(subOrderDetail)) {
      if (
        subOrderDetail.orderId === orderDetail.id &&
        orderId === subOrderDetail.orderId?.toString()
      ) {
        const { createTime, commissionAmount, status, statusText } = subOrderDetail;

        const item = {
          ...orderDetail,
          createTime,
          commissionAmount,
          status,
          statusText,
        };
        setItemData(item);

        return () => {
          setItemData({});
        };
      }
    }
  }, [orderDetail, subOrderDetail, pathname, orderId, subOrderId]);

  return itemData;
};

export default useTakerOrderDetail;
