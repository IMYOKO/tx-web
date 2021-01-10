import React from 'react';
import { Modal } from 'antd-mobile';
import './index.less';

export interface FollowModalProps {
  visible: boolean;
  hide: () => void;
  onOk: () => void;
}

const FollowModal: React.FC<FollowModalProps> = props => {
  const { visible, hide, onOk } = props;
  const footer = [
    {
      text: '取消',
      onPress: hide,
    },
    {
      text: '立刻前往',
      onPress: onOk,
    },
  ];
  return (
    <Modal visible={visible} transparent maskClosable={false} title="提示" footer={footer}>
      您还未关注公众号，
      <br />
      请先前往关注公众号！
    </Modal>
  );
};

export default FollowModal;
