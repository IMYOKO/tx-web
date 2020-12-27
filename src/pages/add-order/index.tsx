import { useDispatch } from 'dva';
import React from 'react';
import './index.less';

const AddOrder: React.FC = () => {
  const dispatch = useDispatch();
  const submit = () => {
    dispatch({
      type: 'ADD_ORDER/create',
      payload: {
        title: 'ssss',
      },
    });
  };
  return (
    <div className="add-order-page">
      <button onClick={submit}>发布</button>
    </div>
  );
};

export default AddOrder;
