import axios from 'axios'
import {getToken} from './auth'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})
service.defaults.baseURL = 'http://wx.live.com/'
// service.defaults.baseURL = '/api/'
// request拦截器
service.interceptors.request.use(config => {
  config.headers['token'] = getToken()   // 让每个请求携带自定义token 请根据实际情况自行修改
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
 
// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
