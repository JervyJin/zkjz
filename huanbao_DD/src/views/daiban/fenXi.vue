<template>
  <div>
    <!-- <h1>案件分析</h1> -->
    <van-form @submit="onSubmit">
      <!-- 办理节点 -->
      <van-field name="handleNode" label="办理节点" required>
        <template #input>
          <!-- <van-checkbox-group v-model="form.handleNode">
            <van-checkbox name="1">案件调度</van-checkbox>
            <van-checkbox name="2">案情分析</van-checkbox>
            <van-checkbox name="3">办结</van-checkbox>
          </van-checkbox-group> -->        
          <van-radio-group v-model="index" @change="onNextNodeChange">
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
          readonly
          required
          label="选择下步办理人:"
          placeholder="请选择"
          input-align="right"
          @click="getTXL('next')"
          v-model="nextR"
          :rules="[{ required: true, message: '选择下步办理人！！' }]"
        />
      </div> -->
        <van-field v-if="nextNodeInfo.length && nextNodeInfo[index].actionId !== 'end' && nextNodeInfo[index].actionId !== 'end2'"
          readonly
          required
          label="选择下步办理人:"
          placeholder="请选择"
          input-align="right"
          label-width="160"
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
        input-align="left"
        :rules="[{ required: true, message: '请输入您的意见！！' }]"
      />
      <!-- 抄送 -->
        <van-field
          readonly
          is-link
          label="选择抄送人:"
          placeholder="请选择"
          input-align="right"
          @click="getTXL('cs')"
          v-model="csRname"
        />
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
// import {getjianquan} from '@/util/jianquan'
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));

export default {
  data() {
    return {
      currentNodeInfo: {},
      index: 0,
      user_index: [],
      nextNodeInfo: [],
      nextRen:[],
      nextR: "",
      message: "", //抄送
      csRen: [],
      csRname: "",
      scrLists: {}  //抄送人
    };
  },
  created() {
    this.getCurrentNodeParams();
    
    // getjianquan(); //鉴权

    if(this.$route.query.actId === 'N6') {
      dd.ready(() => {
        dd.biz.navigation.setTitle({
          title: "综合执法室" // 控制标题文本，空字符串表示显示默认文本
        });
      });
    }else if(this.$route.query.actId === 'N3') {
      dd.ready(() => {
        dd.biz.navigation.setTitle({
          title: "案情研判" // 控制标题文本，空字符串表示显示默认文本
        });
      });
    }
  },
  watch: {
    index(v) {
      if(this.nextNodeInfo[this.index].actionId == 'end' || this.nextNodeInfo[this.index].actionId == 'end2') return;  // 如果选择办结就不再调取办理人
      this.getJkzfUserChooseList();
    }
  },
  methods: {
    // 选择下步办理人触发
    onNextNodeChange(event) {
      console.log(this.nextNodeInfo)
      if(event) {
        this.getJkzfUserChooseList();
      }
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
    /* 获取通讯录 */
    getTXL(index) {
      if(this.$route.query.actId === 'P2' && index !== 'next') return;
      let isMult = index === 'next';
      dd.ready(() => {
        let _this = this;
        dd.biz.contact.complexPicker({
          title: "选择人员", //标题
          corpId: config.corpId, //企业的corpId
          multiple: isMult, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 1000, //最大可选人数
          pickedUsers: _this.nextRen, //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: config.appId, //微应用Id，企业内部应用查看AgentId
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function(res) {
            console.log(index)
            if(index == 'next') {
              _this.nextRen = res.users;
              _this.nextR = _this.nextRen.map(v => v.name);
              _this.user_index = _this.nextRen.map((v, i) => i)
            }
            if (index === "cs") {
              _this.csRen = res.users;
              console.log(_this.csRen)
              _this.csRname = _this.csRen.map(i => i.name);
              // _this.csRid = _this.csRen.map(i => i.id);
              return;
            }
            // else if(index === -1){ // 主办人
            //   _this.mainRen = res.users[0]
            //   console.log("主办人:"+_this.mainRen)

            // }else{ // 协办人
            //   console.log(JSON.stringify(_this.zfrlists))
            //   _this.zfrlists.splice(_this.zfrlists.length-1,1)
            //   console.log(res)
            //   _this.zfrlists.push(res.users[0])

            // }
          },
          onFail: function(err) {}
        });
      });
      dd.error(error => {
        alert("error");
        alert(`dd error: ${JSON.stringify(error)}`);
      });
    },
     /* 调取6.4接口获取当前节点和下级节点     */
    getCurrentNodeParams() {
      this.http
        .post("getWorkJkzfDetail", {
          userId: userinfo.userId,
          workFlowId: this.$route.query.workFlowId,
          workId: this.$route.query.workId,
          taskId: this.$route.query.taskId
        })
        .then(res => {
          console.log(res);
          this.currentNodeInfo = res.data.workDetailInfo.workFlowInfo;
          this.nextNodeInfo = res.data.workDetailInfo.actionInfoList;
          this.getJkzfUserChooseList();
        });
    },
    /* 选择下步办理人 */
    getJkzfUserChooseList() {
      this.http
        .post("jkzfUserChooseList", {
          code: this.currentNodeInfo.workFlowID,
          nextNodeId: this.nextNodeInfo[this.index].actionId,
          workId: this.$route.query.workId,
          userId: userinfo.userId,
        })
        .then(res => {
          this.nextRen = res.data.zntj;
          this.nextR = this.nextRen.map(v => v.userName).join() || '';
          this.user_index = this.nextRen.map((v, i) => i)
        });
    },
    onSubmit(){
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

      let authorInfoList = nextRen.map(v => ({userId: v.userid || v.userId || v.emplId || v.id, userName:v.name || v.userName}))
      let routeInfolist = [
        {"routeId": this.nextNodeInfo[this.index].actionId,
          "routeName": this.nextNodeInfo[this.index].actionName,
          authorInfoList
        }
      ];
      let data = {
        currentUserId: userinfo.userId,
        workId: this.$route.query.workId,
        workFlowId: this.currentNodeInfo.workFlowID,
        workFlowName: this.currentNodeInfo.workFlowName,
        userId: userinfo.userId,
        actionId: this.nextNodeInfo[this.index].actionId,
        actionName: this.nextNodeInfo[this.index].actionName,
        currentNodeId: this.currentNodeInfo.currentNodeID,
        currentNodeName: this.currentNodeInfo.currentNodeName,
        currentTrackId: this.currentNodeInfo.currentTrackId,
        comments: this.message,
        taskId: this.currentNodeInfo.taskId,
        routeInfolist: JSON.stringify(routeInfolist),
        csrList: JSON.stringify(this.scrLists)
      }

      this.http
        .post("doJfzfAction", data)
        .then(res => {
          if(this.csRen.length) {
            this.saveCsr();
          }
          this.$router.push("/")
          this.$toast({message: res.msg});
          toast.clear();
        });
      }
  },
};
</script>
<style lang="scss" scoped>
.van-checkbox {
  padding: 6px 0;
}
.btns {
  padding: 20px 0 20px 10px;
}
</style>