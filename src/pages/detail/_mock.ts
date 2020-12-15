const getOrderDetail = (_: any, res: any) => {
  const orderItem = {
    id: 1,
    commissionAmount: 40,
    avatarUrl:
      'https://dev-res-cn.oss-cn-shenzhen.aliyuncs.com/next-maker/cms/9174d350-35fe-11eb-912f-c9d067017d00.jpg',
    nickName: `昵称`,
    tagList: ['简单任务'],
    title: `这里是标题`,
    count: 50,
    createTime: +new Date(),
    description: 'description',
    descriptionUrlList: [],
    principalAmount: 100,
    remainingCount: 2,
    status: 'status',
    statusText: 'statusText',
    taskClaim: 'taskClaim',
    taskClaimUrlList: [],
  };
  res.json({ code: 0, data: orderItem, messages: 'ok' });
};

export default {
  'POST /order/detail': getOrderDetail,
};
