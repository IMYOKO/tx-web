import React from 'react';
import { Modal } from 'antd-mobile';
import { ROLE_STATUS } from '@/types/enum';
import './index.less';
export interface RoleModalProps {
  visible: boolean;
  roleCode?: ROLE_STATUS;
  hide: () => void;
  onOk: () => void;
}

const RoleModal: React.FC<RoleModalProps> = props => {
  const { visible, roleCode, hide, onOk } = props;
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
  const renderRole = () => {
    let role = '';
    if (roleCode === ROLE_STATUS.orders) {
      role = '派单者';
    }
    if (roleCode === ROLE_STATUS.dispatcher) {
      role = '接单者';
    }
    return role;
  };
  return (
    <Modal visible={visible} transparent maskClosable={false} title="提示" footer={footer}>
      <span>
        确认切换成 <b style={{ color: '#FF5A2C' }}>{renderRole()}</b> ？
      </span>
    </Modal>
  );
};

export default RoleModal;
