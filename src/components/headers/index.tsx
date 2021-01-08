import React from 'react';
import './index.less';

const Headers: React.FC = ({ children }) => {
  return (
    <div className="header-top-wrapper">
      <div className="header-top-content">{children}</div>
    </div>
  );
};

export default Headers;
