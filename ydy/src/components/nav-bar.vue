<template>
  <div class="nav-bar" :class="isCollapse ? 'nav1' : 'nav2'">
    <!-- <div class="toggle-button" @click="togleCollapse"> ||| </div> -->
    <el-menu
      :default-active="$route.path"
      router
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <!-- text-color="#FFF"
      background-color="transparent"
      active-text-color="#1168D8"-->
      <template v-for="item in treeData">
        <el-menu-item :key="item.title" v-if="!item.children" :index="item.path">
          <i :class="['icon', 'iconfont', item.icon]"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <el-submenu
          :key="item.title"
          v-if="item.children && item.children.length >= 1 && item.title !== item.children[0].title"
          :index="item.path"
        >
          <template slot="title">
            <i :class="['icon', 'iconfont', item.icon]"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
            <el-submenu
              v-if="subItem.children && subItem.children.length > 1 && subItem.children[0] !== subItem.title"
              :index="subItem.path"
            >
              <template slot="title">&emsp;&nbsp;{{subItem.title}}</template>
              <el-menu-item
                v-for="sub in subItem.children"
                :key="sub.path"
                :index="sub.path"
              >&emsp;&emsp;&emsp;&emsp;{{sub.title}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="subItem.path">&emsp;&emsp;{{subItem.title}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { url } from "@/servers/url-config";
import { SortBtn, IconList } from "@/utility/config";
import { transformTree } from "@/utility/transformTree";
export default {
  props: {
    changeSlect: {
      type: String,
    },
    keyPath: {
      type: String,
    },
    imgSrcArr: {
      type: Array,
    },
  },
  computed: {
    // treeData() {
    //   let arr = this.$store.state.menus.menus;
    //   if(!arr.length) {
    //     arr = JSON.parse(sessionStorage.getItem('menus')) || [];
    //   }
    //   let menus = [];
    //   arr.forEach(v => {
    //     if(v.pid !== '0') {
    //       menus.push({
    //         path: v.url,
    //         title: v.funName,
    //         icon: v.icon,
    //         id: v.id,
    //         pid: v.pid
    //       })
    //     }
    //   })
    //   return transformTree(menus);
    // }
  },
  data() {
    return {
      activeIndex: "/index",
      user: null,
      treeData: [
        {
          path: "/index",
          title: "移动污染源门户",
          icon: "icon iconfont icon-yaoganjiance1",
          // children: [],
        },
        {
          path: "/analyse",
          title: "移动污染源一张图",
          icon: "icon iconfont icon-jidongcheyaoganjiancexitong",
          children: [
            {
              icon: "",
              title: "遥感检测综合分析",
              path: "/analyse/ydwryyzt",
              isShow: false,
            },
            // {
            //   'icon': '',
            //   'title': '遥感检测点位分析',
            //   'path': '/analyse/dwfx',
            //   'isShow': false
            // },
            {
              icon: "",
              title: "机动车排放检验机构分析",
              path: "/analyse/jgfx",
              isShow: false,
            },
            {
              icon: "",
              title: "非道路移动机械分析",
              path: "/analyse/jxfx",
              isShow: false,
            },
            // {
            //   'icon': '',
            //   'title': '重型柴油车治理及OBD分析',
            //   'path': '/analyse/obd',
            //   'isShow': false
            // },
            {
              icon: "",
              title: "重型柴油车深度改造",
              path: "/analyse/heavyCar",
              isShow: false,
            },
            {
              icon: "",
              title: "OBD在线监控分析",
              path: "/analyse/obd",
              isShow: false,
            },
            {
              icon: "",
              title: "路检路查综合分析",
              path: "/analyse/ccfx",
              isShow: false,
            },
            {
              icon: "",
              title: "门禁系统综合分析",
              path: "/analyse/mjxt",
              isShow: false,
            },
            {
              icon: "",
              title: "M站数据分析",
              path: "/analyse/mz",
              isShow: false,
            },
            {
              icon: "",
              title: "新车销售抽测监管分析",
              path: "/analyse/xcxsccjgfx",
              isShow: false,
            },

            {
              icon: "",
              title: "双随机任务统计分析",
              path: "/analyse/ssj",
              isShow: false,
            },
            {
              icon: "",
              title: "油气回收数据分析",
              path: "/analyse/yqhs",
              isShow: false,
            },
            {
              icon: "",
              title: "路边站数据分析",
              path: "/analyse/lbzsjfx",
              isShow: false,
            },
          ],
        },
        {
          path: "/archives",
          title: "机动车档案库",
          icon: "icon iconfont icon-jidongchedanganku",
          // children: [],
        },
        {
          path: "/offGes",
          title: "机动车行驶尾气影响分析",
          icon: "icon iconfont icon-zhongxingchaiyouchegaizaozhili",
          // children: [],
        },
        {
          path: "/analyse/jdchypfjc",
          title: "机动车黑烟排放检测",
          icon: "icon iconfont icon-jidongcheheiyanpaifangjiance",
          // children: [],
        },
        {
          path: "/analyse/ydwryajts",
          title: "移动污染源案件推送",
          icon: "icon iconfont icon-yidongwuranyuananjiantuisong",
          // children: [],
        },
        {
          path: "/analyse/czplgz",
          title: "移动污染源车主批量告知",
          icon: "icon iconfont icon-gaozhiwode-",
          // children: [],
        },
        {
          path: "/analyse/xcxsccjg",
          title: "移动污染源新车销售抽测监管",
          icon: "icon iconfont icon-yidongwuranyuanxinchexiaoshouchoucejianguan",
          // children: [],
        },
        {
          path: "/zfxt",
          title: "移动污染源移动执法系统",
          icon: "icon iconfont icon-yidongwuranyuanyidongzhifaxitong",
          children: [
            {
              icon: "",
              title: "数据展示",
              path: "/zfxt/data",
              isShow: false,
            },
            {
              icon: "",
              title: "任务管理",
              path: "/zfxt/rwpf",
              children: [
                {
                  icon: "",
                  title: "任务派发",
                  path: "/zfxt/rwpf",
                },
                {
                  icon: "",
                  title: "双随机任务",
                  path: "/zfxt/doubleRandom",
                },
                {
                  icon: "",
                  title: "待办任务",
                  path: "/zfxt/dbrw",
                },
                {
                  icon: "",
                  title: "已办任务",
                  path: "/zfxt/ybrw",
                },
              ],
            },
            {
              icon: "",
              title: "信息查询",
              path: "/zfxt/rwcx",
              children: [
                {
                  icon: "",
                  title: "执法任务查询",
                  path: "/zfxt/rwcx",
                },
                {
                  icon: "",
                  title: "一车一档",
                  path: "/zfxt/ycyd",
                },
                {
                  icon: "",
                  title: "环保手册查询",
                  path: "/zfxt/sccx",
                },
              ],
            },
            {
              icon: "",
              title: "工作考核",
              path: "/zfxt/rwwcl",
              children: [
                {
                  icon: "",
                  title: "任务完成率",
                  path: "/zfxt/rwwcl",
                },
                {
                  icon: "",
                  title: "人员执行任务数",
                  path: "/zfxt/zxrws",
                },
                {
                  icon: "",
                  title: "人员参与率",
                  path: "/zfxt/rycyl",
                },
              ],
            },
          ],
        },
        {
          path: "/system",
          title: "系统管理",
          icon: "icon iconfont icon-guanliduan",
          children: [
            {
              path: "/system/user",
              title: "用户管理",
              icon: "",
            },
            {
              path: "/system/role",
              title: "角色管理",
              icon: "",
            },
            {
              path: "/system/menu",
              title: "菜单管理",
              icon: "",
            },
            {
              path: "/system/ssj",
              title: "双随机设置",
              icon: "",
            },
            {
              path: "/system/notice",
              title: "公告管理",
              icon: "",
            },
            {
              path: "/system/dict",
              title: "字典管理",
              icon: "",
            },
            {
              path: "/system/questions",
              title: "问题管理",
              icon: "",
            },
            // { // 无定时任务
              // path: "/system/schedule",
              // title: "定时任务",
              // icon: "",
            // },
            {
              path: "/system/hbsc",
              title: "环保手册",
              icon: "",
            },
            {
              path: "/system/zfdxgl",
              title: "执法对象管理",
              icon: "",
            },
            {
              path: "/system/warn",
              title: "预警规则设置",
              icon: "",
            },
            {
              path: "/system/dxfs",
              title: "短信发送",
              icon: "",
            },
          ],
        },
      ], 

      // 默认不折叠
      isCollapse: false,
    };
  },
  watch: {
    keyPath(val) {
      this.activeIndex = val;
    },
    $route(val) {
      this.activeIndex = val.path;
    },
  },
  created() {
    this.activeIndex = this.keyPath;
    console.log(this.$store.state.menus.menus,'getMenuList111')
  },
  mounted() {
    if (localStorage && localStorage.user) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.findAllPowerAuthList();
    }
  },
  methods: {
    /*菜单的折叠与展开*/

    togleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$emit("hideNav", this.isCollapse);
    },
    /** 存入相关的按钮权限uuid */
    // saveBtnQuery(data) {
    //   let result = {};
    //   data.forEach(itemOne => {
    //     itemOne.subSystemModel.forEach(itemTwo => {
    //       itemTwo.subModPower.forEach(itemThree => {
    //         result[itemThree.powerUrl] = itemThree.modelUuid;
    //       });
    //     });
    //   });
    //   if (sessionStorage) sessionStorage.btnQueryData = JSON.stringify(result);
    // },
    /** 获取用户相应的导航权限 */
    // findAllPowerAuthList() {
    //   this.$ajax(url.GetPersonAuthority, {
    //     uuid: this.user.uuid || ''
    //   }).then(res => {
    //     if (res.body.success) {
    //       // 获取到数据并排序
    //       this.treeData = res.body.data.sort((a, b) => {
    //         return SortBtn.indexOf(a.subName) > SortBtn.indexOf(b.subName);
    //       });
    //       // 把query 信息存档
    //       this.saveBtnQuery(this.treeData);
    //     }
    //   });
    // },
    /** 便利出当前用户已有的权限菜单列表 */
    // handleSelect(key, keyPath) {
    //   if (key === '/') {
    //     this.$router.push(key);
    //     return;
    //   }
    //   let btnQueryData = JSON.parse(sessionStorage.btnQueryData);
    //   if (this.changeSlect === 'carousel') {
    //     this.$emit('parent', key);
    //   } else {
    //     this.$router.push({ path: key, query: { btnUuid: btnQueryData[key] } });
    //   }
    // }
  },
};
</script>
<style lang="less" scoped>
.nav-bar {
  padding-bottom: 120px;
  // height: calc(100% - 60px);
  height: 100%;
  width: 228px;
  background-image: linear-gradient(0deg, #3396ff 0%, #04d298 100%);
  // min-height: 700px;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: solid 1px #e6e6e6;
  position: relative;
  &.nav1 {
    // width: 68px;
    width: 0;
  }
  &.nav2 {
    width: 228px;
    // width: 300px;
  }
  .iconfont {
    // font-size: 16px;
    color: #fff;
  }
}
/deep/.el-menu {
  border: 0;
  width: 100%;
  // font-size: 16px;
  background-image: linear-gradient(0deg, #3396ff 0%, #04d298 100%);
  .is-active {
    // background-color: #fff !important;
  }
  // .is-opened {
  //   .el-submenu__title {
  //     color: #1168D8;
  //   }
  // }
  .el-menu-item {
    font-size: 16px;
    color: #fff;
    &:hover {
      color: #1168d8;
      .iconfont {
        color: #1168d8;
      }
    }
  }
  .el-submenu__title {
    font-size: 16px;
    color: #fff;
    &:hover {
      color: #1168d8;
      .iconfont {
        color: #1168d8;
      }
    }

    /deep/ .el-submenu__icon-arrow {
      color: #fff;
    }
  }
  .el-menu-item.is-active {
    background: #ffffff;
    color: #1168d8;
    .iconfont {
      color: #1168d8;
    }
  }
}
</style>
