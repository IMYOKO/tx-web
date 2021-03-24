import TagListModal from '@/components/tag-list';
import { FileDataType, PageActionBaseProps, RootState } from '@/types/common';
import { connect, useHistory } from 'dva';
import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash-es';
import Headers from '@/components/headers';
import ImagePicker from '@/components/image-picker';
import { Toast } from 'antd-mobile';
import './index.less';
import ImgPop from '@/components/img-pop';

interface AddOrderPageProps extends PageActionBaseProps {
  tagList: string[];
}

interface AddOrderFormType {
  title: string;
  description: string;
  taskClaim: string;
}

interface AmountDataType {
  commissionAmount: number | string;
  count: number | string;
}

const DefaultFormData: AddOrderFormType = {
  title: '',
  description: '',
  taskClaim: '',
};

const DefaultAmountData: AmountDataType = {
  commissionAmount: '',
  count: '',
};

const AddOrder: React.FC<AddOrderPageProps> = props => {
  const { dispatch, tagList } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [activeTagList, setActiveTagList] = useState<string[]>([]);
  const [addOrderForm, setAddOrderForm] = useState<AddOrderFormType>(DefaultFormData);
  const [amountData, setAmountData] = useState<AmountDataType>(DefaultAmountData);
  const [totalCommissionAmount, setTotalCommissionAmount] = useState<number>(0);
  const [descriptionFileList, setDescriptionFileList] = useState<FileDataType[]>([]);
  const [taskClaimFileList, setTaskClaimFileList] = useState<FileDataType[]>([]);
  const history = useHistory();

  // 计算总赏金
  useEffect(() => {
    const count = Number(amountData.count);
    const commissionAmount = Number(amountData.commissionAmount);
    setTotalCommissionAmount(count * commissionAmount);
  }, [amountData.count, amountData.commissionAmount]);

  const updateAddOrderForm = (data: Partial<AddOrderFormType>) => {
    if (!isEmpty(data)) {
      setAddOrderForm({ ...addOrderForm, ...data });
    }
  };

  const updateAmountData = (data: Partial<AmountDataType>) => {
    if (!isEmpty(data)) {
      setAmountData({ ...amountData, ...data });
    }
  };

  // 提交表单
  const submit = async () => {
    const count = Number(amountData.count);
    const commissionAmount = Number(amountData.commissionAmount) * 100;
    const { title, description, taskClaim } = addOrderForm;

    if (isEmpty(title)) {
      Toast.info('标题不能为空');
      return;
    }
    if (count <= 0) {
      Toast.info('任务个数必须大于0');
      return;
    }
    if (commissionAmount <= 0) {
      Toast.info('赏金必须大于0');
      return;
    }
    if (commissionAmount <= 1) {
      Toast.info('赏金最少为0.01元');
      return;
    }
    if (isEmpty(description)) {
      Toast.info('任务描述不能为空');
      return;
    }
    if (isEmpty(taskClaim)) {
      Toast.info('任务要求不能为空');
      return;
    }

    const payload = {
      ...addOrderForm,
      count,
      commissionAmount,
      tagList: activeTagList,
      descriptionFileList,
      taskClaimFileList,
    };
    console.log({ payload });

    try {
      await dispatch({
        type: 'DISPATCHER/create',
        payload,
      });
      Toast.info('发布成功', 0.3, () => {
        history.replace('/task-dispatcher');
      });
    } catch (error) {
      Toast.info(error.message || '发布失败');
    }
  };

  const fetchTagList = () => {
    dispatch({
      type: 'DISPATCHER/tagList',
    });
  };

  const clearTagList = () => {
    dispatch({
      type: 'DISPATCHER/save',
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

  // 修改标题
  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAddOrderForm({ title: e.target.value });
  };

  // 修改任务描述
  const descriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateAddOrderForm({ description: e.target.value });
  };

  // 修改任务要求
  const taskClaimChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateAddOrderForm({ taskClaim: e.target.value });
  };

  // 修改任务数量
  const countChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAmountData({ count: e.target.value });
  };

  const countKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let count = (e.target as any).value;
    count = count.replace(/\D/g, '');
    updateAmountData({ count });
  };

  // 修改赏金
  const commissionAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAmountData({ commissionAmount: e.target.value });
  };

  // 任务描述图片
  const addDescriptionFiles = (result: FileDataType) => {
    setDescriptionFileList([...descriptionFileList, result]);
  };

  const removeDescriptionFile = (index: number) => {
    const fileList = descriptionFileList.filter((_, i) => i !== index);
    setDescriptionFileList(fileList);
  };

  // 任务要求图片
  const addTaskClaimFiles = (result: FileDataType) => {
    setTaskClaimFileList([...taskClaimFileList, result]);
  };

  const removeTaskClaimFile = (index: number) => {
    const fileList = taskClaimFileList.filter((_, i) => i !== index);
    setTaskClaimFileList(fileList);
  };

  // 标签弹窗props
  const tagListModalProps = {
    visible,
    tagList,
    activeTagList,
    onOK: (tagList: string[]) => {
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
      <Headers>
        <div className="tx-btn submit-btn" onClick={submit}>
          发布
        </div>
      </Headers>
      <div className="add-order-page-content">
        <div className="add-order-form">
          <div className="add-order-form-list">
            <div className="add-order-form-list-item">
              <div className="add-order-form-item-wrapper">
                <div className="label">标题</div>
                <div className="content">
                  <input
                    value={addOrderForm.title}
                    type="text"
                    placeholder="请输入标题"
                    maxLength={32}
                    onChange={titleChange}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="add-order-form-item-wrapper">
                <div className="label">赏金</div>
                <div className="content">
                  <input
                    type="number"
                    value={amountData.commissionAmount}
                    placeholder="请输入赏金"
                    onChange={commissionAmountChange}
                    autoComplete="off"
                  />
                  <span>元</span>
                </div>
              </div>
              <div className="add-order-form-item-wrapper">
                <div className="label">所需任务</div>
                <div className="content">
                  <input
                    type="test"
                    value={amountData.count}
                    placeholder="请输入任务个数"
                    onKeyUp={countKeyUp}
                    onChange={countChange}
                    autoComplete="off"
                  />
                  <span>个</span>
                </div>
              </div>
              <div className="add-order-form-item-wrapper">
                <div className="label">总赏金</div>
                <div className="content">
                  <div className="sigle">{totalCommissionAmount} 元</div>
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
          {/* 任务描述 */}
          <div className="add-order-form-list">
            <div className="order-gaojian-wrapper">
              <div className="title">任务描述</div>
              <div className="discrption-wrapper">
                <textarea
                  name=""
                  id=""
                  rows={6}
                  value={addOrderForm.description}
                  onChange={descriptionChange}
                  placeholder="请输入任务描述"
                ></textarea>
              </div>
              <ImagePicker
                key="descriptionFileList"
                fileList={descriptionFileList}
                addFiles={addDescriptionFiles}
                removeFile={removeDescriptionFile}
              />
            </div>
          </div>
          {/* 任务要求 */}
          <div className="add-order-form-list">
            <div className="order-gaojian-wrapper">
              <div className="title">任务要求</div>
              <div className="discrption-wrapper">
                <textarea
                  name=""
                  id=""
                  rows={6}
                  value={addOrderForm.taskClaim}
                  onChange={taskClaimChange}
                  placeholder="请输入任务要求"
                ></textarea>
              </div>
              <ImagePicker
                key="taskClaimFileList"
                fileList={taskClaimFileList}
                addFiles={addTaskClaimFiles}
                removeFile={removeTaskClaimFile}
              />
            </div>
          </div>
        </div>
      </div>

      <ImgPop />

      {/* TagListModal */}
      <TagListModal {...tagListModalProps} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const {
    DISPATCHER: { tagList },
  } = state;
  return { tagList };
};

export default connect(mapStateToProps)(AddOrder);
