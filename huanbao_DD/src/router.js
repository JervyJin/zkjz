import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from './util/token'

Vue.use(Router)

let router = new Router({
  // mode:"history",
  base: '/jkzf-qd/',
  // redirect重定向
  // meta 可以在页面中用$route.meta来获取里面的数据
  routes: [
    { path: '', redirect: '/home' },
    {
      path: '/home',
      name: 'home',
      component: () =>
        import( './views/home.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/zhifaJilu',
      name: 'zhifaJilu',
      component: () =>
        import( './views/zhifa/zhifaJilu.vue'),
      meta: {
        requiresAuth: false
      }
    },
    // 我的记录详情
    {
      path: '/mydetail',
      name: 'mydetail',
      component: () =>
        import( './views/zhifa/mydetail.vue'),
      meta: {
        requiresAuth: false
      }
    },
    // 所有记录详情
    {
      path: '/alldetail',
      name: 'alldetail',
      component: () =>
        import( './views/zhifa/alldetail.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/zxFaxian',
      name: 'zxFaxian',
      component: () =>
        import( './views/zhifa/zxFaxian.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/paifa',
      name: 'paifa',
      component: () =>
        import( './views/zhifa/paifa.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/paifaDiaocha',
      name: 'paifaDiaocha',
      component: () =>
        import( './views/paifaDetail/paifaDiaocha.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/zuGuan',
      name: 'zuGuan',
      component: () =>
        import( './views/paifaDetail/zuGuan.vue'),
      meta: {
        requiresAuth: false
      }
    },
    
    {
      path: '/daiban',
      name: 'daiban',
      component: () =>
        import( './views/daiban/daiban.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/paifaDiaocha',
      name: 'paifaDiaocha',
      component: () =>
        import( './views/paifaDetail/paifaDiaocha.vue'),
      meta: {
        requiresAuth: false
      }
    },
    
    {
      path: '/zuGuan',
      name: 'zuGuan',
      component: () =>
        import( './views/paifaDetail/zuGuan.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/LeaderReview',
      name: 'LeaderReview',
      component: () =>
        import('./views/daiban/LeaderReview.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/fenXi',
      name: 'fenXi',
      component: () =>
        import( './views/daiban/fenXi.vue'),
      meta: {
        requiresAuth: false
      }
    },
    // 代办-报备-调度
    {
      path: '/diaoDu',
      name: 'diaoDu',
      component: () =>
        import( './views/daiban/diaoDu.vue'),
      meta: {
        requiresAuth: false
      }
    },
    // 导出调度
    {
      path: '/daochu',
      name: 'daochu',
      component: () =>
        import('./views/zhifa/daochu.vue'),
      meta: {
        requiresAuth: false
      }
    },
    // 导出统计
    {
      path: '/tongJi',
      name: 'tongJi',
      component: () =>
        import( './views/zhifa/tongJi.vue'),
      meta: {
        requiresAuth: false
      }
    },
    

    


    {
      path: '/register',
      name: 'register',
      component: () =>
        import( './components/register/register'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: () =>
        import( './components/register/agreement'),
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!getToken()) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    console.log(to.matched)
    next()
  }
})

export default router
