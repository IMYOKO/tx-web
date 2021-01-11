import React, { useEffect } from 'react';
import { useDispatch } from 'dva';

const SubmitTask: React.FC = () => {
  const dispatch = useDispatch();
  const { hash = '' } = location;
  const search = hash.split('?').pop();
  const searchParams = new URLSearchParams(search);
  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      console.log(id);
    }
  }, [id]);

  const submit = () => {
    const payload = {
      subOrderId: 0,
      submitContent: '',
      submitFileList: [],
    };
    console.log({ payload });
  };

  return (
    <div className="submit-task-page">
      <button onClick={submit}>提交</button>
    </div>
  );
};

export default SubmitTask;
