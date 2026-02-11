const path = require('path')
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  publicPath: process.env.VUE_APP_Public_Path, // vueConf.baseUrl,
  outputDir: process.env.VUE_APP_OUT_PUT_DIR, // 构建输出目录
  assetsDir: '', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hot: true,
    proxy: {
      [process.env.VUE_APP_SERVICE_ROOT_URL]: {
        target: 'http://localhost:8082',
        // ws: true,
        // changOrigin: true,
        ws: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_SERVICE_ROOT_URL]: ''
        }
      },
      [process.env.VUE_APP_FILE_SERVER_URL]: {
        target: 'http://localhost:8082/files',
        // ws: true,
        // changOrigin: true,
        ws: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_FILE_SERVER_URL]: ''
        }
      }
    }
  },
  chainWebpack: config => {
    config.module

      .rule('svg')

      .exclude.add(resolve('src/assets/icons/svg')) // 注意：路径要具体到存放的svg的路径下，不然会报错

      .end() // 第二步：使用svg-sprite-loader对src/icons下的svg进行操作

    config.module

      .rule('icons')

      .test(/\.svg$/)

      .include.add(resolve('src/assets/icons/svg')) //注意：路径要具体到存放的svg的路径下，不然会报错

      .end()

      .use('svg-sprite-loader')

      .loader('svg-sprite-loader') // 定义规则使用时 <svg class="icon"> <use xlink:href="#icon-svg文件名"></use>  </svg>

      .options({
        symbolId: 'svg-[name]'
      })

      .end()
  }
}
