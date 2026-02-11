const GLB_CONFIG = {
  devUrl: {
    loginUrl: process.env.VUE_APP_LOGIN_URL,
    serviceSiteRootUrl: process.env.VUE_APP_SERVICE_ROOT_URL,
    fileServer: process.env.VUE_APP_FILE_SERVER_URL
    // serviceSiteRootUrl: '/server',
    // fileServer: '/file_server'
    // serviceSiteRootUrl: 'http://10.201.4.175:8086',
    // fileServer:'http://10.201.4.175:8086/files'
  },
  usingCase: process.env.VUE_APP_CAS === 'true',
  applicationId: '9887625e0fea4ceab98df085ee8eaa32',
  noAuthServerUrl: ['/login', '/home', '/token'],
  noAuthRouterPath: ['/login', '/home', '/video'],
  tokenKey: 'token',
  defaultDataOperatePermission: {
    add: true,
    edit: true,
    remove: true,
    view: true
  }
}

export default GLB_CONFIG
