import React from 'react';
import { useHistory } from 'dva';
import './index.less';

export default () => {
  const history = useHistory();
  const goHome = () => {
    history.replace('/');
  };
  return (
    <div className="page-404">
      <div className="page-404-content">
        <h1>没有这个页面</h1>
        <div className="button">
          <button onClick={goHome}>回到首页</button>
        </div>
      </div>
    </div>
  );
};
