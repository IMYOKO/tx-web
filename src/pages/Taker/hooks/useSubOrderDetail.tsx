import { TakerOrderDetailType } from '@/models/taker';
import { useDispatch, useLocation } from 'dva';
import { useState, useEffect } from 'react';

const useSubOrderDetail = (id: number | string = ''): Partial<TakerOrderDetailType> => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [itemData, setItemData] = useState<Partial<TakerOrderDetailType>>({});

  const fetchData = async (id: number | string) => {
    try {
      const item = await dispatch({
        type: 'TAKER/item',
        payload: { id: Number(id) },
      });
      setItemData(item as Partial<TakerOrderDetailType>);
    } catch (error) {
      console.log(error);
    }
  };

  const clearData = () => {
    dispatch({
      type: 'TAKER/save',
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

export default useSubOrderDetail;
