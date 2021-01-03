import React from 'react';
import { Modal } from 'antd-mobile';
import './index.less';

export interface SuccessModalProps {
  visible: boolean;
  closed: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = props => {
  const { visible, closed } = props;
  const footer = [
    {
      text: '返回',
      onPress: closed,
    },
  ];
  return (
    <Modal visible={visible} transparent maskClosable={false} title="提交成功" footer={footer}>
      感谢您的反馈，我们会第一时间处理！给您带来的不便，敬请谅解；
    </Modal>
  );
};

export default SuccessModal;
