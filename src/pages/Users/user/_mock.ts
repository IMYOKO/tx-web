const getUserInfo = (_: any, res: any) => {
  const userInfo = {
    userId: 1,
    avatarUrl:
      'https://dev-res-cn.oss-cn-shenzhen.aliyuncs.com/next-maker/cms/9174d350-35fe-11eb-912f-c9d067017d00.jpg',
    nickName: `YOKO`,
    balance: 50,
    hasCommissionAmount: 20,
    todayIncome: 30,
  };
  res.json({ code: 0, data: userInfo, messages: 'ok' });
};

export default {
  'POST /user/info': getUserInfo,
};
