import React from 'react';
import './index.less';

export interface NavListItem {
  title: string;
  tips?: string | React.ReactNode;
  iconClass?: string;
  handleClick?: () => void;
}

export interface NavListProps {
  navList: NavListItem[][];
}

const NavList: React.FC<NavListProps> = ({ navList }) => {
  const renderTips = (tips?: string | React.ReactNode) => {
    if (tips && typeof tips === 'string') {
      return <div className="tips">{tips}</div>;
    }
    return tips;
  };
  return (
    <>
      {navList.map((nav, index) => (
        <div className="user-nav-list" key={index}>
          {nav.map(({ title, tips, iconClass, handleClick }, eq) => (
            <div
              className="user-nav-list-item"
              key={`${title}-${index}-${eq}`}
              onClick={handleClick}
            >
              <div className="user-nav-list-item-box">
                {iconClass && <div className={`icon-box ${iconClass}`}></div>}
                <div className="title">{title}</div>
              </div>
              <div className="user-nav-list-item-box">
                {renderTips(tips)}
                <div className="more"></div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default NavList;
