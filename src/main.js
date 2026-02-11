import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
// import * as echarts from 'echarts'
import './assets/styles/global.scss'
import './assets/icons/font/iconfont.css'
import router from './router'
import store from './store'
import * as icons from '@element-plus/icons'
import i18n from './plugins/lang'

const app = createApp(App)
installElementPlus(app)
app.use(router)
app.use(store)
// app.config.globalProperties.$echarts = echarts
app.use(i18n)
app.mount('#app')
Object.keys(icons).forEach(key => {
  app.component(key, icons[key])
})
