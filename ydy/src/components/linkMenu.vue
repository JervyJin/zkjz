<template>
  <transition name="el-fade-in">
    <div class="slide">
      <div :class="['btn', show ? 'btn1' : '']" @click="showMenu"></div>
      <div class="menus" v-if="show">
        <div class="menu-up" @click="showMore('down')">
          <i class="icon iconfont icon-down-arrow"></i>
        </div>
        <div class="container">
          <div ref="menuContainer" class="menuContainer">
            <div class="menu" v-for="(v, i) in list" :key="i">
              <i :class="v.icon"></i>
              <span>{{v.text}}</span>
            </div>
          </div>
        </div>
        <div class="menu-down" @click="showMore('up')">
          <i class="icon iconfont icon-down"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      show: true,
      active: 0,
      el: null,
      list: [
        {
          icon: 'icon iconfont icon-jidongcheyaoganjiancexitong',
          text: '遥感监测'
        },
        {
          icon: 'icon iconfont icon-jidongchedanganku',
          text: '非道路移动机械'
        },
        {
          icon: 'icon iconfont icon-zhongxingchaiyouchegaizaozhili',
          text: '重型柴油车改造治理'
        },
        {
          icon: 'icon iconfont icon-gengxin',
          text: '油气回收'
        },
        {
          icon: 'icon iconfont icon-Mzhan',
          text: 'M站'
        },
        {
          icon: 'icon iconfont icon-06_obd',
          text: 'OBD'
        },
        {
          icon: 'icon iconfont icon-yidongwuranyuananjiantuisong',
          text: '大宗物料运输企业管控门禁系统'
        },
        {
          icon: 'icon iconfont icon-yidongwuranyuanxinchexiaoshouchoucejianguan',
          text: '机动车排放检验机构'
        },
        {
          icon: 'icon iconfont icon-yidongwuranyuanyidongzhifaxitong',
          text: '路检路查、停放地抽测'
        }
      ]
    }
  },
  methods: {
    showMenu() {
      this.show = !this.show;
      this.$emit('showMenu', this.show);
    },
    showMore(v) {
      let el = this.$refs.menuContainer;
      let percent = 1 / this.list.length * 100
      if(v == 'up') {
        this.active ++ ;
        if(this.active > 0) this.active = 1;
      } else {
        this.active -- ;
        if(this.active < 0) this.active = 0;
      }
      el.style.transform = "translateY(-" + this.active * percent + "%)"
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/assets/style/mixin.less';
.slide{
  min-height: 960px;
  position: absolute;
  right: 0;
  // top: 50%;
  // transform: translateY(-50%);
  top: 68px;
}
.btn{
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: width linear .2s;
  z-index: 10;
  width: 16px;
  height: 66px;
  color: #C1C1C1;
  line-height: 66px;
  background: #EBEBEB url('~@/assets/image/1.jpg') no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  &.btn1{
    right: 84px;
  }
}
.menus{
  height: 960px;
  overflow: hidden;
  .menu-up{
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 30px;
    &:hover {
      // background: @divider;
      cursor: pointer;
    }
  }
  .menu-down{
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 30px;
    &:hover {
      // background: @divider;
      cursor: pointer;
    }
  }
  .container {
    height: 800px;
    overflow: hidden;
    border-top: 1px solid @divider; 
    border-bottom: 1px solid @divider; 
  }
  .menuContainer{
    transition: all .5s linear;
  }
  .menu{
    width: 100px;
    height: 100px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 12px;
    border-bottom: 1px solid @divider; 
    border-left: 1px solid @divider; 
    padding: 0 5px;
    i {
      font-size: 30px;
    }
    span {
      text-align: center;
      margin-top: 6px;
    }
  }
}
</style>
