import { DetailItemType } from '@/models/order';
import { useDispatch, useLocation } from 'dva';
import { useState, useEffect } from 'react';

const useOrderDetail = (id: number | string = ''): Partial<DetailItemType> => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [itemData, setItemData] = useState<Partial<DetailItemType>>({});

  const fetchData = async (id: number | string) => {
    try {
      const item = await dispatch({
        type: 'ORDER/fetch',
        payload: { orderId: Number(id) },
      });
      setItemData(item as Partial<DetailItemType>);
    } catch (error) {
      console.log(error);
    }
  };

  const clearData = () => {
    dispatch({
      type: 'ORDER/save',
      payload: { item: {} },
    });
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
      return () => {
        clearData();
      };
    }
    return () => {};
  }, [id, pathname]);

  return itemData;
};

export default useOrderDetail;
