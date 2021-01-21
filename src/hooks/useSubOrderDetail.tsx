import { SubOrderDetailType } from '@/models/order';
import { useDispatch, useLocation } from 'dva';
import { useState, useEffect } from 'react';

const useSubOrderDetail = (id: number | string = ''): Partial<SubOrderDetailType> => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [itemData, setItemData] = useState<Partial<SubOrderDetailType>>({});

  const fetchData = async (id: number | string) => {
    try {
      const item = await dispatch({
        type: 'ORDER/subItem',
        payload: { id: Number(id) },
      });
      setItemData(item as Partial<SubOrderDetailType>);
    } catch (error) {
      console.log(error);
    }
  };

  const clearData = () => {
    dispatch({
      type: 'ORDER/save',
      payload: { subItem: {} },
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
