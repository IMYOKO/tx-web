import React from 'react';
import { connect, useHistory, useLocation } from 'dva';
import HeaderConfig, { HeaderConfigType } from './HeaderConfig';
import './index.less';

const Header: React.FC = props => {
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const back = () => {
    history.goBack();
  };
  const renderContent = (pathname: string, HeaderConfig: HeaderConfigType[]) => {
    const item: HeaderConfigType = HeaderConfig.find(item => item.path === pathname) || {};
    const { title, historyBack, rightWrapper } = item;

    return (
      <div className="Header-content">
        <div className="action-wrapper">
          <div className="left-wrapper">
            {historyBack && <div className="back" onClick={back}></div>}
          </div>
          <div className="right-wrapper">{rightWrapper}</div>
        </div>
        <div className="title">{title}</div>
      </div>
    );
  };

  return (
    <div className="Header">
      <div className="Header-wrapper">{renderContent(pathname, HeaderConfig)}</div>
    </div>
  );
};

const mapStateToProps = (state: any) => state;
export default connect(mapStateToProps)(Header);
