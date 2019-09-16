import axios from 'axios';
// import { host } from './host';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// import { message } from 'antd';
import router from 'umi/router';
// const isDev = process.env.NODE_ENV === 'development';

let cancel,
  promiseArr = {};
const CancelToken = axios.CancelToken;
//请求拦截器
axios.interceptors.request.use(
  config => {
    NProgress.start();
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
      promiseArr[config.url]('cancel action');
      promiseArr[config.url] = cancel;
    } else {
      promiseArr[config.url] = cancel;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

//响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    NProgress.done();
    if (response.data[0] === '999999') {
      router.push({ pathname: '/error' });
    }
    return response.data;
  },
  err => {
    let msg = err.message;
    if (msg !== 'cancel action') {
      router.push({ pathname: '/error' });
    }
    // if (err && err.response) {
    //   switch (err.response.status) {
    //     case 400:
    //       err.message = '错误请求'
    //       break;
    //     case 401:
    //       err.message = '未授权，请重新登录'
    //       break;
    //     case 403:
    //       err.message = '拒绝访问'
    //       break;
    //     case 404:
    //       err.message = '请求错误,未找到该资源'
    //       break;
    //     case 405:
    //       err.message = '请求方法未允许'
    //       break;
    //     case 408:
    //       err.message = '请求超时'
    //       break;
    //     case 500:
    //       err.message = '服务器端出错'
    //       break;
    //     case 501:
    //       err.message = '网络未实现'
    //       break;
    //     case 502:
    //       err.message = '网络错误'
    //       break;
    //     case 503:
    //       err.message = '服务不可用'
    //       break;
    //     case 504:
    //       err.message = '网络超时'
    //       break;
    //     case 505:
    //       err.message = 'http版本不支持该请求'
    //       break;
    //     default:
    //       err.message = `连接错误${err.response.status}`
    //   }
    // } else {
    //   err.message = "连接到服务器失败"
    // }
    // message.err(err.message)
    return Promise.resolve(err);
  },
);

//HpbExploreTestNet HpbExplore HpbScan HpbFaucet
// axios.defaults.baseURL = '/HpbScan'; // 生产环境
// axios.defaults.baseURL = '/TestNetHpbScan';  // 测试环境
//设置默认请求头
const isDev = process.env.UMI_ENV === 'test';
axios.defaults.baseURL = isDev ? '/TestNetHpbScan' : '/HpbScan';
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
};
axios.defaults.timeout = 80000;

export default {
  //get请求
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c;
        }),
      }).then(res => {
        resolve(res);
      });
    });
  },
  //post请求
  post(url, param, baseURL) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c;
        }),
      }).then(res => {
        resolve(res);
      });
    });
  },
};
