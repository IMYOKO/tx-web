import useQuery from '@/hooks/useQuery';
import useSubOrderDetail from '@/hooks/useSubOrderDetail';
import React from 'react';
import './index.less';

const CheckTask: React.FC = () => {
  const { id } = useQuery();
  const { commissionAmount = 0 } = useSubOrderDetail(id);
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
              <div className="content"></div>
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
                placeholder="请输入备注信息"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="button-wrapper">
        <div className="button" onClick={() => {}}>
          确认提交
        </div>
      </div>
    </div>
  );
};

export default CheckTask;
