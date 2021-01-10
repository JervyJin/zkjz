import axios from 'axios';
import qs from 'qs';
import configUrl from './config';
import router from '../router';

// 创建axios实例
const http = axios.create({
  baseURL: configUrl.api_base,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'  //默认post请求格式
    // 'Content-Type': 'application/json',
  },
  transformRequest: [
    function(data, headers) {
      data = data || {}
      data = qs.stringify(data)
      return data
    }
  ]
})

// request拦截器
http.interceptors.request.use(config => {
  config.data = config.data ? config.data : {}
  if (config.method === 'post' && axios.defaults.headers.post['Content-Type'] === 'multipart/form-data;') {
    return config
  }
  return config
  // config.headers["authorization"] = store.state.token; //把token添加到请求头每次请求接口时候带上
  // if (router.currentRoute && router.currentRoute.meta.requiresAuth) {
  //   if (getToken() === '') {
  //     return Promise.reject('请登录后操作')
  //   } else {
  //     return config
  //   }
  // } else {
  //   return config
  // }
  
})

// respone拦截器
http.interceptors.response.use(
  response => {
    let data = response.data

    let msg = data.message || ''
    if (data.code == 401) {
      // 账号禁用
      router.replace({ name: 'login' })
      return Promise.reject(new Error(msg))
    } else if (data.code == 403) {
      // 登录失效 需重新登录
      router.replace({ name: 'login' })
      return Promise.reject(new Error(msg))
    } else if (data.code == 400) {
      return Promise.reject(new Error(msg))
    }
    return data
  },
  error => {
    return Promise.reject(error)
  }
)

export default http

/* 对axios请求进行二次封装 */
/* export function fetchData (url, data = {}, method = 'post') {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      method
    }
    if (method.toLowerCase() === 'get') {
      options.params = data
    } else {
      options.data = data
    };

    http(options)
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
        console.error(error)
      })
  })
} */
