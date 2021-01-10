<template>
  <div>
    <!-- {{this.$route.query.workFlowId}}
    {{this.$route.query.workId}}
    {{this.$route.query.taskId}}-->
    <!-- {{this.$route.query.nodeName}} -->
    <!-- {{this.$route.query.bizid}}
    {{this.$route.query.actId}}-->
    <van-form @submit="banliBtn">
      <!-- 下级节点 -->
      <!-- <div class="oth">
        <span>
          <em style="color:red;">*</em>选择办理节点:
        </span>
        <van-radio-group v-model="index" @change="onNextNodeChange">
          <van-radio
            :name="index"
            v-for="(item,index) in nextNodeInfo"
            :key="index"
          >{{item.actionName}}</van-radio>
        </van-radio-group>
      </div> -->
      <van-field name="handleNode" label="选择办理节点:" required label-width="150">
        <template #input>    
          <van-radio-group v-model="index">
            <van-radio
              :name="index"
              v-for="(item,index) in nextNodeInfo"
              :key="index"
            >{{item.actionName}}</van-radio>        
          </van-radio-group>
        </template>
      </van-field>
      <!-- 下步办理人 -->
      <!-- <div class="oth">
        <van-field
          v-if="nextNodeInfo[this.index].actionId!='end'"
          readonly
          required
          is-link
          label="选择下步办理人:"
          placeholder="请选择"
          input-align="right"
          @click="getTXL('next')"
          v-model="nextR"
        />
      </div> -->
      <van-field
        v-if="nextNodeInfo.length && nextNodeInfo[index].actionId !== 'end' && nextNodeInfo[index].actionId !== 'end2'"
         label-width="160"
          readonly
          required
          label="选择下步办理人:"
          placeholder="请选择"
          input-align="right"
        >
        <template #input>
          <van-checkbox-group v-model="user_index" bind:change="changeNode" direction="horizontal">
            <van-checkbox
              shape="square"
              :name="index"
              v-for="(item,index) in nextRen"
              :key="index"
            >{{item.userName || item.name}}</van-checkbox>
          </van-checkbox-group>
          <!--clickTree  -->
          <!-- <van-icon name="arrow" @click="getTXL('next')"/> -->
        </template>
        <template #button>
          <span class="btns" @click="getTXL('next')">
            <van-icon name="arrow"/>
          </span>
        </template>
      </van-field>

      <!-- 意见 -->
      <van-field
        v-model="message"
        required
        rows="1"
        autosize
        label="意见"
        type="textarea"
        placeholder="请输入您的意见"
        input-align="right"
        :rules="[{ required: true, message: '请输入意见！' }]"
      />
      <!-- 抄送 -->
      <!-- <van-field name="copy" label="抄送" required>
        <template #input>
          <van-radio-group v-model="csRen">
            <van-radio name="1" shape="square">{{csRname}}</van-radio>
          </van-radio-group>
          <van-button
            type="info"
            size="small"
            native-type="button"
            style="margin-left: 60px;"
            @click="getTXL('cs')"
          >选择</van-button>
        </template>
      </van-field>-->
        <!-- <span><em style="color:red;">* </em>选择下步办理人:</span>
        <van-radio-group v-model="nextR" >
          <van-radio :name="index" v-for="(item,index) in nextRen" :key="index" style="margin-top: 10px;">{{item.userName}}</van-radio>
        </van-radio-group>-->
        <van-field
          readonly
          is-link
          label="选择抄送人:"
          placeholder="请选择"
          input-align="right"
          @click="getTXL('cs')"
          v-model="csRname"
        />
      <!-- /************************************************************************************************************/ -->

      <!-- 提交 -->
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import config from '../../config.js'
import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载
// import { getjianquan } from "@/util/jianquan";

let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));

