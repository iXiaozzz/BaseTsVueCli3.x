let CryptoJS = require('crypto-js')

const Utils = {
  getStore(key: string): string {
    let _value: string | null = sessionStorage.getItem(key)
    _value = _value === null ? '' : _value
    return _value
  },
  setStore(key: string, value: string | null) {
    if (key && value !== '') {
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      sessionStorage.setItem(key, value)
    }
  },
  removeStore(key: string) {
    if (this.getStore(key)) {
      sessionStorage.removeItem(key)
    }
  },
  getLocalstorageStore(key: string): string {
    let _value = window.localStorage.getItem(key)
    _value = _value === null ? '' : _value
    return _value
  },
  setLocalstorageStore(key: string, value: string | object) {
    if (key && value !== '') {
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      window.localStorage.setItem(key, value)
    }
  },
  removeLocalstorageStore(key: string) {
    if (this.getStore(key)) {
      window.localStorage.removeItem(key)
    }
  },
  getCookie(name: string): string {
    if (!document.cookie.length) return ''
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)

    if (Array.isArray(arr)) {
      return unescape(arr[2])
    } else {
      return ''
    }
  },
  setCookie(name: string, value: string, days: number = 30) {
    let exp = new Date()
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toUTCString()
  },
  delCookie(name: string) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = Utils.getCookie(name)
    if (cval != null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toUTCString()
    }
  },
  padStart(sourceString: string): string {
    if (typeof sourceString === 'undefined') return ''
    let numberValue: number = +sourceString // 将sting类型转化为number类型
    return (numberValue - 10) < 0 ? '0' + sourceString : sourceString
  },
  encryptByDES(message: string): string {
    if (!message) return ''
    let key: string = '29582849'
    let iv: string = '98626432'
    key = CryptoJS.MD5(key)
    iv = CryptoJS.enc.Utf8.parse(iv)
    let encrypted = CryptoJS.DES.encrypt(message, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
  },
  generateDateByString(str: string): object {
    let result: object = {}
    if (str && typeof str === 'string') {
      str = str.replace(/-/g, '/') // 苹果safari, - 穿件日期NAN.
      result = new Date(str)
    } else {
      result = new Date()
    }
    return result
  },
  getQueryString(name: string): string | null {
    let str: string = `(^|&)${name}=([^&]*)(&|$)`
    let reg: any = new RegExp(str, 'i')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURI(r[2])
    return null
  },
  setBodyScroll(flag: boolean) {
    let body = document.getElementsByTagName('body')[0]
    if (flag) {
      body.style.position = 'fixed'
    } else {
      body.style.position = 'initial'
    }
  },
  // 获取屏幕宽度
  getWindowWidth(): number {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  },
  // 获取屏幕高度
  getWindowHeight(): number {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  },
  // 处理async/await的异常
  async errorCaptured(asyncFunc: any) {
    try {
      let res: any = await asyncFunc()
      return [null, res]
    } catch (e) {
      return [e, null]
    }
  },
  debounce(func: any, wait: number = 50, immediate: boolean = false): any {
    let timer: any, context: any, args: any
    let _this: any = this
    const later = () => setTimeout(() => {
      timer = null
      if (!immediate) {
        func.apply(context, args)
        context = args = null
      }
    }, wait)
    return function (...params) {
      // 如果没有创建延迟执行函数（later），就创建一个
      if (!timer) {
        timer = later()
        // 如果是立即执行，调用函数
        // 否则缓存参数和调用上下文
        if (immediate) {
          func.apply(_this, params)
        } else {
          context = _this
          args = params
        }
        // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
        // 这样做延迟函数会重新计时
      } else {
        clearTimeout(timer)
        timer = later()
      }
    }
  },
  // 去掉字符串左右空格
  trim(s: string): string {
    return s.replace(/(^\s*)|(\s*$)/g, '')
  },
  // 将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
  changeTimeStr(timeStr: string): string {
    return timeStr.replace(/-/g, '/')
  }
}

export default Utils
