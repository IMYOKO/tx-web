import React from 'react';
import { Modal } from 'antd-mobile';
import { ROLE_STATUS } from '@/types/enum';
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
      text: '立即切换',
      onPress: onOk,
    },
  ];
  return (
    <Modal visible={visible} transparent maskClosable={false} title="提示" footer={footer}>
      <span>
        请先切换成 <b style={{ color: '#FF5A2C' }}>玩家</b> ？
        <br />
        切换成功后再点击接单
      </span>
    </Modal>
  );
};

export default RoleModal;
