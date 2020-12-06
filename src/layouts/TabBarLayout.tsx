import React from 'react';
import TabBar from '@/components/tab-bar';
import './TabBarLayout.less';

const TabBarLayout: React.FC = props => {
  return (
    <div className="has-tab-bar">
      {props.children}
      <TabBar {...props} />
    </div>
  );
};

export default TabBarLayout;
