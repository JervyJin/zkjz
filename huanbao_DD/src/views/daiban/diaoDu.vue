<template>
  <div class="detailPage" ref="page">
    <!-- title：案件调度 -->
     <!-- {{this.$route.query.workFlowId}} -->
    <!-- {{this.$route.query.workId}} -->
    <!-- {{this.$route.query.taskId}} -->
    <!-- {{this.$route.query.actId}} -->
    <!-- {{this.$route.query.bizid}} -->
    <van-form @submit="saveAjdd">
    <van-field name="radio" label="处罚类型：" required input-align="right"
      :rules="[{ required: true, message: '请选择处罚类型！！' }]">
      <template #input>
        <van-checkbox-group v-model="isChe" @change="checkboxChange()" direction="horizontal" style="background: #fff;margin-bottom: 2px;">
          <van-checkbox name="0" :disabled="canChoose1">行政处罚</van-checkbox>
          <van-checkbox name="1" :disabled="canChoose2">行政拘留</van-checkbox>
          <van-checkbox name="2" :disabled="canChoose3">刑事处罚</van-checkbox>
        </van-checkbox-group>
      </template>
    </van-field>
    <!-- ************行政处罚************** -->
    <van-form v-if="show1">
      <p class="title">
        行政处罚明细:
      </p>
      <van-field
        v-model="xzList.XZCF_gz_date"
        readonly
        label="行政处罚告知书下达日期"
        label-width="168"
        is-link
        @click="xzChuFa_showPopupGZ"
        placeholder="请选择"
        input-align="right"
      />
      <van-popup v-model="xzChuFa_showGZ" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          item-height="40"
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="xzChuFa_handleConfirmGZ"
          @cancel="xzChuFa_handleCancelGZ"
        />
      </van-popup>
      <!-- 行政处罚决定书下达日期 -->
      <van-field
        v-model="xzList.XZCF_xd_date"
        readonly
        label="行政处罚决定书下达日期"
        label-width="170"
        is-link
        @click="xzChuFa_showPopupXD"
        placeholder="请选择"
        input-align="right"
      />
      <van-popup v-model="xzChuFa_showXD" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          item-height="40"
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="xzChuFa_handleConfirmXD"
          @cancel="xzChuFa_handleCancelXD"
        />
      </van-popup>

     
      <!-- 金额 -->
      <van-field
        v-model="xzList.XZCF_sum"
        label="罚款金额（万元）"
        type="number"
        label-width="170"
        placeholder="请输入金额"
        input-align="right"
      />
       <!-- 附件 -->
      <div class="photo">
        <p>处罚决定书附件</p>
        <van-uploader @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" :before-delete="delImg" multiple v-model="xzList.XZCF_fileList" :after-read="afterRead"/>
      </div>
      
    </van-form>
    <!-- ************行政拘留************** -->
    <van-form v-if="show2">
      <!-- 移交公安日期 -->
      <p class="title">行政拘留明细:</p>
      <van-field
        v-model="jlList.yjgatime"
        readonly
        label="移交公安日期"
        label-width="170"
        is-link
        @click="juLiu_showPopupGZ"
        placeholder="请选择"
        input-align="right"
      />
      <van-popup v-model="juLiu_showGZ" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          item-height="40"
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="juLiu_handleConfirmGZ"
          @cancel="juLiu_handleCancelGZ"
        />
      </van-popup>
      <van-field
        v-model="jlList.gajg"
        
        label="公安机关"
        label-width="170"
        placeholder="请输入"
        input-align="right"
      />

      <!-- 行政拘留决定书下达日期 -->
      <van-field
        v-model="jlList.XDdate"
        readonly
        label="行政拘留告知书下达日期"
        label-width="170"
        is-link
        @click="juLiu_showPopupXD"
        placeholder="请选择"
        input-align="right"
      />
      <van-popup v-model="juLiu_showXD" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          item-height="40"
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="juLiu_handleConfirmXD"
          @cancel="juLiu_handleCancelXD"
        />
      </van-popup>

      <!-- 附件 -->
      <div class="photo">
        <p>拘留决定书附件</p>
        <van-uploader @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" :before-delete="delImg1" multiple v-model="jlList.juLiu_fileList" :after-read="afterRead1" />
      </div>

      <!-- 添加涉案人员 list -->
      <van-cell-group class="sheAnList" v-for="(v,index) in saryList" :key="index">
        <p>
          <span>涉案人员明细</span>
          <span class="del" @click="juLiu_del(index)">删除</span>
        </p>
        <van-field v-model="v.saryname" label="涉案人员" placeholder="请输入" />
        <van-field v-model="v.dw" label="单位" placeholder="请输入" />
        <van-field v-model="v.zw" label="职务" placeholder="请输入" />
        <van-field v-model="v.jlts" label="拘留天数" type="number" placeholder="请输入" />
      </van-cell-group>
      <p class="add" @click="juLiu_add"><span></span>添加涉案人员</p>
    </van-form>

    <!-- ***********刑事处罚****************** -->
    <van-form v-if="show3">
      <p class="title">
        刑事处罚明细:
      </p>
      <!-- 移交公安日期 -->
      <van-field
        v-model="xsList.yjgatime"
        readonly
        label="移交公安日期"
        label-width="170"
        is-link
        @click="xsChuFa_showPopupGZ"
        placeholder="请选择"
        input-align="right"
      />
      <van-popup v-model="xsChuFa_showGZ" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          item-height="40"
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="xsChuFa_handleConfirmGZ"
          @cancel="xsChuFa_handleCancelGZ"
        />
      </van-popup>
      <van-field
        v-model="jlList.gajg"
        label="公安机关"
        label-width="170"
        placeholder="请输入"
        input-align="right"
      />
      <!-- 刑事拘留证下达日期 -->
      <van-field
        v-model="xsList.XDdate"
        readonly
        label="刑事拘留证下达日期"
        label-width="170"
        is-link
        @click="xsChuFa_showPopupXD"
        placeholder="请选择"
        input-align="right"
      />
      <van-popup v-model="xsChuFa_showXD" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          item-height="40"
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="xsChuFa_handleConfirmXD"
          @cancel="xsChuFa_handleCancelXD"
        />
      </van-popup>

      <!-- 附件 -->
      <div class="photo">
        <p>刑事拘留证</p>
        <van-uploader @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" :before-delete="delImg2"  multiple v-model="xsList.xsjlz" :after-read="afterRead2" />
      </div>
      <!-- 添加刑事拘留明细 list -->
      <van-cell-group class="sheAnList" v-for="(v,index) in fzxyrList" :key="index">
        <p>
          <span>刑事拘留明细<em v-if="fzxyrList.length">({{index+1}})</em></span>
          <span class="del" @click="fzxyr_del(index)">删除</span>
        </p>
        <van-field v-model="v.fzxyrname" label="犯罪嫌疑人" placeholder="请输入" />
        <van-field v-model="v.dw" label="单位" placeholder="请输入" />
        <van-field v-model="v.zw" label="职务" placeholder="请输入" />
      </van-cell-group>

      <p class="add" @click="fzxyr_add"><span></span>添加犯罪嫌疑人</p>

      <!-- 检察机关 -->
      <van-field
        v-model="xsList.jcjg"
        label="检察机关："
        placeholder="请输入"
        input-align="right"
      />
      <van-field
        v-model="xsList.pzdbrq"
        readonly
        label="批准逮捕日期："
        label-width="170"
        is-link
        @click="xsChuFa_showPopupXD1"
        placeholder="请选择"
        input-align="right"
      />
      <van-popup v-model="xsChuFa_showXD1" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          item-height="40"
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="xsChuFa_handleConfirmXD1"
          @cancel="xsChuFa_handleCancelXD1"
        />
      </van-popup>
      <!-- 附件 -->
      <div class="photo">
        <p>逮捕证</p>
        <van-uploader @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" :before-delete="delImg3" multiple  v-model="xsList.dbz" :after-read="afterRead3"/>
      </div>

      <!-- 审判机关 -->
      <van-field
        v-model="xsList.spjg"
        label="审判机关："
        placeholder="请输入"
        input-align="right"
      />
      <van-field
        v-model="xsList.sprq"
        readonly
        label="审判日期："
        label-width="160"
        is-link
        @click="xsChuFa_showPopupXD2"
        placeholder="请选择"
        input-align="right"
      />
      <van-popup v-model="xsChuFa_showXD2" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          item-height="40"
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="xsChuFa_handleConfirmXD2"
          @cancel="xsChuFa_handleCancelXD2"
        />
      </van-popup>
      <!-- 附件 -->
      <div class="photo">
        <p>刑事判决书</p>
        <van-uploader @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" :before-delete="delImg4" multiple  v-model="xsList.xspjs" :after-read="afterRead4"/>
      </div>

      <!-- 添加犯罪分子 list -->
      <van-cell-group class="sheAnList" v-for="(v,index) in fzfzList" :key="index">
        <p>
          <span>犯罪分子明细</span>
          <span class="fzfz_del del" @click="delFzfz(index)">删除</span>
        </p>
        <van-field v-model="v.fzfzname" label="犯罪分子" placeholder="请输入" />
        <van-field type="textarea" v-model="v.pjxq" label="判决详情" placeholder="请输入" />
      </van-cell-group>
      <p class="add" @click="fzfz_add"><span></span>添加犯罪分子明细</p>
     </van-form>
 
      <!-- 下级节点 -->
      <van-field name="radio" label="选择办理节点:" required input-align="right" label-width="120">
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
        <!-- <span><em style="color:red;">* </em>选择下步办理人:</span>
        <van-radio-group v-model="nextR" >
          <van-radio :name="index" v-for="(item,index) in nextRen" :key="index" style="margin-top: 10px;">{{item.userName}}</van-radio>
        </van-radio-group> -->
        <van-field
          v-if="nextNodeInfo.length && (nextNodeInfo[index].actionId !== 'end' && nextNodeInfo[index].actionId !== 'end2')"
          readonly
          :rules="[{ required: true, message: '选择下步办理人！！' }]"
          label="选择下步办理人:"
          placeholder="请选择"
          input-align="right"
          @click="getTXL('next')"
          v-model="nextR"
        />
      <!-- 意见 -->
      <van-field
        v-model="commonInfo.msg"
        required
        rows="1"
        autosize
        label="意见"
        type="textarea"
        placeholder="请输入描述"
        input-align="right"
        :rules="[{ required: true, message: '请填写意见！' }]"
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
      <van-button class="sub" block type="info" native-type="submit">提交</van-button>
    </van-form>
  </div>
