import { BaiduMap } from '@/plugins/map/map'
import LuShu from '@/plugins/map/lushu'
export default {
  map: '',
  markers: [],
  zoom: 17,
  isTwo: false,
  selfIcon: '/static/home/myPosition.png',

  lushu: '',
  lushuPoints: [], //路书轨迹点集合；
  lushuOys: {}, //路书覆盖物；
  init(div) {
    return new Promise((resolve, reject) => {
      BaiduMap.init().then(BMap => {
        window.BMap = BMap

        this.map = new BMap.Map(div) // 创建Map实例
        var point = new BMap.Point(116.404, 39.915) // 创建点坐标
        this.map.centerAndZoom(point, this.zoom)
        this.map.enableScrollWheelZoom() //开启鼠标滚轮缩放
        this.map.centerAndZoom(point, this.zoom) // 初始化地图,设置中心点坐标和地图级别
        resolve()
        // var top_left_navigation = new BMap.NavigationControl() //左上角，添加默认缩放平移控件
        // this.map.addControl(top_left_navigation)
        // this.map.addControl(new BMap.MapTypeControl())
      })
    })
  },
  /**
   * 在地图上添加覆盖物
   * @param point：point
   * @param w
   * @param h
   * @param url
   */
  diyMapIcon(point, w, h, url, ba = '') {
    let icon0 = this.setIcon({ w, h, url })
    let marker2 = new BMap.Marker(point, icon0) // 创建标注
    marker2.ba = ba
    this.map.addOverlay(marker2) // 将标注添加到地图中;
    return marker2
  },
  //经纬度解析地址；
  getAddress(lng, lat) {
    var myGeo = new BMap.Geocoder()
    let pp = new Promise(function (resolve, reject) {
      // 根据坐标得到地址描述
      myGeo.getLocation(new BMap.Point(lng, lat), function (result) {
        if (result) {
          resolve(result.address)
        } else {
          reject()
        }
      })
    })
    return pp
  },
  formatPoint(list) {
    return new Promise((resolve, reject) => {
      let points = []
      list.forEach((val, i) => {
        var p = new BMap.Point(val.longitude, val.latitude)
        points.push(p)
      })
      let convertorPoints = [],
        translatePoints = [],
        convertor = new BMap.Convertor(),
        convertorIndex = 0
      for (let i = 0, pointsLen = points.length; i < pointsLen; i += 10) {
        translatePoints.push(points.slice(i, i + 10))
      }
      convertorPoints = JSON.parse(JSON.stringify(translatePoints))
      for (
        let i = 0, translatePointsLen = translatePoints.length;
        i < translatePointsLen;
        i++
      ) {
        convertor.translate(translatePoints[i], 1, 5, data => {
          if (data.status === 0) {
            convertorIndex++
            convertorPoints.splice(i, 1, data.points)
            if (convertorIndex === translatePointsLen) {
              convertorPoints = convertorPoints.reduce((a, b) => {
                return a.concat(b)
              })
              resolve(convertorPoints)
              // this.addLine(convertorPoints, color, weight, true)
              // myMap.doLushu(convertorPoints)
              // this.doEvtLer()
            }
          }
        })
      }
    })
  },
  /**
   * 设置路书 ；
   * @param pointArr ：经纬度集合
   * @param DirectionArr ：方向集合
   */
  async doLushu(pointArr, DirectionArr) {
    var firstPoint = new BMap.Point(pointArr[0].longitude, pointArr[0].latitude)
    this.map.centerAndZoom(firstPoint, this.zoom)
    // let points = []
    // for (let i = 0; i < pointArr.length; i++) {
    //   let pp = new BMap.Point(pointArr[i].lng, pointArr[i].lat)
    //   points.push(pp)
    // }
    let formatPoint = await this.formatPoint(pointArr)
    this.lushuPoints = formatPoint //全局；
    this.lushu = this.initLushu(this.lushuPoints, DirectionArr) //初始化路书；

    this.addLushuOverlay(this.lushuPoints) //画轨迹线（蓝线）（绿线）、'起'和'终' icon
    this.map.setViewport(formatPoint, { margins: [30, 30, 30, 30] }) //在屏幕居中显示。
    this.lushu.start() //开始动画
  },
  setIcon(icon) {
    return new BMap.Icon(icon.url, new BMap.Size(icon.w, icon.h), {
      anchor: new BMap.Size(icon.w / 2, icon.h / 2)
    })
  },
  initLushu(points, DirectionArr) {
    let myIcon = this.setIcon({
      w: 52,
      h: 26,
      url: 'http://lbsyun.baidu.com/jsdemo/img/car.png'
    })
    let lushuObj = {
      landmarkPois: [],
      //landmarkPois:此参数是路书移动的时候碰到这个点会触发pauseTime停留中设置的时间，单位为秒，经纬度误差超过十米不会停止
      //landmarkPois:[
      //  {lng:markers[0].lng,lat:markers[0].lat,html:'<img src="xian.jpg" /></br>西安北站到了',pauseTime:1},
      //  {lng:markers[1].lng,lat:markers[1].lat,html:'咸阳站到了',pauseTime:1},
      //  {lng:markers[2].lng,lat:markers[2].lat,html:'咸阳秦都站到了',pauseTime:1},
      //  {lng:markers[3].lng,lat:markers[3].lat,html:'兴平站到了',pauseTime:1}
      //],
      //defaultContent: '动车继续前行，况且况且...',
      icon: myIcon,
      speed: 2000, //速度，单位米每秒
      autoView: true,
      enableRotation: true
      // DirectionArr: DirectionArr
    }
    return new LuShu(this.map, points, lushuObj) //初始化路书；
  },
  //画轨迹线（蓝线）（绿线）、'起'和'终' icon
  addLushuOverlay(points) {
    // let startPt = points[0]
    // let endPt = points[points.length - 1]
    // let oneStart = this.diyMapIcon(
    //   startPt,
    //   25,
    //   30,
    //   '/static/car/icon_start.png',
    //   'oneStart'
    // )
    // let oneEnd = this.diyMapIcon(
    //   endPt,
    //   25,
    //   30,
    //   '/static/car/icon_end.png',
    //   'oneEnd'
    // )

    let blueLine = new BMap.Polyline(points, {
      strokeColor: '#2962FF',
      strokeWeight: 6,
      strokeOpacity: 0.8
    })
    blueLine.ba = 'blueLine'
    this.map.addOverlay(blueLine) //添加轨迹到地图
    let greenLine = new BMap.Polyline([], {
      strokeColor: '#00F53D',
      strokeWeight: 6,
      strokeOpacity: 0.8
    })
    greenLine.ba = 'greenLine'
    this.map.addOverlay(greenLine)
    this.lushuOys = { blueLine, greenLine } //自定义的路书覆盖物集合对象；
    // this.lushuOys = { blueLine, greenLine, oneStart, oneEnd } //自定义的路书覆盖物集合对象；
  },
  moveNext(index){
    this.lushu.stop()
    this.lushu._setPosition(index)
  },
  /**
   * 根据索引设置绿线path；
   * @param index 轨迹点索引；
   * 本来打算不删除。但是如果不删除绿线直接设置setPath，当点击‘快退’的时候，绿线并未刷新。所以要删除后添加；
   * 在百度地图中removeOverlay，简直难用到要吐血。清空某个折线，折线类型会全部会跟着删除（蓝线也被删除了。太无语了），所以只能把后再添加蓝线...
   * 这个方法能完美的和进度条结合。无论怎么拖动进度条，绿线都能在相应的轨迹点上；
   */
  playGreenLine(index) {
    let oy = this.lushuOys.greenLine
    let oy0 = this.lushuOys.blueLine
    let arr2 = []
    for(let i = 0; i <= index; i++){
      arr2.push(this.lushuPoints[i])
    }
    oy.setPath(arr2)
    // this.lushu._moveNext(index)
    // this.map.removeOverlay(oy0)
    // this.map.addOverlay(oy0)
    // this.map.removeOverlay(oy)
    // this.map.addOverlay(oy)
  },
  //设置速度
  setLushuSpeed(speed) {
    this.lushu._opts.speed = speed
  },
  //设置索引
  setLushuIndex(index) {
    if (index < 1) {
      index = 0
    }
    if (index >= this.lushu._path.length - 1) {
      index = this.lushu._path.length - 1
    }
    if (this.lushu.i >= this.lushu._path.length - 1 || this.lushu._fromPause) {
      this.lushu.start()
    }
    this.lushu.i = index
  },
  //0开始，1暂停，2快进，3快退，4停止，5删除清空路书
  setlushuType(type) {
    let index = 0
    switch (type) {
      case 0:
        this.lushu.start()
        break
      case 1:
        this.lushu.pause()
        break
      case 2:
        if (this.lushu.i < this.lushu._path.length - 6) {
          index = this.lushu.i + 5
        }
        this.setLushuIndex(index)
        break
      case 3:
        //快退
        if (this.lushu.i < this.lushu._path.length - 6) {
          index = this.lushu.i - 5
        }
        this.setLushuIndex(index)
        break
      case 4:
        this.lushu.stop()
        break
      case 5:
        //  删除清空路书
        this.lushu.stop()
        this.lushu = ''
        break
    }
  }
}
