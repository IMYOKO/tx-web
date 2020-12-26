// 判断手机号
export const isPhone = (phone: string): boolean => {
  const reg = /^([1][3,4,5,6,7,8,9])\d{9}$/;
  return reg.test(phone);
};

// 密码长度为6-18位数字字母下划线
export const isPassword = (password: string): boolean => {
  const reg = /^([a-zA-Z]|\d)\w{5,17}$/;
  return reg.test(password);
};
