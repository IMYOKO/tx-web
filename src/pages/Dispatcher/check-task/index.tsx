import useQuery from '@/hooks/useQuery';
import useSubOrderDetail from '@/hooks/useSubOrderDetail';
import React, { useState } from 'react';
import ToPayModal, { ToPayModalProps } from './ToPay';
import { useDispatch, useHistory } from 'dva';
import './index.less';
import { ActivityIndicator, Picker, Toast } from 'antd-mobile';
import { isArray, isEmpty } from 'lodash-es';

const CHECK_STATUS_DATA = [
  {
    value: '0',
    label: '不通过',
  },
  {
    value: '1',
    label: '通过',
  },
];

const CheckTask: React.FC = () => {
  const { id } = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const { commissionAmount = 0 } = useSubOrderDetail(id);
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [remark, setRemark] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const hideModal = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const goNpcIndex = () => {
    history.push('/task-dispatcher');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRemark(e.target.value);
  };

  const handleStatusChange = (data: any) => {
    if (isArray(data) && !isEmpty(data)) {
      setStatus(data[0]);
    }
  };

  const submit = async () => {
    if (isEmpty(id)) {
      Toast.info('订单不存在');
      return;
    }
    if (isEmpty(remark)) {
      Toast.info('请输入备注内容');
      return;
    }
    setLoading(true);
    const payload = {
      remark,
      status,
      amount: commissionAmount,
      subOrderId: Number(id),
    };
    console.log(payload);
    try {
      await dispatch({
        type: 'DISPATCHER/subOrderAudit',
        payload,
      });
      Toast.info('操作成功');
      setLoading(false);
      // 通过
      if (status === '1') {
        showModal();
      }
    } catch (error) {
      setLoading(false);
      Toast.info('操作失败');
      console.log(error);
    }
  };

  const modalProps: ToPayModalProps = {
    visible,
    hide: () => {
      hideModal();
      goNpcIndex();
    },
    onOk: () => {
      hideModal();
    },
  };

  const renderStatusText = () => {
    const text = CHECK_STATUS_DATA.find(s => s.value === status)?.label;
    if (isEmpty(text)) {
      return <span className="status-text">请选择</span>;
    }
    if (status === '1') {
      return <span className="status-text yes">{text}</span>;
    }
    return <span className="status-text no">{text}</span>;
  };

  return (
    <div className="check-task-page">
      <div className="add-order-form">
        <div className="add-order-form-list">
          <div className="add-order-form-list-item">
            <div className="add-order-form-item-wrapper">
              <div className="label">赏金</div>
              <div className="content">
                <div className="sigle">{commissionAmount} 元</div>
              </div>
            </div>
            <div className="add-order-form-item-wrapper">
              <div className="label">审核结果</div>
              <div className="content">
                <div className="sigle">
                  <Picker data={CHECK_STATUS_DATA} cols={1} onChange={handleStatusChange}>
                    {renderStatusText()}
                  </Picker>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="add-order-form-list">
          <div className="order-gaojian-wrapper">
            <div className="title">备注信息</div>
            <div className="discrption-wrapper">
              <textarea
                name=""
                id=""
                rows={6}
                maxLength={120}
                value={remark}
                onChange={handleChange}
                placeholder="请输入备注信息"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <ToPayModal {...modalProps} />

      <ActivityIndicator toast size="large" text="正在提交..." animating={loading} />
      <div className="button-wrapper">
        <div className="button" onClick={submit}>
          确认提交
        </div>
      </div>
    </div>
  );
};

export default CheckTask;