export default {
  data() {
    return {
      copy: [],
      message: "",

      currentNodeInfo: {},
      nextNodeInfo: [],
      nextRen: [
        // {
        //   routeId: "N2",
        //   routeName: "主管领导审核",
        //   authorInfoList: [
        //     { userId: "124151235321616739" },
        //     { userName: "周梦凡" }
        //   ]
        // }
      ],
      nextR: "",
      csRen: [],
      csRname: "",
      // csRid:"",
      index: 0,
      user_index: [],
      actionItem: [],
      scrLists: {}
    };
  },
  watch: {
      index: {
        immediate: true,
        deep: true,
        handler() {
        this.getJkzfUserChooseList();
        }
      }
    },
  created() {
    this.getCurrentNodeParams();
    // getjianquan(); //鉴权
    /* 设置导航栏标题 */
    if (this.$route.query.actId == "N1") {
      dd.ready(() => {
        dd.biz.navigation.setTitle({
          title: "科室领导" // 控制标题文本，空字符串表示显示默认文本
        });
      });
    } else if (this.$route.query.actId === "N4") {
      dd.ready(() => {
        dd.biz.navigation.setTitle({
          title: "案情研判" // 控制标题文本，空字符串表示显示默认文本
        });
      });
    }
  },
  methods: {
    // 选择下步办理人触发
    onNextNodeChange(event) {
      console.log(this.nextNodeInfo);
      if (event) {
        this.getJkzfUserChooseList();
      }
    },

    // 下步办理人接口
    getJkzfUserChooseList() {
      this.http
        .post("jkzfUserChooseList", {
          // code: this.currentNodeInfo.workFlowID,
          code: this.$route.query.workFlowId,
          nextNodeId: this.nextNodeInfo[this.index].actionId,
          workId: this.$route.query.workId,
          userId: userinfo.userId
        })
        .then(res => {
          console.log(res.data.zntj);
          this.nextRen = res.data.zntj;
          this.nextR = res.data.zntj.map(v => v.userName).join() || "";
          this.user_index = this.nextRen.map((v, i) => i)
        });
    },
    // 抄送人接口
    saveCsr() {
      this.http
        .post("saveCsr", {
          comid: this.$route.query.bizid,
          username: userinfo.userName,
          userId: userinfo.userId,
          csrList: JSON.stringify(this.scrLists),
          actionName: this.nextNodeInfo[this.index].actionName
        })
        .then(res => {
          console.log(res);
          // this.nextRen = res.data.zntj;
          // this.nextR = res.data.zntj.map(v => v.userName).join() || "";
        });
    },
    /* 调用钉钉组织人员 */
    getTXL(index) {
      console.log(33333);
      dd.ready(() => {
        let _this = this;
        dd.biz.contact.complexPicker({
          title: "选择人员", //标题
          corpId: config.corpId, //企业的corpId
          multiple: true, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 1000, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: config.appId, //微应用Id，企业内部应用查看AgentId
          responseUserOnly: false, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function(res) {
            console.log(res);
            console.log(index);
            if (index == "next") {
              _this.nextRen = res.users;
              _this.nextR = _this.nextRen.map(v => v.name);
              _this.user_index = _this.nextRen.map((v, i) => i)
            } else if (index === "cs") {
              _this.scrLists = res;
              _this.csRen = res.users;
              console.log(_this.csRen);
              _this.csRname = _this.csRen.map(i => i.name);
              // _this.csRid = _this.csRen.map(i => i.id);
            }
          },
          onFail: function(err) {}
        });
      });
      dd.error(error => {
        alert("error");
        alert(`dd error: ${JSON.stringify(error)}`);
      });
    },
    /* 调取6.4接口获取下级节点     */
    getCurrentNodeParams() {
      this.http
        .post("getWorkJkzfDetail", {
          userId: userinfo.userId,
          workFlowId: this.$route.query.workFlowId,
          workId: this.$route.query.workId,
          taskId: this.$route.query.taskId
        })
        .then(res => {
          // console.log("----" + JSON.stringify(res));
          this.currentNodeInfo = res.data.workDetailInfo.workFlowInfo;
          this.nextNodeInfo = res.data.workDetailInfo.actionInfoList;
          this.actionItem = res.data.workDetailInfo.actionInfoList;
          this.getJkzfUserChooseList();
        });
    },

    /* 6.2  提交（doJfzfAction） */
    banliBtn() {
      
      let nextRen = [];
      this.user_index.forEach(i => {
        nextRen.push(this.nextRen[i])
      })
      if((!nextRen.length) && this.nextNodeInfo[this.index].actionId !== 'end' && this.nextNodeInfo[this.index].actionId !== 'end2') {
        this.$toast({
          message: '选择下步办理人'
        })
        return;
      }

      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '提交中',
        loadingType: 'spinner',
        selector: '#custom-selector',
      });
      // let routeInfolist_DD = JSON.stringify(this.nextArr); //钉钉选择下步办理人
      // let Infolist = JSON.stringify(this.zntj); //接口默认下步办理人
      let authorInfoList = nextRen.map(v => ({
        userId: v.userid || v.userId || v.emplId || v.orgId,
        userName: v.name || v.userName || v.orgName
      }));
      let routeInfolist = [
        {
          routeId: this.nextNodeInfo[this.index].actionId,
          routeName: this.nextNodeInfo[this.index].actionName,
          authorInfoList
        }
      ];
      // let csrList
      //console.log(JSON.stringify(this.actionItem[this.index].actionId))
      console.log(JSON.stringify(routeInfolist));
      this.http
        .post("doJfzfAction", {
          currentUserId: userinfo.userId,
          workId: this.$route.query.workId,
          workFlowId: this.currentNodeInfo.workFlowID,
          workFlowName: this.currentNodeInfo.workFlowName,
          userId: userinfo.userId,

          actionId: this.actionItem[this.index].actionId,
          actionName: this.actionItem[this.index].actionName,
          currentNodeId: this.currentNodeInfo.currentNodeID,
          currentNodeName: this.currentNodeInfo.currentNodeName,
          currentTrackId: this.currentNodeInfo.currentTrackId,
          comments: this.message,
          taskId: this.currentNodeInfo.taskId,
          routeInfolist: JSON.stringify(routeInfolist),
          csrList: JSON.stringify(this.scrLists)
        })
        .then(res => {
          console.log(res);
          if(this.csRen.length) {
            this.saveCsr();
          }
          this.$router.push("/daiban");
          this.$toast({ message: res.msg });
          toast.clear()
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.van-checkbox {
  padding: 6px 0;
}
.oth {
  font-size: 14px;
  padding: 10px;
}
.btns {
  padding: 20px 0 20px 10px;
}
</style>