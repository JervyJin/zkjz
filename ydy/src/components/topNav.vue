<template>
  <div class="top-nav">
    <h1>
      <img :src="logoSrc" alt="logo" class="logo" />郑州移动源综合管控平台
    </h1>
    <div class="userInfo">
      <!-- 消息通知 -->
      <el-popover class="info" placement="right" width="300" trigger="click">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="isWh ? `消息` : `消息(1)`" name="first">
            <ul>
              <li class="flexLi" v-if="!isWh">
                <i class="el-icon-message-solid"></i>
                <div style="margin-left: 10px;">
                  <p>您的执法证号或所属区域未完善，请前往
                    <span style="color: rgb(24, 144, 255);cursor: pointer;margin: 0 3px;" @click="jumpUserInfo">个人中心</span>
                    界面完善</p>
                  <!--<p style="font-size:12px">2020年8月20日</p>-->
                </div>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane :label="`待办(${taskList.length})`" name="second">
            <ul style="max-height: 300px;overflow: auto">
              <li class="flexLi" v-for="(it,i) of taskList" :key="i">
                <i class="el-icon-s-claim" style="vertical-align: middle;"></i>
                <div style="margin-left: 10px;">
                  <p>
                    <span @click="handleTask(it)" style="color: rgb(24, 144, 255);cursor: pointer">{{it.taskName}}</span>
                  </p>
                  <p style="font-size:12px">
                    <span>要求完成日期：</span>
                    <span style="margin-left: 10px">{{it.requireFinishTime}}</span>
                  </p>
                </div>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane :label="`公告(${noticeList.length})`" name="third">
            <ul style="max-height: 300px;overflow: auto">
              <li class="flexLi" v-for="(it,i) of noticeList" :key="i">
                <i class="el-icon-s-claim" style="vertical-align: middle;"></i>
                <div style="margin-left: 10px;">
                  <p>
                    <span @click="openNotice(it.content)" style="color: rgb(24, 144, 255);cursor: pointer">{{it.title}}</span>
                  </p>
                  <p style="font-size:12px">
                    <span>{{it.created}}</span>
                    <span style="margin-left: 10px">{{it.createBy}}</span>
                  </p>
                </div>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
        <i class="el-icon-message-solid" slot="reference">
          <span v-if="!isWh" class="divright">{{newsCount + 1}}</span>
          <span v-if="isWh" class="divright">{{newsCount}}</span>
        </i>

      </el-popover>
      <!-- 用户名 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <el-avatar icon="el-icon-user-solid" class="user-avatar"></el-avatar> -->
          <i class="el-icon-user-solid" ></i>
          {{user.name}}
          <!-- <i class="el-icon-caret-bottom" /> -->
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
           <router-link to="/userinfo">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 退出 -->
    </div>
    <div class="dialog-wrapper" @click.stop="stopDefault">
    <!--<div class="dialog-wrapper">-->
      <el-dialog title="公告内容" :visible.sync="isShowDialog" width="60%">
        <div class="info-content">
          {{noticeContent}}
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import logoSrc from "@/assets/image/logo.png";
import url from '@/servers/url-config';
// let userName = sessionStorage.getItem('userName')


export default {
  data() {
    return {
      logoSrc: logoSrc,
      activeName: "first",
      noticeList: [],
      taskList: [],
      isShowDialog: false,
      noticeContent: '',
      // userName: $store.state.users.userName
    };
  },
  computed: {
    user() {
      return this.$store.state.users.user || JSON.parse(sessionStorage.getItem('user'));
    },
    isWh () {
      console.log('计算了一次', this.$store.state.users.isWh)
      return this.$store.state.users.isWh || false;
    },
    newsCount () {
      return this.noticeList.length + this.taskList.length;
    }
  },
  created () {
    this.getWh();
    this.getNoticeList();
    this.getTaskList();
  },
  methods: {
    async logout() {
      let externalId = this.user.passWord;
      await this.$ajax(url.logout, {externalId}).then(res => {
        let url = res.url;
        // location.href = url;
        this.$store.commit('set_username', {})
        this.$store.commit('setMenus', [])
        sessionStorage.removeItem('id_token')
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('menus')
        location.href = url;
      });
    },
    // 跳转个人中心
    jumpUserInfo () {
      this.$router.push('/userinfo');
    },
    // 查看执法证号是否维护
    getWh () {
      let userId = '';
      if (this.$store.state.users) {
        userId = this.$store.state.users.user.id
        this.$ajax(url.userIsWh, { userId }).then(res => {
          console.log('维护接口返回了数据', res)
          this.$store.commit('set_isWh', res.data || false)
        });
      }
    },
    // 打开公告内容弹框
    openNotice (content) {
      this.noticeContent = content;
      this.isShowDialog = true;
    },
    // 跳转到待办任务
    handleTask (ev) {
      if (ev.taskType === '2') {
        // this.$router.push({path: '/zfxt/doubleRandom', query: {id: ev.id}})
        this.$router.push({
          path: '/zfxt/doubleRandom',
          query: {id: ev.id}
          /*query: {
            id: ev.id
          }*/
        });
      } else {
        this.$router.push({
          path: '/zfxt/dbrw',
          query: {id: ev.id}
          /*params: {
            id: ev.id
          }*/
        });
      }
    },
    stopDefault () {
      // console.log('1111')
    },
    getTaskList () {
      this.$ajax(url.getTaskListForMessage, {}).then(res => {
        if (res.success) {
          this.taskList = res.data;
        }
      })
    },
    getNoticeList () {
      this.$ajax(url.getNotice, {}).then(res => {
        if (res.success) {
          this.noticeList = res.data.list;
        }
      })
    }
  },
};
</script>
<style lang="less">
.flexLi{
  display: flex;
  align-items: baseline;
  border-bottom: 1px solid #E4E7ED;
}
.top-nav {
  height: 100%;
  width: 100%;
  position: relative;
  h1 {
    padding-left: 40px;
    font-size: 20px;
    margin-left: 20px;
    color: #006b66;
    .logo {
      width: 45px;
      margin-right: 20px;
    }
  }
  .el-icon-message-solid {
    color: #006b66;
  }
  .avatar-container {
    margin-right: 20px;

    .avatar-wrapper {
      position: relative;

      .el-icon-user-solid {
        cursor: pointer;
        font-size: 22px;
        color: #006b66;
        border-radius: 50%;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 16px;
        color: #006b66;
      }
    }
  }
  .userInfo {
    position: absolute;
    top: 14px;
    right: 30px;
    border-radius: 20px;
    // width: 40px;
    height: 40px;
    // overflow: hidden;
    // background: #000;
    .info {
      cursor: pointer;
      margin-right: 20px;
      font-size: 18px;
      .el-badge__content.is-fixed.is-dot {
        right: 5px;
        top: 20px;
      }
    }
  }
  .handBookDialog .el-dialog__body {
    padding-top: 0;
  }
}
.divright {
  position: absolute;
  color: white;
  font-size: 10px;
  background-color: red;
  width: 15px;
  height: 15px;
  line-height: 15px;
  left: 12%;
  top: 12px;
  text-align: center;
  -webkit-border-radius: 24px;
  border-radius: 8px;
}
.info-content {
  min-height: 100px;
  line-height: 30px;
  font-size: 15px;
}
  .dialog-wrapper {
    /deep/ .el-dialog__body {
      padding-top: 0;
    }
  }
</style>
