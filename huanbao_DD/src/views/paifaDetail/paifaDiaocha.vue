<template>
  <div class="detailPage" ref="page">
    <van-form  @submit="onSubmit">
      <van-field
        v-model="form.xzqy"
        label="行政区域："
        placeholder="行政区域"
        input-align="right"
        is-link
        readonly
        required
        @click="showAddr = true;"
        :rules="[{ required: true, message: '请选择行政区域！！' }]"
      />
      <van-popup v-model="showAddr" position="bottom" :style="{ height: '40%' }">
        <van-area
          :area-list="areaList"
          :columns-num="3"
          item-height="40"
          @confirm="addrConfirm"
          @cancel="addrleCancel"
        />
      </van-popup>

      <van-field v-model="form.qymc" label="企业名称：" placeholder="请输入" required input-align="right" 
        :rules="[{ required: true, message: '请输入企业名称！！' }]"/>
      <van-field v-model="form.xxdz" label="详细地址：" placeholder="请输入详细地址" required input-align="right" 
        :rules="[{ required: true, message: '请输入详细地址！！' }]"/>
      <van-field name="radio" label="企业类型：" required input-align="right"
        :rules="[{ required: true, message: '请选择企业类型！！' }]">
        <template #input>
           <!-- direction="horizontal" -->
          <van-radio-group v-model="form.qylx">
            <!-- <van-radio name="0">{{qiyeType1}}</van-radio>
            <van-radio name="1">{{qiyeType2}}</van-radio> -->
            <van-radio :name="v.CODE" v-for="v in qiyeType" :key="v.ID">{{v.NAME}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="radio" label="污染类型：" required input-align="right"
        :rules="[{ required: true, message: '请选择污染类型！！' }]">
        <template #input>
          <van-checkbox-group v-model="form.wrlx" direction="horizontal">
            <van-checkbox :name="v.CODE"  shape="square" v-for="v in wuranTypes" :key="v.CODE">{{v.NAME}}</van-checkbox>
          <!--   <van-checkbox name="0"  shape="square">{{wuranType1}}</van-checkbox>
            <van-checkbox name="1"  shape="square">{{wuranType2}}</van-checkbox> -->
          </van-checkbox-group>
        </template>
      </van-field>

      <van-field
        v-if="!$route.query.isZF"
        v-model="form.jcrq"
        readonly
        required
        label="检查日期："
        placeholder="检查日期"
        input-align="right"
        right-icon="arrow"
        @click="selectDate"
        :rules="[{ required: true, message: '请选择检查日期！！' }]"
      />
      <van-popup 
        v-model="showDate" 
        position="bottom" 
        :style="{ height: '40%' }">
        <van-datetime-picker
          item-height="40"
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        />
      </van-popup>

      <van-field
        v-if="!$route.query.isZF"
        v-model="form.jcqk"
        rows="1"
        autosize
        type="textarea"
        required
        label="检查情况："
        style="display: inline-block;"
        placeholder="请输入"
        input-align="left"
        :rules="[{ required: true, message: '请输入检查情况！！' }]"
      />

        <!-- v-model="form.wfxw.NAME" -->
      <van-field
        label-width="140"
        v-model="form.wfxwName"
        readonly
        required
        label="涉嫌违法行为："
        placeholder="涉嫌违法行为"
        input-align="right"
        right-icon="arrow"
        autosize
        type="textarea"
        @click="showPicker=true"
        :rules="[{ required: true, message: '请选择涉嫌违法行为！！' }]"
      />
      <!-- :actions="dicts" -->

      <van-action-sheet
        v-model="showPicker"
        close-on-click-action
        @close="onClose"
        @select="onSelect"
      >
        <div class="btns">
          <van-button type="default" @click="showPicker=false;">取消</van-button>
          <van-button type="info" @click="onSelect1">确定</van-button>
        </div>
        <van-checkbox-group v-model="form.wfxwList">
          <van-checkbox :name="v.CODE" v-for="v in dicts" :key="v.ID" shape="square">{{v.name}}</van-checkbox>
        </van-checkbox-group>
      </van-action-sheet>

      <div class="photo">
        <p>勘察笔录：</p>
        <!-- <div class="file-container">
          <span class="files">
            <i class="plus">点击上传</i>
            <input type="file" name="file" id="file" @change="addFiles(0, $event)">
          </span>
        </div> -->
        <van-uploader @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="form.kcblfiles" :before-delete="delImg" :after-read="afterRead"  multiple/>
      </div>

      <div class="photo">
        <p>询问笔录：</p>
        <van-uploader @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="form.xwblfiles" :before-delete="delImg1"  :after-read="afterRead1" multiple/>
      </div>

      <div class="photo">
        <p>调查终结报告：</p>
        <van-uploader @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="form.dczjbgfiles" :before-delete="delImg2" :after-read="afterRead2" multiple/>
      </div>

      <div class="photo">
        <p>其他附件：</p>
        <van-uploader @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="form.qtfiles" :before-delete="delImg3" :after-read="afterRead3" multiple/>
      </div>

      <!-- 办理节点 -->
      <van-field name="handleNode" label="办理节点" required>
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
        <van-field
          label-width="160"
          v-if="nextNodeInfo.length && nextNodeInfo[index].actionId !== 'end' && nextNodeInfo[index].actionId !== 'end2'"
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
            <span class="btn" @click="getTXL('next')">
              <van-icon name="arrow"/>
            </span>
          </template>
        </van-field>

      <!-- 意见 -->
      <van-field
        v-model="form.comment"
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
      <van-button class="sub" block type="info" native-type="submit">提交</van-button>
    </van-form>
  </div>
</template>
<script>
import config1 from '../../config.js'
import config from '../../../src/config'
import dayjs from "dayjs";
import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载
// import {getjianquan} from '@/util/jianquan';
import { guid, upLoaderImg } from "@/util/upLoaderImg";
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));