</template>

<script>
import config1 from '../../config.js'
import { Dialog } from 'vant';
import config from '../../../src/config'
import {guid, upLoaderImg } from "../../util/upLoaderImg";
import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载
// import { getjianquan } from "@/util/jianquan";
import dayjs from 'dayjs'
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
export default {

  data() {
    return {
      scrollTop: 0,
      data: {},
      isChe: [],
      canChoose1: false,
      canChoose2: false,
      canChoose3: false,
      show1: false,
      show2: false,
      show3: false,
      radio:"",
      nextNodeInfo: [],

      commonInfo:{
        handleNode:"",
        msg:"",
        copy:""
      },

      /*行政处罚*/ 
      xzList: {
        XZCF_gz_date: "",
        XZCF_xd_date:"",
        XZCF_sum:"",
        XZCF_fileList: []
      },
      xzChuFa_showGZ: false,
      xzChuFa_showXD:false,
      /* 刑事处罚 */
      xsList: {
        yjgatime: "",
        fzfzname: "",
        pjxq: "",
        xsjlz: [],
        jcjg: '',
        pzdbrq: '',
        dbz: [],
        spjg: '',
        sprq: '',
        xspjs: [],
        
        XDdate: '',
      },
      xsChuFa_showGZ: false,
      xsChuFa_showXD: false,
      xsChuFa_showXD1: false,
      xsChuFa_showXD2: false,
      currentDate: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      xsChuFa_items: [],
      /* 刑事拘留 */
      jlList: {
        yjgatime: "",
        juLiu_msg: "",
        saryname: "",
        dw: "",
        zw: "",
        jlts: "",
        juLiu_fileList: [],
        XDdate: '',
      },

      juLiu_showGZ: false,
      juLiu_showXD: false,
      saryList: [],
      fzfzList: [],
      fzxyrList: [],

      currentNodeInfo: {},
      nextNodeInfo: [],
      nextRen: [],
      nextR: "",
      index: 0,
      csRen: [],
      csRname: "",
      scrLists: {},
      f0: [],
      f1: [],
      f2: [],
      f3: [],
      f4: [],
      uuid: guid()
    };
  },
  created() {
    this.getCurrentNodeParams();
    dd.ready(() => {
      dd.biz.navigation.setTitle({
        title: "案件调度" // 控制标题文本，空字符串表示显示默认文本
      });
    });
  },
  watch: {
    index(v) {
      if(this.nextNodeInfo[this.index].actionId == 'end' || this.nextNodeInfo[this.index].actionId == 'end2') return;  // 如果选择办结就不再调取办理人
      this.getJkzfUserChooseList();
    }
  },
  methods: {
    // 点击预览事件
    click_preview(file) {
      this.scrollTop = this.$refs.page.scrollTop
      console.log(file);
      if (file.fileType != 1) {
        window.location.href = file.url;
      }
    },
    // 文件超过大小
    onOversize(file) {
      console.log(file);
      this.$toast("文件大小不能超过 10M");
    },

    
    closePrevew() {
      this.$refs.page.scrollTop = this.scrollTop;
    },
    // 图片删除
     delImg(file, detail) {
      return this.del(0, detail)
    },
    // 图片删除
     delImg1(file, detail) {
      return this.del(1, detail)
    },
    // 图片删除
     delImg2(file, detail) {
      return this.del(2, detail)
    },
    // 图片删除
     delImg3(file, detail) {
      return this.del(3, detail)
    },
    // 图片删除
     delImg4(file, detail) {
      return this.del(4, detail)
    },
    del(i, detail) {
      let id = '';
      let arr = []
      switch (i) {
        case 0:
          arr = this.xzList.XZCF_fileList;
          id = this.xzList.XZCF_fileList[detail.index].fileid;
        case 1:
          arr = this.jlList.juLiu_fileList
          id = this.jlList.juLiu_fileList[detail.index].fileid;
        case 2:
          arr = this.xsList.xsjlz
          id = this.xsList.xsjlz[detail.index].fileid;
        case 3:
          arr = this.xsList.dbz
          id = this.xsList.dbz[detail.index].fileid;
        case 4:
          arr = this.xsList.xspjs
          id = this.xsList.xspjs[detail.index].fileid;
      }
      return this.http.post(config.api_base+'/deleteFile',{fileid: id}).then(res=>{
        this.$toast({message: res.msg})
        arr.splice(detail.index, 1);
        return true
      })
    },
    // 图片上传
    async afterRead(e) {
      //文件读取完成后的回调函数
      let uploadImg = await upLoaderImg(e, 7, this.uuid).then(data =>{
        data.forEach(v =>  {
      
             
          if(v.fileType==1) {
            v.isImage = true
          }
          
          
          })
        this.xzList.XZCF_fileList = data;
      });
    },
    // 图片上传
    async afterRead1(e) {
      //文件读取完成后的回调函数
      let uploadImg = await upLoaderImg(e, 8, this.uuid).then(data =>{
        console.log(data)
        data.forEach(v =>  {
          if(v.fileType==1) {
            v.isImage = true
          }
          })
        this.jlList.juLiu_fileList = data;
      });
    },
    // 图片上传
    async afterRead2(e) {
      //文件读取完成后的回调函数
      let uploadImg = await upLoaderImg(e, 4, this.uuid).then(data =>{
        console.log(data)
        data.forEach(v =>  {
          if(v.fileType==1) {
            v.isImage = true
          }
          })
        this.xsList.xsjlz = data;
      });
    },
    // 图片上传
    async afterRead3(e) {
      //文件读取完成后的回调函数
      let uploadImg = await upLoaderImg(e, 0, this.uuid).then(data =>{
        console.log(data)
        data.forEach(v =>  {
          if(v.fileType==1) {
            v.isImage = true
          }
          })
        this.xsList.dbz = data;
      });
    },
    // 图片上传
    async afterRead4(e) {
      //文件读取完成后的回调函数
      let uploadImg = await upLoaderImg(e, 5, this.uuid).then(data =>{
        console.log(data)
        data.forEach(v =>  {
          if(v.fileType==1) {
            v.isImage = true
          }
          })
        this.xsList.xspjs = data;
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
      // if(this.$route.query.actId === 'P2' && (index !== 'next' || index !== 'cs')) {
      //    return;
      // }
      let isMult = index === 'cs';
      dd.ready(() => {
        let _this = this;
        dd.biz.contact.complexPicker({
          title: "选择人员", //标题
          corpId: config1.corpId, //企业的corpId
          multiple: isMult, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 1000, //最大可选人数
          pickedUsers: _this.nextRen, //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: config1.appId, //微应用Id，企业内部应用查看AgentId
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function(res) {
            console.log(index)
            if(index == 'next') {
              _this.nextRen = res.users;
              _this.nextR = _this.nextRen.map(v => v.name);
            }
            // let orgId = _this.$route.query.orgId;
            if (index === "cs") {
              _this.scrLists = res;
              _this.csRen = res.users;
              console.log(_this.csRen)
              _this.csRname = _this.csRen.map(i => i.name);
              // _this.csRid = _this.csRen.map(i => i.id);
              return;
            }
            if(index === -1){ // 主办人
              _this.mainRen = res.users[0]
              console.log("主办人:"+_this.mainRen)

            }else{ // 协办人
              console.log(JSON.stringify(_this.zfrlists))
              _this.zfrlists.splice(_this.zfrlists.length-1,1)
              console.log(res)
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
    checkboxChange() {
      console.log(this.isChe);
      if (this.isChe.indexOf("0") > -1) {
        this.show1 = true;
      } else {
        this.show1 = false;
      }
      if (this.isChe.indexOf("1") > -1) {
        this.canChoose3 = true;
        this.show2 = true;
      } else {
        this.canChoose3 = false;
        this.show2 = false;
      }
      if (this.isChe.indexOf("2") > -1) {
        this.canChoose2 = true;
        this.show3 = true;
      } else {
        this.show3 = false;
        this.canChoose2 = false;
      }
    },
    /* 行政处罚弹窗事件 */
    xzChuFa_showPopupGZ() {
      this.xzChuFa_showGZ = true;
    },
    xzChuFa_handleConfirmGZ(value) {
      this.xzList.XZCF_gz_date = value;
      this.xzList.XZCF_gz_date = dayjs(value).format("YYYY-MM-DD");
      this.xzChuFa_showGZ = false;
    },
    xzChuFa_handleCancelGZ() {
      // this.xzList.XZCF_gz_date = "";
      this.xzChuFa_showGZ = false;
    },
    xzChuFa_showPopupXD() {
      this.xzChuFa_showXD = true;
    },
    xzChuFa_handleConfirmXD(value) {
      this.xzList.XZCF_xd_date = dayjs(value).format("YYYY-MM-DD");
      this.xzChuFa_showXD = false;
    },
    xzChuFa_handleCancelXD() {
      // this.xzList.XZCF_xd_date = "";
      this.xzChuFa_showXD = false;
    },
    /* 刑事处罚弹窗事件 */
    xsChuFa_showPopupGZ() {
      this.xsChuFa_showGZ = true;
    },
    xsChuFa_handleConfirmGZ(value) {
      this.xsList.yjgatime = value;
      this.xsList.yjgatime = dayjs(value).format("YYYY-MM-DD");
      this.xsChuFa_showGZ = false;
    },
    xsChuFa_handleCancelGZ() {
      // this.xsList.yjgatime = "";
      this.xsChuFa_showGZ = false;
    },
    xsChuFa_showPopupXD() {
      this.xsChuFa_showXD = true;
    },
    xsChuFa_handleConfirmXD(value) {
      this.xsList.XDdate = dayjs(value).format("YYYY-MM-DD");
      this.xsChuFa_showXD = false;
    },
    xsChuFa_handleCancelXD() {
      this.xsList.XDdate = "";
      this.xsChuFa_showXD = false;
    },
    xsChuFa_showPopupXD1() {
      this.xsChuFa_showXD1 = true;
    },
    xsChuFa_handleConfirmXD1(value) {
      this.xsList.pzdbrq = value;
      this.xsList.pzdbrq = dayjs(value).format("YYYY-MM-DD");
      this.xsChuFa_showXD1 = false;
    },
    xsChuFa_handleCancelXD1() {
      // this.xsList.pzdbrq = "";
      this.xsChuFa_showXD1 = false;
    },
    xsChuFa_showPopupXD2() {
      this.xsChuFa_showXD2 = true;
    },
    xsChuFa_handleConfirmXD2(value) {
      this.xsList.sprq = value;
      this.xsList.sprq = dayjs(value).format("YYYY-MM-DD");
      this.xsChuFa_showXD2 = false;
    },
    xsChuFa_handleCancelXD2() {
      // this.xsList.sprq = "";
      this.xsChuFa_showXD2 = false;
    },

    

    /* 刑事拘留弹窗事件 */
    juLiu_showPopupGZ() {
      this.juLiu_showGZ = true;
    },
    juLiu_handleConfirmGZ(value) {
      this.jlList.yjgatime = value;
      this.jlList.yjgatime = dayjs(value).format("YYYY-MM-DD");
      this.juLiu_showGZ = false;
    },
    juLiu_handleCancelGZ() {
      // this.jlList.yjgatime = "";
      this.juLiu_showGZ = false;
    },
    juLiu_showPopupXD() {
      this.juLiu_showXD = true;
    },
    juLiu_handleConfirmXD(value) {
      this.jlList.XDdate = value;
      this.jlList.XDdate = dayjs(value).format("YYYY-MM-DD");
      this.juLiu_showXD = false;
    },
    juLiu_handleCancelXD() {
      // this.jlList.XDdate = "";
      this.juLiu_showXD = false;
    },

    juLiu_add() {
      this.saryList.push({
        saryname: '',
        dw: '',
        zw: '',
        jlts: ''
      });
    },
    juLiu_del(index) {
      this.saryList.splice(index, 1);
    },

    fzxyr_add() {
      this.fzxyrList.push({
        fzxyrname:'',
        dw: '',
        zw: ''
      });
    },
    fzxyr_del(index){
      this.fzxyrList.splice(index,1)
    },
    delFzfz(index) {
      this.fzfzList.splice(index, 1)
    },

    fzfz_add() {
      this.fzfzList.push({
        fzfzname:'',
        pjxq: ''
      });
    },

    fzfz_del(index){
      this.fzfzList.splice(index,1)
    },
    /*************************************************************************************************************/

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
          
        });
    },
    
    // 选择下步办理人触发
    onNextNodeChange(event) {
      if(this.nextNodeInfo[this.index].actionId == 'end' || this.nextNodeInfo[this.index].actionId == 'end2') return;  // 如果选择办结就不再调取办理人
      this.getJkzfUserChooseList();
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

    // 提交接口
    saveAjdd() {
      if(this.isChe.length==0){
        this.$toast({
          message:"请选择处罚类型!!"
        })
        return
      }
      Dialog.confirm({
        cancelButtonText:'取消',
        message: '确认提交?',
      }).then(() => {
        // on close
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '提交中',
        loadingType: 'spinner',
        selector: '#custom-selector',
      });
      let authorInfoList;
      if(this.nextNodeInfo[this.index].actionId == 'end' || this.nextNodeInfo[this.index].actionId == 'end2') {
        authorInfoList = []
      } else {
        authorInfoList = this.nextRen.map(v => ({userId: v.userid || v.userId || v.emplId || v.id, userName:v.name || v.userName}))
      }
      let routeInfolist = [
        {"routeId": this.nextNodeInfo[this.index].actionId,
          "routeName": this.nextNodeInfo[this.index].actionName,
          authorInfoList
        }
      ];
      // 流程字段
      let data1 = {
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
        routeInfolist: JSON.stringify(routeInfolist)
      }
      

      let form = {
        xzcfgzstime:this.xzList.XZCF_gz_date,
        xzcfjdstime:this.xzList.XZCF_xd_date,
        cfje:this.xzList.XZCF_sum,
        yjgatime: this.isChe.indexOf('2') > -1 ? this.xsList.yjgatime : this.jlList.yjgatime,
        gajg: this.jlList.gajg,  // 公安机关

        xsjlztime:this.xsList.XDdate,  //刑事拘留证下达日期
        xzjljdstime:this.jlList.XDdate,  // 行政拘留决定书下达时间
        // xsjlz: JSON.stringify(this.xsList.xsjlz),
        jcjg: this.xsList.jcjg,
        pzdbrq:this.xsList.pzdbrq,
        // dbz:JSON.stringify(this.xsList.dbz),
        spjg:this.xsList.spjg,
        sprq: this.xsList.sprq,
        // xspjs: this.xsList.xspjs,

        fzxyrList: JSON.stringify(this.fzxyrList),  // 刑事处罚人

        fzfzList:JSON.stringify(this.fzfzList),  // 犯罪分子
        saryList:JSON.stringify(this.saryList), // 涉案人员
        type:JSON.stringify(this.isChe),
        userid:userinfo.userId,
        username:userinfo.userName,
        comid:this.$route.query.bizid,
        csrList:JSON.stringify(this.scrLists),
        uuid: this.uuid,
        comments: this.commonInfo.msg
      }
      let data = {
        ...data1,
        ...form
      }
      this.http
        .post("saveAjdd", data)
        .then(res => {
          console.log(res)
          toast.clear();
          this.$toast({message:res.msg})
          if(this.csRen.length) {
            this.saveCsr();
          }
          this.$router.push("/")
        }).catch(res => {
          toast.clear();
          this.$toast({message:res.msg})
        });
        
      });
    },


  
  }
};
</script>
<style lang="scss" scoped>
.detailPage{
  height: 100vh;
  overflow-y: auto;
}
/deep/.van-tabs__content {
  margin: 10px;
}
.van-checkbox-group{
  font-size: 16px;
  padding: 10px;
}
/deep/.van-tabs__content {
  margin: 10px;
}
/deep/.van-tabs__nav--card {
  border: 1px solid #1989fa;
  margin: 0 10px;
  .van-tab {
    border-right: 1px solid #1989fa;
    color: #000;
  }
}
/deep/.van-tabs__nav--card {
  border: 1px solid #1989fa;
  margin: 0 10px;

  .van-tab {
    border-right: 1px solid #1989fa;
    color: #000;
  }
}
.van-tab.van-tab--active {
  background-color: #1989fa;
  color: #fff;
}

.van-checkbox {
  padding: 6px 0;
}
.sheAnList{
  p{
    font-size: 14px;
    color: #969799;
    padding: 10px 15px 0;
    display: flex;
  justify-content: space-between;
  }
 
}
.photo {
  padding: 10px 20px;
  background: #fff;
  border-bottom: 1px solid #ebedf0;
  p {
    font-size: 16px;
    padding-bottom: 10px;
  }
}
 .add{
    font-size: 17px;
    color: #52AAF8;
    padding: 10px 15px ;
    display: flex;
    justify-content: space-between;
  }
  .del{
    color: #52AAF8;
  }

  .title{
    padding: 10px 0 10px 15px;
    font-size: 16px;
    color: #52AAF8;
    background: #f2f2f2;
  }
  .sub{
    position: fixed;
    bottom: 0;
  }
  .btns {
    padding: 20px 0 20px 0;
  }
</style>