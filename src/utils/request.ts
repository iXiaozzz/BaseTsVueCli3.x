import axios from "axios";
import Vue from "vue";
import router from "../router";
import { Toast } from "vant";
import utils from "./index";
// import ExceptionHandle from './Exception'
import qs from "qs";
Vue.use(Toast);

/* 防止重复提交，利用axios的cancelToken */
// let pending: any[] = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
// const CancelToken: any = axios.CancelToken;

/**
 * 封装请求方法
 * @param  {url}  请求url
 * @param  {data}  请求参数
 * @param  {method}  请求方式
 */
export default function getAjax(
  url: string,
  data: object = {},
  method: string = "post",
  contentType: boolean = false
) {
  return new Promise(function(resolve: any, reject: any): void {
    const options: object = {
      url,
      method
    };
    options["headers"] = {
      platform: "H5",
      requestAim: "aiHuaGuoKai",
      Authorization: utils.getLocalstorageStore("Authorization") || "",
      clientKey: utils.getLocalstorageStore("clientKey") || "",
      path: "/" + window.location.hash || ""
    };
    if (method.toLowerCase() === "get") {
      options["params"] = data;
    } else {
      if (contentType) {
        options["data"] = data;
      } else {
        options["data"] = qs.stringify(data);
      }
    }
    axios(options)
      .then(res => {
        let result = res.data;
        if (Number(result.code) === 0) {
          resolve(result);
        } else if (Number(result.code) === 501) {
          router.replace("/login");
        } else if (Number(result.code) === 502) {
          router.replace("/login");
          // if (result.data.wxurl) {
          //   window.location = result.data.wxurl
          // }
        } else if (Number(result.code) === 2) {
          if (result.msg) {
            Toast(result.msg);
            resolve(result);
          }
        } else {
          if (result.msg) {
            Toast(result.msg);
          }
        }
      })
      .catch(error => {
        reject(error);
        Toast(error);
        // ExceptionHandle(error, this)
      });
  }).catch(error => {
    // ExceptionHandle(error, this)
    Toast("服务器出问题啦！");
  });
}
