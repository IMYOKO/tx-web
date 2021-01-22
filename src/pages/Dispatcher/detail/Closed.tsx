import React from 'react';
import { Modal } from 'antd-mobile';

export interface ClosedModalProps {
  visible: boolean;
  hide: () => void;
  onOk: () => void;
}

const ClosedModal: React.FC<ClosedModalProps> = props => {
  const { visible, hide, onOk } = props;
  const footer = [
    {
      text: '取消',
      onPress: hide,
    },
    {
      text: '确认',
      onPress: onOk,
    },
  ];
  return (
    <Modal visible={visible} transparent maskClosable={false} title="提示" footer={footer}>
      <span>确认关闭任务？</span>
    </Modal>
  );
};

export default ClosedModal;
