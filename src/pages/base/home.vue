<template>
  <el-scrollbar>
    <el-container direction="vertical" class="home">
      <section class="banner login-container">
        <div id="login-three-container"></div>
        <div class="login-plane">
          <div class="login-plane-container">
            <img
              class="login-plane-human"
              src="@/assets/images/images/login_human.png"
              alt=""
            />
          </div>
        </div>
        <div class="login-ground"></div>
      </section>
      <section class="section members section-bg">
        <div class="container">
          <header class="section-header text-center">
            <h2 class="section-title">
              Meet our team
            </h2>
          </header>
        </div>
        <div class="container team-container">
          <div class="team">
            <div
              class="team-member"
              v-for="(item, index) in sortMembers"
              :key="index"
            >
              <div class="card">
                <div class="card-front">
                  <div class="team-member__image">
                    <figure class="img-holder">
                      <el-image :src="item.picAdult" fit="cover">
                        <template #error>
                          <div class="image-slot">
                            <el-icon><icon-picture /></el-icon>
                          </div>
                        </template>
                      </el-image>
                      <div
                        class="img-mask"
                        :style="{
                          'background-image':
                            'linear-gradient(to right,' +
                            checkBackgroundColor(index) +
                            ')'
                        }"
                      ></div>
                    </figure>
                  </div>
                  <div class="team-member__body">
                    <h3 class="team-member__title">{{ item.name }}</h3>
                    <span class="team-member__subtitle">{{ item.job }}</span>
                  </div>
                </div>
                <div class="card-back">
                  <div class="team-member__image">
                    <figure class="img-holder">
                      <img
                        @click="
                          handlePictureCardPreview(
                            item.picChild ||
                              require('@/assets/images/home/ruhua-kid.jpeg')
                          )
                        "
                        :src="
                          item.picChild ||
                          require('@/assets/images/home/ruhua-kid.jpeg')
                        "
                        :style="{
                          'object-fit':
                            index === sortMembers.length - 1 ? 'contain' : ''
                        }"
                      />
                    </figure>
                  </div>
                  <div class="team-member__body">
                    <h3 class="team-member__title">{{ item.name }}</h3>
                    <span class="team-member__subtitle">{{
                      item.childJob
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <el-backtop />
    </el-container>
    <el-image-viewer
      v-if="dialogVisible"
      @close="closeViewer"
      :url-list="srcList"
    />
  </el-scrollbar>
  <!--  底部  -->
</template>

<script>
import * as THREE from 'three'
// import { GUI } from 'three/examples/jsm/libs/dat.gui.module'111
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { defineComponent, onMounted, ref, reactive, toRefs, unref } from 'vue'
import { Picture as IconPicture } from '@element-plus/icons-vue'

const members = [
  {
    picAdult: require('@/assets/images/home/Sam-Zhou-adult.jpg'),
    picChild: require('@/assets/images/home/Sam-Zhou-kid.jpg'),
    name: 'Sam Zhou',
    job: 'PM',
    childJob: 'Wanted to be a Kung Fu Master'
  },
  {
    picAdult: require('@/assets/images/home/Ma-Liang-adult.jpg'),
    picChild: require('@/assets/images/home/Ma-Liang-kid.jpg'),
    name: 'Ma Liang',
    job: 'PO',
    childJob: 'Wanted to be a Soldier'
  },
  {
    picAdult: require('@/assets/images/home/Ma-Jun-adult-backup.jpg'),
    picChild: require('@/assets/images/home/Ma-Jun-kid.jpg'),
    name: 'Ma Jun',
    job: 'Architect',
    childJob: 'Wanted to be a Astronaut'
  },
  {
    picAdult: require('@/assets/images/home/Wang-Tao-adult.jpg'),
    picChild: require('@/assets/images/home/Wang-Tao-kid.jpg'),
    name: 'Wang Tao',
    job: 'MT developer',
    childJob: 'Wanted to be a Scientist'
  },
  {
    picAdult: '',
    picChild: '',
    name: 'Cheng Yin',
    job: 'PO',
    childJob: 'Wanted to be a -'
  },
  {
    picAdult: require('@/assets/images/home/Mao-Anping-adult.jpg'),
    picChild: require('@/assets/images/home/Mao-Anping-kid.jpg'),
    name: 'Mao Anping',
    job: 'Coder',
    childJob: 'Wanted to be a Fisher'
  },
  {
    picAdult: '',
    picChild: '',
    name: 'Hu Mingming',
    job: 'PO',
    childJob: 'Wanted to be a -'
  },
  {
    picAdult: require('@/assets/images/home/Zhang-Huijun-adult.jpg'),
    picChild: require('@/assets/images/home/Zhang-Huijun-kid.jpg'),
    name: 'Zhang Terry',
    job: 'Coder',
    childJob: 'Wanted to be a Scientist'
  },
  {
    picAdult: require('@/assets/images/home/Xu-Wenjun-adult.jpg'),
    picChild: require('@/assets/images/home/Xu-Wenjun-kid.jpg'),
    name: 'Xu Wenjun',
    job: 'Maintener',
    childJob: 'Wanted to be a Footballer'
  },
  {
    picAdult: require('@/assets/images/home/Sui-Shaokun-adult.jpg'),
    picChild: require('@/assets/images/home/Sui-Shaokun-kid.jpg'),
    name: 'Sui Shaokun',
    job: 'HOL developer',
    childJob: 'Wanted to be a Engineer'
  },
  {
    picAdult: require('@/assets/images/home/Ni-Zhibin-adult.jpg'),
    picChild: require('@/assets/images/home/Ni-Zhibin-kid.jpg'),
    name: 'Ni Zhibin',
    job: 'Coder',
    childJob: 'Wanted to do Nothing'
  },
  {
    picAdult: require('@/assets/images/home/Liu-Qi-adult.jpg'),
    picChild: require('@/assets/images/home/Liu-Qi-kid.jpg'),
    name: 'Liu Tannya',
    job: 'Engineer',
    childJob: 'Wanted to be Painter or Scientist'
  },
  {
    picAdult: require('@/assets/images/home/Wang-Jianwei-adult.jpg'),
    picChild: require('@/assets/images/home/Wang-Jianwei-kid.jpg'),
    name: 'Wang Jianwei',
    job: 'Programmer',
    childJob: 'Wanted to be a Player'
  },
  {
    picAdult: require('@/assets/images/home/Dong-Ruyuan-adult.jpg'),
    picChild: require('@/assets/images/home/Dong-Ruyuan-kid.jpg'),
    name: 'Dong Ruyuan',
    job: 'Coder',
    childJob: "Wanted to be a nabobess's bosom friend"
  },
  {
    picAdult: '',
    picChild: '',
    name: 'Zhang Max',
    job: 'Coder',
    childJob: 'Wanted to be a -'
  },
  {
    picAdult: '',
    picChild: '',
    name: 'Lu Qin',
    job: 'Coder',
    childJob: 'Wanted to be a -'
  },

  {
    picAdult: require('@/assets/images/home/Jin-Ning-adult-backup1.jpg'),
    picChild: require('@/assets/images/home/Jin-Ning-kid.jpg'),
    name: 'Jin Ning',
    job: 'Engineer',
    childJob: 'Wanted to be a Scientist'
  },
  {
    picAdult: require('@/assets/images/home/Wang-Qingdong-adult.jpg'),
    picChild: require('@/assets/images/home/Wang-Qingdong-kid.jpg'),
    name: 'Wang Qingdong',
    job: 'Simulation development engineer',
    childJob: 'Wanted to be a Professor'
  },
  {
    picAdult: require('@/assets/images/home/Yang-Jiyu-adult.jpg'),
    picChild: require('@/assets/images/home/Yang-Jiyu-kid.jpg'),
    name: 'Yang Jiyu',
    job: 'Coder',
    childJob: 'Wanted to be a F1 driver'
  },
  {
    picAdult: '',
    picChild: '',
    name: 'Wang Jian',
    job: 'Coder',
    childJob: 'Wanted to be a -'
  },
  {
    picAdult: '',
    picChild: '',
    name: 'Zhang Jincao',
    job: 'Coder',
    childJob: 'Wanted to be a -'
  },
  {
    picAdult: '',
    picChild: '',
    name: 'He Jianqiang',
    job: 'Coder',
    childJob: 'Wanted to be a -'
  },
  // {
  //   picAdult: '',
  //   picChild: '',
  //   name: 'Chen Zhengshuai',
  //   job: 'Coder',
  //   childJob: 'Wanted to be a -'
  // },
  {
    picAdult: require('@/assets/images/home/Zhang-Jinglong-adult.jpg'),
    picChild: require('@/assets/images/home/Zhang-Jinglong-kid.jpg'),
    name: 'Zhang Jinglong',
    job: '85624631',
    childJob: 'Wanted to be a Scientist'
  },
  {
    picAdult: require('@/assets/images/home/Li-Yue-adult.jpg'),
    picChild: require('@/assets/images/home/Li-Yue-kid.jpg'),
    name: 'Li Yue',
    job: 'Coder',
    childJob: 'Wanted to be a F1 Pilot'
  },
  {
    picAdult: '',
    picChild: '',
    name: 'Yang Haitao',
    job: '-',
    childJob: 'Wanted to be a -'
  },
  {
    picAdult: require('@/assets/images/home/Zhu-Yukai-adult.jpg'),
    picChild: require('@/assets/images/home/Zhu-Yukai-kid.jpg'),
    name: 'Zhu Yukai',
    job: 'Coder',
    childJob: 'Wanted to be a Dancer or Gamer'
  },
  {
    picAdult: require('@/assets/images/home/Kong-Mengmeng-adult.jpg'),
    picChild: require('@/assets/images/home/Kong-Mengmeng-kid.jpg'),
    name: 'Kong Mengmeng',
    job: 'Coder',
    childJob: 'Wanted to be a Graffiti Artist'
  },
  {
    picAdult: require('@/assets/images/home/Hu-Xiaopeng-adult.jpg'),
    picChild: require('@/assets/images/home/Hu-Xiaopeng-kid.jpg'),
    name: 'Hu Xiaopeng',
    job: 'Software Engineer',
    childJob: 'Wanted to be a Doctor'
  },
  {
    picAdult: require('@/assets/images/home/Du-Yu-adult.jpg'),
    picChild: require('@/assets/images/home/Du-Yu-kid.jpg'),
    name: 'Du Yu',
    job: 'Visual development',
    childJob: 'Wanted to be a Swimmer'
  },
  {
    picAdult: require('@/assets/images/home/Shen-Lixin-adult.jpg'),
    picChild: require('@/assets/images/home/Shen-Lixin-kid.jpg'),
    name: 'Shen Lixin',
    job: 'Enginer',
    childJob: 'Wanted to be a Richer'
  },
  {
    picAdult: require('@/assets/images/home/Zhu-Qianqian-adult.jpg'),
    picChild: require('@/assets/images/home/Zhu-Qianqian-kid.jpg'),
    name: 'Zhu Qianqian',
    job: 'Coder',
    childJob: 'Wanted to be a Epicure'
  },
  {
    picAdult: require('@/assets/images/home/Liu-Lulu-adult.jpg'),
    picChild: require('@/assets/images/home/Liu-Lulu-kid.jpg'),
    name: 'Liu Lulu',
    job: 'Coder',
    childJob: 'Wanted to be a Soldier'
  },
  {
    picAdult: require('@/assets/images/home/Zhang-Song-adult.jpg'),
    picChild: require('@/assets/images/home/Zhang-Song-kid.jpg'),
    name: 'Zhang Song',
    job: 'Coder',
    childJob: 'Wanted to be a Scientist'
  },
  {
    picAdult: require('@/assets/images/home/Zhao-Yao-adult-backup1.jpg'),
    picChild: '',
    name: 'Zhao Yao',
    job: 'Coder',
    childJob: 'Wanted to be a man'
  },
  {
    picAdult: require('@/assets/images/home/Song-Yunzhe-adult.jpg'),
    picChild: require('@/assets/images/home/Song-Yunzhe-kid.jpg'),
    name: 'Song Harry',
    job: 'Coder',
    childJob: 'Wanted to be a Doctor'
  },
  {
    picAdult: require('@/assets/images/home/Li-Dongliang-adult.jpg'),
    picChild: require('@/assets/images/home/Li-Dongliang-kid.jpg'),
    name: 'Li Dongliang',
    job: '战地记者',
    childJob: '教练，我想打篮球'
  },
  {
    picAdult: require('@/assets/images/home/Chen-Ruiyang-adult.jpg'),
    picChild: require('@/assets/images/home/Chen-Ruiyang-kid.jpg'),
    name: 'Chen Ruiyang',
    job: 'Coder',
    childJob: 'Wanted to be a Rapper'
  },
  {
    picAdult: require('@/assets/images/home/Yang-Xinyi-adult.jpg'),
    picChild: require('@/assets/images/home/Yang-Xinyi-kid.jpg'),
    name: 'Yang Xinyi',
    job: 'CN engineer',
    childJob: 'Wanted to be a Pilot'
  },
  {
    picAdult: require('@/assets/images/home/Zhu-Chao-adult.jpg'),
    picChild: require('@/assets/images/home/Zhu-Chao-kid.jpg'),
    name: 'Zhu Chao',
    job: 'Coder',
    childJob: 'Wanted to be a Pokemon Trainer'
  },
  {
    picAdult: require('@/assets/images/home/Cai-Xiaojuan-adult.jpg'),
    // picChild: '',
    picChild: require('@/assets/images/home/Cai-Xiaojuan-kid.jpg'),
    name: 'Cai Xiaojuan',
    job: 'Coder',
    childJob: 'Wanted to be a Forensic'
  },
  {
    picAdult: require('@/assets/images/home/Hang-Tao-adult.jpg'),
    picChild: require('@/assets/images/home/Hang-Tao-kid.jpg'),
    name: 'Hang Tao',
    job: 'Coder',
    childJob: 'Wanted to be Engineer'
  },
  {
    picAdult: require('@/assets/images/home/Xu-Jun-adult.jpg'),
    picChild: require('@/assets/images/home/Xu-Jun-kid.jpg'),
    name: 'Xu Donnie',
    job: 'Tech Infra',
    childJob: 'Wanted to be a Racing driver'
  },
  {
    picAdult: '',
    picChild: '',
    name: 'Wei Zhongjie',
    job: '-',
    childJob: 'Wanted to be a -'
  },
  {
    picAdult: require('@/assets/images/home/Yang-Loko-adult.jpg'),
    picChild: require('@/assets/images/home/Yang-Loko-kid.jpg'),
    name: 'Yang Loko',
    job: 'Infra',
    childJob: 'Wanted to be a Fisher'
  },
  {
    picAdult: require('@/assets/images/home/Gong-Qin-adult.jpg'),
    picChild: require('@/assets/images/home/Gong-Qin-kid.jpg'),
    name: 'Gong Qin',
    job: 'Coder',
    childJob: 'Wanted to be a Scientist'
  },

  // {
  //   picAdult: require('@/assets/images/home/Chang-Yinjie-adult.jpg'),
  //   picChild: require('@/assets/images/home/Chang-Yinjie-kid-backup1.jpg'),
  //   name: 'Chang Yinjie',
  //   job: 'Software engineer',
  //   childJob: 'Wanted to be Scientist'
  // },
  // 领导
  {
    picAdult: require('@/assets/images/home/Huang-Luoyi-adult.jpg'),
    picChild: require('@/assets/images/home/Huang-Luoyi-kid.jpg'),
    name: 'Huang Luoyi',
    job: 'Meeting animal',
    childJob: 'Wanted to be 大空翼'
  }
  // {
  //   picAdult: '',
  //   picChild: require('@/assets/images/home/ruhua-kid.jpeg'),
  //   name: 'Aleksandra Simovic',
  //   job: 'Marketing Manager',
  //   childJob: 'Wanted to be a detective'
  // }
]

export default {
  name: 'home',
  components: {
    IconPicture
  },
  setup() {
    let organization = ref(false)
    let teamOrganization = ref(false)
    let treeOrganization = ref(true)
    let srcList = toRefs([])
    let dialogVisible = ref(false)
    // 容器
    let container
    // 声明视口宽度
    let width
    // 声明视口高度
    let height
    // 盒模型的深度
    const depth = 1400
    // 声明场景
    let scene
    // 声明球组
    let Sphere_Group
    // 声明球体几何
    let sphereGeometry
    // 声明完整球
    let sphere
    // 声明相机
    let camera
    // 声明相机在z轴的位置
    let zAxisNumber
    // 声明相机目标点
    let cameraTarget = new THREE.Vector3(0, 0, 0)
    // 声明点材质
    let materials = []
    // 声明点的参数
    let parameters
    // 声明点在z轴上移动的进度
    let zprogress
    // 声明同上（第二个几何点）
    let zprogress_second
    // 声明粒子1
    let particles_first = []
    // 声明粒子1
    let particles_second = []
    // 声明粒子1的初始化位置
    let particles_init_position
    // 声明流动的云对象1（包含路径、云实例）
    let cloudParameter_first
    // 声明流动的云对象2（包含路径、云实例）
    let cloudParameter_second
    // 声明云流动的渲染函数1
    let renderCloudMove_first
    // 声明云流动的渲染函数1
    let renderCloudMove_second
    // 声明性能监控
    let stats = new Stats()
    // 声明渲染器
    let renderer
    // 声明调试工具
    // let gui = new GUI()

    // 其他状态
    const state = reactive({
      codeSrc: '',
      codetoken: ''
    })

    onMounted(() => {
      container = document.getElementById('login-three-container')
      width = container.clientWidth
      height = container.clientHeight
      initScene()
      initSceneBg()
      initCamera()
      initLight()
      initSphereModal()
      initSphereGroup()
      particles_init_position = -zAxisNumber - depth / 2
      zprogress = particles_init_position
      zprogress_second = particles_init_position * 2
      particles_first = initSceneStar(particles_init_position)
      particles_second = initSceneStar(zprogress_second)
      cloudParameter_first = initTubeRoute(
        [
          new THREE.Vector3(-width / 10, 0, -depth / 2),
          new THREE.Vector3(-width / 4, height / 8, 0),
          new THREE.Vector3(-width / 4, 0, zAxisNumber)
        ],
        400,
        200
      )
      cloudParameter_second = initTubeRoute(
        [
          new THREE.Vector3(width / 8, height / 8, -depth / 2),
          new THREE.Vector3(width / 8, height / 8, zAxisNumber)
        ],
        200,
        100
      )
      initRenderer()
      // 控制器必须放在renderer函数后面
      initOrbitControls()
      animate()
      // initGUI()
      // const axesHelper = new THREE.AxesHelper(2000)
      // scene.add(axesHelper)
    })

    // gui参数
    function Params() {
      this.color = '#000'
      this.length = 10
      this.size = 3
      this.visible = true
      this.x = 0
      this.y = 0
      this.z = 100
      this.widthSegments = 64
      this.heightSegments = 32
      this.radius = 16
    }

    // 初始化场景
    const initScene = () => {
      scene = new THREE.Scene()
      // 在场景中添加雾的效果，Fog参数分别代表‘雾的颜色’、‘开始雾化的视线距离’、刚好雾化至看不见的视线距离’
      scene.fog = new THREE.Fog(0x000000, 0, 10000)
    }

    // 初始化背景（盒模型背景，视角在盒子里面，看到的是盒子内部）
    const initSceneBg = () => {
      new THREE.TextureLoader().load(
        require('@/assets/images/images/sky.png'),
        texture => {
          const geometry = new THREE.BoxGeometry(width, height, depth) // 创建一个球形几何体 SphereGeometry
          const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
          }) // 创建基础为网格基础材料
          const mesh = new THREE.Mesh(geometry, material)
          scene.add(mesh)
        }
      )
    }

    // 初始化轨道控制器
    const initOrbitControls = () => {
      const controls = new OrbitControls(camera, renderer.domElement)
      // enabled设置为true是可以使用鼠标控制视角
      controls.enabled = false
      controls.update()
    }

    // 初始化相机
    const initCamera = () => {
      /**
       * 方式1：固定视野的距离，求满足完整的视野画面需要多大的视域角度
       * tan正切值（直角边除以临边）
       * const mathTan_value = width / 2 / depth
       * 视域角度
       * const fov_angle = (Math.atan(mathTan_value) * 180) / Math.PI
       * 创建透视相机
       * new THREE.PerspectiveCamera(fov_angle, width / height, 1, depth)
       * 场景是一个矩形容器（坐标(0, 0, 0)是矩形容器的中心），相机能看到的距离是depth，
       * camera.position.set(0, 0, depth / 2)
       */

      /**
       * 使用透视相机
       * 参数值分别是：
       * fov（field of view） — 摄像机视锥体垂直视野角度
       * aspect — 摄像机视锥体长宽比
       * near — 摄像机视锥体近端面
       * far — 摄像机视锥体远端面
       * 这里需要注意：透视相机是鱼眼效果，如果视域越大，边缘变形越大。
       * 为了避免边缘变形，可以将fov角度设置小一些，距离拉远一些
       */

      /**
       * 方式2:固定视域角度，求需要多少距离才能满足完整的视野画面
       * 15度等于(Math.PI / 12)
       */
      const fov = 15
      const distance = width / 2 / Math.tan(Math.PI / 12)
      zAxisNumber = Math.floor(distance - depth / 2)
      camera = new THREE.PerspectiveCamera(fov, width / height, 1, 30000)
      /**
       * 这里给z轴的距离加了100，原因是做调整，使得视域更完整
       * 这么做并不代表前面计算错误了，根据前面的计算值并不能很完整的看到
       * 至于原因，我想大概就类似于0.1+0.2不等于0.3吧
       * 所以我自作主张地加了100的值做调整（但是不建议，因为当屏幕足够宽时候会看到边缘）
       */
      // camera.position.set(0, 0, zAxisNumber + 100)
      camera.position.set(0, 0, zAxisNumber)
      camera.lookAt(cameraTarget)
      // const helper = new THREE.CameraHelper(camera)
      // helper.update()
      // scene.add(helper)
    }

    //光源
    const initLight = () => {
      const ambientLight = new THREE.AmbientLight(0xffffff, 1)
      // 右下角点光源
      const light_rightBottom = new THREE.PointLight(0x0655fd, 5, 0)
      light_rightBottom.position.set(0, 100, -200)
      scene.add(light_rightBottom)
      scene.add(ambientLight)
    }

    // 初始化球体模型
    const initSphereModal = () => {
      //材质
      let material = new THREE.MeshPhongMaterial()
      material.map = new THREE.TextureLoader().load(
        require('@/assets/images/images/earth_bg.png')
      )
      material.blendDstAlpha = 1
      //几何体
      sphereGeometry = new THREE.SphereGeometry(50, 64, 32)
      //模型
      sphere = new THREE.Mesh(sphereGeometry, material)
    }

    // 初始化组 --- 球体
    const initSphereGroup = () => {
      Sphere_Group = new THREE.Group()
      Sphere_Group.add(sphere)
      Sphere_Group.position.x = -400
      Sphere_Group.position.y = 200
      Sphere_Group.position.z = -200
      scene.add(Sphere_Group)
    }

    // 初始化流动路径
    const initTubeRoute = (route, geometryWidth, geometryHeigh) => {
      const curve = new THREE.CatmullRomCurve3(route, false)
      const tubeGeometry = new THREE.TubeGeometry(curve, 100, 2, 50, false)
      const tubeMaterial = new THREE.MeshBasicMaterial({
        // color: '0x4488ff',
        opacity: 0,
        transparent: true
      })
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial)
      scene.add(tube)

      const clondGeometry = new THREE.PlaneGeometry(
        geometryWidth,
        geometryHeigh
      )
      const textureLoader = new THREE.TextureLoader()
      const cloudTexture = textureLoader.load(
        require('@/assets/images/images/cloud.png')
      )
      const clondMaterial = new THREE.MeshBasicMaterial({
        map: cloudTexture,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true
      })
      const cloud = new THREE.Mesh(clondGeometry, clondMaterial)
      scene.add(cloud)
      return {
        cloud,
        curve
      }
    }

    // 初始化场景星星效果
    const initSceneStar = initZposition => {
      const geometry = new THREE.BufferGeometry()
      const vertices = []
      const pointsGeometry = []
      const textureLoader = new THREE.TextureLoader()
      const sprite1 = textureLoader.load(
        require('@/assets/images/images/starflake1.png')
      )
      const sprite2 = textureLoader.load(
        require('@/assets/images/images/starflake2.png')
      )
      parameters = [
        [[0.6, 100, 0.75], sprite1, 50],
        [[0, 0, 1], sprite2, 20]
      ]
      // 初始化500个节点
      for (let i = 0; i < 500; i++) {
        /**
         * const x = Math.random() * 2 * width - width
         * 等价
         * THREE.MathUtils.randFloatSpread(width)
         */
        const x = THREE.MathUtils.randFloatSpread(width)
        // const x = Math.random() * 2 * width - width
        const y = (Math.random() * height) / 2
        const z = Math.random() * zAxisNumber - depth / 2
        vertices.push(x, y, z)
      }

      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(vertices, 3)
      )

      // 创建2种不同的材质的节点（500 * 2）
      for (let i = 0; i < parameters.length; i++) {
        const color = parameters[i][0]
        const sprite = parameters[i][1]
        const size = parameters[i][2]

        materials[i] = new THREE.PointsMaterial({
          size,
          map: sprite,
          blending: THREE.AdditiveBlending,
          depthTest: true,
          transparent: true
        })
        materials[i].color.setHSL(color[0], color[1], color[2])
        const particles = new THREE.Points(geometry, materials[i])
        particles.rotation.x = Math.random() * 0.2 - 0.15
        particles.rotation.z = Math.random() * 0.2 - 0.15
        particles.rotation.y = Math.random() * 0.2 - 0.15
        particles.position.setZ(initZposition)
        pointsGeometry.push(particles)
        scene.add(particles)
      }
      return pointsGeometry
    }

    // 渲染星球的自转
    const renderSphereRotate = () => {
      if (sphere) {
        Sphere_Group.rotateY(0.001)
      }
    }

    // 渲染星星的运动
    const renderStarMove = () => {
      const time = Date.now() * 0.00005
      zprogress += 1
      zprogress_second += 1

      if (zprogress >= zAxisNumber + depth / 2) {
        zprogress = particles_init_position
      } else {
        particles_first.forEach(item => {
          item.position.setZ(zprogress)
        })
      }
      if (zprogress_second >= zAxisNumber + depth / 2) {
        zprogress_second = particles_init_position
      } else {
        particles_second.forEach(item => {
          item.position.setZ(zprogress_second)
        })
      }

      for (let i = 0; i < materials.length; i++) {
        const color = parameters[i][0]

        const h = ((360 * (color[0] + time)) % 360) / 360
        materials[i].color.setHSL(color[0], color[1], parseFloat(h.toFixed(2)))
      }
    }

    // 初始化云的运动函数
    const initCloudMove = (
      cloudParameter,
      speed,
      scaleSpeed = 0.0006,
      maxScale = 1,
      startScale = 0
    ) => {
      let cloudProgress = 0
      return () => {
        if (startScale < maxScale) {
          startScale += scaleSpeed
          cloudParameter.cloud.scale.setScalar(startScale)
        }
        if (cloudProgress > 1) {
          cloudProgress = 0
          startScale = 0
        } else {
          cloudProgress += speed
          if (cloudParameter.curve) {
            const point = cloudParameter.curve.getPoint(cloudProgress)
            if (point && point.x) {
              cloudParameter.cloud.position.set(point.x, point.y, point.z)
            }
          }
        }
      }
    }

    //渲染器
    const initRenderer = () => {
      // 开启抗锯齿
      // 在 css 中设置背景色透明显示渐变色
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      // 定义渲染器的尺寸；在这里它会填满整个屏幕
      renderer.setSize(width, height)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      container.appendChild(renderer.domElement)
      // container.appendChild(stats.dom)
      renderCloudMove_first = initCloudMove(cloudParameter_first, 0.0002)
      renderCloudMove_second = initCloudMove(
        cloudParameter_second,
        0.0008,
        0.001
      )
    }

    //动画刷新
    const animate = () => {
      requestAnimationFrame(animate)
      renderSphereRotate()
      renderStarMove()
      renderCloudMove_first()
      renderCloudMove_second()
      renderer.render(scene, camera)
    }

    // 获取验证码
    const getValidateCodeHandle = async () => {
      // 请求获取验证码 并设置验证码的图片以及验证码token
      state.codeSrc = ''
      state.codetoken = ''
    }

    const refsState = toRefs(state)
    let locale = 'en'
    const activeIndex = '1'
    const year = new Date().getFullYear()

    const partners = [
      { url: require('@/assets/images/home/apple-developer.png') },
      { url: require('@/assets/images/home/aws.png') },
      { url: require('@/assets/images/home/microsoft.png') }
    ]
    let toggleLang = lang => {
      locale = lang
    }
    const changeOrganization = () => {
      if (treeOrganization.value) {
        treeOrganization.value = false
        setTimeout(() => {
          teamOrganization.value = true
        }, 200)
      }
      if (teamOrganization.value) {
        teamOrganization.value = false
        setTimeout(() => {
          treeOrganization.value = true
        }, 200)
      }
    }
    const handlePictureCardPreview = url => {
      if (url) {
        srcList.splice(0, 1, url)
        dialogVisible.value = true
      }
    }
    const closeViewer = () => {
      dialogVisible.value = false
    }

    const sortByName = (arr, order = 'asc')=> {
      return arr.slice().sort((a, b) => {
        return order === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
      });
    }


    const sortMembers = sortByName(members)
    const checkBackgroundColor = index => {
      let linearColor = ''
      switch (index % 5) {
        case 0:
          linearColor = 'rgba(245, 108, 108, 0.4),rgba(245, 108, 108, 0.2)'
          break
        case 1:
          linearColor = 'rgba(245, 108, 108, 0.35),rgba(245, 108, 108, 0.1)'
          break
        case 2:
          linearColor = 'rgba(245, 108, 108, 0.2),rgba(64, 158, 255, 0.2)'
          break
        case 3:
          linearColor = 'rgba(64, 158, 255, 0.1),rgba(64, 158, 255, 0.35)'
          break
        case 4:
          linearColor = 'rgba(64, 158, 255, 0.2),rgba(64, 158, 255, 0.4)'
          break
      }
      let floor = Math.floor(sortMembers.length / 5)
      if (index >= floor * 5) {
        let maxium = sortMembers.length % 5
        if (maxium === 1) {
          linearColor = 'rgba(245, 108, 108, 0.2),rgba(64, 158, 255, 0.2)'
        } else if (maxium === 2) {
          if (index % 5 === 0) {
            linearColor = 'rgba(245, 108, 108, 0.35),rgba(255, 255, 255, 0.2)'
          } else if (index % 5 === 1) {
            linearColor = 'rgba(255, 255, 255, 0.2),rgba(64, 158, 255, 0.35)'
          }
        } else if (maxium === 3) {
          if (index % 5 === 0) {
            linearColor = 'rgba(245, 108, 108, 0.35),rgba(245, 108, 108, 0.2)'
          } else if (index % 5 === 1) {
            linearColor = 'rgba(245, 108, 108, 0.2),rgba(64, 158, 255, 0.2)'
          } else if (index % 5 === 2) {
            linearColor = 'rgba(64, 158, 255, 0.2),rgba(64, 158, 255, 0.35)'
          }
        } else if (maxium === 4) {
          if (index % 5 === 0) {
            linearColor = 'rgba(245, 108, 108, 0.35),rgba(245, 108, 108, 0.2)'
          } else if (index % 5 === 1) {
            linearColor = 'rgba(245, 108, 108, 0.35),rgba(255, 255, 255, 0.2)'
          } else if (index % 5 === 2) {
            linearColor = 'rgba(255, 255, 255, 0.2),rgba(64, 158, 255, 0.2)'
          } else if (index % 5 === 3) {
            linearColor = 'rgba(64, 158, 255, 0.2),rgba(64, 158, 255, 0.35)'
          }
        }
      }
      return linearColor
    }
    return {
      ...refsState,
      getValidateCodeHandle,
      locale,
      activeIndex,
      year,
      sortMembers,
      partners,
      toggleLang,
      organization,
      changeOrganization,
      treeOrganization,
      teamOrganization,
      srcList,
      dialogVisible,
      closeViewer,
      handlePictureCardPreview,
      checkBackgroundColor
    }
  }
  // data() {
  //   return {
  //     activeIndex: '1',
  //     locale: 'en',
  //     year: new Date().getFullYear(),
  //     members: [
  //       {
  //         picAdult: require('@/assets/images/images/home/aleksandra-simovic-adult.jpg'),
  //         picChild: require('@/assets/images/images/home/aleksandra-simovic-kid.jpg'),
  //         name: 'Aleksandra Simovic',
  //         job: 'Marketing Manager',
  //         childJob: 'Wanted to be a detective'
  //       },
  //       {
  //         picAdult: require('@/assets/images/images/home/aleksandra-simovic-adult.jpg'),
  //         picChild: require('@/assets/images/images/home/aleksandra-simovic-kid.jpg'),
  //         name: 'Aleksandra Simovic',
  //         job: 'Marketing Manager',
  //         childJob: 'Wanted to be a detective'
  //       },
  //       {
  //         picAdult: require('@/assets/images/images/home/aleksandra-simovic-adult.jpg'),
  //         picChild: require('@/assets/images/images/home/aleksandra-simovic-kid.jpg'),
  //         name: 'Aleksandra Simovic',
  //         job: 'Marketing Manager',
  //         childJob: 'Wanted to be a detective'
  //       },
  //       {
  //         picAdult: require('@/assets/images/images/home/aleksandra-simovic-adult.jpg'),
  //         picChild: require('@/assets/images/images/home/aleksandra-simovic-kid.jpg'),
  //         name: 'Aleksandra Simovic',
  //         job: 'Marketing Manager',
  //         childJob: 'Wanted to be a detective'
  //       },
  //       {
  //         picAdult: require('@/assets/images/images/home/aleksandra-simovic-adult.jpg'),
  //         picChild: require('@/assets/images/images/home/aleksandra-simovic-kid.jpg'),
  //         name: 'Aleksandra Simovic',
  //         job: 'Marketing Manager',
  //         childJob: 'Wanted to be a detective'
  //       },
  //       {
  //         picAdult: require('@/assets/images/images/home/aleksandra-simovic-adult.jpg'),
  //         picChild: require('@/assets/images/images/home/aleksandra-simovic-kid.jpg'),
  //         name: 'Tsai',
  //         job: 'Coder',
  //         childJob: 'Wanted to be a liberals'
  //       },
  //       {
  //         picAdult: require('@/assets/images/images/home/xiaozhu-adult.jpg'),
  //         picChild: require('@/assets/images/images/home/xiaozhu-kid.jpg'),
  //         name: 'Xiao Zhu',
  //         job: 'Coder',
  //         childJob: 'Wanted to be a fisher'
  //       }
  //     ],
  //     partners: [
  //       { url: require('@/assets/images/images/home/apple-developer.png') },
  //       { url: require('@/assets/images/images/home/aws.png') },
  //       { url: require('@/assets/images/images/home/microsoft.png') }
  //     ]
  //   }
  // },
  // created() {},
  // mounted() {
  //   require('@/plugins/mouse-click.js')
  //   this.initThree()
  // },
  // methods: {
  //   initThree() {
  //     container = document.getElementById('login-three-container')
  //     width = container.clientWidth
  //     height = container.clientHeight
  //   },
  //   initScene() {},
  //   toggleLang(lang) {
  //     this.locale = lang
  //   },
  //   handleSelect(key, keyPath) {
  //     console.log(key, keyPath)
  //   },
  //   scrollToTop(number = 0, time) {
  //     if (!time) {
  //       document.body.scrollTop = document.documentElement.scrollTop = number
  //       return number
  //     }
  //     const spacingTime = 20 // 设置循环的间隔时间  值越小消耗性能越高
  //     let spacingInex = time / spacingTime // 计算循环的次数
  //     let nowTop = document.body.scrollTop + document.documentElement.scrollTop // 获取当前滚动条位置
  //     let everTop = (number - nowTop) / spacingInex // 计算每次滑动的距离
  //     let scrollTimer = setInterval(() => {
  //       if (spacingInex > 0) {
  //         spacingInex--
  //         ScrollTop((nowTop += everTop))
  //       } else {
  //         clearInterval(scrollTimer) // 清除计时器
  //       }
  //     }, spacingTime)
  //   },
  //   goToW3() {
  //     window.open(
  //       'https://inside.bosch.com/irj/portal/?NavigationTarget=HLPFS://wcms_rgap_Bosch_20GlobalNet/wcms_rgap_02_20Organization/wcms_rgap_Regional_20Subsidiaries_20RG/wcms_rgap_RB_CN/wcms_rgap_organization/wcms_rgap_rbac/wcms_rgap_02_rbac_organization/wcms_rgap_product_divisions_1/wcms_rgap_xc_cn/wcms_rgap_organization_336/wcms_rgap_business_units_/wcms_rgap_xc_da_pj_w3/wcms_rgap_organization_20/wcms_rgap_xc_da_pj_w3_pmt'
  //     )
  //   }
  // }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.home {
  position: relative;
  height: 100%;
  .navbar {
    // position: sticky;
    // top: 100px;
    background-image: linear-gradient(284deg, #0094d4, #0066c8);
    position: absolute;
    width: 100%;
    padding: 2rem 0;
    z-index: 999;
    .title {
      font-weight: 800;
      font-family: 'Poppins Bold';
      font-size: 2.75rem;
      margin-top: 0;
      line-height: 1.1;
      color: #fff;
    }
    .lang-switch {
      display: flex;
      padding: 0 0.9375rem 0 0;
      margin: 0;
      list-style-type: none;
      .lang-switch-item {
        cursor: pointer;
        .lang-switch-link {
          opacity: 0.5;
          display: inline-block;
          text-transform: uppercase;
          padding: 0.625rem;
          font-family: 'Work Sans Semibold';
          letter-spacing: 1px;
          color: #fff;
          font-size: 0.75rem;
        }
      }
      .lang-switch-item.active {
        .lang-switch-link {
          opacity: 1;
        }
      }
    }
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-menu {
        background: transparent;
        // .el-menu--horizontal > .el-sub-menu :deep(.el-sub-menu__title):hover {
        //   background-color: transparent;
        // }
        // .el-sub-menu :deep(.el-sub-menu__title):hover{
        //   background-color: transparent;
        // }
        .el-sub-menu {
          .el-sub-menu__title {
            color: #fff;
            &:hover {
              background-color: transparent;
            }
            &::before,
            &::after {
              content: '';
              position: absolute;
              bottom: 5px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              opacity: 0;
              height: 2px;
              background: #fff;
              transition: all 0.3s cubic-bezier(0.63, -0.32, 0.4, 1.39);
            }
            &:hover {
              &::before,
              &::after {
                width: 50%;
                opacity: 1;
              }
            }
          }
        }
        .el-menu-item {
          height: auto;
          line-height: inherit;
          color: #fff;
          text-transform: uppercase;
          display: inline-block;
          padding: 0.625rem 1.375rem;
          font-size: 0.75rem;
          font-family: 'Work Sans Semibold';
          letter-spacing: 1px;
          &.is-active {
            color: #fff !important;
          }
          &::before,
          &::after {
            content: '';
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            opacity: 0;
            height: 2px;
            background: #fff;
            transition: all 0.3s cubic-bezier(0.63, -0.32, 0.4, 1.39);
          }
          &:hover {
            &::before,
            &::after {
              width: 50%;
              opacity: 1;
            }
          }
        }
        &.el-menu--horizontal,
        & > .el-menu-item.is-active {
          border-bottom: none;
        }
        & > .el-menu-item:not(.is-disabled):hover,
        & > .el-menu-item:not(.is-disabled):focus {
          background-color: transparent;
        }
      }
    }
  }
  .banner {
    width: 100%;
    min-height: 30.625rem;
    // background-image: linear-gradient(284deg, #0094d4, #0066c8);
    display: flex;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
    position: relative;
    &.login-container {
      width: 100%;
      height: 100vh;
      #login-three-container {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .login-plane {
        position: absolute;
        z-index: 9999;
        width: 600px;
        height: 40%;
        // background-image: url('~@/assets/images/images/login_border.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .login-plane-container {
          width: 100%;
          height: 100%;
          border-radius: 18px;
          // background-color: #007eff2e;
          position: relative;
          @keyframes humanMove {
            0% {
              top: -100px;
            }
            25% {
              top: -120px;
            }
            50% {
              top: -100px;
            }
            75% {
              top: -80px;
            }
            100% {
              background: -100px;
            }
          }
          .login-plane-human {
            position: absolute;
            width: 260px;
            right: -120px;
            top: -100px;
            animation: humanMove 8s linear 0s infinite normal;
          }
          .login-plane-title {
            width: 100%;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            font-size: 35px;
            color: #fff;
            font-weight: 700;
            img {
              width: 50%;
            }
            .login-plane-title-line {
              width: 80%;
              position: absolute;
              bottom: 0;
            }
          }
          .login-plane-form {
            padding: 45px 55px;
            box-sizing: border-box;
            .login-code-container {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              .login-code {
                cursor: pointer;
                width: 45%;
                height: 40px;
                background-color: #c8c8c8;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
      }
      .login-ground {
        position: absolute;
        // z-index: 9998;
        width: 100%;
        height: 40%;
        background-image: url('~@/assets/images/images/ground.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        bottom: 0;
        left: 0;
      }
    }
    .section-header {
      margin-bottom: 5.375rem;
      z-index: 1;
      position: relative;
      .section-subtitle {
        font-size: 14px;
        line-height: 2.14;
        letter-spacing: 0.9px;
        display: inline-block;
        margin-bottom: 0.75rem;
        text-transform: uppercase;
        color: #fff;
      }
      .section-title {
        font-family: 'Poppins Bold';
        font-size: 2.75rem;
        color: #fff;
        margin-top: 0;
        letter-spacing: -0.7px;
        margin-bottom: 3.375rem;
        line-height: 1.1;
        text-align: left;
        span {
          // display: block;
        }
      }
    }
    .img-holder {
      max-width: 37.5rem;
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 0;
    }
  }
  .about-content.section {
    position: relative;
    padding-top: 6.875rem;
    padding-bottom: 5.625rem;
    .section-header {
      .title-decor {
        padding-bottom: 2.9375rem;
        margin-bottom: 2.0625rem;
        position: relative;
        &::before {
          position: absolute;
          content: '';
          height: 2px;
          width: 26px;
          background: #06c;
          left: 0;
          bottom: 0;
        }
      }
      .section-title {
        font-family: 'Poppins Bold';
        font-size: 2.75rem;
        color: #232323;
        margin-top: 0;
        letter-spacing: -0.7px;
        margin-bottom: 3.375rem;
        line-height: 1.1;
        font-weight: 800;
        .title {
          background-image: linear-gradient(
            90deg,
            rgb(240, 161, 168) 0%,
            rgb(240, 156, 90) 25%,
            rgb(131, 203, 172) 50%,
            rgb(240, 156, 90) 75%,
            rgb(240, 161, 168) 100%
          );
          background-size: 200%;
          animation: title-flow 2.5s linear infinite;
          // letter-spacing: 0.15em;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes title-flow {
          0% {
            background-position: 0%;
          }
          100% {
            background-position: 200%;
          }
        }
      }
      .text {
        max-width: 60%;
      }
    }
    .text {
      color: #232323;
      font-size: 18px;
      font-style: italic;
      font-family: 'Work Sans';
      font-size: 16px;
      line-height: 1.75;
      letter-spacing: normal;
    }
  }
  .section-header {
    text-align: center;
    .section-title {
      display: inline-block;
      font-family: 'Poppins Bold';
      font-size: 2.75rem;
      color: #232323;
      margin-top: 0;
      letter-spacing: -0.7px;
      margin-bottom: 3.375rem;
      line-height: 1.1;
      font-weight: 800;
      text-align: center;
      position: relative;
      .organization-switch {
        position: absolute;
        right: -55px;
        top: 12px;
      }
    }
  }

  .clearfix::after {
    content: '';
    /* 伪元素添加的标签是行内, 要求块 */
    display: block;
    clear: both;
    /* 补充代码：在网页中看不到伪元素 */ /* 为了兼容性 */
    height: 0;
    visibility: hidden;
  }
  .members {
    position: relative;
    // .team-container {
    //   transition: all .3s;
    // }
    .tree {
      width: 1806px;
      // .tree * {
      //   margin: 0;
      //   padding: 0;
      // }

      & > ul > li:only-child::after,
      & > ul > li:only-child::before {
        display: none;
      }
      ul {
        padding-top: 20px;
        position: relative;

        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
      }
      & > ul,
      & > ul > li {
        padding-top: 0;
      }

      li {
        float: left;
        text-align: center;
        list-style-type: none;
        position: relative;
        padding: 20px 5px 0 5px;

        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
      }

      /*We will use ::before and ::after to draw the connectors*/

      li::before,
      li::after {
        content: '';
        position: absolute;
        top: 0;
        right: 50%;
        border-top: 1px solid #8dc63f;
        width: 50%;
        height: 20px;
      }
      li::after {
        right: auto;
        left: 50%;
        border-left: 1px solid #8dc63f;
      }

      /*We need to remove left-right connectors from elements without
any siblings*/
      // li:only-child::after,
      // li:only-child::before {
      //   display: none;
      // }

      /*Remove space from the top of single children*/
      li:only-child {
        // padding-top: 0;
      }

      /*Remove left connector from first child and
right connector from last child*/
      li:first-child::before,
      li:last-child::after {
        border: 0 none;
      }

      /*Adding back the vertical connector to the last nodes*/
      li:last-child::before {
        border-right: 1px solid #8dc63f;
        border-radius: 0 5px 0 0;
        -webkit-border-radius: 0 5px 0 0;
        -moz-border-radius: 0 5px 0 0;
      }
      li:first-child::after {
        border-radius: 5px 0 0 0;
        -webkit-border-radius: 5px 0 0 0;
        -moz-border-radius: 5px 0 0 0;
      }

      /*Time to add downward connectors from parents*/
      ul ul::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        border-left: 1px solid #8dc63f;
        width: 0;
        height: 20px;
      }

      li a {
        border: 1px solid #8dc63f;
        padding: 1em 0.75em;
        text-decoration: none;
        color: #666767;
        font-family: arial, verdana, tahoma;
        font-size: 0.85em;
        display: inline-block;

        /*
	border-radius: 5px;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
  */

        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
      }

      /* -------------------------------- */
      /* Now starts the vertical elements */
      /* -------------------------------- */

      ul.vertical,
      ul.vertical ul {
        // padding-top: 0px;
        left: 50%;
        padding: 0;
      }

      /* Remove the downward connectors from parents */
      ul ul.vertical::before {
        display: none;
      }

      ul.vertical li {
        float: none;
        text-align: left;
      }

      ul.vertical li::before {
        right: auto;
        border: none;
      }

      ul.vertical li::after {
        display: none;
      }

      ul.vertical li a {
        padding: 10px 0.75em;
        margin-left: 16px;
      }

      ul.vertical li::before {
        top: -20px;
        left: 0px;
        border-bottom: 1px solid #8dc63f;
        border-left: 1px solid #8dc63f;
        width: 20px;
        height: 60px;
      }

      ul.vertical li:first-child::before {
        top: 0px;
        height: 40px;
      }

      /* Lets add some extra styles */

      & > ul > li > ul > li > a {
        width: 11em;
      }

      & > ul > li > a {
        font-size: 1em;
        font-weight: bold;
      }

      /* ------------------------------------------------------------------ */
      /* Time for some hover effects                                        */
      /* We will apply the hover effect the the lineage of the element also */
      /* ------------------------------------------------------------------ */
      & li a:hover,
      & li a:hover + ul li a {
        background: #8dc63f;
        color: white;
        /* border: 1px solid #aaa; */
      }
      /*Connector styles on hover*/
      & li a:hover + ul li::after,
      & li a:hover + ul li::before,
      & li a:hover + ul::before,
      & li a:hover + ul ul::before {
        border-color: #aaa;
      }
    }
    .team {
      // opacity: 0;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin: 0 auto 4.25rem;
      .team-member {
        max-width: 20%;
        flex: 0 0 20%;
        padding: 0 15px;
        position: relative;
        margin-bottom: 2.25rem;
        perspective: 1000px;
        transform: translate3d(0, 0, 0);
        .card {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.63, -0.32, 0.4, 1.39),
            -webkit-transform 0.6s cubic-bezier(0.63, -0.32, 0.4, 1.39);
          backface-visibility: hidden;

          .card-front {
            transition: 0.6s;
            perspective: preserve-3d;
            backface-visibility: hidden;
            transform: rotateY(0);
            width: 100%;
            img {
              // FILTER: Alpha( style=1,opacity=25,finishOpacity=100,startX=50,finishX=100,startY=50,finishY=100);
              // background-image: linear-gradient(to top right, #f6f5f0, #fefefd);
              // filter: hue-rotate(80deg);
              filter: grayscale(80%);
              // filter: hue-rotate(40deg);
              // filter: contrast(60%);
              // filter: drop-shadow(16px 16px 20px red) invert(15%);
            }
          }
          .card-back {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            transition: 0.6s;
            backface-visibility: hidden;
            transform: rotateY(-180deg);
            transform-style: preserve-3d;
            transition-property: transform, -webkit-transform;
          }
          .team-member__image {
            padding-top: 100%;
            position: relative;
            margin-bottom: 1.25rem;
            .img-holder {
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              .img-mask {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                height: 100%;
                width: 100%;
              }
              img,
              .el-image {
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #fff;
                width: 100vw;
                height: 100vh;
                object-fit: cover;
                max-width: 100%;
                max-height: 100%;
                font-size: 30px;
                color: #909399;
              }
            }
            figure,
            ul {
              margin: 0;
              padding: 0;
            }
          }
          .team-member__title {
            font-family: 'Poppins Bold';
            font-size: 16px;
            margin-bottom: 0.25rem;
          }
          .team-member__subtitle {
            font-size: 14px;
            color: #8ca5c6;
          }
        }
        &:hover {
          .card {
            .card-front {
              transform: rotateY(180deg);
            }
            .card-back {
              transform: rotateY(0);
            }
          }
        }
      }
    }
  }
  .partners-section {
    .section-title {
      margin-bottom: 0.625rem;
    }
    .partners {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      .img-holder {
        flex: 0 0 16.666667%;
        max-width: 16.666667%;
        padding: 0 15px;
        img {
          max-width: 100%;
        }
      }
    }
  }
  .section-footer.section {
    padding-bottom: 1.54375rem;
    .row {
      display: flex;
      margin-bottom: 2.4375rem;
      .footer-logo__section {
        max-width: 31%;
        flex: 0 0 31%;
        .footer-logo__link {
          display: inline-block;
          margin-bottom: 0.6875rem;
          .footer-logo {
            max-height: 14.7px;
          }
        }
        .text {
          font-size: 20px;
          line-height: 1.45;
          color: #8ca5c6;
          max-width: 75%;
        }
      }
      .footer-item {
        max-width: 23%;
        flex: 0 0 23%;
        padding-top: 2.25rem;
        .text {
          font-family: 'Work Sans';
          font-size: 16px;
          line-height: 1.75;
          letter-spacing: normal;
          color: #232323;
          a {
            background-color: transparent;
            text-decoration: none;
            color: #0062c2;
          }
        }
        .footer-item__title {
          display: flex;
          align-items: center;
          font-size: 15px;
          line-height: 1.25rem;
          margin-bottom: 0.375rem;
          font-family: 'Poppins Semibold';
          font-weight: 600;
          i {
            color: #88a3c9;
            font-size: 1.25rem;
            margin-right: 5px;
          }
        }
        .footer-item .text {
          line-height: 1.5;
          font-family: 'Work Sans';
          font-size: 16px;
          letter-spacing: normal;
        }
      }
    }
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      .copyright {
        font-size: 14px;
        color: rgba(68, 68, 68, 0.4);
        margin: 0;
      }
      .scroll-top {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #444;
        font-family: 'Poppins Medium';
        line-height: 1.3;
        font-size: 12px;
        text-transform: uppercase;
        i {
          line-height: 1.3;
          color: #06c;
          margin-left: 10px;
          font-weight: 600;
          font-size: 20px;
        }
      }
    }
  }
  .section-bg {
    background: #f8f8f8;
  }
  .section {
    padding: 5.75rem 24px 0;
    // overflow: hidden;
  }
}
.container {
  margin: 0 auto;
  width: 100%;
}
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
</style>
