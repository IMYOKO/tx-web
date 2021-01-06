import React from 'react';
import Header from './Header/index';

const BasicLayout: React.FC = props => {
  return (
    <div className="app">
      <Header />
      {props.children}
    </div>
  );
};

export default BasicLayout;
