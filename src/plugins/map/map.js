export const BaiduMap = {
  init: function() {
    const BMapURL = 'https://api.map.baidu.com/api?v=3.0&ak=' + 'lGSrCfg1CG4rxx881RTcuewQhgrt857x' + '&s=1&callback=onBMapCallback'
    return new Promise((resolve) => {
      // 如果已加载直接返回
      if (typeof window.BMap !== 'undefined') {
        resolve(window.BMap)
        return true
      }
      // 百度地图异步加载回调处理
      window.onBMapCallback = function() {
        resolve(window.BMap)
      }
      // 插入script脚本
      const scriptNode = document.createElement('script')
      scriptNode.setAttribute('type', 'text/javascript')
      scriptNode.setAttribute('src', BMapURL)
      document.body.appendChild(scriptNode)
    })
  }
}
