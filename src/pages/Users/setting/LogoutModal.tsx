import React from 'react';
import { Modal } from 'antd-mobile';
import './index.less';

export interface LogoutModalProps {
  visible: boolean;
  hide: () => void;
  onOk: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = props => {
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
      确认退出登录？
    </Modal>
  );
};

export default LogoutModal;
