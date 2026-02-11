// index.js
import { createI18n } from 'vue-i18n'
import enLocale from './en'
import zhLocale from './zh'

const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  }
}
export const i18n = createI18n({
  // 设置语言 选项 en | zh
  locale:
    typeof window.localStorage !== 'undefined'
      ? window.localStorage.getItem('locale') || 'zh'
      : 'zh',
  // 设置文本内容
  messages
})
const install = app => {
  app.use(i18n)
}

export default install
