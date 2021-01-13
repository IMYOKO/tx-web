import React, { useEffect, useState } from 'react';
import { useDispatch } from 'dva';
import Headers from '@/components/headers';
import ImagePicker from '@/components/image-picker';
import useQuery from '@/hooks/useQuery';
import { FileDataType } from '@/types/common';
import './index.less';

const SubmitTask: React.FC = () => {
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState<FileDataType[]>([]);
  const { id, sd, b } = useQuery();
  console.log(id, sd, b);

  const submit = () => {
    const payload = {
      subOrderId: 0,
      submitContent: '',
      submitFileList: [],
    };
    console.log({ payload });
  };

  const addFiles = (result: FileDataType) => {
    setFileList([...fileList, result]);
  };

  const removeFile = (index: number) => {
    const newfileList = fileList.filter((_, i) => i !== index);
    setFileList(newfileList);
  };

  return (
    <div className="submit-task-page">
      <Headers>
        <div className="tx-btn submit-btn" onClick={submit}>
          发布
        </div>
      </Headers>
      <div className="add-order-form">
        <div className="add-order-form-list">
          <div className="order-gaojian-wrapper">
            <div className="title">任务要求</div>
            <div className="discrption-wrapper">
              <textarea
                name=""
                id=""
                rows={6}
                // value={addOrderForm.taskClaim}
                // onChange={taskClaimChange}
                placeholder="请输入任务要求"
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
