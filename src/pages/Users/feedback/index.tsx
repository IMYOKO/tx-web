import { Toast } from 'antd-mobile';
import { useDispatch, useHistory } from 'dva';
import React, { useState } from 'react';
import './index.less';
import SuccessModal, { SuccessModalProps } from './Success';

const FeedBack: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const submit = () => {
    if (!value) {
      Toast.info('请先输入反馈内容');
      return;
    }
    dispatch({
      type: 'COMMON/feedback',
      payload: {
        content: value,
      },
      success: () => {
        setVisible(true);
      },
    });
  };

  const handChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const successModalProps: SuccessModalProps = {
    visible,
    closed: () => {
      setVisible(false);
      history.goBack();
    },
  };

  return (
    <div className="feedback-page">
      <div className="feedback-content">
        <div className="discrption-box">
          <textarea
            name=""
            id=""
            rows={8}
            maxLength={160}
            value={value}
            onChange={handChange}
            placeholder="请输入您的反馈意见，我们会为您不断进步"
          ></textarea>
        </div>
        <div className="value-length">{160 - value.length}/160</div>
      </div>

      <div className="button-wrapper">
        <div className="button" onClick={submit}>
          提交
        </div>
      </div>

      <SuccessModal {...successModalProps} />
    </div>
  );
};

export default FeedBack;
