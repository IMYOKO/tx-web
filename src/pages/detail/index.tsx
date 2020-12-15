import { PageActionBaseProps } from '@/types/common';
import { connect } from 'dva';
import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { DetailItemType } from './model';

interface DetailProps extends PageActionBaseProps {
  item: Partial<DetailItemType>;
}

const Detail: React.FC<DetailProps> = props => {
  const { item, dispatch } = props;
  const { hash = '' } = location;
  const search = hash.split('?').pop();
  const searchParams = new URLSearchParams(search);
  const id = searchParams.get('id');
  console.log({ item });

  const fetchData = (id: string) => {
    dispatch({
      type: 'ORDER_DETAIL/fetch',
      payload: { id: Number(id) },
    });
  };

  const clearData = () => {
    dispatch({
      type: 'ORDER_DETAIL/save',
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
  }, [id]);

  return <div className="detail-page">Detail</div>;
};

const mapStateToProps = (state: any) => {
  const {
    ORDER_DETAIL: { item },
  } = state;
  return { item };
};

export default connect(mapStateToProps)(Detail);
