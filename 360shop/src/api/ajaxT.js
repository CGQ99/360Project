// 二次封装axios
// 引入axios
import axios from "axios";
// 引入Nprogress （带进度条效果的插件）
import Nprogress from "nprogress";
// 引用该插件的样式
import "nprogress/nprogress.css";
// 设置请求的超时时间和根路径
const ajax = axios.create({
  // 设置根路径
  baseURL: "/aaa",
  // 设置请求1的超时时间
  timeOut: 20000
});
// 设置请求拦截器
ajax.interceptors.request.use(config => {
  // 发送请求应该先显示进度条
  Nprogress.start();

  return config;
});
// 设置响应拦截器
ajax.interceptors.response.use(
  response => {
    // 拿到数据就隐藏进度条
    Nprogress.done();
    // 我要的是data数据
    return response;
  },
  error => {
    // 失败也要隐藏进度条
    Nprogress.done();
    // 请求的时候出现的错误信息

    // 返回中断信息
    return Promise.reject(error);
  }
);
export default ajax;
