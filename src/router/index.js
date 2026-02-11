import { createRouter, createWebHashHistory } from 'vue-router'
import GLB_CONFIG from '../plugins/glb-constant'
// import { getToken } from '@/apis/base/index'
import util from '@/plugins/util'
import store from '../store'
const Home = () => import('@/pages/base/home')

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    // { path:'/data/raw_data/page', redirect:'/data/raw_data'}
  ]
})

router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行  next('/login') 强制跳转
  if (GLB_CONFIG.usingCase) {
    checkForCas(to, from, next)
  } else {
    check(to, from, next)
  }
})

const check = function (to, from, next) {
  const currentToken = window.sessionStorage.getItem(GLB_CONFIG.tokenKey)
  if (~GLB_CONFIG.noAuthRouterPath.findIndex(val => val === to.fullPath)) {
    next()
  } else {
    if (!currentToken) {
      util.toLogin()
    } else {
      if (!store.state.permission.currentUser) {
        store.dispatch('setCurrentUser').then(() => {
          next({ ...to, replace: true })
        })
      } else {
        next()
      }
    }
  }
}
const checkForCas = function (to, from, next) {
  const url = window.location.href
  const currentToken = window.sessionStorage.getItem(GLB_CONFIG.tokenKey)
  if (!currentToken) {
    if (url.indexOf('ticket') === -1) {
      util.toLogin()
      // window.location.replace(GLB_CONFIG.devUrl.loginUrl);
    } else {
      const paramsArr = url.split('?')
      if (paramsArr.length > 1) {
        let params = paramsArr[1]
        params = params.split('#')[0]
        const param_arr = params.split('&')
        const paramObj = {}
        param_arr.forEach(function (ele) {
          const paramName = ele.split('=')[0]
          paramObj[paramName] = ele.split('=')[1]
        })
        const ticket = paramObj['ticket']
        // getToken(ticket).then(res => {
        //   const token = res.data
        //   sessionStorage.setItem(GLB_CONFIG.tokenKey, token)
        //   window.location.replace(paramsArr[0])
        // }).catch(() => {
        //   util.toLogin()
        // })
      }
    }
  } else {
    if (url.indexOf('ticket') === -1) {
      if (!store.state.permission.currentUser) {
        store.dispatch('setCurrentUser').then(() => {
          next({ ...to, replace: true })
        })
      } else {
        next()
      }
    } else {
      const paramsArr = url.split('?')
      if (paramsArr.length > 1) {
        window.location.replace(paramsArr[0])
      }
    }
  }
}

export default router
