import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//以下代码解决路由地址重复点击的报错问题
const originalPush = Router.prototype.push
   Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/login',
      component: resolve => require(['@/views/login/login'], resolve),
      meta: {
        hideNav: true,
        withoutAuth: true // 无权限控制
      },
    },
    {
      path: '/error',
      component: resolve => require(['@/components/error'], resolve),
      meta: {
        hideNav: true,
        withoutAuth: true // 无权限控制
      },
    },
    {
      path: '/userinfo',
      component: resolve => require(['@/views/userinfo/index'], resolve),
      meta: {
        withoutAuth: true // 无权限控制
      },
    },
    {
      path: '/analyse',
      component: resolve => require(['@/views/analyse/index'], resolve),
      children:[
        // {
        //   path: '/index',
        //   redirect: '/index/page0'
        // },
        {
          path: '/index',
          component: resolve => require(['@/views/index/index'], resolve),
          children: [
            {
              path: '/',
              component: resolve => require(['@/views/index/page1'], resolve)
            },
            {
              path: 'page0',
              name: 'page0',
              component: resolve => require(['@/views/index/page0'], resolve)
            },
            {
              path: 'page1',
              name: 'page1',
              component: resolve => require(['@/views/index/page1'], resolve)
            },
            {
              path: 'page2',
              name: 'page2',
              component: resolve => require(['@/views/index/page2'], resolve)
            },
            {
              path: 'page3',
              name: 'page3',
              component: resolve => require(['@/views/index/page3'], resolve)
            },
            {
              path: 'page4',
              name: 'page4',
              component: resolve => require(['@/views/index/page4'], resolve)
            },
            {
              path: 'page4_detail',
              name: 'page4_detail',
              component: resolve => require(['@/views/index/page4_detail'], resolve)
            }
          ]
        },
        {
          path: 'ydwryyzt',  // 移动污染源一张图 -> 遥感检测综合分析
          name: 'ydwryyzt',
          component: resolve => require(['@/views/ydwryyzt/index'], resolve)
        },
        {
          path: 'yqhs',  // 移动污染源一张图 -> 油气回收
          name: 'yqhs',
          component: resolve => require(['@/views/ydwryyzt/yqhs'], resolve)
        },
        {
          path: 'lbzsjfx',  // 移动污染源一张图 -> 路边站数据分析
          name: 'lbzsjfx',
          component: resolve => require(['@/views/ydwryyzt/lbzsjfx'], resolve)
        },
        {
          path: 'jgfx',  // 移动污染源一张图 -> 机动车排放检验机构分析
          name: 'jgfx',
          component: resolve => require(['@/views/ydwryyzt/jgfx'], resolve)
        },
        {
          path: 'dwfx',  // 移动污染源一张图 -> 遥感检测点位分析
          name: 'dwfx',
          component: resolve => require(['@/views/ydwryyzt/dwfx'], resolve)
        },
        {
          path: 'jxfx',  // 移动污染源一张图 -> 非道路移动机械分析
          name: 'jxfx',
          component: resolve => require(['@/views/ydwryyzt/jxfx'], resolve)
        },
        {
          path: 'heavyCar',  // 移动污染源一张图 -> 非道路移动机械分析
          name: 'heavyCar',
          component: resolve => require(['@/views/ydwryyzt/heavyCar'], resolve)
        },
        // {
        //   path: 'obd',  // 移动污染源一张图 -> 非道路移动机械分析
        //   name: 'obd',
        //   component: resolve => require(['@/views/ydwryyzt/obd'], resolve)
        // },
        {
          path: 'obd',  // 移动污染源一张图 -> 非道路移动机械分析
          name: 'obd',
          component: resolve => require(['@/views/ydwryyzt/obd-map'], resolve)
        },
        {
          path: 'ccfx',  // 移动污染源一张图 -> 非道路移动机械分析
          name: 'ccfx',
          component: resolve => require(['@/views/ydwryyzt/ccfx'], resolve)
        },
        {
          path: 'mjxt',  // 移动污染源一张图 -> 门禁系统综合分析
          name: 'mjxt',
          component: resolve => require(['@/views/ydwryyzt/mjxt'], resolve)
        },
        {
          path: 'mz',  // 移动污染源一张图 -> m站
          name: 'mz',
          component: resolve => require(['@/views/ydwryyzt/mz'], resolve)
        },
        {
          path: 'xcxsccjgfx',  // 移动污染源一张图 -> 新车销售抽测监管分析
          name: 'xcxsccjgfx',
          component: resolve => require(['@/views/ydwryyzt/xcxsccjgfx'], resolve)
        },
        {path: 'ssj',  // 移动污染源一张图 -> 双随机任务统计分析
          name: 'ssj',
          component: resolve => require(['@/views/ydwryyzt/ssj'], resolve)
        },
        {
          path: 'jdchypfjc',  // 机动车黑烟排放检测
          name: 'jdchypfjc',
          // component: resolve => require(['@/views/offGas/map'], resolve)
          component: resolve => require(['@/views/analyse/jdchypfjc'], resolve)
        },
        {
          path: 'ydwryajts',  // 移动污染源案件推送
          name: 'ydwryajts',
          component: resolve => require(['@/views/analyse/ydwryajts'], resolve)
        },
        {
          path: 'czplgz',  // 移动污染源车主批量告知
          name: 'czplgz',
          component: resolve => require(['@/views/analyse/czplgz'], resolve)
        },
        {
          path: 'xcxsccjg',  // 移动污染源车主批量告知
          name: 'xcxsccjg',
          component: resolve => require(['@/views/analyse/xcxsccjg'], resolve)
        },
        {
          path: '/archives',
          name: 'archives',
          component: resolve => require(['@/views/archives/index'], resolve)
        },
        {
          path: '/offGes',
          name: 'offGas',
          component: resolve => require(['@/views/offGas/index'], resolve)
        },
        // {
        //   path: '/match',
        //   name: 'match',
        //   component: resolve => require(['@/views/offGas/match'], resolve)
        // },
        {
          path: '/zfxt/data',
          name: 'data',
          component: resolve => require(['@/views/handleSystem/data'], resolve)
        },
        {
          path: '/zfxt/rwpf',
          name: 'rwpf',
          component: resolve => require(['@/views/handleSystem/task/rwpf'], resolve)
        },
        {
          path: '/zfxt/doubleRandom',
          name: 'doubleRandom',
          component: resolve => require(['@/views/handleSystem/task/doubleRandom'], resolve)
        },
        {
          path: '/zfxt/dbrw',
          name: 'dbrw',
          component: resolve => require(['@/views/handleSystem/task/dbrw'], resolve)
        },
        {
          path: '/zfxt/ybrw',
          name: 'ybrw',
          component: resolve => require(['@/views/handleSystem/task/dbrw'], resolve)
        },
        {
          path: '/zfxt/rwwcl',
          name: 'rwwcl',
          component: resolve => require(['@/views/handleSystem/work/rwwcl'], resolve)
        },
        {
          path: '/zfxt/rycyl',
          name: 'rycyl',
          component: resolve => require(['@/views/handleSystem/work/zxrws'], resolve)
        },
        {
          path: '/zfxt/zxrws',
          name: 'zxrws',
          component: resolve => require(['@/views/handleSystem/work/rycyl'], resolve)

        },
        {
          path: '/zfxt/rwcx',
          name: 'rwcx',
          component: resolve => require(['@/views/handleSystem/task/dbrw'], resolve)
          // component: resolve => require(['@/views/handleSystem/info/rwcx'], resolve)
        },
        {
          path: '/zfxt/detail',
          name: 'detail',
          component: resolve => require(['@/views/handleSystem/info/children/detail'], resolve)
        },
        {
          path: '/zfxt/ycyd',
          name: 'ycyd',
          component: resolve => require(['@/views/handleSystem/info/ycyd'], resolve)
        },
        {
          path: '/zfxt/ycydDetail',
          name: 'ycyd',
          component: resolve => require(['@/views/handleSystem/info/children/ycydDetail'], resolve)
        },
        {
          path: '/zfxt/sccx',
          name: 'sccx',
          component: resolve => require(['@/views/handleSystem/info/sccx'], resolve)
        },
        {
          path: '/system',
          component: resolve => require(['@/views/system/index'], resolve),
          children: [
            {
              path: 'role',
              // name: 'role',
              component: resolve => require(['@/views/system/role'], resolve)
            },
            {
              path: 'user',
              // name: 'user',
              component: resolve => require(['@/views/system/user'], resolve)
            },
            {
              path: 'menu',
              // name: 'user',
              component: resolve => require(['@/views/system/menu'], resolve)
            },
            {
              path: 'ssj',
              // name: 'user',
              component: resolve => require(['@/views/system/doubleRandom'], resolve)
            },
            {
              path: 'notice',
              // name: 'user',
              component: resolve => require(['@/views/system/notice'], resolve)
            },
            {
              path: 'dict',
              // name: 'user',
              component: resolve => require(['@/views/system/dict/index'], resolve)
            },
            {
              path: 'questions',
              // name: 'user',
              component: resolve => require(['@/views/system/questions'], resolve)
            },
            {
              path: 'schedule',
              // name: 'user',
              component: resolve => require(['@/views/system/schedule/schedule'], resolve)
            },
			      {
              path: 'hbsc',
              // name: 'user',
              component: resolve => require(['@/views/system/hbsc'], resolve)
            },
            {
              path: 'zfdxgl',
              // name: 'user',
              component: resolve => require(['@/views/system/zfdxgl'], resolve)
            },
            {
              path: 'warn',
              // name: 'user',
              component: resolve => require(['@/views/system/warningRule'], resolve)
            },
            {
              path: 'dxfs',
              // name: 'user',
              component: resolve => require(['@/views/system/dxfs'], resolve)
            }
          ]
        }
      ]
    },

  ]
})
