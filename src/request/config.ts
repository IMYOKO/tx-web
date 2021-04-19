const DOMAIN_CONFIG = {
  // mock
  mock: {
    common: '',
  },
  // 开发
  dev: {
    common: 'http://shengcai68.com/api',
  },
  // 测试
  test: {
    common: 'http://shengcai68.com/api',
  },
  // 正式
  prod: {
    common: 'http://shengcai68.com/api',
  },
};

let domain = DOMAIN_CONFIG.prod;
console.log('ENV: ', process.env.UMI_ENV);

if (process.env.UMI_ENV === 'mock') {
  domain = DOMAIN_CONFIG.mock;
}

if (process.env.UMI_ENV === 'dev') {
  domain = DOMAIN_CONFIG.dev;
}

if (process.env.UMI_ENV === '_test') {
  domain = DOMAIN_CONFIG.test;
}

export const baseURL = `${domain.common}`;
