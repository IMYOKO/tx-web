import React from 'react';
import { Modal } from 'antd-mobile';
import './index.less';

export interface RoleModalProps {
  visible: boolean;
  hide: () => void;
  onOk: () => void;
}

const RoleModal: React.FC<RoleModalProps> = props => {
  const { visible, hide, onOk } = props;
  const footer = [
    {
      text: '取消',
      onPress: hide,
    },
    {
      text: '确定',
      onPress: onOk,
    },
  ];
  return (
    <Modal visible={visible} transparent maskClosable={false} title="提示" footer={footer}>
      <span>
        确认切换成 <b style={{ color: '#FF5A2C' }}>派单者</b> ？
      </span>
    </Modal>
  );
};

export default RoleModal;
