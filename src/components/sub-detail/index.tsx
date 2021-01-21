import React from 'react';
import { format } from 'date-fns';
import './index.less';

export interface SubDetailFCDataTypes {
  id: number;
  orderId: number;
  commissionAmount: number;
  avatarUrl: string;
  nickName: string;
  title: string;
  createTime: number;
  realAmount: number;
  status: string;
  statusText: string;
  submitContent: string;
  submitTime: number;
  submitUrlList: string[];
}

export interface SubDetailFCProps {
  data: Partial<SubDetailFCDataTypes>;
}

const SubDetailFC: React.FC<SubDetailFCProps> = props => {
  const { data } = props;
  const {
    createTime,
    statusText,
    realAmount,
    submitContent,
    avatarUrl,
    nickName,
    submitTime,
  } = data;
  return (
    <div className="sub-detail-component">
      <div className="check-wrapper">
        <div className="check-content">
          <div className="check-box">
            <div className="check-img">{/* <div className="img ok"></div> */}</div>
            <h3>{statusText}</h3>
            <p>{createTime && format(createTime * 1000, 'yyyy-MM-dd HH:mm')}</p>
          </div>
        </div>
        <div className="check-desc">
          <p>稿费金额：{realAmount}元</p>
          {/* <p>备注：</p> */}
        </div>
      </div>

      <div className="check-user-info-wrapper">
        <div className="check-user-info-content">
          <div className="user-info-wrapper">
            <div className="img">
              <img width={22} height={22} src={avatarUrl} alt="" />
            </div>
            <div className="name">{nickName}</div>
          </div>
          <div className="times">
            提交时间：{submitTime && format(submitTime * 1000, 'yyyy-MM-dd HH:mm')}
          </div>
        </div>
        <div className="check-submit-wrapper">
          <div className="submit-desc">
            <p>备注：{submitContent}</p>
          </div>
          <div className="submit-desc-img"></div>
        </div>
      </div>
    </div>
  );
};

export default SubDetailFC;
