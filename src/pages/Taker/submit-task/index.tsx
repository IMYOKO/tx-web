import React, { useEffect, useState } from 'react';
import { useDispatch } from 'dva';
import Headers from '@/components/headers';
import ImagePicker from '@/components/image-picker';
import useQuery from '@/hooks/useQuery';
import { FileDataType } from '@/types/common';
import { isEmpty } from 'lodash-es';
import './index.less';
import { Toast } from 'antd-mobile';

const SubmitTask: React.FC = () => {
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState<FileDataType[]>([]);
  const [submitContent, setSubmitContent] = useState<string>('');
  const { subOrderId } = useQuery();

  const submit = async () => {
    if (!subOrderId) {
      Toast.info('订单不存在');
      return;
    }
    if (isEmpty(submitContent)) {
      Toast.info('请先输入内容');
      return;
    }
    const payload = {
      subOrderId: Number(subOrderId),
      submitContent,
      submitFileList: fileList,
    };
    console.log({ payload });
    try {
      await dispatch({
        type: 'TAKER/submit',
        payload,
      });
      Toast.info('提交成功');
    } catch (error) {
      Toast.info('提交失败');
    }
  };

  const addFiles = (result: FileDataType) => {
    setFileList([...fileList, result]);
  };

  const removeFile = (index: number) => {
    const newfileList = fileList.filter((_, i) => i !== index);
    setFileList(newfileList);
  };

  const submitContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSubmitContent(e.target.value);
  };

  return (
    <div className="submit-task-page">
      <Headers>
        <div className="tx-btn submit-btn" onClick={submit}>
          提交
        </div>
      </Headers>
      <div className="add-order-form">
        <div className="add-order-form-list">
          <div className="order-gaojian-wrapper">
            <div className="title"></div>
            <div className="discrption-wrapper">
              <textarea
                name=""
                id=""
                rows={6}
                onChange={submitContentChange}
                placeholder="想说点什么吗"
              ></textarea>
            </div>
            <ImagePicker
              key="submit-task"
              fileList={fileList}
              addFiles={addFiles}
              removeFile={removeFile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitTask;
