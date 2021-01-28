import React from 'react';
import defaultAvatarUrl from '@/assets/images/user/my_profile_face@2x.png';
import './index.less';

export interface OrderDetailProps {
  id: number;
  commissionAmount: number;
  avatarUrl: string;
  nickName: string;
  tagList: string[];
  title: string;
  count: number;
  createTime: number;
  description: string;
  descriptionUrlList: string[];
  principalAmount: number;
  remainingCount: number;
  status: string;
  statusText: string;
  taskClaim: string;
  taskClaimUrlList: string[];
}

const OrderDetail: React.FC<Partial<OrderDetailProps>> = props => {
  const {
    nickName,
    title,
    avatarUrl,
    createTime,
    statusText,
    commissionAmount = 0,
    remainingCount = 0,
    count = 0,
    tagList = [],
    description,
    taskClaim,
  } = props;
  return (
    <div className="order-detail">
      <div className="order-detail-info">
        <div className="title-wrapper">
          <div className="title-box">
            <h2>{title}</h2>
            <p>创建时间：{createTime}</p>
          </div>
          <div className="task-status">{statusText}</div>
        </div>
        <div className="my-yj-wrapper">
          <div className="my-yj-item">
            <div className="my-yj-item-top">赏金(元)</div>
            <div className="my-yj-item-bottom">{commissionAmount}</div>
          </div>
          <div className="my-yj-item">
            <div className="my-yj-item-top">剩余名额</div>
            <div className="my-yj-item-bottom">{remainingCount}</div>
          </div>
          <div className="my-yj-item">
            <div className="my-yj-item-top">总名额</div>
            <div className="my-yj-item-bottom">{count}</div>
          </div>
        </div>
        <div className="user-info-wrapper">
          <div className="avatar-wrapper">
            <div className="avatar">
              <img src={avatarUrl || defaultAvatarUrl} alt="" />
            </div>
            <div className="name">{nickName}</div>
          </div>
          <div className="tag-wrapper">
            {tagList.map((t, i) => (
              <div className="tag-item" key={i}>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="detail-task-wrapper">
        <div className="detail-task-title">任务描述</div>
        <div className="detail-task-decription">{description}</div>
      </div>
      <div className="detail-task-wrapper">
        <div className="detail-task-title">任务要求</div>
        <div className="detail-task-decription">{taskClaim}</div>
      </div>
    </div>
  );
};

export default OrderDetail;
