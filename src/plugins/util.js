// import cryptoJS from 'crypto-js'
import GLB_CONFIG from '@/plugins/glb-constant'
import router from '@/router'
import store from '@/store'
// import { logout } from '@/apis/base/index'
import { ElMessage, ElMessageBox } from 'element-plus'
import { i18n } from '@/plugins/lang'

export default {
  logoutMessageInstance: null,
  // 加密
  // encrypt(word, keyStr) {
  //   keyStr = keyStr || 'fghjklkbshikjbha' // 判断是否存在ksy，不存在就用定义好的key
  //   const key = cryptoJS.enc.Utf8.parse(keyStr)
  //   const srcs = cryptoJS.enc.Utf8.parse(word)
  //   const encrypted = cryptoJS.AES.encrypt(srcs, key, {
  //     mode: cryptoJS.mode.ECB,
  //     padding: cryptoJS.pad.Pkcs7
  //   })
  //   return encrypted.toString()
  // },
  // // 解密
  // decrypt(word, keyStr) {
  //   keyStr = keyStr || 'fghjklkbshikjbha'
  //   const key = cryptoJS.enc.Utf8.parse(keyStr)
  //   const decrypt = cryptoJS.AES.decrypt(word, key, {
  //     mode: cryptoJS.mode.ECB,
  //     padding: cryptoJS.pad.Pkcs7
  //   })
  //   return cryptoJS.enc.Utf8.stringify(decrypt).toString()
  // },
  logout() {
    if (GLB_CONFIG.usingCase) {
      const token = sessionStorage.getItem(GLB_CONFIG.tokenKey)
      sessionStorage.clear()
      window.location.replace(
        GLB_CONFIG.devUrl.serviceSiteRootUrl + '/logout?token=' + token
      )
    } else {
      // logout().then(() => {
      //   this.toLogin()
      // })
    }
  },
  toLogin() {
    store.dispatch('clearLoginInfo')
    sessionStorage.clear()
    if (GLB_CONFIG.usingCase) {
      // router.replace(GLB_CONFIG.devUrl.loginUrl)
      window.location.replace(GLB_CONFIG.devUrl.loginUrl)
    } else {
      router.replace(GLB_CONFIG.devUrl.loginUrl)
    }
    this.logoutMessageInstance = null
  },
  loadingShow() {
    let dom = document.querySelector('.ltw-loading-mask')
    if (!dom) {
      dom = document.createElement('div')
      dom.innerHTML = `                    <div>
                        <div class="ltw-loading-spinner">
                            <i class="el-icon-loading"></i>
                            <p class="ltw-loading-text">加载中...</p>
                        </div>
                    </div>`
      dom.setAttribute('class', 'ltw-loading-mask')
      const parentDom = document.querySelector('#ltwMainContainer')
      if (parentDom) {
        parentDom.classList.add('el-loading-parent--relative')
        parentDom.append(dom)
      }
    }
    if (dom) {
      dom.style.display = 'block'
    }
  },
  loadingHide() {
    const dom = document.querySelector('.ltw-loading-mask')
    if (dom) {
      dom.style.display = 'none'
    }
  }
}

export const dateUtils = {
  formatDateNormal(date) {
    const Y = date.getFullYear()
    const M = date.getMonth() + 1
    const D = date.getDate()
    const times = Y + (M < 10 ? '-0' : '-') + M + (D < 10 ? '-0' : '-') + D
    return times
  },
  getZeroDate(date) {
    if (!date) {
      date = new Date()
    }
    let time = this.formatDateNormal(date)
    time += ' 00:00:00'
    return new Date(time)
  },
  // 日期格式化
  parseTime(time, pattern) {
    if (arguments.length === 0 || !time) {
      return null
    }
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
        time = parseInt(time)
      } else if (typeof time === 'string') {
        time = time.replace(new RegExp(/-/gm), '/')
      }
      if (typeof time === 'number' && time.toString().length === 10) {
        time = time * 1000
      }
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value]
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  },
  dateCalculation(second) {
    // 返回天、时、分
    if (second > 0) {
      var day = 0
      var hour = 0
      var minute = 0
      var data = {}
      minute = Math.floor(second / 60)
      if (parseInt(minute) > 60) {
        hour = parseInt(minute / 60)
        minute %= 60 // 算出有多分钟
      }
      if (parseInt(hour) > 24) {
        day = parseInt(hour / 24)
        hour %= 24 // 算出有多分钟
      }
      data.d = day
      data.h = hour
      data.m = minute
      return data
    }
  }
}

// 手机或座机校验
export const validatePhoneOrTel = (rule, value, callback) => {
  if (!value && value !== 0) {
    callback()
  }
  if (
    !/^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/.test(
      value
    )
  ) {
    callback(new Error('The phone number format is incorrect'))
  } else {
    callback()
  }
}
// 校验正整数
export const isIntegerNotMust = (rule, value, callback) => {
  if (!value) {
    callback()
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error(i18n.global.t('请输入正整数')))
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/
      const rsCheck = re.test(value)
      if (!rsCheck) {
        callback(new Error(i18n.global.t('请输入正整数')))
      } else {
        callback()
      }
    }
  }, 300)
}

