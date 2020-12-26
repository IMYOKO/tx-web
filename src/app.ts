import 'antd-mobile/dist/antd-mobile.css';
import '@/assets/styles/common.less';
export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
