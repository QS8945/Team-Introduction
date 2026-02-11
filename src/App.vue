<template>
  <el-config-provider :size="size">
    <router-view />
  </el-config-provider>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { ElConfigProvider } from 'element-plus'
import { setHtmlLang, debounce } from '@/plugins/util'
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import enUS from 'element-plus/es/locale/lang/en'
export default {
  name: 'App',
  components: {
    ElConfigProvider
  },
  setup() {
    const localeTypes = {
      zh: zhCn,
      en: enUS
    }
    let size = ref('medium')
    let changeSize = () => {
      if (window.innerWidth > 1920) {
        size.value = 'large'
      // if (window.innerWidth >= 2880) {
      //   size.value = 'large'
      // } else if (window.innerWidth > 1920) {
      //   size.value = 'medium'
      // } else if (window.innerWidth > 1920) {
        // size.value = 'small'
      } else if (window.innerWidth > 1200) {
        size.value = 'default'
      } else if (window.innerWidth > 768) {
        size.value = 'small'
      }
      //  else {
      //   size.value = 'mini'
      // }
    }
    window.onresize = debounce(changeSize)
    changeSize()
    // const { locale } = useI18n()
    // const elementPlusLocales = computed(() => localeTypes[locale.value])

    onMounted(() => {
      // setHtmlLang(locale.value)
    })
    return {
      // locale: elementPlusLocales,
      size
    }
  }
}
</script>

<style></style>
