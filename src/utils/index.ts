import { FileDataType } from '@/types/common';

// 判断手机号
export const isPhone = (phone: string): boolean => {
  const reg = /^([1][3,4,5,6,7,8,9])\d{9}$/;
  return reg.test(phone);
};

// 判断身份证号
export const isIDCard = (IDCard: string): boolean => {
  const reg = /^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/;
  return reg.test(IDCard);
};

// 判断银行卡 13-19位数字
export const isBankCard = (bankNumber: string): boolean => {
  const reg = /^([1-9]{1})(\d{11}|\d{15}|\d{16}|\d{17}|\d{18})$/;
  return reg.test(bankNumber);
};

// 密码长度为6-18位数字字母下划线
export const isPassword = (password: string): boolean => {
  const reg = /^([a-zA-Z]|\d)\w{5,17}$/;
  return reg.test(password);
};

// 判断交易密码 6位数字
export const isTradePassword = (password: string): boolean => {
  const reg = /^\d{6}$/;
  return reg.test(password);
};

// file转base64
export const fileByBase64 = (file: File, callback?: (result: FileDataType) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = e => {
    const base64String = (e.target?.result || '') as string;
    const suffix = file.name.split('.').pop();
    if (base64String && suffix) {
      callback && callback({ base64String, suffix });
    }
  };
};
