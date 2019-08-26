import axios, { AxiosResponse } from 'axios'
import Vue from 'vue'
import router from '../router'
import { Toast } from 'vant'
import utils from './index'
// import ExceptionHandle from './Exception'
import qs from 'qs'
Vue.use(Toast)
// 使用枚举定义状态码
enum HttpCode { success = 0 }
/**
  * 封装请求方法
  * @param  {url}  请求url
  * @param  {data}  请求参数
  * @param  {method}  请求方式
  */
export default function getAjax(url: string, data: object = {}, method: string = 'post', contentType: boolean = false) {

  return new Promise(function (resolve: any, reject: any): void {
    const options: object = {
      url,
      method
    }
    options['headers'] = {
      'platform': 'H5',
      'requestAim': 'aiHuaGuoKai',
      'Authorization': utils.getLocalstorageStore('Authorization') || '',
      'clientKey': utils.getLocalstorageStore('clientKey') || '',
      'path': '/' + window.location.hash || ''
    }
    if (method.toLowerCase() === 'get') {
      options['params'] = data
    } else {
      if (contentType) {
        options['data'] = data
      } else {
        options['data'] = qs.stringify(data)
      }
    }
    axios(options).then((res: AxiosResponse<any>) => {
      let result: Array<any> = res.data
      let code: number = result['code'] ? Number(result['code']) : -1
      switch (code) {
        case HttpCode.success:
          resolve(result);
          break;
        case 2:
          if (result['msg']) {
            Toast(result['msg']);
            resolve(result)
          };
          break;
        case 501:
          router.replace('/login');
          break;
        case 502:
          router.replace('/login');
          break;
        default:
          result['msg'] && Toast(result['msg']);
          break;
      }
    }).catch(error => {
      reject(error)
      Toast(error)
      // ExceptionHandle(error, this)
    })
  }).catch(error => {
    // ExceptionHandle(error, this)
    Toast('服务器出问题啦！')
  })
}
