import React, { useState } from 'react';
import { connect, useHistory } from 'dva';
import { PageActionBaseProps } from '@/types/common';
import { UserInfoType } from '@/models/user';
import { PUBLIC_STATUS } from '@/types/enum';
import './index.less';
import FollowModal, { FollowModalProps } from './FollowModal';

interface MyBillPrpos extends PageActionBaseProps {
  userInfo: Partial<UserInfoType>;
}

const MyBill: React.FC<MyBillPrpos> = props => {
  const [visible, setVisible] = useState<boolean>(false);
  const { userInfo } = props;
  const { balance = 0, publicStatus } = userInfo;
  const history = useHistory();

  const showFollowModal = () => {
    setVisible(true);
  };

  const hideFollowModal = () => {
    setVisible(false);
  };

  const goWithdraw = () => {
    if (publicStatus === PUBLIC_STATUS.yes) {
      history.push('/withdraw');
    } else {
      showFollowModal();
    }
  };

  const goFollowUs = () => {
    history.push('/follow-us');
  };

  const followModalProps: FollowModalProps = {
    visible,
    hide: hideFollowModal,
    onOk: () => {
      hideFollowModal();
      goFollowUs();
    },
  };

  return (
    <div className="my-bill-page">
      {/* 我的余额 start */}
      <div className="my-balance-wrapper">
        <div className="title">我的余额</div>
        <div className="balance">¥ {balance}</div>
        <div className="btn-withdraw-wrapper">
          <div onClick={goWithdraw} className="btn-withdraw">
            提现
          </div>
        </div>
      </div>
      {/* 我的余额 end */}

      {/* 账单列表 start */}
      <div className="my-bill-wrapper">
        <div className="my-bill-seach">sdsds</div>
        <ul className="my-bill-list-wrapper">
          <li>
            <div className="my-bill-item">
              <div className="my-bill-item-box time">
                <span>稿件号：530851934347346</span>
                <span>2020-09-16 12:32:23</span>
              </div>
              <div className="my-bill-item-box money">
                <span>收入</span>
                <span>+8</span>
              </div>
            </div>
          </li>
          <li>
            <div className="my-bill-item">
              <div className="my-bill-item-box time">
                <span>稿件号：530851934347346</span>
                <span>2020-09-16 12:32:23</span>
              </div>
              <div className="my-bill-item-box money">
                <span>收入</span>
                <span>+8</span>
              </div>
            </div>
          </li>
          <li>
            <div className="my-bill-item">
              <div className="my-bill-item-box time">
                <span>稿件号：530851934347346</span>
                <span>2020-09-16 12:32:23</span>
              </div>
              <div className="my-bill-item-box money">
                <span>收入</span>
                <span>+8</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      {/* 账单列表 end */}

      <FollowModal {...followModalProps} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const {
    USER: { userInfo },
  } = state;
  return { userInfo };
};

export default connect(mapStateToProps)(MyBill);
