import TagListModal from '@/components/tag-list';
import { PageActionBaseProps } from '@/types/common';
import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash-es';
import './index.less';

interface AddOrderPageProps extends PageActionBaseProps {
  tagList: string[];
}

const AddOrder: React.FC<AddOrderPageProps> = props => {
  const { dispatch, tagList } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [activeTagList, setActiveTagList] = useState<string[]>([]);

  const submit = () => {
    dispatch({
      type: 'ADD_ORDER/create',
      payload: {
        title: 'ssss',
      },
    });
  };

  const fetchTagList = () => {
    dispatch({
      type: 'ADD_ORDER/tagList',
    });
  };

  const clearTagList = () => {
    dispatch({
      type: 'ADD_ORDER/save',
      payload: {
        tagList: [],
      },
    });
  };

  useEffect(() => {
    fetchTagList();
    return () => {
      clearTagList();
    };
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const tagListModalProps = {
    visible,
    tagList: ['标签1', '标签2', '标签3', '标签4', '标签5', '标签6'],
    activeTagList,
    onOK: (tagList: string[]) => {
      console.log({ tagList });
      setActiveTagList(tagList);
    },
    hideModal,
  };

  const renderTaglistEl = () => {
    if (isEmpty(activeTagList)) {
      return <div className="no-data">请选择标签</div>;
    }
    return (
      <ul className="tag-list">
        {activeTagList.map(tag => (
          <li key={tag}>
            <span>{tag}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="add-order-page">
      <div className="add-order-title">
        <span>发布稿件</span>
        <div className="button" onClick={submit}>
          发布
        </div>
      </div>
      <div className="add-order-page-content">
        <div className="add-order-form">
          <div className="add-order-form-list">
            <div className="add-order-form-list-item">
              <div className="add-order-form-item-wrapper">
                <div className="label">标题</div>
                <div className="content">
                  <input type="text" placeholder="请输入标题" autoComplete="off" />
                </div>
              </div>
              <div className="add-order-form-item-wrapper">
                <div className="label">佣金</div>
                <div className="content">
                  <input type="number" placeholder="请输入佣金" autoComplete="off" />
                  <span>元</span>
                </div>
              </div>
              <div className="add-order-form-item-wrapper">
                <div className="label">本金</div>
                <div className="content">
                  <input type="number" placeholder="请输入本金" autoComplete="off" />
                  <span>元</span>
                </div>
              </div>
              <div className="add-order-form-item-wrapper">
                <div className="label">所需任务</div>
                <div className="content">
                  <input type="number" placeholder="请输入任务个数" autoComplete="off" />
                  <span>个</span>
                </div>
              </div>
              <div className="add-order-form-item-wrapper">
                <div className="label">总佣金</div>
                <div className="content">
                  <input type="number" placeholder="请输入总佣金" autoComplete="off" />
                  <span>元</span>
                </div>
              </div>
              <div
                className={`add-order-form-item-wrapper ${
                  isEmpty(activeTagList) ? '' : 'has-tag-list'
                }`}
              >
                <div className="label">标签</div>
                <div className="content tag-list-content" onClick={showModal}>
                  <div className="tag-list-wrapper">{renderTaglistEl()}</div>
                  <div className="more"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="add-order-form-list">
            <div className="order-gaojian-wrapper">
              <div className="title">稿件描述</div>
              <div className="discrption-wrapper">
                <textarea name="" id="" rows={6} placeholder="请输入稿件描述"></textarea>
              </div>
            </div>
          </div>
          <div className="add-order-form-list">
            <div className="order-gaojian-wrapper">
              <div className="title">稿件要求</div>
              <div className="discrption-wrapper">
                <textarea name="" id="" rows={6} placeholder="请输入稿件要求"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TagListModal */}
      <TagListModal {...tagListModalProps} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const {
    ADD_ORDER: { tagList },
  } = state;
  return { tagList };
};

export default connect(mapStateToProps)(AddOrder);
