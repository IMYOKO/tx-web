import React from 'react';
import { Modal } from 'antd-mobile';
import './index.less';

export interface ToPayModalProps {
  visible: boolean;
  hide: () => void;
  onOk: () => void;
}

const ToPayModal: React.FC<ToPayModalProps> = props => {
  const { visible, hide, onOk } = props;
  const footer = [
    {
      text: '稍后支付',
      onPress: hide,
    },
    {
      text: '去支付',
      onPress: onOk,
    },
  ];
  return (
    <Modal visible={visible} transparent maskClosable={false} title="提示" footer={footer}>
      <span>审核已通过，请支付赏金</span>
    </Modal>
  );
};

export default ToPayModal;
