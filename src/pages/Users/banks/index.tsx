import { PageActionBaseProps, RootState } from '@/types/common';
import { connect, useDispatch, useHistory } from 'dva';
import { isEmpty } from 'lodash-es';
import React, { useEffect } from 'react';
import './index.less';

interface BanksPagePrpos extends PageActionBaseProps {
  bankList: any[];
}

const Banks: React.FC<BanksPagePrpos> = ({ bankList }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'USER/getBankList',
      payload: {
        pageNo: 1,
        pageSize: 10,
      },
    });
  }, []);

  const goAddBank = () => {
    history.push('/add-bank');
  };

  const renderList = () => {
    let content;
    if (isEmpty(bankList)) {
      content = (
        <li>
          <div className="banks-item add-item" onClick={goAddBank}>
            <div className="icon-add"></div>
            <div className="add-title">添加银行卡</div>
            <div className="more"></div>
          </div>
        </li>
      );
    } else {
      content = bankList.map((item, index) => (
        <li key={index}>
          <div className="banks-item bank-item-content">
            <div className="bank-name-wrapper">
              <div className="bank-img"></div>
              <div className="bank-name">
                <h3>{item.name}</h3>
                <p>{item.type}</p>
              </div>
            </div>
            <div className="bank-num">
              <h1>{item.number}</h1>
            </div>
          </div>
        </li>
      ));
    }
    return content;
  };

  return (
    <div className="banks-page">
      <div className="banks-wrapper">
        <ul className="banks-list">{renderList()}</ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const {
    USER: { bankList },
  } = state;
  return { bankList };
};

export default connect(mapStateToProps)(Banks);
