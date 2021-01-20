import { PageActionBaseProps, RootState } from '@/types/common';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import { UserInfoType } from '@/models/user';
import { DetailItemType } from '@/models/order';
import './index.less';
import { ROLE_STATUS } from '@/types/enum';
import { Toast } from 'antd-mobile';
import RoleModal, { RoleModalProps } from './RoleModal';
import useQuery from '@/hooks/useQuery';
import OrderDetail, { OrderDetailProps } from '@/components/order-detail';
import useOrderDetail from '@/hooks/useOrderDetail';

interface DetailProps extends PageActionBaseProps {
  item: Partial<DetailItemType>;
  userInfo: Partial<UserInfoType>;
}

const Detail: React.FC<DetailProps> = props => {
  const {
    item,
    userInfo: { roleCode },
    dispatch,
  } = props;
  const { id } = useQuery();
  const [visible, setVisible] = useState<boolean>(false);

  useOrderDetail(id);
  // const fetchData = (id: string) => {
  //   dispatch({
  //     type: 'ORDER/fetch',
  //     payload: { orderId: Number(id) },
  //   });
  // };

  // const clearData = () => {
  //   dispatch({
  //     type: 'ORDER/save',
  //     payload: { item: {} },
  //   });
  // };

  // useEffect(() => {
  //   if (id) {
  //     fetchData(id);
  //     return () => {
  //       clearData();
  //     };
  //   }
  //   return () => {};
  // }, [id]);

  const catchOrder = async () => {
    if (!id) {
      Toast.info('暂无此订单');
      return;
    }
    if (roleCode === undefined) {
      Toast.info('用户信息未知，请刷新页面');
      return;
    }
    if (roleCode !== ROLE_STATUS.taker) {
      showModal();
      return;
    }
    try {
      const res = await dispatch({
        type: 'TAKER/catchOrder',
        payload: { orderId: Number(id) },
      });
      console.log(res);
    } catch (error) {}
  };

  const hideModal = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const switchRole = async () => {
    try {
      await dispatch({
        type: 'USER/switchRole',
        payload: {
          roleCode: ROLE_STATUS.taker,
        },
      });
      hideModal();
      Toast.info('切换成功');
    } catch (error) {
      hideModal();
    }
  };

  const roleModalProps: RoleModalProps = {
    visible,
    hide: hideModal,
    onOk: () => {
      switchRole();
    },
  };

  const orderDetailProps: Partial<OrderDetailProps> = {
    ...item,
  };

  return (
    <div className="detail-page">
      <OrderDetail {...orderDetailProps} />

      <div className="bottom-button-wrapper">
        <div className="bottom-button-content">
          <div className="button-item" onClick={catchOrder}>
            接单
          </div>
        </div>
      </div>
      <RoleModal {...roleModalProps} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const {
    ORDER: { item },
    USER: { userInfo },
  } = state;
  return { item, userInfo };
};

export default connect(mapStateToProps)(Detail);