// 手机或座机校验
export const getUuid = () => {
  var temp_url = URL.createObjectURL(new Blob())
  var uuid = temp_url.toString() // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
  URL.revokeObjectURL(temp_url)
  return uuid.substr(uuid.lastIndexOf('/') + 1)
}
export const specialChar = '#%'
export const expChar = '[`~' + specialChar + ']'
export const specialflag = new RegExp(expChar)
export const spaceFlag = new RegExp(/\s/)
// 过滤特殊字符
export const validateSpecialChar = (rule, value, callback) => {
  if (!value && value !== 0) {
    callback()
  }
  if (specialflag.test(value) || spaceFlag.test(value)) {
    if (specialflag.test(value)) {
      callback(
        new Error(
          i18n.global.t('请勿输入包含') +
            specialChar +
            i18n.global.t('的特殊字符')
        )
      )
    }
    if (spaceFlag.test(value)) {
      const str = value && value.replace(/\s/g, '')
      if (!str) {
        callback(new Error(i18n.global.t('请勿输入包含空格的特殊字符')))
      }
    }
    // callback(new Error('The phone number format is incorrect'))
  } else {
    callback()
  }
}
// 获取本地语言
// 设置语言 选项 en | zh
export const getLocale = () => {
  const lang =
    typeof window.localStorage !== 'undefined'
      ? window.localStorage.getItem(localeKey) || 'zh'
      : 'zh'
  return lang
}

// window.localStorage 存储key
export const localeKey = 'locale'
export const setLocale = (lang, realReload = true, callback = () => {}) => {
  if (getLocale() !== lang) {
    if (typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem(localeKey, lang || '')
    }

    if (realReload) {
      window.location.reload()
    } else {
      setHtmlLang(lang)

      if (typeof callback === 'function') {
        callback()
      }
    }
  }
}
export const setHtmlLang = lang => {
  /**
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html').setAttribute('lang', lang)
}
/* 一维数组转换为二维数组 */
export const transferArr = (arr, num) => {
  const transferArr = []
  for (let i = 0, len = Math.ceil(arr.length / num); i < len; i++) {
    const item = []
    for (let j = 0; j < num; j++) {
      if (arr[i * num + j]) {
        item.push(arr[i * num + j])
      }
    }
    transferArr.push(item)
  }
  return transferArr
}
/* 防抖 */
// export const debounce = (f, wait) => {
//   let timer
//   return (...args) => {
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       f(...args)
//     }, wait)
//   }
// }
export const debounce = (func, wait, immediate) => {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
/* 节流 */
export const throttle = (f, wait) => {
  let timer
  return (...args) => {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      f(...args)
      timer = null
    }, wait)
  }
}
/* 生成txt文件下载 */
export const downloadTxt = (filename, text) => {
  var pom = document.createElement('a')
  pom.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  )
  pom.setAttribute('download', filename)
  if (document.createEvent) {
    var event = document.createEvent('MouseEvents')
    event.initEvent('click', true, true)
    pom.dispatchEvent(event)
  } else {
    pom.click()
  }
}
/* 通用提示框 */
export const showToast = (message, type, showClose) => {
  ElMessage({
    message: i18n.global.t(message) || '',
    type: type || 'success',
    showClose: showClose || false
  })
}
/* 通用确认框 */
export const showConfirmToast = config => {
  return new Promise((resolve, reject) => {
    ElMessageBox({
      title: i18n.global.t(config.title || '提示'),
      message: i18n.global.t(config.message),
      type: config.type || 'warning',
      showCancelButton: config.showCancelButton || true,
      confirmButtonText: i18n.global.t(config.confirmButtonText || '确认'),
      cancelButtonText: i18n.global.t(config.cancelButtonText || '取消'),
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          resolve(action)
          done()
        } else {
          showToast('操作已取消', 'info')
          reject(action)
          done()
        }
      }
    })
  })
}
export const copyText = (text = '') => {
  try {
    return navigator.clipboard
      .writeText(text)
      .then(() => {
        return Promise.resolve()
      })
      .catch(err => {
        return Promise.reject(err)
      })
  } catch (e) {
    const input = document.createElement('input')
    input.style.position = 'fixed'
    input.style.top = '-10000px'
    input.style.zIndex = '-999'
    document.body.appendChild(input)
    input.value = text
    input.focus()
    input.select()
    try {
      const result = document.execCommand('copy')
      document.body.removeChild(input)
      if (!result || result === 'unsuccessful') {
        return Promise.reject('复制失败')
      } else {
        return Promise.resolve()
      }
    } catch (e) {
      document.body.removeChild(input)
      return Promise.reject(
        '当前浏览器不支持复制功能，请检查更新或更换其他浏览器操作'
      )
    }
  }
}
export const formatLineBarCharts = data => {
  const legend = []
  const seriesData = []
  data.forEach((value, index) => {
    const item = []
    value.data.forEach(val => {
      if (!index) {
        legend.push(val.times)
      }
      item.push(val.value)
    })
    seriesData.push({
      data: item
    })
  })
  return { legend, seriesData }
}
