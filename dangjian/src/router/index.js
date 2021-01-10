import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/Home/Home.vue")
  },
  {
    path: "/task",
    // name: "task",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../components/container.vue"),
    children: [
      {
        path: "/",  // 任务
        name: 'index',
        component: () => import("../views/Task/index.vue"),
        meta: {
          title: '会议管理'
        }
      },
      {
        path: "send",  // 任务派发
        name: 'send',
        component: () => import("../views/Task/send.vue"),
        meta: {
          title: '发布会议',
          keepAlive: true
        }
      },
      {
        path: "detail",  // 任务办理-详情页
        name: 'taskDetail',
        component: () => import("../views/Task/detail.vue"),
        meta: {
          title: '会议详情'
        }
      },

    

    ]
  },
  // 人员信息
  {
    path: "/info",
    component: () => import("../components/container.vue"),
    children: [
      {
        path: '/',
        component: () => import("../views/info/index.vue"),
        meta: {
          title: '党组织人员信息'
        },
      },
      
      {
        name:'infoDetail',
        path: 'task/detail',
        component: () => import("../views/info/detail.vue"),
        meta: {
          title: '党组织人员详情'
        }
      },
  
    ]
  },

  // 时事要闻
  {
    path: "/news",
    component: () => import("../components/container.vue"),
    children: [
      {
        path: '/',
        component: () => import("../views/news/index.vue"),
        meta: {
          title: '时事要闻'
        }
      }, 
      {
        path: '/news/detail',
        component: () => import("../views/news/detail.vue"),
        meta: {
          title: '时事要闻详情'
        }
      },
      {
        path: '/news/send',
        component: () => import("../views/news/send.vue"),
        meta: {
          title: '时事要闻发布'
        }
      },
      
    ]
  },

  // 党建动态
  {
    path: "/dangjian",
    component: () => import("../components/container.vue"),
    children: [
      {
        path: '/',
        component: () => import("../views/dangjian/index.vue"),
        meta: {
          title: '党建动态'
        }
      }, 
      {
        path: '/dangjian/detail',
        component: () => import("../views/dangjian/detail.vue"),
        meta: {
          title: '党建动态详情'
        }
      },
      {
        path: '/dangjian/send',
        component: () => import("../views/dangjian/send.vue"),
        meta: {
          title: '党建动态发布'
        }
      },
      
    ]
  },
  {
    path: "/user",
    component: () => import("../components/container.vue"),
    children: [
      {
        path: '/',
        component: () => import("../views/user/index.vue"),
        meta: {
          title: '个人信息'
        }
      }
    ]
  },
  
];

const router = new VueRouter({
  mode:'hash',
  routes,
  base:'/dddj/'
});

// router.beforeEach((to,from,next)=>{
//   // console.log(to);
//   // console.log(from);
//   let fullPath = from.fullPath
//   if(fullPath=='/task/done') to.meta.title = '已办任务详情'
//   if(fullPath=='/task/todo') to.meta.title = '待办任务详情'
//   if(fullPath=='/task/ssj') to.meta.title = '双随机任务详情'
//   next();
// })

export default router;
