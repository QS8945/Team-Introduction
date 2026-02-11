import { createStore } from 'vuex'
// import { getCurrentUser } from '@/apis/base/index'
import router from '@/router'
import GLB_CONFIG from '../plugins/glb-constant'
// import { listSysPrivilegeMenuOfCurrentUser } from '@/apis/system/sys-privilege-menu'
// import { listSysButton } from '@/apis/system/sys-button'

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      permission: {
        currentUser: undefined,
        dynamicRouters: undefined,
        routerFunctionMap: undefined
      },
      basicButtons: []
    }
  },
  mutations: {
    clearLoginInfo(state) {
      state.permission = {}
      state.basicButtons = []
    },
    setCurrentUser(state, user) {
      state.permission.currentUser = user
    },
    setDynamicRouters(state, dynamicRouters) {
      if (dynamicRouters && dynamicRouters.length > 0) {
        state.permission.dynamicRouters = dynamicRouters
        dynamicRouters.forEach(dynamicRouter => {
          router.addRoute('home', dynamicRouter)
        })
      }
    },
    setBasicButtons(state, basicButtons) {
      state.basicButtons = basicButtons
    },
    setRouterFunctionMap(state, menuList) {
      state.permission.routerFunctionMap = {}
      if (menuList && menuList.length > 0) {
        menuList.forEach(menu => {
          state.permission.routerFunctionMap[menu.pageUrl] = {
            customFunctionList: [],
            inlineFunctionList: [],
            batchingFunctionList: [],
            outlineFunctionList: [],
            dataOperatePermission: {}
          }
          if (menu.functionList && menu.functionList.length > 0) {
            menu.functionList.forEach(func => {
              state.permission.routerFunctionMap[
                menu.pageUrl
              ].dataOperatePermission[func.buttonCode] = func
              if (func.custom) {
                state.permission.routerFunctionMap[
                  menu.pageUrl
                ].customFunctionList.push(func)
                return
              }
              if (func.batching) {
                state.permission.routerFunctionMap[
                  menu.pageUrl
                ].batchingFunctionList.push(func)
              } else if (func.inlineOperated) {
                state.permission.routerFunctionMap[
                  menu.pageUrl
                ].inlineFunctionList.push(func)
              } else {
                state.permission.routerFunctionMap[
                  menu.pageUrl
                ].outlineFunctionList.push(func)
              }
            })
          }
        })
      }
    }
  },
  actions: {
    // setCurrentUser({ commit }) {
    //   return new Promise(resolve => {
    //     getCurrentUser().then(res => {
    //       commit('setCurrentUser', res.data)
    //       // resolve()
    //       listSysPrivilegeMenuOfCurrentUser({
    //         applicationId: GLB_CONFIG.applicationId,
    //         onlyInnerRouter: true,
    //         withFunction: true
    //       }).then(res => {
    //         let menuList = res.data
    //         let dynamicRouters = []
    //         if (menuList && menuList.length > 0) {
    //           menuList.forEach(menu => {
    //             if (menu.pagePath) {
    //               if (menu.pagePath.indexOf('/') === 0) {
    //                 menu.pagePath = menu.pagePath.slice(1)
    //               }
    //               const component = () => import(`@/pages/${menu.pagePath}`)
    //               // 新增子路由逻辑
    //               let index = menuList.findIndex(
    //                 val => menu.parentId === val.id
    //               )
    //               if (!~index) {
    //                 dynamicRouters.push({
    //                   path: menu.pageUrl,
    //                   component: component,
    //                   name: menu.code,
    //                   meta: { moduleId: menu.moduleId }
    //                 })
    //               } else {
    //                 for (
    //                   let i = 0, iLen = dynamicRouters.length;
    //                   i < iLen;
    //                   i++
    //                 ) {
    //                   if (
    //                     dynamicRouters[i].path ===
    //                     menuList[index].pageUrl
    //                   ) {
    //                     dynamicRouters[i].children =
    //                       dynamicRouters[i].children || []
    //                     dynamicRouters[i].children.push({
    //                       path: menu.pageUrl,
    //                       component: component,
    //                       name: menu.code,
    //                       meta: { moduleId: menu.moduleId }
    //                     })
    //                     break
    //                   }
    //                 }
    //               }
    //             }
    //           })
    //         }
    //         commit('setRouterFunctionMap', menuList)
    //         commit('setDynamicRouters', dynamicRouters)
    //         resolve()
    //       })
    //     })
    //   })
    // },
    clearLoginInfo({ commit }) {
      commit('clearLoginInfo')
    },
    setDynamicRouters({ commit }) {
      return new Promise(resolve => {
        // listSysPrivilegeMenuOfCurrentUser({
        //   applicationId: GLB_CONFIG.applicationId
        // }).then(res => {
        //   let menuList = res.data
        //   let dynamicRouters = []
        //   if (menuList && menuList.size > 0) {
        //     menuList.forEach(menu => {
        //       dynamicRouters.push({
        //         path: menu.pageUrl,
        //         component: import(menu.pagePath)
        //       })
        //     })
        //   }
        //   commit('setDynamicRouters', dynamicRouters)
        //   resolve()
        // })
      })
    },
    setBasicButtons({ commit }) {
      return new Promise(resolve => {
        // listSysButton({ basic: true }).then(res => {
        //   commit('setBasicButtons', res.data)
        //   resolve(res.data)
        // })
      })
    }
  }
})

export default store
