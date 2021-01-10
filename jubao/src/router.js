import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from './util/token'

Vue.use(Router)

let router = new Router({
  // redirect重定向
  // meta 可以在页面中用$route.meta来获取里面的数据
  routes: [
    { path: '', redirect: '/login' },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ './views/login/login'),
      meta: {
        requiresAuth: false
      }
    },

    {
      path: '/register',
      name: 'register',
      component: () =>
        import(/* webpackChunkName: "register" */ './views/register/register'),
      meta: {
        requiresAuth: false
      }
    },
    // 首页路由
    {
      path: '/index',
      name: 'index',
      redirect: '/welcome',
      component: () =>
        import(/* webpackChunkName: "register" */ './views/index'),
      children: [
        {
          path: '/welcome', name: 'welcome', component: () =>
            import('./components/welcome/welcome.vue'),
        },
        {
          path: '/userSet', name: 'userSet', component: () =>
            import('./views/userSet/userSet.vue'),
        },
        {
          path: '/report', name: 'report', component: () =>
            import('./components/report/report.vue'),
        },
        {
          path: '/role', name: 'role', component: () =>
            import('./components/role/role.vue'),
        },
        {
          path: '/menu', name: 'menu', component: () =>
            import('./components/menu/menu.vue'),
        },
        {
          path: '/dept', name: 'dept', component: () =>
            import('./components/dept/dept.vue'),
        },
        {
          path: '/area', name: 'area', component: () =>
            import('./components/area/area.vue'),
        },
        {
          path: '/dict', name: 'dict', component: () =>
            import('./components/dict/dict.vue'),

        },
        {
          path: '/industry', name: 'industry', component: () =>
            import('./components/industry/index'),
        }
      ],
      meta: {
        requiresAuth: false
      }
    },

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
