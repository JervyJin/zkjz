<template>
  <div class="lxzfPage">
    <van-form @submit="onSubmit">
      <van-field
        v-model="laiyuan"
        required
        readonly
        label="案件来源："
        placeholder="案件来源"
        input-align="right"
        is-link
        @click="showSource=true "
        :rules="[{ required: true, message: '请选择案件来源！！' }]"
      />
      <van-popup v-model="showSource" position="bottom" :style="{ height: '30%' }">
        <van-picker
          show-toolbar
          :columns="source_columns"
          @cancel="showSource = false"
          @confirm="source_Confirm"
        />
      </van-popup>

      <van-field
        v-model="userInfo.xzqy"
        label="行政区域："
        placeholder="行政区域"
        input-align="right"
        is-link
        readonly
        @click="showAddress"
      />
      <!-- 地区弹窗 -->
      <van-popup v-model="showAddr" position="bottom" :style="{ height: '40%' }">
        <van-area
          :area-list="areaList"
          :columns-num="3"
          item-height="40"
          @confirm="addrConfirm"
          @cancel="addrleCancel"
        />
      </van-popup>

      <van-field v-model="userInfo.qymc" label="企业名称：" placeholder="请输入" input-align="right" />
      <van-field v-model="userInfo.xxdz" label="详细地址：" placeholder="请输入详细地址" input-align="right" />
      <van-field name="radio" label="企业类型：" input-align="right" label-width="150">
        <template #input>
          <!-- direction="horizontal" -->
          <!-- <van-radio-group v-model="userInfo.qylx" >
            <van-radio name="0">{{qiyeType1}}</van-radio>
            <van-radio name="1">{{qiyeType2}}</van-radio>
          </van-radio-group> -->
          <van-radio-group v-model="userInfo.qylx" direction="horizontal">
            <van-radio :name="v.CODE" v-for="v in qiyeType" :key="v.ID">{{v.NAME}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="radio" label="污染类型：" input-align="right" label-width="160">
        <template #input>
          <van-checkbox-group v-model="userInfo.wrlx" direction="horizontal">
            <van-checkbox :name="v.CODE"  shape="square" v-for="v in wuranTypes" :key="v.CODE">{{v.NAME}}</van-checkbox>
            <!-- <van-checkbox name="0"  shape="square">{{wuranType1}}</van-checkbox>
            <van-checkbox name="1"  shape="square">{{wuranType2}}</van-checkbox> -->
          </van-checkbox-group>
        </template>
      </van-field>

      <van-field
        v-model="userInfo.ycxxms"
        required
        rows="1"
        autosize
        label="异常现象描述："
        type="textarea"
        placeholder="请输入（2000字内）"
        maxlength="2000"
        show-word-limit
        input-align="left"
        style="display: inline-block;"
        label-width="200"
        :rules="[{ required: true, message: '请填写现象描述！！' }]"
      />

      <!-- 执法期限 -->
      <van-field
        v-model="userInfo.zfqx"
        required
        is-link
        readonly
        label="执法期限："
        @click="showPopup"
        placeholder="请选择"
        input-align="right"
        :rules="[{ required: true, message: '请选择执法期限！' }]"
      />
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
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
<!-- 科室 -->
      <div class="zhifarenList" >
        <p>
          <span>主办科室明细</span>
          <span></span>
        </p>
        <van-field
          readonly
          required
          is-link
          label="主办科室："
          placeholder="请选择主办科室"
          input-align="right"
          @click="getTXL(-1)"
          v-model="this.mainRen.name"
          :rules="[{ required: true, message: '请选择主办科室！' }]"
        />
      </div>

      
      <div class="zhifarenList" v-for="(item,index) in zfrlists" :key="index">
        <p>
          <span>协办科室明细<em v-if="zfrlists.length>1">({{index+1}})</em></span>
          <span @click="del(index)" style="color:#0033ff;">删除</span>
        </p>
    
        <van-field
          readonly
          required
          is-link
          label="协办科室："
          v-model="item.name"
          placeholder="选择协办科室"
           @click="getTXL(index)"
          input-align="right"
          :rules="[{ required: true, message: '请选择协办科室！' }]"
        />
      </div>
      <p class="add" @click="add">添加科室</p>
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <!-- 附件图片 -->
      <!-- <div class="photo">
        <p>相关附件</p>
        <van-uploader v-model="userInfo.fileList" multiple />
      </div>-->
      <!-- 执法期限 -->
      <van-field
        v-model="userInfo.psyj"
        required
        rows="1"
        autosize
        label="批示意见："
        label-width="230"
        type="textarea"
        placeholder="请输入"
        input-align="right"
        :rules="[{ required: true, message: '请输入批示意见！' }]"
      />
        <van-button block type="info" native-type="submit" style="position: fixed;
    bottom: 0;">提交</van-button>
    </van-form>
  </div>
</template>
<script>
import config from '../../config'
import dayjs from "dayjs";
import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载
// import {getjianquan} from '../../util/jianquan'
let userinfos = JSON.parse(window.localStorage.getItem("userinfo"));


export default {
  data() {
    return {
      userInfo: {
        xzqy: "",
        xzqyname:"",
        ajly: "",
        qymc: "",
        wrlx:[],
        xxdz: "",
        qylx: "0",
        zfdwlist:"",
        userid: userinfos.userId,
        username:userinfos.userName,
        ycxxms: "",
        // zfqx: dayjs(new Date()).format("YYYY-MM-DD"),
        zfqx: "",
        psyj: '',  // 批示意见

        // fileList: [
        //   { url: "https://img.yzcdn.cn/vant/leaf.jpg" }
        //   // Uploader 根据文件后缀来判断是否为图片文件
        //   // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        //   // { url: 'https://cloud-image', isImage: true },
        // ]
      },
      laiyuan:"",
      mainRen:  {
       /*  'name':userinfos.userName,
        "emplId":userinfos.userId,
        "status":"1" */
      }, 
      zfrlists: [
        
      ],
      qiyeType: [],
      qiyeType1: "",
      qiyeType2: "",
      wuranTypes: [],
      wuranType1: "",
      wuranType2: "",

      showAddr: false,
      areaList: {},
      date: "",
      show: false, //是否展示日期
      currentDate: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      showPicker: false,
      showSource: false,
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      source1: "",
      source_columns: [],
      items: [],
      mainName:""
    };
  },
  created() {
    this.getArea();
    this.getWuran();
    this.getQiye();
    this.getSource();
    // getjianquan()   //鉴权
    
    /* 设置导航栏标题 */
    dd.ready(() => {
      dd.biz.navigation.setTitle({
        title: "领导派发" // 控制标题文本，空字符串表示显示默认文本
      });
    });
  },
  methods: {
    // 地区数据
    getArea(){
      this.http.post("getAreaListByType",{}).then(res => {
        console.log(res.data.city_list);
        this.areaList = res.data
      });
    },
    showAddress() {
      this.showAddr = true;
    },
    addrConfirm(val) {
      // console.log(val)
      this.userInfo.xzqy =  val[1].name + "-" + val[2].name;
      this.userInfo.xzqyname =  val[1].code + "," + val[2].code;
      this.showAddr = false;
    },
    addrleCancel() {
      this.showAddr = false;
    },

    onConfirm(value) {
      // this.userInfo.mainRen = value;
      this.showPicker = false;
    },
    /* 案件来源 */
    source_Confirm(value,index) {
      this.laiyuan = value;
      this.userInfo.ajly = index;
      console.log(index)
      this.showSource = false;
    },
    showPopup() {
      this.show = true;
    },
    handleConfirm(value) {
      this.userInfo.zfqx = value;
      this.date = dayjs(value).format("YYYY-MM-DD");
      this.userInfo.zfqx = this.date;
      this.show = false;
    },
    handleCancel() {
      this.userInfo.zfqx = "";
      this.show = false;
    },

    add() {
      var a = {"id":"","name":""}
      this.zfrlists.push(a);
    },
    del(index) {
      this.zfrlists.splice(index, 1);
    },

    onSubmit() {
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '提交中',
        loadingType: 'spinner',
        selector: '#custom-selector',
      });

      let data = this.userInfo;
      data.wrlx = data.wrlx.join(",");

      // 主要科室多加一個字段
      let mainRen = this.mainRen;
      mainRen.status = '1';
      let zfrlists = JSON.parse(JSON.stringify(this.zfrlists));
      zfrlists.push(mainRen)
      data.zfdwlist = JSON.stringify(zfrlists);

      // console.log(data)
      this.http.post("saveldpf", data).then(res => {
        console.log(res);
        if(res.state=="1"){
          this.$toast({
            message:res.msg
          })
          this.$router.push("/");
          toast.clear();
        }
      });
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
        this.wuranType1 = res.data[0].NAME;
        this.wuranType2 = res.data[1].NAME;
      });
    },
    /****************************************************************************************************************************/
    /* 获取通讯录 */
    getTXL(index) {
      let disabledDepartments = [];
      // if(typeOf(index) == "number") {
      //   if(this.mainRen.name) {
      //     disabledDepartments.push(this.mainRen)
      //   }
      //   if(this.zfrlists.length) {
      //     disabledDepartments = [...this.zfrlists]
      //   }
      // }
      
      dd.ready(() => {
        let _this = this;
        dd.biz.contact.departmentsPicker({
          title: "选择部门", //标题
          corpId: config.corpId, //企业的corpId
          multiple: false, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 1000, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: disabledDepartments, //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: config.appId, //微应用Id，企业内部应用查看AgentId
          responseUserOnly: false, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function(res) {
            console.log(index)
            let id = res.departments[0].id;  // 当前选择的id
            let ids = _this.zfrlists.map(v => v.id); 
            if(ids.indexOf(id)>-1 || (_this.mainRen.id && id === _this.mainRen.id)) {
              _this.$toast({
                message: '所选部门不能重复！！！'
              })
              return;
            }
            if(index === -1){
              _this.mainRen = res.departments[0]
              console.log("主办科室:"+_this.mainRen)

            }else{
              console.log(JSON.stringify(_this.zfrlists))
              _this.zfrlists.splice(_this.zfrlists.length-1,1)
              console.log(res)
              _this.zfrlists.push(res.departments[0])
                // console.log(JSON.stringify(res.departments))
              //  console.log(JSON.stringify(_this.zfrlists))
            // _this.zfrlists[index] = res.users[0];
                // console.log(JSON.stringify(_this.zfrlists))

            }
            

          },
          onFail: function(err) {}
        });
      });
      dd.error(error => {
        alert(`error: corpId=${config.corpId},appId=${config.appId}`);
        alert(`dd error: ${JSON.stringify(error)}`);
      });
    },

   /*  getmain(){
      dd.ready(() => {
        let _this = this;
        dd.biz.contact.complexPicker({
          title: "测试标题", //标题
          corpId: "ding2de5bf092416de6c35c2f4657eb6378f", //企业的corpId
          multiple: true, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 1000, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: 312218225, //微应用Id，企业内部应用查看AgentId
          responseUserOnly: false, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function(res) {
          
            console.log(res)
            this.mainName = res.departments[0].name
            console.log(this.mainName)
           _this.zfrlists.push(res.departments[0])
            //  console.log(JSON.stringify(_this.zfrlists))
          //  _this.zfrlists.splice(_this.zfrlists.length-1,1)
         

          },
          onFail: function(err) {}
        });
      });
    } */

  }
};
</script>
<style lang="scss" scoped>
/deep/.van-field__error-message {
  text-align: right;
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
.photo {
  padding: 10px 20px;
  background: #fff;
  p {
    font-size: 14px;
    padding-bottom: 10px;
  }
}
.lxzfPage {
    min-height: 100%;
    padding-bottom: 40px;
}
/deep/.van-picker-column__item{
  height: 44px;
}
</style>