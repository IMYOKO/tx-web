import React from 'react';
import { useHistory, useLocation } from 'dva';
import { IRoute } from 'umi-types';
import './index.less';

const Header: React.FC<IRoute> = props => {
  const {
    route: { routes = [] },
  } = props;

  const history = useHistory();
  const { pathname } = useLocation();

  const route: Partial<IRoute> = routes.find((r: IRoute) => r.path === pathname) || {};
  const { title, hideBackIcon } = route;

  const back = () => {
    history.goBack();
  };

  return (
    <div className="Header">
      <div className="Header-wrapper">
        <div className="Header-content">
          <div className="action-wrapper">
            <div className="left-wrapper">
              {!hideBackIcon && <div className="back" onClick={back}></div>}
            </div>
          </div>
          <div className="title">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
