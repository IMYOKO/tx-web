import { PageActionBaseProps } from '@/types/common';
import { connect } from 'dva';
import React, { useEffect } from 'react';
import { DetailItemType } from './model';
import './index.less';

interface DetailProps extends PageActionBaseProps {
  item: Partial<DetailItemType>;
}

const Detail: React.FC<DetailProps> = props => {
  const { item, dispatch } = props;
  const { hash = '' } = location;
  const search = hash.split('?').pop();
  const searchParams = new URLSearchParams(search);
  const id = searchParams.get('id');
  console.log({ item });

  const fetchData = (id: string) => {
    dispatch({
      type: 'ORDER_DETAIL/fetch',
      payload: { id: Number(id) },
    });
  };

  const clearData = () => {
    dispatch({
      type: 'ORDER_DETAIL/save',
      payload: { item: {} },
    });
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
      return () => {
        clearData();
      };
    }
    return () => {};
  }, [id]);

  const catchOrder = () => {
    dispatch({
      type: 'ORDER_DETAIL/save',
      payload: { orderId: id },
    });
  };

  return (
    <div className="detail-page">
      <div className="detail-page-info">
        <div className="title-wrapper">
          <div className="title-box">
            <h2>关注转发 - 店铺关注</h2>
            <p>创建时间：2020-11-28 21:53</p>
          </div>
          <div className="task-status">进行中</div>
        </div>
        <div className="my-yj-wrapper">
          <div className="my-yj-item">
            <div className="my-yj-item-top">佣金(元)</div>
            <div className="my-yj-item-bottom">5.02</div>
          </div>
          <div className="my-yj-item">
            <div className="my-yj-item-top">还需稿件</div>
            <div className="my-yj-item-bottom">5</div>
          </div>
          <div className="my-yj-item">
            <div className="my-yj-item-top">
              总稿件<span>10</span>
            </div>
            <div className="my-yj-item-bottom bj">本金 100元</div>
          </div>
        </div>
        <div className="user-info-wrapper">
          <div className="avatar-wrapper">
            <div className="avatar">
              <img
                src="https://dev-res-cn.oss-cn-shenzhen.aliyuncs.com/next-maker/cms/9174d350-35fe-11eb-912f-c9d067017d00.jpg"
                alt=""
              />
            </div>
            <div className="name">YOKO</div>
          </div>
          <div className="tag-wrapper">
            <div className="tag-item">
              <span>dsdsd</span>
            </div>
          </div>
        </div>
      </div>
      <div className="detail-task-wrapper">
        <div className="detail-task-title">任务描述</div>
        <div className="detail-task-decription">
          任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述
        </div>
      </div>
      <div className="detail-task-wrapper">
        <div className="detail-task-title">任务描述</div>
        <div className="detail-task-decription">
          任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述
        </div>
      </div>

      <div className="button-wrapper">
        <div className="button-item" onClick={catchOrder}>
          接单
        </div>
        {/* <div className="button-box">
          <div className="button-item left-wrapper">接单</div>
          <div className="button-item right-wrapper">接单</div>
        </div> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const {
    ORDER_DETAIL: { item },
  } = state;
  return { item };
};

export default connect(mapStateToProps)(Detail);
