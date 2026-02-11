import axios from 'axios'
import GLB_CONFIG from './glb-constant'
import { ElMessage } from 'element-plus'
import util from '@/plugins/util'
// 本地开发环境
axios.defaults.baseURL = GLB_CONFIG.devUrl.serviceSiteRootUrl
axios.defaults.withCredentials = true
// axios.defaults.timeout = 20 * 1000
axios.interceptors.request.use(
  config => {
    if (!config.unloading) {

      util.loadingShow()

    }
    // util.loadingShow()
    if (config.params) {
      // for (let val in config.params) {
      // config.params[val] = JsEncrypt.encrypt(val)
      // }
    }
    if (config.data) {
      // for (let val in config.data) {
      // config.data[val] = JsEncrypt.encrypt(val)
      // }
    }
    if(!config.responseType){
      config.responseType = 'json'
    }

    config.headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest'
    }
    if (checkAuth(config.url)) {
      return config
    }
    const token = sessionStorage.getItem(GLB_CONFIG.tokenKey)
    if (!token) {
      warnAndToLogin()
      return
    }
    config.headers.token = token
    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

function checkAuth (url) {
  if (GLB_CONFIG.noAuthServerUrl && GLB_CONFIG.noAuthServerUrl.length > 0) {
    for (let i = 0; i < GLB_CONFIG.noAuthServerUrl.length; i++) {
      if (url.indexOf(GLB_CONFIG.noAuthServerUrl[i]) === 0) {
        return true
      }
    }
  }
  return false
}

function warnAndToLogin (msg) {
  // setTimeout(function () {
  //     console.log("未登录，跳转登录页")
  //     util.toLogin()
  // }, 1000)
  if (util.logoutMessageInstance === null) {
    util.logoutMessageInstance = ElMessage.warning(msg)
    setTimeout(function () {
      console.log('未登录，跳转登录页')
      util.toLogin()
    }, 1000)
  }
}

axios.interceptors.response.use(
  response => {
    util.loadingHide()
    if (response.data != null) {
      if(response.config.responseType === 'json'){
        if (response.data.status !== undefined) {
          if (response.data.status === -1) {
            return warnAndToLogin(response.data.message)
          } else if (response.data.status === 1) {
            return Promise.resolve(response)
          } else if (response.data.status === 0) {
            ElMessage.warning(response.data.message)
            return Promise.reject(response)
          } else {
            ElMessage.error(response.data.message)
            return Promise.reject(response)
          }
        } else {
          return Promise.reject(response)
        }
      }
    }
    return Promise.resolve(response)
  },
  error => {
    console.error(error)
    if (error.response) {
      return Promise.reject(error)
      // if (error.response.status === 401 && error.response.data && error.response.data.status === -1) {
      //     ElMessage.warning(error.response.data.message)
      //     setTimeout(function () {
      //         util.toLogin()
      //     }, 1000)
      // } else {
      //     let message = '系统异常,请联系管理员或稍后重试'
      //     if (error.response.data && error.response.data.message) {
      //         message = error.response.data.message
      //     }
      //     ElMessage.error(message)
      //     return Promise.reject(error)
      // }
    } else {
      const message = '系统异常,请联系管理员或稍后重试'
      ElMessage.error(message)
      return Promise.reject(error)
    }
  }
)

export function httpGet (config) {
  config.method = 'get'
  return new Promise((resolve, reject) => {
    axios(config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function httpDelete (config) {
  config.method = 'delete'
  return new Promise((resolve, reject) => {
    axios(config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function httpPost (config) {
  config.method = 'post'
  return new Promise((resolve, reject) => {
    axios(config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function httpPut (config) {
  config.method = 'put'
  return new Promise((resolve, reject) => {
    axios(config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
