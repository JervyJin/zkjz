<template>
  <el-row :gutter="25">
    <el-col :span="6" v-for="(v, i) in list" :key="i">
    <!--<el-col :xl="2" :lg="6" :md="6" :sm="8" :xs="12" v-for="(v, i) in list" :key="i">-->
      <el-card>
        <div class="item" @click="jumpTarget(v.value)">
          <i :class="v.icon"></i>
          <span>{{v.text}}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          icon: 'icon iconfont icon-jidongcheyaoganjiancexitong',
          text: '郑州市机动车遥感监测平台',
          value: '1'
        },
        {
          icon: 'icon iconfont icon-jidongchedanganku',
          text: '非道路移动机械',
          value: '2'
        },
        {
          icon: 'icon iconfont icon-zhongxingchaiyouchegaizaozhili',
          text: '郑州市机动车环保技术改造监控平台',
          value: '3'
        },
        /*{
          icon: 'icon iconfont icon-gengxin',
          text: '油气回收'
        },*/
        {
          icon: 'icon iconfont icon-Mzhan',
          text: '郑州机动车M站管理平台',
          value: '4'
        },
        {
          icon: 'icon iconfont icon-06_obd',
          text: 'OBD',
          value: '5'
        },
        {
          icon: 'icon iconfont icon-yidongwuranyuananjiantuisong',
          text: '大宗物料运输企业门禁管控平台',
          value: '6'
        },
        /*{
          icon: 'icon iconfont icon-yidongwuranyuanxinchexiaoshouchoucejianguan',
          text: '路边站',
          value: '7'
        },*/
        /*{
          icon: 'icon iconfont icon-yidongwuranyuanyidongzhifaxitong',
          text: '路检路查、停放地抽测'
        }*/
      ]
    }
  },
  methods: {
    jumpTarget (value) {
      switch (value) {
        case '1':
          window.open('http://59.207.61.4:11262/enduser/bff/sso/go_70fb51ef71422f806064e2b883d3aeaahaQrAgOf8M1?_enterprise_id=szzz');
          break;
        case '4':
          window.open('http://59.207.61.4:11262/enduser/bff/sso/go_74e1bf062aa3d1918aa8b37ab7210fd1INpvyhirNTf?_enterprise_id=szzz');
          break;
        case '5':
          window.open('http://59.207.61.4:11262/enduser/bff/sso/go_5c84ae66fbd577736c4d3468850adb8cmP0r81AL0eR?_enterprise_id=szzz');
          break;
        case '6':
          window.open('http://59.207.61.4:11262/enduser/bff/sso/go_45d7f68a9672a0ef81b70a680c21b3a0VNKeXm7Lgam?_enterprise_id=szzz');
          break;
        case '2':
          window.open('http://59.207.61.4:11262/enduser/bff/sso/go_6c436fe81e899cc5a83077d2820707c6cprth3uY8cI?_enterprise_id=szzz');
          break;
        case '3':
          window.open('http://59.207.61.4:11262/enduser/bff/sso/go_391cb4a49722a2bc014dec81fd70084f0LuFt6iKUav?_enterprise_id=szzz');
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  height: 100%;
  padding-bottom: 60px;
  overflow-y: auto;
  .el-col {
    margin-top: 20px;
    .el-card{
      width: 100%;
      height: 143px;
      box-sizing: border-box;
      border-radius: 10px;
      cursor: pointer;
      background-color: rgba(248,243,243,.5);
      /deep/ .el-card__body {
        padding: 27px;
      }
      &:hover {
        background-image: linear-gradient(0deg, #F48D2A 0%, #FFCA29 87%);
        .item {
          i {
            color: #FFFFFF;
          }
          span{
            color: #FFFFFF;
          }
        }
      }
    }
    .item {
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      border-radius: 10px;
      i {
        display: block;
        font-size: 50px;
        color: #1168D8;
        margin-bottom: 15px;
      }
      span{
        font-size: 17px;
        color: #343F44;
      }
    }
  }
}
</style>
