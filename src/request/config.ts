const DOMAIN_CONFIG = {
  // 开发
  dev: {
    common: '',
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

if (process.env.UMI_ENV === 'testenv') {
  domain = DOMAIN_CONFIG.test;
}

if (process.env.UMI_ENV === 'prod') {
  domain = DOMAIN_CONFIG.prod;
}

export const baseURL = `${domain.common}/api`;
