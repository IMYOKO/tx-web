const DOMAIN_CONFIG = {
  // mock
  mock: {
    common: '',
  },
  // 开发
  dev: {
    common: 'http://81.71.31.103:8080',
  },
  // 测试
  test: {
    common: '',
  },
  // 正式
  prod: {
    common: '',
  },
};

let domain = DOMAIN_CONFIG.dev;
console.log('ENV: ', process.env.UMI_ENV);

if (process.env.UMI_ENV === 'mock') {
  domain = DOMAIN_CONFIG.mock;
}

if (process.env.UMI_ENV === 'test') {
  domain = DOMAIN_CONFIG.test;
}

if (process.env.UMI_ENV === 'prod') {
  domain = DOMAIN_CONFIG.prod;
}

export const baseURL = `${domain.common}`;
