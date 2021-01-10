<template>
  <div>
    <!-- <h1>主任-主管审核</h1> -->
     <!-- {{this.$route.query.workFlowId}}
    {{this.$route.query.workId}}
    {{this.$route.query.taskId}} -->
    <van-form @submit="banliBtn">
      <!-- 当前节点 -->
      <!-- <div style="padding:20px;">
      <span>当前节点:</span>
      <van-radio-group v-model="radio">
        <van-radio name="1">{{currentNodeInfo.currentNodeName}}</van-radio>
      </van-radio-group>
      </div>-->
      <!-- 主任展示科室 -->
    <template v-if="$route.query.actId === 'P1'">
      <div class="zhifarenList" >
        <p>
          <span>主办科室明细</span>
        </p>
        <van-field
          readonly
          label="主办科室："
          placeholder="请选择主办科室"
          input-align="right"
          v-model="this.mainKS.ZFDWNAME"
        />
      </div>
      <div class="zhifarenList" v-for="(item,index) in zfrKS" :key="index">
        <p>
          <span>协办科室明细<em v-if="zfrKS.length>1">({{index+1}})</em></span>
        </p>
    
        <van-field
          readonly
          label="协办科室："
          v-model="item.ZFDWNAME"
          placeholder="选择协办科室"
          input-align="right"
        />
      </div>
      <div class="zhifarenList" v-if="isZB">
        <p>
          <span>主办执法人员明细</span>
          <span></span>
        </p>
        <van-field
          label-width="200"
          readonly
          required
          is-link
          label="主办执法人员："
          placeholder="请选择"
          input-align="right"
          @click="getTXL(-1)"
          v-model="mainRen.name"
          :rules="[{ required: true, message: '请选择执法人员！！' }]"
        />
      </div>
      <div class="zhifarenList" v-if="!isZB">
        <p>
          <span>协办执法人员明细</span>
          <span></span>
        </p>
        <van-field
          label-width="200"
          readonly
          required
          is-link
          label="协办执法人员："
          placeholder="请选择"
          input-align="right"
          @click="getTXL(-1)"
          v-model="mainRen.name"
          :rules="[{ required: true, message: '请选择执法人员！！' }]"
        />
      </div>
      <div class="zhifarenList" v-for="(item,index) in zfrlists" :key="index">
        <p>
          <span>协办执法人员明细<em v-if="zfrlists.length>1">({{index+1}})</em></span>
          <span @click="del(index)" style="color:#0033ff;" v-if="$route.query.actId !== 'P2'">删除</span>
        </p>
        <van-field
          label-width="200"
          readonly
          required
          is-link
          label="协办执法人员："
          v-model="item.name"
          placeholder="选择"
          @click="getTXL(index+1)"
          input-align="right"
          :rules="[{ required: true, message: '请选择执法人员！！' }]"
        />
      </div>
      <p class="add" @click="add">添加执法人员</p>
    </template>

    <template v-if="$route.query.actId === 'P2'">
      <div class="zhifarenList">
        <p>
          <span>主办执法人员明细</span>
          <span></span>
        </p>
        <van-field
          label-width="200"
          readonly
          label="主办执法人员："
          placeholder="请选择"
          input-align="right"
          v-model="mainRen.name"
        />
      </div>
      <div class="zhifarenList" v-for="(item,index) in zfrlists" :key="index">
        <p>
          <span>协办执法人员明细<em v-if="zfrlists.length">({{index+1}})</em></span>
        </p>
    
        <van-field
          label-width="200"
          readonly
          label="协办执法人员："
          v-model="item.name"
          placeholder="选择"
          input-align="right"
        />
      </div>
    </template>
  
      
      
      

      <!-- 下级节点 -->
      <van-field label-width="200" name="radio" label="选择办理节点:" required input-align="right">
        <template #input>
          <van-radio-group v-model="index" bind:change="changeNode">
            <van-radio
              :name="index"
              v-for="(item,index) in nextNodeInfo"
              :key="index"
            >{{item.actionName}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 下步办理人 -->
      <van-field
        v-if="nextNodeInfo.length && (nextNodeInfo[index].actionId !== 'end' && nextNodeInfo[index].actionId !== 'end2')"
        label-width="160"
        readonly
        required
        label="选择下步办理人:"
        placeholder="请选择"
        input-align="right"
      >
        <template #input>
          <van-radio-group v-model="user_index" bind:change="changeNode" direction="horizontal">
            <van-radio
              :name="index"
              v-for="(item,index) in nextRen"
              :key="index"
            >{{item.userName || item.name}}</van-radio>
          </van-radio-group>
          <!--clickTree  -->
          <!--  -->
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
      <van-button class="sub" block type="info" native-type="submit">提交</van-button>
    </van-form>
    <departTree :query="query" v-if="showTree" @selectTree="selectTree"/>


  </div>
</template>
<script>
import config from '../../config.js'
import departTree from './departTree'
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载
// import {getjianquan} from '@/util/jianquan'

export default {
  components:{
    departTree
  },
  data() {
    return {
      query:{},
      showTree:false,
      allKS: [],
      mainKS: {}, // 主办科室
      zfrKS: [],  // 协办科室
      mainRen:  {
       /*  'name':userinfos.userName,
        "emplId":userinfos.userId,
        "status":"1" */
      }, 
      zfrlists: [
        
      ],
      index: 0,  // 下一步索引
      user_index: 0, //下一步人
      copy: [],
      message: "",
    
      currentNodeInfo: {},
      nextNodeInfo: [],
      nextRen: [
      //   {
      //     routeId: "N2",
      //     routeName: "主管领导审核",
      //     authorInfoList: [
      //       { userId: "124151235321616739" },
      //       { userName: "周梦凡" }
      //     ]
      //   },
      //  {
      //     routeId: "N2",
      //     routeName: "主管领导审核",
      //     authorInfoList: [
      //       { userId: "124151235321613739" },
      //       { userName: "周梦凡2" }
      //     ]
      //   }
      ],
      
      actionItem: {},
      json:"",
      nextR: "",
      csRen: [],
      csRname: "",
      scrLists: {}
    };
  },
  watch: {
    index() {
      if(this.nextNodeInfo[this.index].actionId == 'end' || this.nextNodeInfo[this.index].actionId == 'end2') return;  // 如果选择办结就不再调取办理人
      this.getJkzfUserChooseList();
    }
  },
  computed: {
    isZB() {
      let isZb = false;
      this.allKS.forEach(v => {
        if(v.ZFDW == this.$route.query.orgId) {
          isZb = v.STATUS == 1 ? true : false;
        }
      })
      console.log(this.$route.query.orgId, isZb)
      return isZb;
    }
  },
  created() {
    // this.dbList();
    this.getCurrentNodeParams();
    // getjianquan()   //鉴权
    if(this.$route.query.actId === 'P2') {  // 主管领导审核详情
      this.getZgldshInfo();
      /* 设置导航栏标题 */
      dd.ready(() => {
        dd.biz.navigation.setTitle({
          title: "主管领导审核" // 控制标题文本，空字符串表示显示默认文本
        });
      });
    }else if(this.$route.query.actId === 'P1') {
       /* 设置导航栏标题 */
      dd.ready(() => {
        dd.biz.navigation.setTitle({
          title: "科室主任审核" // 控制标题文本，空字符串表示显示默认文本
        });
      });
    }

    this.getJsksList();  // 获取科室
  },
  methods: {
    selectTree(v) {
      this.showTree = false;
      if(v.length) {
        this.nextRen = [...this.nextRen, ...v]
      }
    },
    clickTree() {
      this.query = {
        orgid: this.$route.query.orgId,
        userid: userinfo.userId
      }
      this.showTree = true;
    },
    changeNode(name) {
      if(this.nextNodeInfo[this.index].actionId == 'end' || this.nextNodeInfo[this.index].actionId == 'end2') return;  // 如果选择办结就不再调取办理人
      this.getJkzfUserChooseList();
    },
    // 获取科室
    getJsksList() {
      this.http.post("getJsksList", {
        comid: this.$route.query.bizid
      })
      .then(res => {
        let data = res.data;
        if(!data.length) return;
        this.allKS = data;
        this.mainKS = data.filter(v => v.STATUS == 1)[0];
        this.zfrKS = data.filter(v => v.STATUS != 1);
      });
    },
    getZgldshInfo() {
      this.http
        .post("getZgldshInfo", {
          comid: this.$route.query.bizid,
          userid: userinfo.userId
        })
        .then(res => {
          if(res.data.length < 1) return;
          // let keys = Object.keys(res.data);
          // let obj = res.data;
          // let arr = [];
          // keys.forEach(key => {
          //   arr = [...obj[key]]
          // })
          // arr.forEach(v => v.name = v.zfrname);
          this.zfrlists = res.data.filter(v => v.status == 2);
          this.mainRen = res.data.filter(v => v.status == 1)[0];
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
    /* 获取通讯录 */
    getTXL(index) {
      if(this.$route.query.actId === 'P2' && index !== 'next' && index !== 'cs') return;
      let isMult = index === 'cs';
      dd.ready(() => {
        let _this = this;
        dd.biz.contact.complexPicker({
          title: "选择人员", //标题
          corpId: config.corpId, //企业的corpId
          multiple: isMult, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 1000, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: config.appId ,//微应用Id，企业内部应用查看AgentId
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function(res) {
            console.log(index)
            if(index == 'next') {
              // _this.nextRen = [..._this.nextRen, ...res.users];
              _this.nextRen = res.users;
              _this.nextR = _this.nextRen.map(v => v.name);
              return false;
            }
            // let orgId = _this.$route.query.orgId;
            if (index === "cs") {
              _this.csRen = res.users;
              _this.scrLists = res;
              _this.csRname = _this.csRen.map(i => i.name);
              // _this.csRid = _this.csRen.map(i => i.id);
              return;
            }
            if(index === -1){ // 主办人
              _this.mainRen = res.users[0]
              console.log("主办人:"+_this.mainRen)

            }else if(index > -1){ // 协办人
              _this.zfrlists.splice(_this.zfrlists.length-1,1)
              _this.zfrlists.push(res.users[0])

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
    
    add() {
      var a = {"userid":"","name":""}
      this.zfrlists.push(a);
    },
    del(index) {
      this.zfrlists.splice(index, 1);
    },


    // 进来先请求一下待办列表得到6.4接口要的参数,这里我没有调取是从上级通过路由传参过来的
    // dbList() {
    //   this.http
    //     .post("getJkzfWorkListByCondition", {
    //       userId: userinfo.userId,
    //       userName: userinfo.userName,
    //       toDoFlag: 0,
    //       myStartFlag: 0,
    //       pageNum: 1,
    //       pageSize: 10,
    //       manageType: ""
    //     })
    //     .then(res => {
    //       console.log(res);
    //       this.daiban = res.data.workInfoList;
    //       this.daiban.map(item => {
    //         // console.log(item)
    //         this.workFlowId = item.workFlowId;
    //         this.workId = item.workId;
    //         this.taskId = item.taskId;
    //         this.getCurrentNodeParams();
    //       });
    //     });
    // },

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
          console.log(res);
          this.currentNodeInfo = res.data.workDetailInfo.workFlowInfo;
          this.nextNodeInfo = res.data.workDetailInfo.actionInfoList;
          if(this.nextNodeInfo[this.index].actionId == 'end' || this.nextNodeInfo[this.index].actionId == 'end2') return;  // 如果选择办结就不再调取办理人
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
        });
    },

    // 下步办理人接口（这个调取钉钉接口）
    // nextR(){
    //   this.http.post("jkzfUserChooseList",)
    // },
    /* 6.2  办理监控执法流程实例（doJfzfAction） */
    // 提交
    banliBtn() {

      let isZG = this.$route.query.actId === 'P2';
      let zfryList = JSON.parse(JSON.stringify(this.zfrlists));
      let mainRen = this.mainRen;
      if(this.isZB) {
        mainRen.status = '1';
      }
      zfryList.push(this.mainRen);
      zfryList.forEach(v => v.id = v.emplId);

      let nextRen = [this.nextRen[this.user_index]];

      
      if(!nextRen.length) {
        this.$toast({
          message: '选择下步办理人'
        })
        return;
      }
      
      let authorInfoList = nextRen.map(v => ({userId: v.id || v.userid || v.userId || v.emplId, userName:v.name || v.userName}))
      let routeInfolist = [
        {"routeId": this.nextNodeInfo[this.index].actionId,
          "routeName": this.nextNodeInfo[this.index].actionName,
          authorInfoList
        }
      ];
      
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '提交中',
        loadingType: 'spinner',
        selector: '#custom-selector',
      });

      let url = 'doJfzfAction';
      let data = {
        // comid: this.$route.query.bizid,
        // zfryList: JSON.stringify(zfryList),
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
        csrList:JSON.stringify(this.scrLists),
      }
      if(!isZG) {
        data.comid = this.$route.query.bizid;
        data.zfryList = JSON.stringify(zfryList);
        url = 'saveZfry';
      }
  
      this.http.post(url, data)
        .then(res => {
          this.$toast({message:res.msg})
          if(this.csRen.length) {
            this.saveCsr();
          }
          this.$router.push("/");
          toast.clear();
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.van-checkbox {
  padding: 6px 0;
}
.oth{
  font-size: 14px;
  padding: 10px;
}


.zhifarenList {
  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px 0;
    color: #908f94;
    font-size: 12px;
  }
}
.add {
  font-size: 16px;
  color: #037afc;
  text-align: right;
  padding: 10px 20px;
}
.sub{
  position: fixed;
  bottom: 0;
}
.btns {
  padding: 20px 0 20px 10px;
}
</style>