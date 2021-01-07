import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { RootState } from '@/types/common';

const UseUserInfo = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.USER);

  const fetchData = () => {
    dispatch({
      type: 'USER/fetch',
    });
  };

  const clearData = () => {
    dispatch({
      type: 'USER/save',
      payload: { userInfo: {} },
    });
  };

  useEffect(() => {
    fetchData();
    return () => {
      clearData();
    };
  }, []);

  return { userInfo };
};

export default UseUserInfo;
