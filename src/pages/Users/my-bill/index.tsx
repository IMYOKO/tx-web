import React, { useEffect, useState } from 'react';
import { connect, useHistory, useDispatch } from 'dva';
import { PageActionBaseProps, RootState } from '@/types/common';
import { BillItem, BillListParams, UserInfoType } from '@/models/user';
import { PUBLIC_STATUS } from '@/types/enum';
import FollowModal, { FollowModalProps } from './FollowModal';
import { DatePicker, Toast } from 'antd-mobile';
import { format } from 'date-fns';
import './index.less';

interface MyBillPrpos extends PageActionBaseProps {
  userInfo: Partial<UserInfoType>;
  billList: any[];
}

const MyBill: React.FC<MyBillPrpos> = props => {
  const [visible, setVisible] = useState<boolean>(false);
  const today = new Date();
  const initEndDate = Math.floor(today.getTime() / 1000);
  const initStartDate = initEndDate - 24 * 60 * 60;
  const [endDate, setEndDate] = useState<number>(initEndDate);
  const [startDate, setStartDate] = useState<number>(initStartDate);
  const { userInfo, billList } = props;
  const { balance = 0, publicStatus } = userInfo;
  const history = useHistory();
  const dispatch = useDispatch();
  console.log({ billList });

  const showFollowModal = () => {
    setVisible(true);
  };

  const hideFollowModal = () => {
    setVisible(false);
  };

  const getBillList = (param: BillListParams) => {
    dispatch({
      type: 'USER/getBillList',
      payload: {
        ...param,
      },
    });
  };

  useEffect(() => {
    getBillList({
      pageNo: 1,
      pageSize: 10,
      endDate,
      startDate,
    });
  }, []);

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

  const search = () => {
    if (startDate >= endDate) {
      Toast.info('开始时间不能大于结束时间');
      return;
    }
  };

  const dateChange = (date: Date) => {
    return Math.floor(new Date(date).getTime() / 1000);
  };

  const starDateChange = (date: Date) => {
    setStartDate(dateChange(date));
  };

  const endDateChange = (date: Date) => {
    setEndDate(dateChange(date));
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
        <div className="my-bill-seach">
          <div className="data-wrapper">
            <div className="data-content">
              <div className="date-select">
                <DatePicker
                  mode="date"
                  title="开始日期"
                  extra=""
                  key="startDate"
                  maxDate={today}
                  value={new Date(startDate * 1000)}
                  onChange={starDateChange}
                >
                  <div className="date-item">
                    <h5>开始日期</h5>
                    <h3>{format(startDate * 1000, 'yyyy-MM-dd')}</h3>
                  </div>
                </DatePicker>
              </div>
              <div className="date-select">
                <DatePicker
                  mode="date"
                  title="结束日期"
                  extra=""
                  key="endDate"
                  maxDate={today}
                  value={new Date(endDate * 1000)}
                  onChange={endDateChange}
                >
                  <div className="date-item">
                    <h5>结束日期</h5>
                    <h3>{format(endDate * 1000, 'yyyy-MM-dd')}</h3>
                  </div>
                </DatePicker>
              </div>
            </div>
            <div className="sreach-button" onClick={search}>
              筛选
            </div>
          </div>
        </div>
        <ul className="my-bill-list-wrapper">
          {billList.map(({ billNo, createTime, amount, billTypeText }: BillItem) => (
            <li key={billNo}>
              <div className="my-bill-item">
                <div className="my-bill-item-box time">
                  <span>任务号：{billNo}</span>
                  <span>{createTime}</span>
                </div>
                <div className="my-bill-item-box money">
                  <span>{billTypeText}</span>
                  <span>+{amount}</span>
                </div>
              </div>
            </li>
          ))}
          <li>
            <div className="my-bill-item">
              <div className="my-bill-item-box time">
                <span>任务号：530851934347346</span>
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
    USER: { userInfo, billList },
  } = state;
  return { userInfo, billList };
};

export default connect(mapStateToProps)(MyBill);