export default {
  data() {
    return {
      valArr: [],
      scrollTop: 0,      
      qiyeType:[],
      qiyeType1: "",
      qiyeType2: "",
      wuranTypes: [],
      wuranType1: "",
      wuranType2: "",

      showAddr: false,
      areaList: {},

      showDate: false,
      currentDate: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      showPicker: false,
      dicts: [],
      form: {
        xzqy: '', // 行政区域
        xzqyname:"", //区域编码
        qymc: '', // 企业名称
        xxdz: '', // 详细地址
        qylx: '', // 企业类型
        wrlx: [], // 污染类型

        jcrq: '', // 检查日期
        jcqk: '', // 检查情况
        wfxw: '', // 违法行为
        wfxwName: '',
        wfxwList: [],
        kcblfiles: [],//勘察笔录附件
        xwblfiles: [],
        dczjbgfiles: [],
        qtfiles: [],
        comment: ''
      },
      // kcblfiles: [],//勘察笔录附件
      // xwblfiles: [],
      // dczjbgfiles: [],
      // qtfiles: [],
      copy: [], //抄送
      currentNodeInfo: {},
      index: 0,
      user_index: [],
      nextNodeInfo: [],
      nextRen:[],
      nextR: "",
      csRen: [],
      csRname: "",
      scrLists: {},
      uuid: guid(),
      f0: [],
      f1: [],
      f2: [],
      f3: []
    };
  },
  created() {
    // getjianquan(); //鉴权
    /* 设置导航栏标题 */
    if(this.$route.query.actId === 'N2') {
      dd.ready(() => {
        dd.biz.navigation.setTitle({
          title: "调查取证" // 控制标题文本，空字符串表示显示默认文本
        });
      });
    }
    if(this.$route.query.actId === 'N4') {
      dd.ready(() => {
        dd.biz.navigation.setTitle({
          title: "补充调查" // 控制标题文本，空字符串表示显示默认文本
        });
      });
    }
    this.getArea();
    this.getQiye();
    this.getWuran();
    this.getDict();

    this.getDcqzInfo();  // 调度详情

    this.getCurrentNodeParams();
    
    this.currentDate = dayjs(new Date().valueOf()).format("YYYY-MM-DD");
    this.form.jcrq = this.currentDate;
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
    // 地区数据
    getArea(){
      this.http.post("getAreaListByType",{}).then(res => {
        console.log(res.data.city_list);
        this.areaList = res.data
      });
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
    del(i, detail) {
      let k = i == 0 ? 'kcblfiles' : i == 1 ? 'xwblfiles' : i == 2 ? 'dczjbgfiles' : 'qtfiles'
      let id = this.form[k][detail.index].fileid;
      return this.http.post(config.api_base + '/deleteFile',{fileid: id}).then(res=>{
        this.$toast({message: res.msg})
        this.form[k].splice(detail.index, 1)
        return true
      })
    },
    // 图片上传
    async afterRead(e, detail) {
      //文件读取完成后的回调函数
      await upLoaderImg(e,  3, this.uuid).then(data =>{
        console.log(data)
        data.forEach(v =>  {
          if(v.fileType==1) {
            v.isImage = true
          }
          })
        this.form.kcblfiles = data;
      });
    },
    // 图片上传
    async afterRead1(e) {
      //文件读取完成后的回调函数
      let uploadImg = await upLoaderImg(e, 6, this.uuid).then(data =>{
        console.log(data)
        data.forEach(v =>  {
          if(v.fileType==1) {
            v.isImage = true
          }
          })
        this.form.xwblfiles = data;
      });
    },
    // 图片上传
    async afterRead2(e) {
      //文件读取完成后的回调函数
      let uploadImg = await upLoaderImg(e, 2, this.uuid).then(data =>{
        console.log(data)
        data.forEach(v =>  {
          if(v.fileType==1) {
            v.isImage = true
          }
          })
        this.form.dczjbgfiles = data;
      });
    },
    // 图片上传
    async afterRead3(e) {
      //文件读取完成后的回调函数
      let uploadImg = await upLoaderImg(e, 1, this.uuid).then(data =>{
        console.log(data)
        data.forEach(v =>  {
          if(v.fileType==1) {
            v.isImage = true
          }
          })
        this.form.qtfiles = data;
      });  //使用上传的方法。file.file
      console.log(uploadImg);
    },
    /* 获取案件来源 */
    getSource() {
      this.http.post("getDicListByType", { type: 51 }).then(res => {
        console.log(res);
        // this.source1 = res.data[0].NAME,
        // this.source2 = res.data[1].NAME,
        // this.source3 = res.data[2].NAME,
        // this.source4 = res.data[3].NAME,
        // this.source5 = res.data[4].NAME
        //         let str = "res.data[0].NAME,res.data[1].NAME,res.data[2].NAME,res.data[3].NAME,res.data[4].NAME"
        // this.source_columns = str.split(',')
        let str
        res.data.map(item => {
          console.log(item.NAME)
          str = item.NAME
          this.source_columns.push(str);
        });
      });
    },

    /* 获取企业类型 */
    getQiye() {
      this.http.post("getDicListByType", { type: 49 }).then(res => {
        console.log(res);
        // this.qiyeType1 = res.data[0].NAME;
        // this.qiyeType2 = res.data[1].NAME;
        this.qiyeType = res.data;
      });
    },
    /* 获取污染类型 */
    getWuran() {
      this.http.post("getDicListByType", { type: 50 }).then(res => {
        console.log(res);
          this.wuranTypes = res.data;
        // res.data.forEach(v => {
          // if(v.CODE == 0) {
          //   this.wuranType1 = v.NAME;
          // }
          // if(v.CODE == 1) {
          //   this.wuranType2 = v.NAME;
          // }
        // })
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
              _this.user_index = _this.nextRen.map((v, i) => i)
            }
            if (index === "cs") {
              _this.scrLists = res;
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
    // 52 获取违法行为
    getDict() {
      this.http.post('getDicListByType', {type: 52}).then(res => {
        let dicts = res.data;
        dicts.forEach(v => {
          v.name = v.NAME
        })
        this.dicts = dicts;
      })
    },
    // 地址
    addrConfirm(val) {
      // console.log(val)
      this.form.xzqy = val[1].name + "-" + val[2].name;
      this.form.xzqyname = val[1].code + "," + val[2].code;
      this.showAddr = false;
    },
    addrleCancel() {
      this.showAddr = false;
    },
    
    onSelect(evt) {
      this.form.wfxw = evt;
      this.showPicker = false;
    },
    onSelect1() {
      this.form.wfxwName = ''
      this.dicts.forEach(v => {
        this.form.wfxwList.forEach((o, i) => {
          if(v.CODE == o) {
            this.form.wfxwName += v.NAME + '\n';
          }
        })
      })
      this.showPicker = false;
    },
    onClose() {
      this.showPicker = false;
    },
    handleConfirm(value) {
      this.currentDate = dayjs(value).format("YYYY-MM-DD");
      this.form.jcrq = this.currentDate;
      this.showDate = false;
    },
    handleCancel() {
      this.form.jcrq = "";
      this.showDate = false;
    },
    selectDate() {
      this.showDate = true;
    },
    onInput(event){
      this.form.jcrq = event.detail;
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
    // 获取调查取证详情 回显
    getDcqzInfo() {
      this.http.post("getDcqzInfo", {
        comid: this.$route.query.bizid
      }).then(res => {
        let data = res.data;
        let wfxwName = '';
        //  this.dicts[data.WFXW]
        if(this.dicts.length && data.WFXW) {
          let codes = data.WFXW.split(',');
          codes.forEach(code => {
            this.dicts.forEach(d => {
              if(d.CODE == code) {
                wfxwName += d['NAME'] + '\n'
              }
            })
          })
        }
        data.KCBLFJ.forEach(v =>{
          this.f0.push(v.ID)
           
          if(v.fileType==1) {
            v.isImage = true
          }
          
        })
        data.XWBLFJ.forEach(v =>{
          this.f1.push(v.ID)
          if(v.fileType==1) {
            v.isImage = true
          }
        })
        data.DCZJBG.forEach(v =>{
          this.f2.push(v.ID)
          if(v.fileType==1) {
            v.isImage = true
          }
        })
        data.DCQZQTFJ.forEach(v =>{
          this.f3.push(v.ID)
          if(v.fileType==1) {
            v.isImage = true
          }
        })
        this.form = {
          xzqy: data.XZQY || '', // 行政区域
          qymc: data.QYMC || '', // 企业名称
          xxdz: data.XXDZ || '', // 详细地址
          qylx: data.QYLX || '0', // 企业类型
          wrlx: data.WRLX && data.WRLX.split(',')  || [], // 污染类型
          jcrq: data.JCRQ && dayjs(data.JCRQ).format("YYYY-MM-DD") || dayjs(new Date()).format("YYYY-MM-DD"), // 检查日期
          jcqk: data.JCQK || '', // 检查情况
          wfxwName, // 违法行为
          kcblfiles: data.KCBLFJ || [],//勘察笔录附件
          xwblfiles: data.XWBLFJ || [],
          dczjbgfiles: data.DCZJBG || [],
          qtfiles: data.DCQZQTFJ || [],
          wfxwList: data.WFXW && data.WFXW.split(',') || [],
          comment: data.comment || ''
        }
        data.UUID && (this.uuid = data.UUID)
      })
    },
    onSubmit() {
      let nextRen = [];
      this.user_index.forEach(i => {
        nextRen.push(this.nextRen[i])
      })
      if(!nextRen.length) {
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
      let form = JSON.parse(JSON.stringify(this.form));
      form.wrlx = form.wrlx.join(",");
      form.wfxw = form.wfxwList.join(",");
      delete form.wfxwList;
      delete form.dczjbgfiles;
      delete form.kcblfiles;
      delete form.qtfiles;
      delete form.xwblfiles;
      delete form.qtfiles;
      delete form.wfxwName;
      if(this.$route.query.isZF) {
        delete form.jcrq;
        delete form.jcqk;
      }
      // form.kcblfiles =  JSON.stringify(form.kcblfiles)//勘察笔录附件
      // form.xwblfiles =  JSON.stringify(form.xwblfiles)
      // form.dczjbgfiles =  JSON.stringify(form.dczjbgfiles)
      // form.qtfiles =  JSON.stringify(form.qtfiles)
      
      
      let authorInfoList = nextRen.map(v => ({userId: v.userid || v.userId || v.emplId || v.id, userName:v.name || v.userName}))
      let routeInfolist = [
        {"routeId": this.nextNodeInfo[this.index].actionId,
          "routeName": this.nextNodeInfo[this.index].actionName,
          authorInfoList
        }
      ];
      let data1 = {
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
        comments: form.comment,
        taskId: this.currentNodeInfo.taskId,
        routeInfolist: JSON.stringify(routeInfolist),
        csrList:JSON.stringify(this.scrLists),
        uuid: this.uuid
      }
      
      let data = {
        ...data1,
        ...form,
        userid: userinfo.userId,
        username: userinfo.userName,
        comid: this.$route.query.bizid
      }
      this.http.post('saveDcqz', data)
        .then(res => {
          toast.clear();
          if(this.csRen.length) {
            this.saveCsr();
          }
          this.$toast({message:res.msg})
          this.$router.push("/");
        }).catch(res => {
          this.$toast({message:res.msg})
          toast.clear();
        });
    }
  }
};
</script>
<style lang="scss" scoped>
// @import "../../assets/css/lib/reset-vants.css";
.detailPage{
  height: 100vh;
  overflow-y: auto;
}
.file-container {
  display: flex;
  .files {
    width: 80px;
    height: 80px;
    position: relative;
    background: #f2f2f2;
    margin: 5px;
    border-radius: 5px;
    i {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ccc;
      font-size: 12px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      filter: alpha(opacity=0);
    }
  }
}
.van-checkbox {
  padding: 6px 0;
}
.photo {
  padding: 10px 20px;
  background: #fff;
  border-bottom: 1px solid #ebedf0;
  p {
    font-size: 14px;
    padding-bottom: 10px;
  }
}

/deep/ .van-action-sheet__content {
  padding: 20px;;
  .btns {
    display:flex;
    justify-content:space-around;
    /deep/ .van-button{
      height: 28px;
    }
  }
}

  .sub{
    position: fixed;
    bottom: 0;
  }
.btn {
    padding: 20px 0 20px 10px;
  }  /deep/.van-picker-column__item{
  height: 44px;
}</style>