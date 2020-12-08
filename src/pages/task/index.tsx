import React from 'react';
import './index.less';

const Task: React.FC = () => {
  return (
    <div className="task-page">
      <div className="nav-wrapper">
        <div className="nav-list">
          <div className="nav-list-wrapper">
            <div className="nav-list-body">
              <div className="nav-list-item active">全部</div>
              <div className="nav-list-item">最新</div>
              <div className="nav-list-item">最新</div>
              <div className="nav-list-item">最新</div>
              <div className="nav-list-item">最新</div>
              <div className="nav-list-item">最新</div>
              <div className="nav-list-item">最新</div>
              <div className="nav-list-item">最新</div>
              <div className="nav-list-item">最新</div>
              <div className="nav-list-item">最新</div>
            </div>
          </div>
        </div>
        <div className="search"></div>
      </div>
    </div>
  );
};

export default Task;
