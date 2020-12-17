import { PageActionBaseProps } from '@/types/common';
import { connect } from 'dva';
import React, { useEffect } from 'react';
// import { OrderListItemType } from '../index/model';

interface MyOrdersPageProps extends PageActionBaseProps {
  // list: OrderListItemType[];
}

const MyOrders: React.FC<MyOrdersPageProps> = props => {
  return <div className="my-orders-page">dsdsdsd</div>;
};

const mapStateToProps = (state: any) => {
  return { state };
};

export default connect(mapStateToProps)(MyOrders);
