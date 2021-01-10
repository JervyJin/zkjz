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
          title: '执法任务'
        }
      },
      {
        path: "send",  // 任务派发
        name: 'send',
        component: () => import("../views/Task/send.vue"),
        meta: {
          title: '任务派发',
          keepAlive: true
        }
      },
      {
        path: "todo",  // 任务办理
        name: 'todo',
        component: () => import("../views/Task/todo.vue"),
        meta: {
          title: '待办任务'
        }
      },
      {
        path: 'inputsearch',
        component: () => import("../views/Task/illegalInfo/inputsearch.vue"),
        meta: {
          title: '执法对象查询'
        }
      },
      {
        path: "detail",  // 任务办理-详情页
        name: 'taskDetail',
        component: () => import("../views/Task/detail.vue"),
        meta: {
          title: ''
        }
      },
      {
        path: "detail1",  // 双随机任务办理-详情页
        name: 'taskDetail1',
        component: () => import("../views/Task/detail1.vue"),
        meta: {
          title: ''
        }
      },
      {
        path: "done",  // 任务已办
        name: 'done',
        component: () => import("../views/Task/done.vue"),
        meta: {
          title: '已办任务'
        }
      },
      {
        path: "ssj",  // 任务已办
        name: 'ssj',
        component: () => import("../views/Task/ssj.vue"),
        meta: {
          title: '双随机任务'
        }
      },
      {
        path: "questions",  // 
        name: 'questions',
        component: () => import("../views/Task/illegalInfo/questions.vue"),
        meta: {
          title: '追加固定问题'
        }
      },
      {
        path: "illegal",  // 违法信息
        component: () => import("../views/Task/illegalInfo/container.vue"),
        children: [
          {
            path: '/',
            component: () => import("../views/Task/illegalInfo/index.vue"),
            meta: {
              title: '违法案件信息'
            }
          },
          {
            path: 'xwbl',
            component: () => import("../views/Task/illegalInfo/xwbl.vue"),
            meta: {
              title: '询问笔录'
            }
          },
          {
            path: 'kcbl',
            component: () => import("../views/Task/illegalInfo/kcbl.vue"),
            meta: {
              title: '勘察笔录'
            }
          }
        ]
      },

    ]
  },
  {
    path: "/info",
    component: () => import("../components/container.vue"),
    children: [
      {
        path: '/',
        component: () => import("../views/info/index.vue"),
        meta: {
          title: '信息查询'
        },
      },
      {
        path: 'task',
        component: () => import("../views/info/task.vue"),
        meta: {
          title: '任务查询'
        }
      },
      {
        path: 'task/detail',
        component: () => import("../views/info/detail/index.vue"),
        meta: {
          title: ''
        }
      },
  
      {
        path: 'files',
        component: () => import("../views/info/files.vue"),
        meta: {
          title: '一车一档'
        }
      },
      {
        path: 'detail/files',
        component: () => import("../views/info/detail/files.vue"),
        meta: {
          title: '机动车档案详情'
        }
      },
      {
        path: 'handbook',
        component: () => import("../views/info/handbook.vue"),
        meta: {
          title: '环保手册查询'
        }
      },
      {
        path: 'detail/handbook',
        component: () => import("../views/info/detail/handbook.vue"),
        meta: {
          title: '环保手册详情'
        }
      },
      {
        path: 'data',
        component: () => import("../views/info/data.vue"),
        meta: {
          title: '遥感监测数据查询'
        }
      }
    ]
  },
  {
    path: "/analyse",
    component: () => import("../components/container.vue"),
    children: [
      {
        path: '/',
        component: () => import("../views/analyse/index.vue"),
        meta: {
          title: '统计分析'
        }
      }, 
      {
        path: 'month',
        component: () => import("../views/analyse/month.vue"),
        meta: {
          title: '执法任务日期统计'
        }
      },
      {
        path: 'taskType',
        component: () => import("../views/analyse/taskType.vue"),
        meta: {
          title: '执法任务类型统计'
        }
      },
      {
        path: 'handleAnalyse',
        component: () => import("../views/analyse/handleAnalyse.vue"),
        meta: {
          title: '执法任务分析统计'
        }
      }
    ]
  },
  {
    path: "/work",
    component: () => import("../components/container.vue"),
    children: [
      {
        path: '/',
        component: () => import("../views/work/index.vue"),
        meta: {
          title: '工作考核'
        }
      },
      {
        path: 'finishRate',
        component: () => import("../views/work/finishRate.vue"),
        meta: {
          title: '任务完成率'
        }
      },
      {
        path: 'handleRate',
        component: () => import("../views/work/handleRate.vue"),
        meta: {
          title: '人员执行任务数'
        }
      },
      {
        path: 'attendRate',
        component: () => import("../views/work/attendRate.vue"),
        meta: {
          title: '人员参与率'
        }
      }
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
  {
    path: "/map",
    component: () => import("../components/container.vue"),
    children: [
      {
        path: '/',
        component: () => import("../views/map"),
        meta: {
          title: '地图导航'
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  base:'/ydy_app/'
});

router.beforeEach((to,from,next)=>{
  // console.log(to);
  // console.log(from);
  let fullPath = from.fullPath
  if(fullPath=='/task/done') to.meta.title = '已办任务详情'
  if(fullPath=='/task/todo') to.meta.title = '待办任务详情'
  if(fullPath=='/task/ssj') to.meta.title = '双随机任务详情'
  next();
})

export default router;
