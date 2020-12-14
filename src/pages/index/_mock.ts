import { OrderListItemType } from '@/models/home';

const orderListData: OrderListItemType[] = [];

for (let i = 1; i <= 20; i += 1) {
  orderListData.push({
    id: i,
    commissionAmount: 40,
    avatarUrl:
      'https://dev-res-cn.oss-cn-shenzhen.aliyuncs.com/next-maker/cms/9174d350-35fe-11eb-912f-c9d067017d00.jpg',
    nickName: `昵称 ${i}`,
    tagList: ['简单任务'],
    title: `这里是标题 ${i}`,
  });
}

const orderListFn = (req: any, res: any) => {
  console.log(req.body);
  const orderList = {
    dataList: orderListData,
    pageNo: 1,
    pageSize: 10,
    totalCount: orderListData.length,
    totalPage: 3,
  };
  res.json({ code: 0, data: orderList, messages: 'ok' });
};

export default {
  'POST /order/list': orderListFn,
};
